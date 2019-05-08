import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

import { AuthenticationService } from '../../shared/_services';
import { UserService } from '../../shared/_services';
import { User } from '../../shared/_models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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

  @Output() onChangeUserBase: EventEmitter<{}> = new EventEmitter();

  registerForm: FormGroup;

  model: User = <User>{};
  
  constructor(

    private router: Router,
    private formBuilder: FormBuilder,

    private service: AuthenticationService,
    private userService: UserService,

    // public dialogRef: MatDialogRef<RegisterComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    
  ){
    if (this.service.currentUserValue) { 
      this.router.navigate(['/books']);
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
      userName: [ null, Validators.pattern("^[a-z0-9_-]{2,15}$")
      ],
      email: ['', [Validators.required,
                  // Validators.email,]
                  Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]
      ],
      password: ['', [Validators.required,
                      Validators.minLength(3)]
      ]
    })

    this.title = this.setTypeForm(this.state).title;
    this.btnName = this.setTypeForm(this.state).btnName;      
      
  }

  get f() { 
    return this.registerForm.controls;
  }

  public onSubmit() {
    console.log(this.registerForm);
    if (this.registerForm.invalid){
      return;
    }
    this.setTypeForm(this.state).confirm();
    this.onPostForm();
    this.onChangeUserBase.emit(this.registerForm.value);
  }

  public setTypeForm(stateType: string){
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
          confirm: () => {
            this.editUser();
          }
        };
      default:
        return {
          title: 'Registeration',
          btnName: 'Register',
          confirm: () => {
            this.addUser();
          }
        };
    }
  }

  // public onCancel(): void {
  //   this.dialogRef.close();
  // }

  private addUser(ifRedirect: boolean = true): void {
    let data = this.userService.register(this.registerForm.value);
    if(ifRedirect){
      this.router.navigate(['/login']);
    } else {
      // this.dialogRef.close(data);
    }
  }

  private editUser(){
    console.log('edit');
  }

  private onPostForm(){
    this.postForm.emit({
      state: this.state,
      data: this.registerForm.value
    })
  }
  
}