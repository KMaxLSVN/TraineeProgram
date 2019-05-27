import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, ApiService, AuthService } from '../../shared/_services';
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

    private api: ApiService,
    private auth: AuthService,
    ) {
    if (this.service.currentUserValue){
      this.router.navigate(['/books']);
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
  
  onSubmit(){
    if (this.loginForm.invalid){
      return;
    } else {      
      this.service.login(this.f.email.value, this.f.password.value);      
      this.auth.login('admin@shop.com', 'password').subscribe(data => {
        console.log(data)
      }, error => {
        console.log(error);
      }
      )

      // this.api.getUsers().subscribe(res => console.log('DB API',res));
    }
    return console.log(this.loginForm);
  }

}


