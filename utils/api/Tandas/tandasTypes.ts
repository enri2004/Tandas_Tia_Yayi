export type IntegranteItem = {
  _id: string;
  nombre: string;
  correo?: string;
  imagen?: string;
};

export type TurnoItem = {
  usuario: string | IntegranteItem;
  nombre?: string;
  correo?: string;
  imagen?: string;
  orden: number;
  fechaProgramada: string;
  estadoPago: "pendiente" | "pagado";
};

export type TandaItem = {
  _id: string;
  nombre: string;
  pago: number;
  participantes: number;
  turno?:number,
  fecha?: string;
  frecuencia?: string;
  descripcion?: string;
  codigoInvitacion?: string;
  imagen?: string;
  public_id?: string;
  estado?: boolean;
  estadoTexto?: string;
  pagoRealizados?: number;
  creador?: string;
  integrantes?: string[] | IntegranteItem[];
  turnos?: TurnoItem[];
  turnoUsuario?: number | null;
  fechaTurnoUsuario?: string;
  estadoPagoTurno?: "pendiente" | "pagado";
  montoRecibir?: number;
};
