import {Reservation} from "./reservation";

export class UserInfo{
    id:Number;
    name:string;
    matricula:string;
    limitHoursDay: number;
    userReservations: Reservation[];
    userGroups?: Reservation[];
}