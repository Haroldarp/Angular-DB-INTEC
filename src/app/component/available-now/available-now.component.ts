import { Component, OnInit } from '@angular/core';
import {Building} from '../../models/building';
import {PeticionesService} from '../../services/peticiones.service';
import {DateService} from '../../services/date.service';

@Component({
  selector: 'app-available-now',
  templateUrl: './available-now.component.html',
  styleUrls: ['./available-now.component.css'],
  providers: [PeticionesService, DateService]
})
export class AvailableNowComponent implements OnInit {

  public buildings:Array<Building>;


  constructor(
    private _peticionesService: PeticionesService,
    private _dateService: DateService
  ) { }

  ngOnInit(): void {
    this.buildings = [];

    this.loadCourses();
    console.log(this.buildings);
  }


  loadCourses(){
    var hour = this._dateService.getCurrentHour();
    var week = this._dateService.getCurrentWeek(); 
    var day = this._dateService.getCurrentDay(); 

    this._peticionesService.getCursoDisponible(hour,week,day).subscribe(
      result =>{
        result[1].forEach(element => {
          this.buildings.push({Nombre: element.edificio.Nombre, Edificio: element.edificio.Edificio,
          courses: element.cursos})
        });
      },
      error =>{
        console.log(error);
      }
    )
  }

}
