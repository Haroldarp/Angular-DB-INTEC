import {Injectable} from '@angular/core';
import {Reservation} from '../models/reservation';

@Injectable()
export class ReservationService{

    constructor(){}


    private verify(reservations:Array<Reservation>, code:string, currentDay:number):any{

        var intervalCode;

        var dayIndex = this.getDayIndex(code);
        var reservation = reservations[currentDay];
        var hour = Number.parseInt( code.split("-")[1]);

        if(dayIndex != currentDay)
            return {ok:false, errorMessage:'Las horas de la reservacion deben pertenece al mismo dia'};

        if(reservation.counterHours >= reservation.limit)
            return {ok:false, errorMessage:'Se llego al limite de horas reservadas en este dia'};

            
        if(reservation.counterHours == 0){
            intervalCode = 0;

        }else if(reservation.counterHours > 0){

            if((hour + 1) == reservation.intervals.iniTime){
                intervalCode = 1;

            }else if(hour == reservation.intervals.endTime){
                intervalCode = 2;

            }else{
                return {ok:false, errorMessage:'Las horas reservadas deben ser consecutivas'};
            }
        }
        
        return {ok:true, intervalCode: intervalCode};
    }

    addInterval(reservations:Array<Reservation>, code:string, currentDay:number):any{
        
        var verify = this.verify(reservations,code,currentDay);

        if(verify.ok){
            
            var reservation = reservations[currentDay];
            var hour = Number.parseInt( code.split("-")[1]);
    
            if(verify.intervalCode == 0){
                reservation.intervals.iniTime =  hour;
                reservation.intervals.endTime =  hour+1;
                reservation.counterHours++;

            }else if(verify.intervalCode == 1){
                    reservation.intervals.iniTime--;
                    reservation.counterHours++;

            }else if(verify.intervalCode == 2){
                    reservation.intervals.endTime++;
                    reservation.counterHours++;
            }

            return {ok: verify.ok};

        }else{
            return verify;
        }
    }

    removeInterval(reservations:Array<Reservation>, code:string, currentDay:number):any{
    
        var reservation = reservations[currentDay];
        var hour = Number.parseInt( code.split("-")[1]);
        var removeCode;

        if(reservation.counterHours == 1){
            reservation.intervals.iniTime = null;
            reservation.intervals.endTime = null;
            reservation.counterHours--;
            removeCode = 0

        }
        else if(reservation.intervals.iniTime == hour){
            reservation.intervals.iniTime++;
            reservation.counterHours--;
            removeCode = 0;

        }else if(reservation.intervals.endTime == hour+1){
            reservation.intervals.endTime--;
            reservation.counterHours--;
            removeCode = 0;

        }else{
            reservation.counterHours = hour - reservation.intervals.iniTime;
            reservation.intervals.endTime = hour;
            removeCode = 1;
        }

        return {removeCode: removeCode, hour: hour}
    }

    getDayIndex(code:string):number{

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