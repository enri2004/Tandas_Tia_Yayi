import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import PerfilHeader from "../../../components/amigos/PerfilHeader";
import PerfilImageActions from "../../../components/amigos/PerfilImageActions";
import Input from "../../../components/ui/Input";
import {
  actualizarUsuarioGuardadoLocal,
  obtenerUsuarioGuardado,
} from "../../../utils/api/login-registrar/authStorage";
import {
  limpiarPerfilIncompletoPospuestoHasta,
  perfilEstaIncompleto,
} from "../../../utils/api/login-registrar/profileModalStorage";
import {
  cargarMiPerfil,
  guardarMiPerfil,
} from "../../../utils/api/amigos/amigosService";
import { Usuario } from "../../../utils/api/amigos/amigosTypes";

const emptyForm = {
  nombre: "",
  edad: "",
  correo: "",
  usuario: "",
  telefono: "",
  direccion: "",
};

const obtenerEstadoPerfil = (data: {
  edad?: number | string | null;
  telefono?: string | null;
  direccion?: string | null;
}) => {
  const incompleto = perfilEstaIncompleto(data);

  return {
    perfilActualizado: !incompleto,
    mostrarModalActualizarDatos: incompleto,
  };
};

export default function MiPerfilScreen() {
  const [perfil, setPerfil] = useState<Usuario | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editando, setEditando] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      const sesion = await obtenerUsuarioGuardado();

      if (!sesion?.id) {
        setPerfil(null);
        return;
      }

      const perfilActual = await cargarMiPerfil(sesion.id);
      setPerfil(perfilActual);
      setForm({
        nombre: perfilActual.nombre || "",
        edad:
          perfilActual.edad === null || perfilActual.edad === undefined
            ? ""
            : String(perfilActual.edad),
        correo: perfilActual.correo || "",
        usuario: perfilActual.usuario || "",
        telefono: perfilActual.telefono || "",
        direccion: perfilActual.direccion || "",
      });
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo cargar tu perfil"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [cargarDatos])
  );

  const guardarCambios = async () => {
    if (!perfil?.id) return;

    try {
      setSaving(true);
      const estadoPerfil = obtenerEstadoPerfil({
        edad: form.edad,
        telefono: form.telefono,
        direccion: form.direccion,
      });

      const actualizado = await guardarMiPerfil(perfil.id, {
        nombre: form.nombre,
        edad: form.edad,
        correo: form.correo,
        usuario: form.usuario,
        telefono: form.telefono,
        direccion: form.direccion,
        perfilActualizado: estadoPerfil.perfilActualizado,
        mostrarModalActualizarDatos: estadoPerfil.mostrarModalActualizarDatos,
      });

      setPerfil(actualizado);
      setEditando(false);
      if (estadoPerfil.perfilActualizado) {
        await limpiarPerfilIncompletoPospuestoHasta();
      }
      await actualizarUsuarioGuardadoLocal({
        nombre: actualizado.nombre,
        correo: actualizado.correo,
        usuario: actualizado.usuario,
        imagen: actualizado.imagen,
        fotoPerfil: actualizado.fotoPerfil || actualizado.imagen,
        edad: actualizado.edad,
        telefono: actualizado.telefono,
        direccion: actualizado.direccion,
        perfilActualizado:
          actualizado.perfilActualizado ?? estadoPerfil.perfilActualizado,
        mostrarModalActualizarDatos:
          actualizado.mostrarModalActualizarDatos ?? estadoPerfil.mostrarModalActualizarDatos,
      });

      Alert.alert("Exito", "Perfil actualizado correctamente");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo actualizar el perfil"
      );
    } finally {
      setSaving(false);
    }
  };

  const actualizarImagen = async (uri: string) => {
    if (!perfil?.id || !uri) return;

    try {
      setUploadingImage(true);
      const estadoPerfil = obtenerEstadoPerfil({
        edad: perfil.edad,
        telefono: perfil.telefono,
        direccion: perfil.direccion,
      });
      const formData = new FormData();
      formData.append("nombre", perfil.nombre || "");
      formData.append("edad", perfil.edad === undefined || perfil.edad === null ? "" : String(perfil.edad));
      formData.append("correo", perfil.correo || "");
      formData.append("usuario", perfil.usuario || "");
      formData.append("telefono", perfil.telefono || "");
      formData.append("direccion", perfil.direccion || "");
      formData.append("tipoUsuario", perfil.tipoUsuario || "");
      formData.append("perfilActualizado", String(estadoPerfil.perfilActualizado));
      formData.append(
        "mostrarModalActualizarDatos",
        String(estadoPerfil.mostrarModalActualizarDatos)
      );
      formData.append("imagen", {
        uri,
        name: `perfil-${Date.now()}.jpg`,
        type: "image/jpeg",
      } as any);

      const actualizado = await guardarMiPerfil(perfil.id, formData);
      setPerfil(actualizado);
      if (estadoPerfil.perfilActualizado) {
        await limpiarPerfilIncompletoPospuestoHasta();
      }
      await actualizarUsuarioGuardadoLocal({
        nombre: actualizado.nombre,
        correo: actualizado.correo,
        usuario: actualizado.usuario,
        imagen: actualizado.imagen,
        fotoPerfil: actualizado.fotoPerfil || actualizado.imagen,
        edad: actualizado.edad,
        telefono: actualizado.telefono,
        direccion: actualizado.direccion,
        perfilActualizado:
          actualizado.perfilActualizado ?? estadoPerfil.perfilActualizado,
        mostrarModalActualizarDatos:
          actualizado.mostrarModalActualizarDatos ?? estadoPerfil.mostrarModalActualizarDatos,
      });
      Alert.alert("Exito", "Foto de perfil actualizada correctamente");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo actualizar la foto de perfil"
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const abrirGaleria = async () => {
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
      await actualizarImagen(res.assets[0].uri);
    }
  };

  const abrirCamara = async () => {
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
      await actualizarImagen(res.assets[0].uri);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  if (!perfil) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No se pudo cargar el perfil.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <PerfilHeader
          perfil={perfil}
          subtitle={`${perfil.totalAmigos || 0} amigos registrados`}
        />

        <PerfilImageActions
          onGaleria={abrirGaleria}
          onCamara={abrirCamara}
          loading={uploadingImage}
        />

        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => router.push("/screen/user/solicitudesAmistad")}
          >
            <Text style={styles.quickText}>Solicitudes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>Mi Perfil</Text>
            <TouchableOpacity onPress={() => setEditando((prev) => !prev)}>
              <Text style={styles.linkText}>
                {editando ? "Cancelar" : "Editar perfil"}
              </Text>
            </TouchableOpacity>
          </View>

          {[
            { key: "nombre", label: "Nombre" },
            { key: "edad", label: "Edad" },
            { key: "correo", label: "Correo" },
            { key: "usuario", label: "Usuario" },
            { key: "telefono", label: "Telefono" },
            { key: "direccion", label: "Direccion" },
          ].map((campo) => (
            <View key={campo.key} style={styles.fieldBlock}>
              <Input
                label={campo.label}
                editable={editando}
                value={form[campo.key as keyof typeof form]}
                onChange={(value: string) =>
                  setForm((prev) => ({ ...prev, [campo.key]: value }))
                }
                keyboardType={campo.key === "edad" ? "numeric" : "default"}
                icon={
                  campo.key === "correo"
                    ? "mail-outline"
                    : campo.key === "telefono"
                    ? "call-outline"
                    : campo.key === "direccion"
                    ? "location-outline"
                    : campo.key === "edad"
                    ? "calendar-outline"
                    : "person-outline"
                }
                containerStyle={styles.profileInput}
                inputStyle={!editando ? styles.inputDisabled : undefined}
              />
            </View>
          ))}

          {editando ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={guardarCambios}
              disabled={saving}
            >
              <Text style={styles.saveText}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f6fa",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  quickRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  quickButton: {
    flex: 1,
    backgroundColor: "#e0ecff",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  quickText: {
    color: "#1d4ed8",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  linkText: {
    color: "#2563eb",
    fontWeight: "700",
  },
  fieldBlock: {
    marginBottom: 12,
  },
  profileInput: {
    marginTop: 2,
  },
  label: {
    color: "#6b7280",
    marginBottom: 6,
    fontWeight: "600",
  },
  inputDisabled: {
    color: "#4b5563",
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
  },
});
