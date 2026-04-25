import {
  aceptarSolicitud,
  actualizarPerfil,
  buscarUsuarios,
  eliminarAmigo,
  enviarSolicitudAmistad,
  obtenerAmigos,
  obtenerMiPerfil,
  obtenerPerfilAmigo,
  obtenerSolicitudes,
  rechazarSolicitud,
} from "./amigosApi";

export const cargarMiPerfil = async (userId: string) => {
  const response = await obtenerMiPerfil(userId);
  return response.perfil;
};

export const guardarMiPerfil = async (
  userId: string,
  datos: FormData | Record<string, unknown>
) => {
  const response = await actualizarPerfil(userId, datos);
  return response.perfil;
};

export const buscarAmigosDisponibles = async (query: string, userId: string) => {
  const response = await buscarUsuarios(query, userId);
  return response.usuarios;
};

export const cargarSolicitudesRecibidas = async (userId: string) => {
  const response = await obtenerSolicitudes(userId);
  return response.solicitudes;
};

export const enviarNuevaSolicitud = async (emisorId: string, receptorId: string) => {
  return await enviarSolicitudAmistad(emisorId, receptorId);
};

export const aceptarSolicitudPendiente = async (usuarioId: string, solicitanteId: string) => {
  return await aceptarSolicitud(usuarioId, solicitanteId);
};

export const rechazarSolicitudPendiente = async (usuarioId: string, solicitanteId: string) => {
  return await rechazarSolicitud(usuarioId, solicitanteId);
};

export const cargarListaAmigos = async (userId: string) => {
  const response = await obtenerAmigos(userId);
  return response.amigos;
};

export const cargarPerfilAmigo = async (usuarioId: string, amigoId: string) => {
  const response = await obtenerPerfilAmigo(usuarioId, amigoId);
  return response.amigo;
};

export const quitarAmigo = async (usuarioId: string, amigoId: string) => {
  return await eliminarAmigo(usuarioId, amigoId);
};
