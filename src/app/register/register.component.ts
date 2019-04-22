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
        firstName: ['', [Validators.required,
                        Validators.pattern("^[A-za-z0-9_-]{2,15}$")]
      ],
        lastName: ['', [Validators.required,
                        Validators.pattern("^[a-z0-9_-]{2,15}$")]
      ],
        email: ['', [Validators.required,
                    // Validators.email,]
                    Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]
      ],
        password: ['', [Validators.required,
                        Validators.minLength(3)]
      ]
      })
    }

    get f() { 
      return this.registerForm.controls
    }

    getErrorMessage(inputType, pattern){
      return inputType.hasError('required') ? 'You must enter a value' : inputType.hasError(pattern) ? 'Not a valid value' : '';
    }

    onSubmit() {
        console.log(this.registerForm);
        this.userService.register(this.registerForm.value);

        this.router.navigate(['/login']);
    }
  
  }