export interface Reservation{

    id?:number;
    limit?:number;
    building?:string;
    course?: string;
    counterHours?:number;
    day?:number;
    week?:number;
    date?:string;
    iniTime:number;
    endTime:number;
    group?: string[];

    // constructor(day:string, limit:number, counterHours:number){
    //     this.day = day;
    //     this.limit = limit;
    //     this.counterHours = counterHours;
    //     this.intervals = {iniTime: null, endTime: null};
    // }
}