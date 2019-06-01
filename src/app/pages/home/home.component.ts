import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // For environment prod
  linear: any;
  isLinear: any;

  isAuthenticated: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this. isAuthenticated = this.auth.isAuthenticated();
  }

  ngOnInit() {
    // const token = this.auth.getAuthToken();
    // if(token.exp){

    //   this.auth.logout();
    //   this.router.navigate(['/login']);
    // }

    
  }

  trigger(status: boolean): void {
    if(status){
      this.router.navigate(['/cart'])
    } else {
      this.router.navigate(['/login'])
    }
  }

}
