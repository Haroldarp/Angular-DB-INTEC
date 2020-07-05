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
      {name:"blablabla", code: "FD", courses: ['FD301','HR302','GC215','FD105']},
      {name:"blablabla", code: "FD", courses:['HR303','GC115','FD205','HR311'] },
      {name:"blablabla", code: "DP", courses:['FD301','HR302','GC215','FD105'] },
    ];

    console.log(this.buildings);
  }

}
