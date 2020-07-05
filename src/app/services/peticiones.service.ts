import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PeticionesService{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        console.log("va una");
        this.url = "https://reqres.in/";
    }

    getUser():Observable<any>{
        return this._http.get(this.url+"api/users/2");
    }

}