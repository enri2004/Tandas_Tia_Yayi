import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export type PreferenciasUsuario = {
  sonidos: boolean;
  perfilPrivado: boolean;
  permitirSolicitudesAmistad: boolean;
};

export type MetodoPagoItem = {
  id: string;
  alias: string;
  banco: string;
  referencia: string;
};

const DEFAULT_PREFERENCIAS: PreferenciasUsuario = {
  sonidos: true,
  perfilPrivado: false,
  permitirSolicitudesAmistad: true,
};

const getPreferenciasKey = (userId: string) => `configuracion:${userId}:preferencias`;
const getMetodosKey = (userId: string) => `configuracion:${userId}:metodosPago`;
const isValidSecureStoreKey = (key?: string) =>
  typeof key === "string" &&
  key.length > 0 &&
  /^[A-Za-z0-9._-]+$/.test(key);

const setItem = async (key: string, value: string) => {
  if (!isValidSecureStoreKey(key)) {
    console.warn("[SecureStore] Key invalida omitida:", key);
    return;
  }

  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
};

const getItem = async (key: string) => {
  if (!isValidSecureStoreKey(key)) {
    console.warn("[SecureStore] Key invalida omitida:", key);
    return null;
  }

  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }

  return await SecureStore.getItemAsync(key);
};

export const obtenerPreferenciasUsuario = async (
  userId: string
): Promise<PreferenciasUsuario> => {
  if (!userId?.trim()) {
    console.warn("[SecureStore] userId invalido para preferencias usuario");
    return DEFAULT_PREFERENCIAS;
  }

  const raw = await getItem(getPreferenciasKey(userId));

  if (!raw) {
    return DEFAULT_PREFERENCIAS;
  }

  try {
    return {
      ...DEFAULT_PREFERENCIAS,
      ...JSON.parse(raw),
    };
  } catch {
    return DEFAULT_PREFERENCIAS;
  }
};

export const guardarPreferenciasUsuario = async (
  userId: string,
  preferencias: PreferenciasUsuario
) => {
  if (!userId?.trim()) {
    console.warn("[SecureStore] userId invalido al guardar preferencias usuario");
    return preferencias;
  }

  await setItem(getPreferenciasKey(userId), JSON.stringify(preferencias));
  return preferencias;
};

export const obtenerMetodosPagoUsuario = async (
  userId: string
): Promise<MetodoPagoItem[]> => {
  if (!userId?.trim()) {
    console.warn("[SecureStore] userId invalido para metodos de pago");
    return [];
  }

  const raw = await getItem(getMetodosKey(userId));

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const guardarMetodosPagoUsuario = async (
  userId: string,
  metodos: MetodoPagoItem[]
) => {
  if (!userId?.trim()) {
    console.warn("[SecureStore] userId invalido al guardar metodos de pago");
    return metodos;
  }

  await setItem(getMetodosKey(userId), JSON.stringify(metodos));
  return metodos;
};
