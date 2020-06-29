import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  edificios:Array<string>;

  constructor() { }

  ngOnInit(): void {
    this.edificios = ['FD','HR','GC','FD','HR','GC'];
  }

}
