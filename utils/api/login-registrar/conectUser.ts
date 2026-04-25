export type TipoUsuario = "crear" | "unirse" | null;

type RegistroData = {
  nombre: string;
  edad: string;
  correo: string;
  usuario: string;
  password: string;
  tipoUsuario: TipoUsuario;
};

export const obtenerRolDesdeTipo = (tipoUsuario: TipoUsuario) => {
  if (tipoUsuario === "crear") return "admin";
  if (tipoUsuario === "unirse") return "usuario";
  return "";
};

export const crearFormDataRegistro = ({
  nombre,
  edad,
  correo,
  usuario,
  password,
  tipoUsuario,
}: RegistroData) => {
  const formData = new FormData();

  formData.append("nombre", nombre);
  formData.append("edad", edad);
  formData.append("correo", correo);
  formData.append("usuario", usuario);
  formData.append("password", password);
  formData.append("tipoUsuario", tipoUsuario || "");
  formData.append("rol", obtenerRolDesdeTipo(tipoUsuario));

  return formData;
};