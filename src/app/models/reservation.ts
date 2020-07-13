export interface Reservation{

    id?:number;
    idReservationGroup?: number; 
    idReservation?: number; 
    idReservante?: number; 
    limit?:number;
    building?:string;
    course?: string;
    idCourse?: number;
    counterHours?:number;
    day?:number;
    week?:number;
    date?:string;
    iniTime:number;
    endTime:number;
    group?: string[];

}