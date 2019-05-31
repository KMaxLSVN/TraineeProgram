import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService, BookSevice, CartService, AuthService, BooksService } from '../../shared/_services';
import { Book, User } from 'src/app/shared/_models';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-books-list',
    templateUrl: './books-list.component.html',
    styleUrls: ['./books-list.component.scss']
  })
  export class BooksListComponent implements OnInit {

    public isAdmin: boolean;
    public isAuthenticated: boolean;
    public items: Book[];
    public currentUser: User;

    public inputValue: string = '';

    constructor(

      private authService: AuthenticationService,
      private bookService: BookSevice,

      private booksService: BooksService,
      private cartService: CartService,

      private router: Router,
      private toastr: ToastrService,

      private auth: AuthService,

    ) {
      this.isAdmin = this.auth.isAdmin();
      this.isAuthenticated = this.auth.isAuthenticated();
      // Dinamic Render Books List
      // this.bookService.bookList.subscribe( result => {
      //   this.items = result;
      // });
      this.booksService.getBooks('1').subscribe(res => {
        this.items = res;
      })

      // this.currentUser = this.auth.currentEmail();
      // this.authService.currentUser.subscribe(response => this.currentUser = response);


    }
  
    ngOnInit() {
    }

    // @IsCurrentUser({
    //   ifState: this.cartService.addItem,
    //   elseState()  {
    //     this.toastr.info('You should to log in at first');
    //     this.router.navigate(['/login']);
    //   }
    // })
    
    onClickCart(elem){
      if(this.isAuthenticated){
        this.cartService.addItem(elem);
      } else {
        this.toastr.info('You should to log in at first');
        this.router.navigate(['/login']);
      }
    }

    deleteItem(elem: Book){
      // this.bookService.deleteBook(elem).subscribe(response => this.items = response);
      this.booksService.deleteBook(elem.bookCode).subscribe(res => {
        console.log(res, this.items);
        const newData = this.items.filter(el => el.bookCode != elem.bookCode);
        this.items = newData;
      })
    }

    doSomeThing(result){
      console.log(result);
      this.inputValue= result;
    }
  
  }