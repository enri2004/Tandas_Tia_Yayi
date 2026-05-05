import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export type AdminPreferencias = {
  notificacionesActivas: boolean;
  sonidos: boolean;
  reglasTandas: string;
  montoMinimoCobro: string;
  revisionManualPagos: boolean;
  permitirAdministracionGlobal: boolean;
  privacidadRefuerzo: boolean;
};

const DEFAULT_ADMIN_PREFERENCIAS: AdminPreferencias = {
  notificacionesActivas: true,
  sonidos: true,
  reglasTandas:
    "Todo integrante debe pagar antes de la fecha limite definida por la tanda y enviar comprobante para revision.",
  montoMinimoCobro: "500",
  revisionManualPagos: true,
  permitirAdministracionGlobal: true,
  privacidadRefuerzo: false,
};

const getKey = (adminId: string) => `admin-config:${adminId}:preferencias`;
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

export const obtenerPreferenciasAdmin = async (
  adminId: string
): Promise<AdminPreferencias> => {
  if (!adminId?.trim()) {
    console.warn("[SecureStore] adminId invalido para preferencias admin");
    return DEFAULT_ADMIN_PREFERENCIAS;
  }

  const raw = await getItem(getKey(adminId));

  if (!raw) {
    return DEFAULT_ADMIN_PREFERENCIAS;
  }

  try {
    return {
      ...DEFAULT_ADMIN_PREFERENCIAS,
      ...JSON.parse(raw),
    };
  } catch {
    return DEFAULT_ADMIN_PREFERENCIAS;
  }
};

export const guardarPreferenciasAdmin = async (
  adminId: string,
  preferencias: AdminPreferencias
) => {
  if (!adminId?.trim()) {
    console.warn("[SecureStore] adminId invalido al guardar preferencias admin");
    return preferencias;
  }

  await setItem(getKey(adminId), JSON.stringify(preferencias));
  return preferencias;
};
