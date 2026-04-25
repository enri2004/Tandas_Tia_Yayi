import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import InputCard from "../../../components/CreatTandasAdmin/InputCrads";
import FrecuenciaSelector from "../../../components/CreatTandasAdmin/FrecuenciasSelec";
import FechaSelector from "../../../components/CreatTandasAdmin/FechaSelector";
import BotonCrear from "../../../components/CreatTandasAdmin/BotonCrear";
import SelectorIntegrantes from "../../../components/CreatTandasAdmin/SelectorIntegrantes";
import OrdenTurnos from "../../../components/CreatTandasAdmin/OrdenTurnos";
import SelectorImagenTanda from "../../../components/CreatTandasAdmin/SelectorImagenTanda";
import ModalMensaje from "../../../components/modal_alert/modal";
import { useCrearTandaAdmin } from "../../../hooks/useCrearTandaAdmin";

export default function CrearTandaScreen() {
  const {
    admin,
    formulario,
    actualizarCampo,
    amigosDisponibles,
    seleccionadosIds,
    integrantesOrdenados,
    toggleIntegrante,
    moverArriba,
    moverAbajo,
    crearTanda,
    cargandoInicial,
    guardando,
    errorCarga,
  } = useCrearTandaAdmin();
  const [modalExitoVisible, setModalExitoVisible] = useState(false);

  const manejarCrearTanda = async () => {
    try {
      await crearTanda();
      setModalExitoVisible(true);
    } catch (error: any) {
      Alert.alert(
        "Aviso",
        error?.response?.data?.mensaje || error?.message || "No se pudo crear la tanda"
      );
    }
  };

  const seleccionarImagenGaleria = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso requerido", "Debes permitir acceso a tus fotos.");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!res.canceled && res.assets?.[0]?.uri) {
      actualizarCampo("imagenUri", res.assets[0].uri);
    }
  };

  const seleccionarImagenCamara = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso requerido", "Debes permitir acceso a la camara.");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!res.canceled && res.assets?.[0]?.uri) {
      actualizarCampo("imagenUri", res.assets[0].uri);
    }
  };

  if (cargandoInicial) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Cargando datos para crear la tanda...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>CREAR NUEVA TANDA</Text>
        <Text style={styles.subtitle}>
          Configura los datos principales, elige integrantes y acomoda los turnos antes de guardar.
        </Text>

        {admin ? (
          <View style={styles.adminCard}>
            <Text style={styles.adminLabel}>Administrador creador</Text>
            <Text style={styles.adminName}>{admin.nombre}</Text>
            <Text style={styles.adminMeta}>{admin.correo}</Text>
          </View>
        ) : null}

        {errorCarga ? <Text style={styles.errorText}>{errorCarga}</Text> : null}

        <InputCard
          icon="hourglass-outline"
          label="Nombre de la tanda"
          value={formulario.nombre}
          onChange={(value) => actualizarCampo("nombre", value)}
          placeholder="Ej: Tanda amigos"
        />

        <InputCard
          icon="cash-outline"
          label="Monto por participante"
          value={formulario.monto}
          onChange={(value) => actualizarCampo("monto", value)}
          placeholder="1000"
          keyboardType="numeric"
        />

        <InputCard
          icon="people-outline"
          label="Numero de participantes"
          value={formulario.participantes}
          onChange={(value) => actualizarCampo("participantes", value)}
          placeholder="10"
          keyboardType="numeric"
        />

        <InputCard
          icon="document-text-outline"
          label="Descripcion"
          value={formulario.descripcion}
          onChange={(value) => actualizarCampo("descripcion", value)}
          placeholder="Describe reglas o notas de la tanda"
          multiline
        />

        <SelectorImagenTanda
          imageUri={formulario.imagenUri}
          onGaleria={seleccionarImagenGaleria}
          onCamara={seleccionarImagenCamara}
        />

        <View style={styles.frequencyCard}>
          <Text style={styles.sectionLabel}>Frecuencia</Text>
          <FrecuenciaSelector
            frecuencia={formulario.frecuencia}
            setFrecuencia={(value) => actualizarCampo("frecuencia", value)}
          />

          <FechaSelector
            fecha={formulario.fecha}
            onChangeText={(value) => actualizarCampo("fecha", value)}
          />
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusInfo}>
            <Text style={styles.sectionLabel}>Estado inicial</Text>
            <Text style={styles.statusDescription}>
              Define si la tanda se crea activa desde el inicio.
            </Text>
          </View>
          <Switch
            value={formulario.estado}
            onValueChange={(value) => actualizarCampo("estado", value)}
            trackColor={{ false: "#cbd5e1", true: "#86efac" }}
            thumbColor={formulario.estado ? "#16a34a" : "#f8fafc"}
          />
        </View>

        <SelectorIntegrantes
          amigos={amigosDisponibles}
          seleccionados={seleccionadosIds}
          onToggle={toggleIntegrante}
          creadorId={admin?.id || ""}
        />

        <OrdenTurnos
          integrantesOrdenados={integrantesOrdenados}
          onMoveUp={moverArriba}
          onMoveDown={moverAbajo}
        />

        <Text style={styles.helperText}>
          El orden visible arriba sera el orden de turnos que se guardara para la tanda.
        </Text>

        <BotonCrear onPress={manejarCrearTanda} />
        {guardando ? <Text style={styles.savingText}>Guardando tanda...</Text> : null}
      </ScrollView>

      <ModalMensaje
        visible={modalExitoVisible}
        titulo="Tanda creada"
        mensaje="Tu tanda ha sido creada correctamente."
        textoBoton="Aceptar"
        onClose={() => {
          setModalExitoVisible(false);
          router.replace("/admin");
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f4f7",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: "#4b5563",
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 16,
  },
  adminCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  adminLabel: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  adminName: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  adminMeta: {
    color: "#4b5563",
    marginTop: 2,
  },
  errorText: {
    color: "#991b1b",
    marginBottom: 12,
  },
  frequencyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  sectionLabel: {
    color: "#111827",
    fontWeight: "700",
  },
  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  statusInfo: {
    flex: 1,
  },
  statusDescription: {
    color: "#4b5563",
    marginTop: 4,
  },
  helperText: {
    color: "#4b5563",
    marginTop: -4,
    marginBottom: 10,
  },
  savingText: {
    textAlign: "center",
    color: "#4b5563",
    marginTop: 12,
  },
});
