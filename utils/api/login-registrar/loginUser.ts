import { guardarSesion } from "./authStorage";
import { loginUsuario, obtenerPerfilUsuario } from "./userapi";
import { prewarmApi } from "@/servers/Axios";

type LoginParams = {
  correo: string;
  password: string;
};

type LoginDeps = {
  setLoading: (value: boolean) => void;
  onResolved: (payload: { usuario: any; token: string }) => void;
  onError: (mensaje: string) => void;
  onSuccess?: (mensaje: string) => void;
};

export const iniciarSesionUsuario = async (
  datos: LoginParams,
  deps: LoginDeps
) => {
  const { correo, password } = datos;
  const { setLoading, onResolved, onError, onSuccess } = deps;

  try {
    if (!correo.trim() || !password.trim()) {
      onError("Completa correo/usuario y contrasena");
      return;
    }

    setLoading(true);
    await prewarmApi().catch(() => null);

    const respuesta = await loginUsuario(correo.trim(), password);

    const token = respuesta.token || respuesta.Token || respuesta.jwt;
    const usuario = respuesta.usuario || respuesta.user;

    if (!token) {
      console.log("Respuesta login:", respuesta);
      onError("El servidor no devolvio token.");
      return;
    }

    if (!usuario) {
      console.log("Respuesta login:", respuesta);
      onError("El servidor no devolvio usuario.");
      return;
    }

    await guardarSesion({
      token,
      usuario,
    });

    let usuarioCompleto = usuario;

    try {
      const perfilRespuesta = await obtenerPerfilUsuario(usuario.id || usuario._id);
      usuarioCompleto = {
        ...usuario,
        ...perfilRespuesta?.perfil,
      };

      await guardarSesion({
        token,
        usuario: usuarioCompleto,
      });
    } catch (perfilError) {
      console.log("No se pudo cargar perfil completo:", perfilError);
    }

    if (onSuccess) {
      onSuccess(respuesta.mensaje || "Inicio de sesion correcto");
    }

    onResolved({
      usuario: usuarioCompleto,
      token,
    });
  } catch (error: any) {
    console.log("Error login:", error?.response?.data || error);

    const mensaje =
      error?.response?.data?.mensaje ||
      error?.response?.data?.detalle ||
      error?.message ||
      "No se pudo iniciar sesion";

    onError(mensaje);
  } finally {
    setLoading(false);
  }
};
