import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/_services';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
  })
  export class BooksComponent implements OnInit {
    public isAdmin: boolean;

    constructor(
      private authService: AuthenticationService,
    ) {
      this.isAdmin = this.authService.isAdmin;
    }
  
    ngOnInit() {
    }
  
  }