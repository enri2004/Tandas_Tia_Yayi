import API from "@/servers/Axios";

export const crearComprobante = async (formData: FormData) => {
  const response = await API.post("/Comprobante/pagar", formData, {
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

export const aprobarComprobante = async (
  id: string,
  payload?: {
    adminId?: string;
    observacionesAdmin?: string;
  }
) => {
  const response = await API.put(`/Comprobante/aprobar/${id}`, payload || {});
  return response.data;
};

export const rechazarComprobante = async (
  id: string,
  payload?: {
    adminId?: string;
    observacionesAdmin?: string;
    motivoRechazo?: string;
  }
) => {
  const response = await API.put(`/Comprobante/rechazar/${id}`, payload || {});
  return response.data;
};
