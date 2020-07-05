import { Component, OnInit} from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeticionesService]
})
export class HomeComponent implements OnInit {

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
