import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.css']
})
export class CoursesViewComponent implements OnInit {

  public building:string;
  public courses:Array<string>;

  constructor(
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params:Params)=>{
      this.building = params.building;
    });

    this.courses = ['FD301','HR302','GC215','FD105','HR303','GC115','FD205','HR311'];
  }

}
