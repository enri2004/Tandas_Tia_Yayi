import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ScreenSafeArea from "@/components/layout/ScreenSafeArea";
import Select from "../../../components/Pagos/Select";
import MetodoPago from "../../../components/Pagos/MetodoPago";
import UploadImage from "../../../components/Pagos/UploadImage";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import Input from "../../../components/ui/Input";
import { obtenerUsuarioGuardado } from "@/utils/api/login-registrar/authStorage";
import { obtenerTandasPorUsuario } from "@/utils/api/Tandas/tandasApi";
import { crearComprobante } from "@/utils/api/comprobantes/comprobantesApi";
import { TandaItem } from "@/utils/api/Tandas/tandasTypes";

type MetodoPagoType = "transferencia" | "presencial";

export default function RegistroPagoScreen() {
  const [metodo, setMetodo] = useState<MetodoPagoType>("transferencia");
  const [openSelect, setOpenSelect] = useState(false);
  const [tandas, setTandas] = useState<TandaItem[]>([]);
  const [tandaSeleccionada, setTandaSeleccionada] = useState<TandaItem | null>(null);
  const [imagen, setImagen] = useState<string | null>(null);
  const [monto, setMonto] = useState("");
  const [banco, setBanco] = useState("");
  const [clabe, setClabe] = useState("");
  const [referencia, setReferencia] = useState("");
  const [persona, setPersona] = useState("");
  const [loading, setLoading] = useState(false);

  const opcionesTanda = useMemo(
    () => tandas.map((item) => item.nombre),
    [tandas]
  );
  const periodoActual =
    tandaSeleccionada?.calendarioPagos?.find((item) => item.estado !== "pagado") ||
    tandaSeleccionada?.calendarioPagos?.[0] ||
    null;

  useEffect(() => {
    const cargarTandas = async () => {
      try {
        const usuario = await obtenerUsuarioGuardado();
        if (!usuario?.id) {
          return;
        }

        const respuesta = await obtenerTandasPorUsuario(usuario.id);
        setTandas(respuesta);
      } catch (error) {
        console.log(error);
      }
    };

    cargarTandas();
  }, []);

  const seleccionarImagen = () => {
    Alert.alert("Imagen", "Selecciona una opción", [
      { text: "Cámara", onPress: abrirCamara },
      { text: "Galería", onPress: abrirGaleria },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const abrirCamara = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) return;

    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!res.canceled) {
      setImagen(res.assets[0].uri);
    }
  };

  const abrirGaleria = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!res.canceled) {
      setImagen(res.assets[0].uri);
    }
  };

  const limpiarFormulario = () => {
    setImagen(null);
    setMonto("");
    setBanco("");
    setClabe("");
    setReferencia("");
    setPersona("");
  };

  const enviarComprobante = async () => {
    try {
      const usuario = await obtenerUsuarioGuardado();

      if (!usuario?.id) {
        Alert.alert("Error", "No se encontró la sesión del usuario");
        return;
      }

      if (!tandaSeleccionada?._id) {
        Alert.alert("Error", "Selecciona una tanda");
        return;
      }

      if (!monto.trim()) {
        Alert.alert("Error", "Captura el monto del pago");
        return;
      }

      if (metodo === "transferencia" && !imagen) {
        Alert.alert("Error", "Sube el comprobante antes de enviarlo");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("tandaId", tandaSeleccionada._id);
      formData.append("usuarioId", usuario.id);
      formData.append("monto", monto);
      formData.append("periodoPago", String(periodoActual?.numeroPago || 1));
      formData.append("metodoPago", metodo);
      formData.append("banco", banco);
      formData.append("clabe", clabe);
      formData.append("referencia", referencia);
      formData.append("personaRecibe", persona);

      if (imagen) {
        const filename = imagen.split("/").pop() || `comprobante-${Date.now()}.jpg`;
        const extension = filename.split(".").pop() || "jpg";

        formData.append("comprobante", {
          uri: imagen,
          name: filename,
          type: `image/${extension}`,
        } as any);
      }

      await crearComprobante(formData);

      Alert.alert(
        "Éxito",
        "Comprobante enviado. Se generó historial, notificación y push para el admin."
      );

      limpiarFormulario();
    } catch (error: any) {
      console.log(error);
      const mensaje =
        error?.response?.data?.mensaje || "No se pudo enviar el comprobante";
      Alert.alert("Error", mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenSafeArea hasBlueHeader backgroundColor="#f5f6fa">
      <ScreenHeader
        title="Registrar Pago"
        subtitle="Este flujo genera historial y notificación automática."
      />

      <View style={styles.container}>
        <Select
          value={tandaSeleccionada?.nombre || "Seleccionar tanda"}
          open={openSelect}
          setOpen={setOpenSelect}
          options={opcionesTanda}
          onSelect={(item: string) => {
            const tanda = tandas.find((current) => current.nombre === item) || null;
            setTandaSeleccionada(tanda);
            setOpenSelect(false);
          }}
        />

        <MetodoPago metodo={metodo} setMetodo={setMetodo} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <Input
            label="Monto"
            placeholder="Captura el monto"
            value={monto}
            onChange={setMonto}
            keyboardType="numeric"
            icon="cash-outline"
            containerStyle={styles.inputBlock}
          />

          {tandaSeleccionada ? (
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Datos de pago</Text>
              <Text style={styles.infoLine}>
                Monto sugerido: ${Number(tandaSeleccionada.montoPago || tandaSeleccionada.pago || 0)} MXN
              </Text>
              <Text style={styles.infoLine}>
                Fecha límite: {periodoActual?.fechaPagoTexto || tandaSeleccionada.fechaInicio || "Sin fecha"}
              </Text>
              <Text style={styles.infoLine}>
                Estado del periodo: {periodoActual?.estado || "pendiente"}
              </Text>
              {tandaSeleccionada.claveInterbancaria ? (
                <Text style={styles.infoLine}>
                  Clave interbancaria: {tandaSeleccionada.claveInterbancaria}
                </Text>
              ) : null}
              {tandaSeleccionada.nombreBeneficiario ? (
                <Text style={styles.infoLine}>
                  Beneficiario: {tandaSeleccionada.nombreBeneficiario}
                </Text>
              ) : null}
              {tandaSeleccionada.banco ? (
                <Text style={styles.infoLine}>Banco: {tandaSeleccionada.banco}</Text>
              ) : null}
              {tandaSeleccionada.conceptoPago ? (
                <Text style={styles.infoLine}>Concepto: {tandaSeleccionada.conceptoPago}</Text>
              ) : null}
              {!tandaSeleccionada.claveInterbancaria &&
              !tandaSeleccionada.nombreBeneficiario &&
              !tandaSeleccionada.banco &&
              !tandaSeleccionada.conceptoPago ? (
                <Text style={styles.warningText}>
                  El administrador no agregó datos bancarios. Contacta al administrador para acordar el pago.
                </Text>
              ) : null}
            </View>
          ) : null}

          {metodo === "transferencia" && (
            <>
              <Input
                label="Banco"
                placeholder="Banco origen"
                value={banco}
                onChange={setBanco}
                icon="business-outline"
                containerStyle={styles.inputBlock}
              />
              <Input
                label="CLABE"
                placeholder="Cuenta origen"
                value={clabe}
                onChange={setClabe}
                icon="card-outline"
                containerStyle={styles.inputBlock}
              />
              <Input
                label="Referencia"
                placeholder="Folio o referencia"
                value={referencia}
                onChange={setReferencia}
                icon="reader-outline"
                containerStyle={styles.inputBlock}
              />
              <UploadImage imagen={imagen || undefined} onPress={seleccionarImagen} />
            </>
          )}

          {metodo === "presencial" && (
            <Input
              label="Persona que recibió el pago"
              placeholder="Nombre de quien recibió"
              value={persona}
              onChange={setPersona}
              icon="person-outline"
              containerStyle={styles.inputBlock}
            />
          )}

          <Pressable style={styles.submitButton} onPress={enviarComprobante} disabled={loading}>
            <Text style={styles.submitButtonText}>
              {loading ? "Enviando..." : "Enviar comprobante"}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </ScreenSafeArea>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 16,
  },
  inputBlock: {
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  infoTitle: {
    color: "#1e73d8",
    fontWeight: "700",
    marginBottom: 8,
  },
  infoLine: {
    color: "#334155",
    marginBottom: 4,
  },
  warningText: {
    color: "#b45309",
    marginTop: 8,
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});











