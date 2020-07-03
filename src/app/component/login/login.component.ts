import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserValidator} from '../../validators/login.validator'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form:any;
  public validUser:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router
    ) {

    this.form = formBuilder.group({
      username: new FormControl('',{validators: Validators.required}),
      password: new FormControl('',{validators: Validators.required})
    },{validators: UserValidator});

  }

  ngOnInit(): void {
    this.validUser=true;
    console.log(this.form.errors);
    console.log(this.form.get('password').value);
    console.log(this.form.get('username').value);
  }

  onSumit(){
    if(this.form.valid){
      this._router.navigate([`home/edificios`]);

   }else if(this.form.errors?.validUser){
      this.validUser = false;
      console.log('no valido');
    }
  }

}
