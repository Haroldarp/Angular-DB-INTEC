import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, observable, of} from 'rxjs';
import {UserInfo} from '../models/userInfo'
import { Reservation } from '../models/reservation';
import { Reserva } from '../models/reserva';

@Injectable({providedIn: 'root'})
export class PeticionesService{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = "https://webapireserva.azurewebsites.net/api/";
    }

    // getUser():Observable<UserInfo>{
    //     let userInfo:UserInfo = {id: 10, minPeople: 2, matricula: '1088464', name: 'Harold'}
        
    //     return  of(userInfo);
    // }

    getReservations():Observable<Reservation[]>{
        let userReservations:Reservation[] =  [
            {id:10, building: 'FD', course:"FD312",week: 1,day: 2, date: '2020-7-10', iniTime: 7, endTime: 10},
            {id:2, building: 'FD', course:"FD312",week: 1,day: 2, date: '2020-7-7', iniTime: 11, endTime: 14,},
            {id:3, building: 'HR', course: "FD315",week: 1,day: 2, date: '2020-7-6', iniTime: 15, endTime: 20,},
            {id: 4, building: 'HR', course: "FD315",week: 1 ,day: 2, date:"15-5-2020",iniTime: 11,endTime: 15},];
        
        return  of(userReservations);

    }

    getGroups():Observable<Reservation[]>{
        let userGroups:Reservation[] =  [
            {id:1, building: 'FD', course:"FD312",week: 1,day: 2, date: '2020-7-10', iniTime: 12, endTime: 2},
            {id:2,  building: 'FD', course:"FD312",week: 1,day: 2, date: '2020-7-9', iniTime: 11, endTime: 14,},
            {id:3, building: 'HR', course: "FD315",week: 1,day: 2, date: '2020-7-12', iniTime: 15, endTime: 20,},
            {id:4, building: 'HR', course: "FD315",week: 1,day: 2, date: '2020-7-12', iniTime: 15, endTime: 20,}];
        
        return  of(userGroups);

    }

    deleteReservation(id:string):Observable<any>{
        return of("1");
    }

    deleteGroup(id:string):Observable<any>{
        return of("1");
    }






    //no se va a usar
    getAllUsers():Observable<any>{
        return this._http.get(`${this.url}User/Get`);
    }

    //en uso
    getUserById(userId):Observable<any>{
        return this._http.get(`${this.url}User/GetUsuarioById/${userId}`);
    }

    //en uso
    getHorario(idCurso, idSemana):Observable<any>{
        let params = new HttpParams().set('idCurso', idCurso);

        return this._http.get(`${this.url}Reserva/GetSemana/${idSemana}`, { params });
    }

    getCursoDisponible():Observable<any>{
        let params = new HttpParams()
        .set('idSemana', '1')
        .set('idDia', '1')
        .set('idHora', '8');

        return this._http.get(`${this.url}Edificio/GetCursosDisponibles`, { params });
    }


    registerUser(matricula, pass):Observable<any>{
        let params = JSON.stringify({Matricula: matricula, Pass: pass});

        let headers = new HttpHeaders()
        .set('Content-Type','application/json');

        return this._http.post(`${this.url}User/ValidateUserRegister` , params, {headers: headers} );
    }

    //en uso
    login(matricula, pass):Observable<any>{
        let params = JSON.stringify({Matricula: matricula, Pass: pass});

        let headers = new HttpHeaders()
        .set('Content-Type','application/json');

        return this._http.post(`${this.url}User/ValidateUserLogin` , params, {headers: headers} );
    }

    //en uso
    verifyUserExists(matricula){
        
        let headers = new HttpHeaders()
        .set('Content-Type','application/json');

        return this._http.post(`${this.url}User/VerifyUserExists/${matricula}` , {headers: headers} );
    }

    
    //en uso
    getReservas(idPersona):Observable<any>{
        return this._http.get(`${this.url}Reserva/GetReserva/${idPersona}`);

    }

    //en uso
    getReservaGrupo(idPersona){
        return this._http.get(`${this.url}Reserva/GetReservaGrupo/${idPersona}`);
    }

    getPersonasReserva(){
        return this._http.get(`${this.url}Reserva/GetPersonasByReserva/114`);
    }
    
    //en uso
    getEdificios(){
        return this._http.get(`${this.url}Edificio/GetAll`);
    }
    
    //en uso
    getCursos(idEdificio){
        return this._http.get(`${this.url}Edificio/GetCursos/${idEdificio}`);
    }

    //en uso
    addReserva(reservaInfo:Reservation):Observable<any>{
        let reserva = {
            Reserva: {
                idReservante: 1,
                idCurso: reservaInfo.idCourse,
                idSemana: reservaInfo.week,
                idDia: reservaInfo.day,
                idHoraIn: reservaInfo.iniTime,
                idHoraF: reservaInfo.endTime,
                FechaReserva: `${reservaInfo.date}T12:22:40`
            },
            idPersonas: reservaInfo.group

        }

        let params = JSON.stringify(reserva);

        let headers = new HttpHeaders()
        .set('Content-Type','application/json');

        return this._http.post(`${this.url}Reserva/Add` , params, {headers: headers} );
    }


    //esta en uso
    eliminarReserva(idReserva):Observable<any>{

        let headers = new HttpHeaders()
        .set('Content-Type','application/json');

        return this._http.put(`${this.url}Reserva/EliminarReserva/${idReserva}` , {headers: headers} );
    }

    //esta en uso
    salirGrupo(idGrupoReserva):Observable<any>{
        let json = {
            id: 23,
        }
        let params = JSON.stringify(json);

        let headers = new HttpHeaders()
        .set('Content-Type','application/json');

        return this._http.put(`${this.url}Reserva/SalirGrupoReserva/${idGrupoReserva}` ,{headers: headers} );
    }
}