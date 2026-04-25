import { Alert } from "react-native";
import {
    obtenerResumenDashboardUsuario,
    obtenerTandaPorId,
    obtenerTandasPorUsuario,
    registrarPagoTanda,
} from "./tandasApi";

export const cargarTandasDelUsuario = async (
  userId: string,
  setData: (data: any[]) => void,
  setLoading?: (value: boolean) => void
) => {
  try {
    setLoading?.(true);
    const respuesta = await obtenerTandasPorUsuario(userId);
    setData(respuesta);
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "No se pudieron obtener las tandas");
  } finally {
    setLoading?.(false);
  }
};

export const cargarDetalleTanda = async (
  id: string,
  setTanda: (data: any) => void,
  setLoading?: (value: boolean) => void
) => {
  try {
    setLoading?.(true);
    const respuesta = await obtenerTandaPorId(id);
    setTanda(respuesta);
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "No se pudo obtener la tanda");
  } finally {
    setLoading?.(false);
  }
};

export const cargarResumenDashboard = async (
  userId: string,
  setData: (data: any) => void,
  setLoading?: (value: boolean) => void,
  onError?: (message: string) => void
) => {
  try {
    setLoading?.(true);
    const respuesta = await obtenerResumenDashboardUsuario(userId);
    setData(respuesta);
  } catch (error: any) {
    console.log(error);
    const mensaje =
      error?.response?.data?.mensaje || "No se pudo obtener el resumen";
    onError?.(mensaje);
  } finally {
    setLoading?.(false);
  }
};

export const pagarTanda = async (
  tandaId: string,
  onSuccess?: () => void,
  setLoading?: (value: boolean) => void
) => {
  try {
    setLoading?.(true);
    const respuesta = await registrarPagoTanda(tandaId);
    Alert.alert("Éxito", respuesta.mensaje || "Pago registrado");
    onSuccess?.();
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "No se pudo registrar el pago");
  } finally {
    setLoading?.(false);
  }
};
