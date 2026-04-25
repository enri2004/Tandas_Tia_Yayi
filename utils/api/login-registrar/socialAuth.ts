type SocialMode = "login" | "registro";
type SocialProvider = "google" | "facebook";

const providerLabel: Record<SocialProvider, string> = {
  google: "Google",
  facebook: "Facebook",
};

export const obtenerMensajeSocialAuth = (
  provider: SocialProvider,
  mode: SocialMode
) => {
  const accion = mode === "login" ? "iniciar sesion" : "registrarte";

  return `La opcion con ${providerLabel[provider]} ya esta conectada en la interfaz, pero para usarla de verdad todavia faltan las credenciales OAuth del proyecto y la configuracion del proveedor para ${accion}.`;
};
