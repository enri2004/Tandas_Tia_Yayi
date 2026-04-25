import API from "@/servers/Axios";

export type NotificacionItem = {
  _id: string;
  usuario: string;
  remitente?: string | null;
  tanda?: string | null;
  titulo: string;
  texto: string;
  detalles?: string;
  tipo: string;
  origen: "evento" | "manual" | "sistema";
  leida: boolean;
  pushEnviado: boolean;
  pushError?: string;
  createdAt: string;
  updatedAt: string;
};

export const obtenerNotificacionesPorUsuario = async (userId: string) => {
  const response = await API.get<NotificacionItem[]>(`/Noti/usuario/${userId}`);
  return response.data;
};

export const marcarNotificacionLeida = async (id: string) => {
  const response = await API.put(`/Noti/${id}/leer`);
  return response.data;
};

export const marcarTodasLeidas = async (userId: string) => {
  const response = await API.put(`/Noti/usuario/${userId}/leer-todas`);
  return response.data;
};

export const eliminarNotificacion = async (id: string) => {
  const response = await API.delete(`/Noti/${id}`);
  return response.data;
};

export const eliminarNotificacionesSeleccionadas = async (
  userId: string,
  ids: string[]
) => {
  const response = await API.delete(`/Noti/usuario/${userId}/seleccionadas`, {
    data: { ids },
  });
  return response.data;
};

export const crearAvisoManual = async (payload: {
  tipo: "mantenimiento" | "actualizacion_app" | "aviso_general" | "mensaje_admin";
  titulo: string;
  texto: string;
  detalles?: string;
  target?: "usuarios" | "admins" | "tanda_integrantes";
  userIds?: string[];
  tandaId?: string;
  metadata?: Record<string, unknown>;
}) => {
  const response = await API.post("/Noti/manual", payload);
  return response.data;
};
