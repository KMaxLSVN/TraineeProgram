import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
// export class FormComponent implements OnInit {

//   name = new FormControl('');

//   constructor() { }

//   ngOnInit() {
//   }

// }
export class LoginComponent  implements OnInit  {

  constructor( 
    public service: AuthenticationService,
    public router: Router,
    ) {
    if (this.service.currentUserValue){
      this.router.navigate(['']);
    }
   }

  ngOnInit() {
   
  }

  email = new FormControl('');
  password = new FormControl('');
  
}


