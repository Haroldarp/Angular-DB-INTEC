import { Component, OnInit } from '@angular/core';
import {PeticionesService} from '../../services/peticiones.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [PeticionesService]

})
export class HomePageComponent implements OnInit {

  constructor(
    private _peticionesService:PeticionesService
  ) { }

  ngOnInit(): void {
    this._peticionesService.getUser().subscribe(
      result =>{
        console.log(result);
      },
      error =>{
        console.log(error);
      }
    )
  }

}
