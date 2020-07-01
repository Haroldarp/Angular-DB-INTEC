import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public building:string;

  public courses:Array<string>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params:Params)=>{
      this.building = params.building;
    });

    this.courses = ['FD301','HR302','GC215','FD105','HR303','GC115','FD205','HR311'];

  }

  onClick(event:any){
    this._router.navigate([`home/reserva/${event.currentTarget.id}`]);
  }

}
