import { Alert } from "react-native";
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
  onSuccess: () => void;
};

export const registrarUsuario = async (
  datos: RegistroParams,
  deps: RegistroDeps
) => {
  const { nombre, edad, correo, usuario, password, tipoUsuario } = datos;

  const { setLoading, limpiarFormulario, onSuccess } = deps;

  try {
    if (!nombre || !edad || !correo || !usuario || !password) {
      Alert.alert("Aviso", "Completa todos los campos");
      return;
    }

    if (!tipoUsuario) {
      Alert.alert("Aviso", "Selecciona una opcion");
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

    Alert.alert("Exito", respuesta.mensaje || "Usuario registrado");

    limpiarFormulario();
    onSuccess();
  } catch (error: any) {
    console.log(error);
    const mensaje =
      error?.response?.data?.mensaje ||
      error?.message ||
      "No se pudo registrar";
    Alert.alert("Error", mensaje);
  } finally {
    setLoading(false);
  }
};
