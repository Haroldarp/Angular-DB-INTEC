import {Reservation} from "./reservation";

export interface UserInfo{
    id:Number;
    name:string;
    matricula:string;
    limitHoursDay: string;
    userReservations: Reservation[];
}