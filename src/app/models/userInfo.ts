import {Reservation} from "./reservation";

export interface UserInfo{
    id:Number;
    name:string;
    matricula:string;
    limitHoursDay: number;
    userReservations: Reservation[];
    userGroups?: Reservation[];
}