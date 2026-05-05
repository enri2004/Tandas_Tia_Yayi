import { guardarSesion } from "./authStorage";
import { loginUsuario } from "./userapi";
import {
  registrarDispositivoParaPush,
  sincronizarPushTokenConBackend,
} from "@/utils/api/notificaciones/pushNotifications";
import { prewarmApi } from "@/servers/Axios";

type LoginParams = {
  correo: string;
  password: string;
};

type LoginDeps = {
  setLoading: (value: boolean) => void;
  onAdmin: () => void;
  onUsuario: () => void;
  onError: (mensaje: string) => void;
  onSuccess?: (mensaje: string) => void;
};

export const iniciarSesionUsuario = async (
  datos: LoginParams,
  deps: LoginDeps
) => {
  const { correo, password } = datos;
  const { setLoading, onAdmin, onUsuario, onError, onSuccess } = deps;

  try {
    if (!correo.trim() || !password.trim()) {
      onError("Completa correo/usuario y contrasena");
      return;
    }

    setLoading(true);
    await prewarmApi().catch(() => null);

    const respuesta = await loginUsuario(correo.trim(), password);
    console.log("[Push] Login exitoso, usuario:", respuesta?.usuario?.id);

    await guardarSesion({
      token: respuesta.token,
      usuario: respuesta.usuario,
    });
    console.log("[Push] JWT guardado localmente:", Boolean(respuesta?.token));

    try {
      await registrarDispositivoParaPush();
      await sincronizarPushTokenConBackend(respuesta.token);
    } catch (pushError) {
      console.log(
        "No se pudo sincronizar el token push despues del login",
        pushError
      );
    }

    if (onSuccess) {
      onSuccess(respuesta.mensaje || "Inicio de sesion correcto");
    }

    if (respuesta.usuario.rol === "admin") {
      onAdmin();
    } else {
      onUsuario();
    }
  } catch (error: any) {
    console.log(error);

    const mensaje =
      error?.response?.data?.mensaje || error?.message || "No se pudo iniciar sesion";

    onError(mensaje);
  } finally {
    setLoading(false);
  }
};
