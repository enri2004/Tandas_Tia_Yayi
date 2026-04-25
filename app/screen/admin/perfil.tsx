import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import PerfilHeader from "../../../components/amigos/PerfilHeader";
import PerfilImageActions from "../../../components/amigos/PerfilImageActions";
import {
  actualizarUsuarioGuardadoLocal,
  obtenerUsuarioGuardado,
} from "../../../utils/api/login-registrar/authStorage";
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

export default function PerfilAdminScreen() {
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
        error?.response?.data?.mensaje || "No se pudo cargar el perfil del admin"
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
      const actualizado = await guardarMiPerfil(perfil.id, {
        nombre: form.nombre,
        edad: form.edad,
        correo: form.correo,
        usuario: form.usuario,
        telefono: form.telefono,
        direccion: form.direccion,
      });

      setPerfil(actualizado);
      setEditando(false);
      await actualizarUsuarioGuardadoLocal({
        nombre: actualizado.nombre,
        correo: actualizado.correo,
        usuario: actualizado.usuario,
        imagen: actualizado.imagen,
      });

      Alert.alert("Exito", "Perfil del admin actualizado correctamente");
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
      const formData = new FormData();
      formData.append("nombre", perfil.nombre || "");
      formData.append("edad", perfil.edad === undefined || perfil.edad === null ? "" : String(perfil.edad));
      formData.append("correo", perfil.correo || "");
      formData.append("usuario", perfil.usuario || "");
      formData.append("telefono", perfil.telefono || "");
      formData.append("direccion", perfil.direccion || "");
      formData.append("tipoUsuario", perfil.tipoUsuario || "");
      formData.append("imagen", {
        uri,
        name: `perfil-admin-${Date.now()}.jpg`,
        type: "image/jpeg",
      } as any);

      const actualizado = await guardarMiPerfil(perfil.id, formData);
      setPerfil(actualizado);
      await actualizarUsuarioGuardadoLocal({
        nombre: actualizado.nombre,
        correo: actualizado.correo,
        usuario: actualizado.usuario,
        imagen: actualizado.imagen,
      });
      Alert.alert("Exito", "Foto del admin actualizada correctamente");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo actualizar la foto del administrador"
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
        <Text>No se pudo cargar el perfil del administrador.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PerfilHeader
          perfil={perfil}
          subtitle={`${perfil.totalAmigos || 0} conexiones registradas`}
        />

        <PerfilImageActions
          onGaleria={abrirGaleria}
          onCamara={abrirCamara}
          loading={uploadingImage}
        />

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>Perfil del Administrador</Text>
            <TouchableOpacity onPress={() => setEditando((prev) => !prev)}>
              <Text style={styles.linkText}>{editando ? "Cancelar" : "Editar perfil"}</Text>
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
              <Text style={styles.label}>{campo.label}</Text>
              <TextInput
                style={[styles.input, !editando && styles.inputDisabled]}
                editable={editando}
                value={form[campo.key as keyof typeof form]}
                onChangeText={(value) => setForm((prev) => ({ ...prev, [campo.key]: value }))}
                keyboardType={campo.key === "edad" ? "numeric" : "default"}
              />
            </View>
          ))}

          {editando ? (
            <TouchableOpacity style={styles.saveButton} onPress={guardarCambios} disabled={saving}>
              <Text style={styles.saveText}>{saving ? "Guardando..." : "Guardar cambios"}</Text>
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
  label: {
    color: "#6b7280",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#111827",
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
