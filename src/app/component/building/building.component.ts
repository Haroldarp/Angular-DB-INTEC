import { Component, OnInit} from '@angular/core';

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
  public courses:boolean;

  constructor() { }

  ngOnInit(): void {
    this.courses = false;
    this.title = 'Edificos';
    this.edificios = ['FD','HR','GC','FD','HR','GC','FD','HR','GC','FD','HR','GC'];
    this.data = [];

    this.cargarEdificio();
    console.log(this.data);
  }

  onClick(event:any){

    console.log(event.target.id);
    
    if(!this.courses){
      this.courses = !this.courses;
      this.title = event.target.id;
      //se cargan los cursos de ese edificio

    }else{
      //se carga el horario
    }
  }

  onBack(){
    this.courses = !this.courses;
    this.title = 'Edificos';
    //se cargan los edificios
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
