import API from "@/servers/Axios";

export type HistorialItem = {
  _id: string;
  tipo: string;
  titulo: string;
  descripcion: string;
  createdAt: string;
  tanda?: {
    _id?: string;
    nombre?: string;
  } | null;
  usuario?: {
    _id?: string;
    nombre?: string;
    correo?: string;
  } | null;
  actor?: {
    _id?: string;
    nombre?: string;
    correo?: string;
  } | null;
};

export const obtenerHistorialPorUsuario = async (usuarioId: string) => {
  const response = await API.get<HistorialItem[]>(
    `/Historial?usuarioId=${usuarioId}`
  );
  return response.data;
};

export const obtenerHistorialPorTanda = async (tandaId: string) => {
  const response = await API.get<HistorialItem[]>(`/Historial/tanda/${tandaId}`);
  return response.data;
};
