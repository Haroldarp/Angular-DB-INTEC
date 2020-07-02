import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() building:string;
  @Input() courses:Array<string>;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {

  }

  onClick(event:any){
    this._router.navigate([`home/reserva/${event.currentTarget.id}`]);
  }

}
