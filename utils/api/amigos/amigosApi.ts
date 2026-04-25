import API from "@/servers/Axios";
import {
  AmigosResponse,
  BuscarUsuariosResponse,
  PerfilAmigoResponse,
  PerfilResponse,
  SolicitudesResponse,
} from "./amigosTypes";

export const obtenerMiPerfil = async (id: string) => {
  const response = await API.get<PerfilResponse>(`/User/perfil/${id}`);
  return response.data;
};

export const actualizarPerfil = async (
  id: string,
  datos: FormData | Record<string, unknown>
) => {
  const esFormData = typeof FormData !== "undefined" && datos instanceof FormData;

  const response = await API.put<PerfilResponse>(`/User/perfil/${id}`, datos, {
    headers: esFormData
      ? {
          "Content-Type": "multipart/form-data",
        }
      : undefined,
  });

  return response.data;
};

export const buscarUsuarios = async (query: string, currentUserId?: string) => {
  const response = await API.get<BuscarUsuariosResponse>("/User/buscar", {
    params: {
      q: query,
      currentUserId,
    },
  });

  return response.data;
};

export const enviarSolicitudAmistad = async (emisorId: string, receptorId: string) => {
  const response = await API.post("/Amigos/solicitud/enviar", {
    emisorId,
    receptorId,
  });

  return response.data;
};

export const obtenerSolicitudes = async (id: string) => {
  const response = await API.get<SolicitudesResponse>(`/Amigos/solicitudes/${id}`);
  return response.data;
};

export const aceptarSolicitud = async (usuarioId: string, solicitanteId: string) => {
  const response = await API.post("/Amigos/solicitud/aceptar", {
    usuarioId,
    solicitanteId,
  });

  return response.data;
};

export const rechazarSolicitud = async (usuarioId: string, solicitanteId: string) => {
  const response = await API.post("/Amigos/solicitud/rechazar", {
    usuarioId,
    solicitanteId,
  });

  return response.data;
};

export const obtenerAmigos = async (id: string) => {
  const response = await API.get<AmigosResponse>(`/Amigos/lista/${id}`);
  return response.data;
};

export const obtenerPerfilAmigo = async (usuarioId: string, amigoId: string) => {
  const response = await API.get<PerfilAmigoResponse>(`/Amigos/perfil/${usuarioId}/${amigoId}`);
  return response.data;
};

export const eliminarAmigo = async (usuarioId: string, amigoId: string) => {
  const response = await API.delete("/Amigos/eliminar", {
    data: {
      usuarioId,
      amigoId,
    },
  });

  return response.data;
};
