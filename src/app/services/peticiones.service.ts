import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable, of} from 'rxjs';
import {UserInfo} from '../models/userInfo'
import { Reservation } from '../models/reservation';

@Injectable({providedIn: 'root'})
export class PeticionesService{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = "https://reqres.in/";
    }

    getUser():Observable<UserInfo>{
        let userInfo:UserInfo = {id: 10, minPeople: 2, matricula: '1088464', name: 'Harold'}
        
        return  of(userInfo);
    }

    getReservations():Observable<Reservation[]>{
        let userReservations:Reservation[] =  [{id:1, date: '2020-7-10', iniTime: 7, endTime: 10},
            {id:2,date: '2020-7-7', iniTime: 11, endTime: 14,},
            {id:3, date: '2020-7-6', iniTime: 15, endTime: 20,}];
        
        return  of(userReservations);

    }

    getGroups():Observable<Reservation[]>{
        let userGroups:Reservation[] =  [{id:1, date: '2020-7-10', iniTime: 12, endTime: 2},
            {id:2,date: '2020-7-9', iniTime: 11, endTime: 14,},
            {id:3, date: '2020-7-12', iniTime: 15, endTime: 20,}];
        
        return  of(userGroups);

    }

}