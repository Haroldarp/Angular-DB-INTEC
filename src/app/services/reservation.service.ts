import {Injectable} from '@angular/core';
import {Reservation} from '../models/reservation';

@Injectable()
export class ReservationService{

    

    constructor(
    ){}


    private verify(reservations:Array<Reservation>, code:string, currentDate:string):any{

        var intervalCode;

        var date = code.split("-")[0];
        var reservation = reservations[this.getDayIndex(currentDate)];
        var hour = Number.parseInt( code.split("-")[1]);

        if(date != currentDate)
            return {ok:false, errorMessage:'Las horas de la reservacion deben pertenece al mismo dia'};

        if(reservation.counterHours >= reservation.limit)
            return {ok:false, errorMessage:'Se llego al limite de horas reservadas en este dia'};

            
        if(reservation.counterHours == 0){
            intervalCode = 0;

        }else if(reservation.counterHours > 0){

            if((hour + 1) == reservation.iniTime){
                intervalCode = 1;

            }else if(hour == reservation.endTime){
                intervalCode = 2;

            }else{
                return {ok:false, errorMessage:'Las horas reservadas deben ser consecutivas'};
            }
        }
        
        return {ok:true, intervalCode: intervalCode};
    }

    addInterval(reservations:Array<Reservation>, code:string, currentDay:string):any{
        
        var verify = this.verify(reservations,code,currentDay);

        if(verify.ok){
            
            var reservation = reservations[this.getDayIndex(currentDay)];
            var hour = Number.parseInt( code.split("-")[1]);
    
            if(verify.intervalCode == 0){
                reservation.iniTime =  hour;
                reservation.endTime =  hour+1;
                reservation.counterHours++;

            }else if(verify.intervalCode == 1){
                    reservation.iniTime--;
                    reservation.counterHours++;

            }else if(verify.intervalCode == 2){
                    reservation.endTime++;
                    reservation.counterHours++;
            }

            return {ok: verify.ok};

        }else{
            return verify;
        }
    }

    removeInterval(reservations:Array<Reservation>, code:string, currentDay:string):any{
    
        var reservation = reservations[this.getDayIndex(currentDay)];
        var hour = Number.parseInt( code.split("-")[1]);
        var removeCode;

        if(reservation.counterHours == 1){
            reservation.iniTime = null;
            reservation.endTime = null;
            reservation.counterHours--;
            removeCode = 0

        }
        else if(reservation.iniTime == hour){
            reservation.iniTime++;
            reservation.counterHours--;
            removeCode = 0;

        }else if(reservation.endTime == hour+1){
            reservation.endTime--;
            reservation.counterHours--;
            removeCode = 0;

        }else{
            reservation.counterHours = hour - reservation.iniTime;
            reservation.endTime = hour;
            removeCode = 1;
        }

        return {removeCode: removeCode, hour: hour}
    }

    getDayIndex(dateString:string):number{

        var date = new Date(dateString);
        var dayNumber = date.getDay();
        return dayNumber == 0? 6:dayNumber-1;

    }
}