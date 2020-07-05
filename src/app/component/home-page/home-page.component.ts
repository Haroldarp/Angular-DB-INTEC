import { Component, OnInit } from '@angular/core';
import {PeticionesService} from '../../services/peticiones.service';
import {Store} from '@ngrx/store';
import {userState} from '../../store/index';
import * as userActions from '../../store/user-state.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [PeticionesService]

})
export class HomePageComponent implements OnInit {

  constructor(
    private _peticionesService:PeticionesService,
    private store:Store<userState>
  ) { }

  ngOnInit(): void {

    this.store.dispatch(userActions.loadUser());

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
