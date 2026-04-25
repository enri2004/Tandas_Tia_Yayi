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

const setItem = async (key: string, value: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
};

const getItem = async (key: string) => {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }

  return await SecureStore.getItemAsync(key);
};

export const obtenerPreferenciasAdmin = async (
  adminId: string
): Promise<AdminPreferencias> => {
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
  await setItem(getKey(adminId), JSON.stringify(preferencias));
  return preferencias;
};
