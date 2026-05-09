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

export type CalendarioPagoItem = {
  numeroPago: number;
  fechaPago: string | Date;
  fechaPagoTexto?: string;
  monto: number;
  estado: "pendiente" | "pagado" | "vencido";
  usuariosPagaron?: string[];
  usuariosPendientes?: string[];
};

export type TurnoCobroItem = {
  numeroTurno: number;
  usuarioId: string | IntegranteItem;
  nombre?: string;
  correo?: string;
  imagen?: string;
  fechaCobro: string | Date;
  fechaCobroTexto?: string;
  montoARecibir: number;
  estado: "pendiente" | "entregado";
  fechaEntrega?: string | Date | null;
};

export type TandaItem = {
  _id: string;
  nombre: string;
  pago: number;
  montoPago?: number;
  participantes: number;
  turno?:number,
  fecha?: string;
  fechaInicio?: string;
  frecuencia?: string;
  descripcion?: string;
  codigoInvitacion?: string;
  imagen?: string;
  public_id?: string;
  estado?: boolean;
  estadoTexto?: string;
  pagoRealizados?: number;
  creador?: string;
  calendarioPagos?: CalendarioPagoItem[];
  claveInterbancaria?: string;
  nombreBeneficiario?: string;
  banco?: string;
  conceptoPago?: string;
  integrantes?: string[] | IntegranteItem[];
  turnosCobro?: TurnoCobroItem[];
  turnos?: TurnoItem[];
  turnoUsuario?: number | null;
  fechaTurnoUsuario?: string;
  estadoPagoTurno?: "pendiente" | "pagado";
  montoRecibir?: number;
};
