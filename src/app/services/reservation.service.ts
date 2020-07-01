import {Injectable} from '@angular/core';
import {Reservation} from '../models/reservation';

@Injectable()
export class ReservationService{

    constructor(){}


    verify(reservations:Array<Reservation>, code:string, courrentWeek:number):any{

        if(this.getIndex(code) != courrentWeek)
            return {ok:false, errorMessage:'Las horas de la reservacion deben pertenece al mismo dia'};
        
    }

    getIndex(code:string):number{

        var split = code.split("-");

        switch (split[0]) {
            case "Lunes":
                return 0;
                
            case "Martes":
                return 1;

            case "Miercoles":
                return 2;

            case "Jueves":
                return 3;

            case "Viernes":
                return 4;

            case "Sabado":
                return 5;
            
            case "Domingo":
                return 6;
        
            default:
                break;
        }

    }
}