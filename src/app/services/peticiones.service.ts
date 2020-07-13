import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, observable, of} from 'rxjs';
import {UserInfo} from '../models/userInfo'
import { Reservation } from '../models/reservation';

@Injectable({providedIn: 'root'})
export class PeticionesService{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = "https://webapireserva.azurewebsites.net/api/";
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

    //en uso
    getCursoDisponible(idHora, idSemana, idDia):Observable<any>{
        let params = new HttpParams()
        .set('idSemana', idSemana)
        .set('idDia', idDia)
        .set('idHora', idHora);

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
                idReservante: reservaInfo.idReservante,
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

    getCursoEdificio(idCurso):Observable<any>{
        
        return this._http.get(`${this.url}Edificio/GetCursoEdificio/${idCurso}`);
    }

    VerifyPersonaExists(idPersona):Observable<any>{
        
        return this._http.get(`${this.url}Edificio/GetCursoEdificio/${idPersona}`);
    }
}