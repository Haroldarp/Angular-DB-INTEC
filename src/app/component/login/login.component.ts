import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form:any;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSumit(){
    console.log(this.form.value);
  }

}
