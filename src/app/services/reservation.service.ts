import {Injectable} from '@angular/core';
import {Reservation} from '../models/reservation';
import { UserInfo } from '../models/userInfo';

@Injectable({providedIn: 'root'})
export class ReservationService{

    constructor(
    ){}


    private verify(userReservations:Reservation[] , userReservationGroup:Reservation[], 
        reservation:Reservation, code:string):any{

        var intervalCode;

        var date = code.split("/")[0];
        var hour = Number.parseInt( code.split("/")[1]);

        if(date != reservation.date)
            return {ok:false, errorMessage:'Las horas de la reservacion deben pertenece al mismo dia'};

        if(reservation.counterHours >= 5)
            return {ok:false, errorMessage:'Se llego al limite de horas a reservar en una sola reserva'};

            
        if(this.busyHourByReservation(userReservations,date,hour)){
            return {ok:false, errorMessage:'Tienes una reserva a esta hora, por favor verifica'};

        }else if(this.busyHourByReservation(userReservationGroup,date,hour)){
            return {ok:false, errorMessage:'Estas incluido en un grupo para esta hora, por favor verifica'};

        
        }else if(reservation.counterHours == 0){
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

    addInterval(userReservations:Reservation[] , userReservationGroup:Reservation[], 
        reservation:Reservation, code:string):any{
        
        var verify = this.verify(userReservations,userReservationGroup, reservation,code);

        if(verify.ok){
            
            var hour = Number.parseInt( code.split("/")[1]);
    
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

    removeInterval(reservation:Reservation, code:string):any{
    
        var hour = Number.parseInt( code.split("/")[1]);
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

    transformEntity(reservation:any):Reservation[]{
        var prop = Object.getOwnPropertyNames(reservation);
        let userReservations:Reservation[] = [];
        prop.forEach(item =>{
         userReservations.push( {id: reservation[item].id, date: reservation[item].date,
        iniTime: reservation[item].iniTime , endTime: reservation[item].endTime});
        })

        return userReservations;
    }



    getDayIndex(dateString:string):number{

        var date = new Date(dateString);
        var dayNumber = date.getDay();
        return dayNumber == 0? 6:dayNumber-1;

    }

    busyHourByReservation(userReservations:Reservation[], date:string, hour:number):boolean{
        if(userReservations.filter(reservation => reservation.date == date && 
            (reservation.iniTime <= hour && reservation.endTime > hour)).length != 0)
            return true;

        return false;
    }
    
}