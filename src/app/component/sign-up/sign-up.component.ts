import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ComfirmPassword} from '../../validators/sing-up.validator';
import {PeticionesService} from '../../services/peticiones.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [PeticionesService]
})
export class SignUpComponent implements OnInit {

  public form:any;
  public errorMessage: string;
  public noValido: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _peticionesService: PeticionesService
  ) {
    this.form = formBuilder.group({
      username: new FormControl('',{validators: Validators.required}),
      password: new FormControl('',{validators: Validators.required ,updateOn: "blur"}),
      comfirmPassword: new FormControl('',{validators: Validators.required ,updateOn: "blur" })
    },{validators:ComfirmPassword });
   }

  ngOnInit(): void {
    this.noValido = false;
    this.errorMessage = "";
  }

  onSumit(){

    const {username , password, comfirmPassword} = this.form.value;

    if(this.form.valid){
        this.registrarUsuario(username, password);
    }

  }


  registrarUsuario(username, pass){
    this._peticionesService.registerUser(username, pass).subscribe(
      result =>{
        if(result.Ok){
          this._router.navigate([`/login`]);

        }else{
          this.errorMessage = "Esta Matricula ya esta registrada en la App";
          this.noValido = true;

        }

      },
      error =>{
        console.log(error);
      }
    )
  }

}
