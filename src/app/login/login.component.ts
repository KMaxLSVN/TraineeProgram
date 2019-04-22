import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})

export class LoginComponent  implements OnInit  {

  loginForm: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,

    private service: AuthenticationService,
    private router: Router,
    ) {
    if (this.service.currentUserValue){
      this.router.navigate(['/']);
    }
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,
                  Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]
    ],
      password: ['',[Validators.required,
                    Validators.minLength(3)]
    ],
    })
  }

  get f() {
    return this.loginForm.controls;
  }
  
  login(){
    console.log(this.service.login(this.f.email.value, this.f.password.value));
    this.service.login(this.f.email.value, this.f.password.value);
  }

  onSubmit(){
    console.log(this.loginForm);
    if (this.loginForm.invalid){
      return;
    } else {
      this.login();
    }
  }

}


