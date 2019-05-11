import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService, BookSevice, CartService } from '../../shared/_services';
import { Book, User } from 'src/app/shared/_models';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-books-list',
    templateUrl: './books-list.component.html',
    styleUrls: ['./books-list.component.scss']
  })
  export class BooksListComponent implements OnInit {

    public isAdmin: boolean;
    // public book: Book[];
    public items: Book[];
    public currentUser: User;

    constructor(

      private authService: AuthenticationService,
      private bookService: BookSevice,
      private cartService: CartService,

      private router: Router,
      private toastr: ToastrService,

    ) {
      this.isAdmin = this.authService.isAdmin;
      // Dinamic Render Books List
      this.bookService.bookList.subscribe( result => {
        this.items = result;
      })
      console.log(this.items);

      this.authService.currentUser.subscribe(response => this.currentUser = response)
    }
  
    ngOnInit() {
    }

    onClickCart(elem){
      if(this.currentUser){
        this.cartService.addItem(elem);
      } else {
        this.toastr.info('You should to log in at first');
        this.router.navigate(['/login']);
      }
    }

    deleteItem(elem: Book){
      console.log(elem);
      this.bookService.deleteBook(elem).subscribe(response => this.items = response);
    }
  
  }