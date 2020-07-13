import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {userState} from '../../store/index';
import {PeticionesService} from '../../services/peticiones.service';
import * as userActions from '../../store/user-state.actions';
import { UserInfo } from 'src/app/models/userInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [PeticionesService]
})
export class LoginComponent implements OnInit {

  public form:any;
  public validUser:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _peticionesSevice: PeticionesService,
    private store:Store<userState>

    ) {

    this.form = formBuilder.group({
      username: new FormControl('',{validators: Validators.required}),
      password: new FormControl('',{validators: Validators.required})
    });

  }

  ngOnInit(): void {
    this.validUser=true;
    console.log(this.form.errors);
    console.log(this.form.get('password').value);
    console.log(this.form.get('username').value);
  }

  onSumit(){

    const {username , password} = this.form.value;
    console.log(username);
    console.log(password);

    if(this.form.valid){
      this._peticionesSevice.login( username ,password).subscribe(
        result =>{
          if(result.Ok){
            this._router.navigate([`home/edificios`]);
            this.loadUser(username);

          }else{
            this.validUser = false;
          }
        },
        error =>{
          console.log(error);
        }
      );
    }
  }


  loadUser(username){
    this._peticionesSevice.getUserById(username).subscribe(
      result =>{
        if(result[0].Ok){
          var user:UserInfo = {id:result[1][0].idPersona , Nombre:result[1][0].Nombre}
          localStorage.setItem('id', user.id.toString());

          this.store.dispatch(userActions.loadUserSuccess({user: user}));
        }else{
          console.log(result);
          this.store.dispatch(userActions.loadUserFailure({error: result}));
        }
      },
      error =>{
        console.log(error);
        this.store.dispatch(userActions.loadUserFailure({error: error}));

      }
    )
  }

}
