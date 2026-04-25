export type AdminResumen = {
  tandasActivas: number;
  tandasFinalizadas: number;
  totalTandas: number;
  totalParticipantes: number;
  pagosPendientes: number;
  pagosCompletos: number;
  comprobantesPorRevisar: number;
  notificacionesSinLeer: number;
  dineroRecaudado: number;
  totalEsperado: number;
};

export type AdminIntegrante = {
  _id: string;
  nombre: string;
  correo?: string;
  imagen?: string;
  turno: number;
};

export type AdminTanda = {
  _id: string;
  nombre: string;
  pago: number;
  participantes: number;
  fecha?: string;
  imagen?: string;
  estado?: boolean;
  estadoTexto?: string;
  pagoRealizados?: number;
  totalIntegrantes: number;
  totalEsperado: number;
  totalRecaudado: number;
  comprobantesPendientes: number;
  comprobantesAprobados: number;
  comprobantesRechazados: number;
  integrantes: AdminIntegrante[];
};

export type AdminActividad = {
  _id: string;
  tipo: string;
  titulo: string;
  descripcion: string;
  createdAt: string;
  tanda?: {
    _id?: string;
    nombre?: string;
  } | null;
  usuario?: {
    _id?: string;
    nombre?: string;
    correo?: string;
  } | null;
  actor?: {
    _id?: string;
    nombre?: string;
    correo?: string;
  } | null;
};

export type AdminDashboardResponse = {
  admin: {
    id: string;
    nombre: string;
    correo: string;
    usuario?: string;
    imagen?: string;
    rol: string;
    tipoUsuario?: string;
  };
  resumen: AdminResumen;
  tandas: AdminTanda[];
  actividadReciente: AdminActividad[];
};

export type CrearTandaPayload = {
  nombre: string;
  pago: number;
  participantes: number;
  fecha: string;
  frecuencia?: string;
  descripcion?: string;
  estado?: boolean;
  pagoRealizados?: number;
  turno?: number;
  creador: string;
  integrantes?: string[];
  imagenUri?: string;
};
