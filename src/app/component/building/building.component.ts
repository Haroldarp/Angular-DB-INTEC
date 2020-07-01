import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  public edificios:Array<string>;
  public cursos:Array<string>;
  public data:Array<string>;
  public title:string;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.title = 'Edificos';
    this.edificios = ['FD','HR','GC','FD','HR','GC','FD','HR','GC','FD','HR','GC'];
    this.data = [];

  }

  onClick(event:any){

    console.log(event.target.id);
    this._router.navigate([`home/curso/${event.currentTarget.id}`]);
  }

  cargarEdificio(){
    var index = 0;
    var timer = setInterval(()=>{
      if(index < this.edificios.length){
        this.data.push(this.edificios[index]);
        index++;
      }else{
        clearInterval(timer);
      }

    },30);
  }

}
