import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Building} from '../../models/building'

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  public title:string;
  public buildings:Array<Building>;
  // public data:Array<string>;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.title = 'Edificos';
    this.buildings = [
      {code :'FD'},
      {code:'DP'},
      {code : 'GC'},
      {code: 'EL'},
      {code: 'AJ'},
      {code: 'AH'},
      {code: 'ER'},
      {code: 'PB'},
      {code: 'EP'}];
    // this.data = [];

  }

  onClick(event:any){

    console.log(event.target.id);
    this._router.navigate([`home/curso/${event.currentTarget.id}`]);
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
