import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

import { AuthenticationService } from '../_services/';
import { UserService } from '../_services';
import { User } from '../_models/';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })
  export class RegisterComponent implements OnInit {

    @Input() title = 'Registration';
    @Input() btnName: string = 'Register';
    @Input() state: string = 'registration';

    @Output() postForm: EventEmitter<any> = new EventEmitter;


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

      this.title = this.setName(this.state).title;
      this.btnName = this.setName(this.state).btnName;
      
        
      
    }

    get f() { 
      return this.registerForm.controls
    }

    onSubmit() {
        console.log(this.registerForm);
        if (this.registerForm.invalid){
          return;
        }
        this.setName(this.state).confirm();
        this.onPostForm();
    }

    setName(stateType){
      switch(stateType){
        case 'add':
          return {
            title: 'Add User',
            btnName: 'Add',
            confirm: () => {
              console.log(this);
              this.addUser(false);
            }
          };
        case 'edit':
          return {
            title: 'Edit User',
            btnName: 'Edit',
            confirm: this.editUser
          };
        default:
         return {
           title: 'Registeration',
           btnName: 'Register',
           confirm: this.addUser
          };
      }
    }

    private addUser(ifRedirect: boolean = true){
      this.userService.register(this.registerForm.value);
      if(ifRedirect){
        this.router.navigate(['/login']);
      }
    }

    private editUser(){
      console.log('edit');
    }

    private onPostForm(){
      this.postForm.emit({
        state: this.state
      })
    }
  
  }