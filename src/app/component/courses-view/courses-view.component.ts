import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Building} from '../../models/building';
import {PeticionesService} from '../../services/peticiones.service';


@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.css'],
  providers: [PeticionesService]
})
export class CoursesViewComponent implements OnInit {

  public building:Building;

  constructor(
    private _route: ActivatedRoute,
    private _peticionesService: PeticionesService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params:Params)=>{
      this.building = {idEdificio: params.idBuilding , Edificio: params.name};
    });


    this._peticionesService.getCursos(this.building.idEdificio).subscribe(
      result =>{
        console.log(result[0].Ok);
        if(result[0].Ok){
          this.building.courses = result[1];
        }else{
          this.building.courses = undefined;
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

}
