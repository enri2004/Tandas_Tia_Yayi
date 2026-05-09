import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const PERFIL_INCOMPLETO_POSPUESTO_HASTA_KEY = "perfil_incompleto_pospuesto_hasta";
export const PERFIL_MODAL_POSPONER_HORAS = 6;

type PerfilBasico = {
  edad?: number | string | null;
  telefono?: string | null;
  direccion?: string | null;
};

export const perfilEstaIncompleto = (usuario?: PerfilBasico | null) =>
  !usuario?.edad || !usuario?.telefono?.trim?.() || !usuario?.direccion?.trim?.();

export const obtenerPerfilIncompletoPospuestoHasta = async () => {
  if (Platform.OS === "web") {
    const value = localStorage.getItem(PERFIL_INCOMPLETO_POSPUESTO_HASTA_KEY);
    return value ? Number(value) : null;
  }

  const value = await SecureStore.getItemAsync(PERFIL_INCOMPLETO_POSPUESTO_HASTA_KEY);
  return value ? Number(value) : null;
};

export const guardarPerfilIncompletoPospuestoHasta = async (timestamp: number) => {
  const value = String(timestamp);

  if (Platform.OS === "web") {
    localStorage.setItem(PERFIL_INCOMPLETO_POSPUESTO_HASTA_KEY, value);
    return;
  }

  await SecureStore.setItemAsync(PERFIL_INCOMPLETO_POSPUESTO_HASTA_KEY, value);
};

export const limpiarPerfilIncompletoPospuestoHasta = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem(PERFIL_INCOMPLETO_POSPUESTO_HASTA_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(PERFIL_INCOMPLETO_POSPUESTO_HASTA_KEY);
};
