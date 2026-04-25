import API from "@/servers/Axios";
import { TandaItem } from "./tandasTypes";

export const obtenerTandas = async (): Promise<TandaItem[]> => {
  const response = await API.get("/Tandas");
  return response.data;
};

export const obtenerTandasPorUsuario = async (
  userId: string
): Promise<TandaItem[]> => {
  const response = await API.get(`/Tandas/usuario/${userId}`);
  return response.data;
};

export const obtenerTandaPorId = async (id: string): Promise<TandaItem> => {
  const response = await API.get(`/Tandas/${id}`);
  return response.data;
};

export const obtenerTandaPorCodigo = async (codigo: string): Promise<TandaItem> => {
  const response = await API.get(`/Tandas/codigo/${encodeURIComponent(codigo)}`);
  return response.data;
};

export type DashboardResumenResponse = {
  usuario: {
    id: string;
    nombre: string;
    correo: string;
    usuario?: string;
    imagen?: string;
    rol: "admin" | "usuario";
    tipoUsuario?: string;
  };
  resumen: {
    tandasActivas: number;
    notificacionesSinLeer: number;
    proximoPago: {
      tandaId: string;
      nombreTanda: string;
      monto: number;
      fechaLimite: string;
    } | null;
    proximoTurno: {
      tandaId: string;
      nombreTanda: string;
      numeroTurno: number;
      montoRecibir: number;
    } | null;
  };
  misTandas: Array<
    TandaItem & {
      estadoTexto?: string;
      turnoUsuario?: number | null;
      montoRecibir?: number;
    }
  >;
};

export const obtenerResumenDashboardUsuario = async (
  userId: string
): Promise<DashboardResumenResponse> => {
  const response = await API.get(`/Tandas/dashboard/resumen/${userId}`);
  return response.data;
};

export const registrarPagoTanda = async (tandaId: string) => {
  const response = await API.put(`/Tandas/${tandaId}/pagar`);
  return response.data;
};

export const unirseATanda = async (tandaId: string, userId: string) => {
  const response = await API.put(`/Tandas/${tandaId}/unirse`, { userId });
  return response.data;
};

export const unirseATandaPorCodigo = async (codigo: string, userId: string) => {
  const response = await API.put(`/Tandas/codigo/${encodeURIComponent(codigo)}/unirse`, {
    userId,
  });
  return response.data;
};

