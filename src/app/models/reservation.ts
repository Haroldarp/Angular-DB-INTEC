export class Reservation{
    
    public day:string;
    public limit:number;
    public counterHours:number;
    public intervals:interval;

    constructor(day:string, limit:number, counterHours:number){
        this.day = day;
        this.limit = limit;
        this.counterHours = counterHours;
        this.intervals = {iniTime: null, endTime: null};
    }
}

interface interval{
    iniTime:number;
    endTime:number;
}