import { Component, OnInit } from '@angular/core';
import {PeticionesService} from '../../services/peticiones.service';
import {Store, select} from '@ngrx/store';
import {userState, selectAll} from '../../store/index';
import * as userActions from '../../store/user-state.actions';
import { UserInfo } from '../../models/userInfo';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [PeticionesService]

})
export class HomePageComponent implements OnInit {

  state:any;

  constructor(
    private _peticionesService:PeticionesService,
    private store:Store<userState>
  ) { }

  ngOnInit(): void {

    this.store.dispatch(userActions.loadUser());
    this.store.dispatch(userActions.loadReservations());

    this.store.pipe(select(selectAll)).subscribe(state =>{
      this.state = state;
    })
    
    console.log(this.state);
    

    // this._peticionesService.getUser().subscribe(
    //   result =>{
    //     console.log(result);
    //   },
    //   error =>{
    //     console.log(error);
    //   }
    // )
  }

}
