import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type UsuarioGuardado = {
  id: string;
  nombre: string;
  correo: string;
  usuario?: string;
  rol: "admin" | "usuario";
  tipoUsuario?: string;
  imagen?: string;
};

export const guardarSesion = async (data: {
  token: string;
  usuario: UsuarioGuardado;
}) => {
  if (Platform.OS === "web") {
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    localStorage.setItem("rol", data.usuario.rol);
    return;
  }

  await SecureStore.setItemAsync("token", data.token);
  await SecureStore.setItemAsync("usuario", JSON.stringify(data.usuario));
  await SecureStore.setItemAsync("rol", data.usuario.rol);
};

export const guardarExpoPushTokenLocal = async (expoPushToken: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem("expoPushToken", expoPushToken);
    return;
  }

  await SecureStore.setItemAsync("expoPushToken", expoPushToken);
};

export const obtenerToken = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem("token");
  }

  return await SecureStore.getItemAsync("token");
};

export const obtenerUsuarioGuardado = async () => {
  if (Platform.OS === "web") {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
  }

  const usuario = await SecureStore.getItemAsync("usuario");
  return usuario ? JSON.parse(usuario) : null;
};

export const actualizarUsuarioGuardadoLocal = async (parcial: Partial<UsuarioGuardado>) => {
  const usuarioActual = await obtenerUsuarioGuardado();

  if (!usuarioActual) {
    return null;
  }

  const actualizado = {
    ...usuarioActual,
    ...parcial,
  };

  if (Platform.OS === "web") {
    localStorage.setItem("usuario", JSON.stringify(actualizado));
    return actualizado;
  }

  await SecureStore.setItemAsync("usuario", JSON.stringify(actualizado));
  return actualizado;
};

export const obtenerExpoPushTokenLocal = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem("expoPushToken");
  }

  return await SecureStore.getItemAsync("expoPushToken");
};

export const obtenerRolGuardado = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem("rol");
  }

  return await SecureStore.getItemAsync("rol");
};

export const cerrarSesion = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    localStorage.removeItem("expoPushToken");
    return;
  }

  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("usuario");
  await SecureStore.deleteItemAsync("rol");
  await SecureStore.deleteItemAsync("expoPushToken");
};
