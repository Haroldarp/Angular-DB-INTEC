import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Building} from '../../models/building'



@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() building:Building;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {

  }

  onClick(event:any){
    var ids = event.currentTarget.id.split("-");
    this._router.navigate([`home/reserva/${ids[1]}/${ids[0]}`]);
  }

}
