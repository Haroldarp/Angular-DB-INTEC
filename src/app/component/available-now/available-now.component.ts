import { Component, OnInit } from '@angular/core';
import {Building} from '../../models/building';

@Component({
  selector: 'app-available-now',
  templateUrl: './available-now.component.html',
  styleUrls: ['./available-now.component.css']
})
export class AvailableNowComponent implements OnInit {

  public buildings:Array<Building>;


  constructor() { }

  ngOnInit(): void {
    this.buildings = [
      new Building("blablabla","FD"),
      new Building("blablabla","FD"),
      new Building("blablabla","DP")
    ];

    this.buildings[0].courses.push('FD301','HR302','GC215','FD105');
    this.buildings[1].courses.push('HR303','GC115','FD205','HR311');
    this.buildings[2].courses.push('FD301','HR302','GC215','FD105');

    console.log(this.buildings);
  }

}
