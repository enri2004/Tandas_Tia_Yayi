import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Select from "../../../components/Pagos/Select";
import MetodoPago from "../../../components/Pagos/MetodoPago";
import UploadImage from "../../../components/Pagos/UploadImage";
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
    Alert.alert("Imagen", "Selecciona una opcion", [
      { text: "Camara", onPress: abrirCamara },
      { text: "Galeria", onPress: abrirGaleria },
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
        Alert.alert("Error", "No se encontro la sesion del usuario");
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
        "Exito",
        "Comprobante enviado. Se genero historial, notificacion y push para el admin."
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
    <SafeAreaView style={styles.container}>
      <View style={styles.context}>
        <Text style={styles.title}>Registrar Pago</Text>
        <Text style={styles.subtitle}>Este flujo genera historial y notificacion automatica.</Text>
      </View>

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          style={styles.input}
          placeholder="Monto"
          value={monto}
          onChangeText={setMonto}
          keyboardType="numeric"
        />

        {metodo === "transferencia" && (
          <>
            <TextInput style={styles.input} placeholder="Banco" value={banco} onChangeText={setBanco} />
            <TextInput style={styles.input} placeholder="CLABE" value={clabe} onChangeText={setClabe} />
            <TextInput
              style={styles.input}
              placeholder="Referencia"
              value={referencia}
              onChangeText={setReferencia}
            />
            <UploadImage imagen={imagen || undefined} onPress={seleccionarImagen} />
          </>
        )}

        {metodo === "presencial" && (
          <TextInput
            style={styles.input}
            placeholder="Persona que recibio el pago"
            value={persona}
            onChangeText={setPersona}
          />
        )}

        <Pressable style={styles.submitButton} onPress={enviarComprobante} disabled={loading}>
          <Text style={styles.submitButtonText}>
            {loading ? "Enviando..." : "Enviar comprobante"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 16,
  },
  context: {
    backgroundColor: "#3b86f6",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 25,
    marginHorizontal: -16,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
  },
  subtitle: {
    color: "#dbeafe",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
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
