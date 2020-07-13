import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DateService{


    getDayIndex(date:Date):any{
        var dayNumber = date.getDay();
        return dayNumber == 0? 6:dayNumber-1;
        
    }

    getDateAddDays(day:number, week:number):any{
        var startDate = new Date("2020-7-1");
        var date = new Date();

        var dayNumber = this.getDayIndex(startDate);

        if(week == 1 && day == dayNumber)
            return `${startDate.getUTCFullYear()}-${startDate.getUTCMonth()+1}-${startDate.getUTCDate()}`;


        if(week == 1 && day < dayNumber){
            dayNumber = dayNumber - day ;
            date = new Date(startDate.setDate(startDate.getDate() - dayNumber));


        }else{
            dayNumber = (7 - dayNumber)+(7*(week-2))+day;
            date = new Date(startDate.setDate(startDate.getDate() + dayNumber));

        }

        return `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
        
        
    }

    datePassed(date:string, hour:number){
        var now = new Date();
        var seleactedTime = new Date(date);
        seleactedTime.setHours(hour);

        if(seleactedTime < now)
            return true;
        
        return false;

    }

    getCurrentWeek():number{

        var startDate:any = new Date("2020-7-1");
        var now:any = new Date();
        const timeDiff = Math.abs(startDate - now);
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

        var week = Math.ceil(((daysDiff - (7-this.getDayIndex(startDate)) )/7)+1);

        return week;
    }

    getDayString(index:number){
        switch (index) {
            case 0:
                return 'Lunes';

            case 1:
                return 'Martes';

            case 2:
                return 'Miercoles';

            case 3:
                return 'Jueves';

            case 4:
                return 'Viernes';

            case 5:
                return 'Sabado';

            case 6:
                return 'Domingo';
                
        
            default:
                break;
        }

    }

}