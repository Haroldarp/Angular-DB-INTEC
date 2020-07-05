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
        console.log("va una");
        this.url = "https://reqres.in/";
    }

    getUser():Observable<UserInfo>{
        let userInfo:UserInfo = {id: 1, limitHoursDay: 2, matricula: '1088464', name: 'Harold',
        userReservations: [{iniTime: 7, endTime: 10},{iniTime: 11, endTime: 14,},{iniTime: 15, endTime: 20,}]}
        
        return  of(userInfo);

        // return this._http.get<UserInfo>(this.url+"api/users/2");
    }

    getGroups():Observable<Reservation[]>{
        let userInfo:Reservation[] = [{iniTime: 7,endTime: 10}];
        
        return  of(userInfo);

        // return this._http.get<UserInfo>(this.url+"api/users/2");
    }

}