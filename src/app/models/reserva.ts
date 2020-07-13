export interface Reserva {
    idReserva: number;
    idCurso: number;
    idDias: number;
    idSemana: number;
    idHoraIn: number;
    idHoraF: number;
    FechaReserva: Date;
    idReservante: number;
    FechaRegistro: Date;
    EstadoReserva: boolean;
}