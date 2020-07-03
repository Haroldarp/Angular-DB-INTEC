import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ComfirmPassword} from '../../validators/sing-up.validator'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public form:any;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.form = formBuilder.group({
      username: new FormControl('',{validators: Validators.required}),
      password: new FormControl('',{validators: Validators.required ,updateOn: "blur"}),
      comfirmPassword: new FormControl('',{validators: Validators.required ,updateOn: "blur" })
    },{validators:ComfirmPassword });
   }

  ngOnInit(): void {
    
  }

  onSumit(){
    if(this.form.valid){
      this._router.navigate([`/login`]);

    }else{
      console.log('no valido');
    }
  }

}
