import { Component, OnInit } from '@angular/core';
import {PeticionesService} from '../../services/peticiones.service';
import {Reserva} from '../../models/reserva';
import {Reservation} from '../../models/reservation';

@Component({
  selector: 'app-probar-peticiones',
  templateUrl: './probar-peticiones.component.html',
  styleUrls: ['./probar-peticiones.component.css'],
  providers: [PeticionesService]
})
export class ProbarPeticionesComponent implements OnInit {

  public reserva:Reserva[];

  constructor(
    private _peticionesSevice: PeticionesService
  ) { }

  ngOnInit(): void {
  }

 
  getAllUsers(){
    this._peticionesSevice.getAllUsers().subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  getAllUserById(){
    this._peticionesSevice.getUserById(1090002).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  getHorario(){
    this._peticionesSevice.getHorario(1,9).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  //no funciona
  getCursoDisponible(){
    this._peticionesSevice.getCursoDisponible(8,1,1).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  registerUser(){
    this._peticionesSevice.registerUser(1090002,'LaPampara').subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  login(){
    this._peticionesSevice.login(1090002,'LaPampara').subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  verifyUserExists(){
    this._peticionesSevice.verifyUserExists(109000).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  
  getReservas(){
    this._peticionesSevice.getReservas(1).subscribe(
      result =>{
        console.log(result[0].Ok);
        if(result[0].Ok){
          this.reserva = result[1];
          console.log(this.reserva);
          console.log(this.reserva[2].idReserva);
        }

      },
      error =>{

      }
    )
  }


  getReservaGrupo(){
    this._peticionesSevice.getReservaGrupo(4).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

 
  getPersonasReserva(){
    this._peticionesSevice.getPersonasReserva().subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  getEdificios(){
    this._peticionesSevice.getEdificios().subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  getCursos(){
    this._peticionesSevice.getCursos(2).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  addReserva(){
    this._peticionesSevice.addReserva({idCourse : 1,
      iniTime: 7, endTime: 9, 
      week:1, day:1, date: "2020-7-9", 
      group: ["1090002","1090001","1090003"]}).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  eliminarReserva(){
    this._peticionesSevice.eliminarReserva(61).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  salirGrupo(){
    this._peticionesSevice.salirGrupo(25).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  getCursoEdificio(){
    this._peticionesSevice.getCursoEdificio(48).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

  VerifyPersonaExists(){
    this._peticionesSevice.getCursoEdificio(1090002).subscribe(
      result =>{
        console.log(result);

      },
      error =>{

      }
    )
  }

}
