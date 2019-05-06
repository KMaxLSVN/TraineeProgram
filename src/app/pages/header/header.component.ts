import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../_models/users';
import { AuthenticationService } from '../../_services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  _service: AuthenticationService;

  constructor(
    public router: Router,
    public service: AuthenticationService
  ) {    
    this._service = service;
    this.service.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

}
