import { obtenerRolDesdeTipo, TipoUsuario } from "./conectUser";
import { crearUsuario } from "./userapi";
import { prewarmApi } from "@/servers/Axios";

type RegistroParams = {
  nombre: string;
  edad: string;
  correo: string;
  usuario: string;
  password: string;
  tipoUsuario: TipoUsuario;
};

type RegistroDeps = {
  setLoading: (value: boolean) => void;
  limpiarFormulario: () => void;
  onSuccess: (payload?: any) => void;
  onError: (mensaje: string) => void;
};

export const registrarUsuario = async (
  datos: RegistroParams,
  deps: RegistroDeps
) => {
  const { nombre, edad, correo, usuario, password, tipoUsuario } = datos;

  const { setLoading, limpiarFormulario, onSuccess, onError } = deps;

  try {
    if (!nombre || !edad || !correo || !usuario || !password) {
      onError("Completa todos los campos");
      return;
    }

    if (!tipoUsuario) {
      onError("Selecciona una opcion");
      return;
    }

    setLoading(true);
    await prewarmApi().catch(() => null);

    const respuesta = await crearUsuario({
      nombre: nombre.trim(),
      edad: edad.trim(),
      correo: correo.trim().toLowerCase(),
      usuario: usuario.trim(),
      password,
      tipoUsuario,
      rol: obtenerRolDesdeTipo(tipoUsuario),
    });

    limpiarFormulario();
    onSuccess(respuesta);
  } catch (error: any) {
    console.log("Error al registrar usuario:", error?.response?.data || error);
    const mensaje =
      error?.response?.data?.mensaje ||
      error?.response?.data?.detalle ||
      error?.message ||
      "No se pudo registrar";
    onError(mensaje);
  } finally {
    setLoading(false);
  }
};
