import API from "@/servers/Axios";

/* =========================
   TIPOS
========================= */

export type TipoUsuario = "crear" | "unirse";
export type RolUsuario = "admin" | "usuario" | null;

/* =========================
   CREAR USUARIO
========================= */

export const crearUsuario = async (data: any) => {
  const response = await API.post("/User/NuevoUser", data);
  return response.data;
};

export const loginUsuario = async (correo: string, password: string) => {
  const response = await API.post("/User/login", {
    correo,
    password,
  });

  return response.data;
};

export const loginSocialUsuario = async (data: {
  nombre: string;
  correo: string;
  fotoPerfil?: string;
  proveedorAuth: "google" | "facebook";
  facebookId?: string;
}) => {
  const response = await API.post("/User/auth/social", data);
  return response.data;
};

export const actualizarRolUsuario = async (rol: "admin" | "user" | "usuario") => {
  const response = await API.put("/User/rol", { rol });
  return response.data;
};

export const obtenerPerfilUsuario = async (id: string) => {
  const response = await API.get(`/User/perfil/${id}`);
  return response.data;
};

export const obtenerUsuarioActual = async () => {
  const response = await API.get("/User/me");
  return response.data;
};

/* =========================
   OBTENER TODOS
========================= */

export const obtenerUsuarios = async () => {
  const response = await API.get("/User");
  return response.data;
};

/* =========================
   OBTENER POR ID
========================= */

export const obtenerUsuarioPorId = async (id: string) => {
  const response = await API.get(`/User/${id}`);
  return response.data;
};

/* =========================
   ACTUALIZAR
========================= */

export const actualizarUsuario = async (
  id: string,
  formData: FormData
) => {
  const response = await API.put(`/User/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const actualizarCorreoUsuario = async (id: string, correo: string) => {
  const response = await API.put(`/User/perfil/${id}/correo`, {
    correo,
  });

  return response.data;
};

export const actualizarPasswordUsuario = async (
  id: string,
  payload: {
    passwordActual: string;
    nuevaPassword: string;
    confirmarPassword: string;
  }
) => {
  const response = await API.put(`/User/perfil/${id}/password`, payload);
  return response.data;
};

/* =========================
   ELIMINAR
========================= */

export const eliminarUsuario = async (id: string) => {
  const response = await API.delete(`/User/delete/${id}`);
  return response.data;
};
