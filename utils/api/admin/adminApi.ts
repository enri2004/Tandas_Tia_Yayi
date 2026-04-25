import API from "@/servers/Axios";
import { AdminDashboardResponse, AdminTanda, CrearTandaPayload } from "./adminTypes";

export const obtenerResumenDashboardAdmin = async (adminId: string) => {
  const response = await API.get<AdminDashboardResponse>(`/Tandas/admin/resumen/${adminId}`);
  return response.data;
};

export const obtenerTandasAdmin = async (adminId: string) => {
  const response = await API.get<AdminTanda[]>(`/Tandas/admin/${adminId}`);
  return response.data;
};

export const crearTandaAdmin = async (payload: CrearTandaPayload) => {
  const { imagenUri, ...resto } = payload;

  if (imagenUri) {
    const formData = new FormData();
    formData.append("nombre", resto.nombre);
    formData.append("pago", String(resto.pago));
    formData.append("participantes", String(resto.participantes));
    formData.append("fecha", resto.fecha);
    formData.append("frecuencia", resto.frecuencia || "");
    formData.append("descripcion", resto.descripcion || "");
    formData.append("estado", String(resto.estado ?? true));
    formData.append("pagoRealizados", String(resto.pagoRealizados ?? 0));
    formData.append("turno", String(resto.turno ?? 1));
    formData.append("creador", resto.creador);
    formData.append("integrantes", JSON.stringify(resto.integrantes || []));
    formData.append("imagen", {
      uri: imagenUri,
      name: `tanda-${Date.now()}.jpg`,
      type: "image/jpeg",
    } as any);

    const response = await API.post("/Tandas/nueva", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  const response = await API.post("/Tandas/nueva", resto);
  return response.data;
};

export const actualizarTandaAdmin = async (tandaId: string, payload: Partial<CrearTandaPayload>) => {
  const response = await API.put(`/Tandas/${tandaId}`, payload);
  return response.data;
};

export const eliminarTandaAdmin = async (tandaId: string) => {
  const response = await API.delete(`/Tandas/${tandaId}`);
  return response.data;
};

export const finalizarTandaAdmin = async (tandaId: string) => {
  const response = await API.put(`/Tandas/${tandaId}/finalizar`);
  return response.data;
};

export const asignarTurnosTandaAdmin = async (
  tandaId: string,
  payload: { integrantesOrdenados?: string[]; aleatorio?: boolean }
) => {
  const response = await API.put(`/Tandas/${tandaId}/turnos`, payload);
  return response.data;
};
