import API from "@/servers/Axios";

export const crearComprobante = async (formData: FormData) => {
  const response = await API.post("/Comprobante", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const obtenerComprobantes = async (params?: {
  tandaId?: string;
  usuarioId?: string;
  estado?: "pendiente" | "aprobado" | "rechazado";
}) => {
  const response = await API.get("/Comprobante", {
    params,
  });

  return response.data;
};

export const revisarComprobante = async (
  id: string,
  payload: {
    estado: "aprobado" | "rechazado";
    adminId?: string;
    observacionesAdmin?: string;
  }
) => {
  const response = await API.put(`/Comprobante/${id}/revisar`, payload);
  return response.data;
};
