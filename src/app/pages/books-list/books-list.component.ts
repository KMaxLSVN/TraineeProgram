import { Component, OnInit } from '@angular/core';

import { AuthenticationService, BookSevice } from '../../shared/_services';
import { Book } from 'src/app/shared/_models';


@Component({
    selector: 'app-books-list',
    templateUrl: './books-list.component.html',
    styleUrls: ['./books-list.component.scss']
  })
  export class BooksListComponent implements OnInit {

    public isAdmin: boolean;
    public book: Book[];
    public items: any;

    constructor(

      private authService: AuthenticationService,
      private bookService: BookSevice,

    ) {
      this.isAdmin = this.authService.isAdmin;

      this.book = this.bookService.readBooks();
      this.items = this.book;
      console.log(this.book);
    }
  
    ngOnInit() {
    }
  
  }