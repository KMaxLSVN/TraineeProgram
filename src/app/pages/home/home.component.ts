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

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { 
  }

  ngOnInit() {
    const token = this.auth.getDecodedAuthToken();
    if(!token.exp){
      this.auth.logout();
      this.router.navigate(['/login']);
    }
  }

}
