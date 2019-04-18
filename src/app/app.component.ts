import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './_models/users';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  currentUser: User;
  _service: AuthenticationService;

  constructor(
    public router: Router,
    public service: AuthenticationService
    ){
    this._service = service;
    this.service.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }
  
}
