export type ApiResponse<T> = {
  ok: boolean;
  mensaje: string;
} & T;

export type Usuario = {
  id: string;
  nombre: string;
  edad?: number | null;
  correo: string;
  usuario: string;
  tipoUsuario?: string;
  rol?: "admin" | "usuario";
  imagen?: string;
  telefono?: string;
  direccion?: string;
  ultimoAcceso?: string;
  totalAmigos?: number;
  totalSolicitudesEnviadas?: number;
  totalSolicitudesRecibidas?: number;
};

export type Amigo = Usuario & {
  totalAmigos?: number;
};

export type SolicitudAmistad = Usuario;

export type UsuarioBusqueda = Usuario & {
  esAmigo: boolean;
  solicitudEnviada: boolean;
  solicitudRecibida: boolean;
};

export type PerfilResponse = ApiResponse<{
  perfil: Usuario;
}>;

export type BuscarUsuariosResponse = ApiResponse<{
  usuarios: UsuarioBusqueda[];
}>;

export type SolicitudesResponse = ApiResponse<{
  solicitudes: SolicitudAmistad[];
}>;

export type AmigosResponse = ApiResponse<{
  amigos: Amigo[];
}>;

export type PerfilAmigoResponse = ApiResponse<{
  amigo: Amigo;
}>;
