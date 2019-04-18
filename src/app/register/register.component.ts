import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthenticationService } from '../_services/';
import { UserService } from '../_services';
import { User } from '../_models/';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })
  export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    model: User = <User>{};
  
    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private service: AuthenticationService,
      private userService: UserService,
    ){
      if (this.service.currentUserValue) { 
        this.router.navigate(['/']);
    }
     }
  
    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.minLength(3)]
      })
    }

    get f() {
      return this.registerForm.controls
    }

    onSubmit() {
        this.userService.register(this.registerForm.value)
    }
  
  }