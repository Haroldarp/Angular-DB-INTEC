import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Building} from '../../models/building';
import {PeticionesService} from '../../services/peticiones.service';


@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
  providers: [PeticionesService]

})
export class BuildingComponent implements OnInit {

  public title:string;
  public buildings:Array<Building>;
  // public data:Array<string>;

  constructor(
    private _router: Router,
    private _peticionesSevice: PeticionesService
  ) { }

  ngOnInit(): void {
    this.title = 'Edificos';

    this._peticionesSevice.getEdificios().subscribe(
      result =>{
        console.log(result[0].Ok);
        if(result[0].Ok){
          this.buildings = result[1];
        }else{
          this.buildings = [];
        }
      },
      error=>{
        console.log(error);
      }
    )
    // [
    //   {code :'FD'},
    //   {code:'DP'},
    //   {code : 'GC'},
    //   {code: 'EL'},
    //   {code: 'AJ'},
    //   {code: 'AH'},
    //   {code: 'ER'},
    //   {code: 'PB'},
    //   {code: 'EP'}];
    // this.data = [];

  }

  onClick(event:any){

    console.log(event.currentTarget.id);
    var ids = event.currentTarget.id.split("-");
    console.log(ids);
    this._router.navigate([`home/curso/${ids[1]}/${ids[0]}`]);
  }

  // cargarEdificio(){
  //   var index = 0;
  //   var timer = setInterval(()=>{
  //     if(index < this.edificios.length){
  //       this.data.push(this.edificios[index]);
  //       index++;
  //     }else{
  //       clearInterval(timer);
  //     }

  //   },30);
  // }

}
