import { guardarSesion } from "./authStorage";
import {
  actualizarRolUsuario,
  loginSocialUsuario,
  obtenerPerfilUsuario,
} from "./userapi";
import {
  registrarDispositivoParaPush,
  sincronizarPushTokenConBackend,
} from "@/utils/api/notificaciones/pushNotifications";
import { prewarmApi } from "@/servers/Axios";

export type SocialProvider = "google" | "facebook";
export type SocialProfile = {
  nombre: string;
  correo: string;
  fotoPerfil?: string;
  facebookId?: string;
};

export const obtenerMensajeSocialAuth = (provider: SocialProvider, mode: "login" | "registro") =>
  `La conexión con ${provider === "google" ? "Google" : "Facebook"} ya quedó lista para ${mode}, pero recuerda configurar las credenciales OAuth reales en tus variables de entorno para usarla en producción.`;

export const requiereCompletarPerfil = (usuario: {
  edad?: number | null;
  direccion?: string;
  telefono?: string;
}) =>
  usuario?.edad === null ||
  usuario?.edad === undefined ||
  !usuario?.direccion?.trim?.() ||
  !usuario?.telefono?.trim?.();

export const resolverRutaPorRol = (rol?: string | null) =>
  rol === "admin" ? "/admin/(tabs)" : "/User/(tabs)";

export const autenticarUsuarioSocial = async (
  provider: SocialProvider,
  profile: SocialProfile
) => {
  await prewarmApi().catch(() => null);

  const respuesta = await loginSocialUsuario({
    nombre: profile.nombre,
    correo: profile.correo,
    fotoPerfil: profile.fotoPerfil || "",
    proveedorAuth: provider,
    facebookId: profile.facebookId,
  });

  await guardarSesion({
    token: respuesta.token,
    usuario: respuesta.usuario,
  });

  try {
    await registrarDispositivoParaPush();
    await sincronizarPushTokenConBackend(respuesta.token);
  } catch (error) {
    console.log("No se pudo sincronizar el token push tras auth social", error);
  }

  return respuesta;
};

export const actualizarRolPostSocial = async (rol: "admin" | "user") => {
  const respuesta = await actualizarRolUsuario(rol);

  await guardarSesion({
    token: respuesta.token,
    usuario: respuesta.usuario,
  });

  return respuesta;
};

export const cargarPerfilPostLogin = async (userId: string) => {
  const respuesta = await obtenerPerfilUsuario(userId);
  return respuesta.perfil;
};



