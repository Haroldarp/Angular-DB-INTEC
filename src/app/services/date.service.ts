import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DateService{


    getDayIndex(date:Date):any{
        var dayNumber = date.getDay();
        return dayNumber == 0? 6:dayNumber-1;
        
    }

    getDateAddDays(day:number, week:number):any{
        var startDate = new Date("2020-7-6");
        var date = new Date();

        var dayNumber = this.getDayIndex(startDate);

        if(week == 1 && day == dayNumber)
            return startDate.toDateString();


        if(week == 1 && day < dayNumber){
            dayNumber = dayNumber - day ;
            date = new Date(startDate.setDate(startDate.getDate() - dayNumber));


        }else{
            dayNumber = (7 - dayNumber)+(7*(week-2))+day;
            date = new Date(startDate.setDate(startDate.getDate() + dayNumber));

        }

        // return date.toDateString();
        return `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
        
        
    }

    getDayDifference(){

        var date1:any = new Date();
        var date2:any =  new Date("2020-07-01");
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))


        return diffDays;
    }

}