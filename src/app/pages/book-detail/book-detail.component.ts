import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { BookSevice, CartService, BooksService } from 'src/app/shared/_services';
import { Book } from 'src/app/shared/_models';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  content: any;
}

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss']
  })
  export class BookDetailComponent implements OnInit {    

    private id: number;
    private bookCode: string;
    private subscription: Subscription;

    public book: Book;

    tiles: Tile[];
  
    constructor(
      private activateRouter: ActivatedRoute,
      private bookService: BookSevice,
      private booksService: BooksService,
      private cartService: CartService,
    ) {
      // Route parameters | Dynamic id
      this.subscription = activateRouter.params.subscribe(params => this.bookCode=params['id']);
      // Render Current Book by ID
      // this.book = this.bookService.readBooksById(this.id);
      this.booksService.getBooksByCode(this.bookCode, '1').subscribe(res => {
        console.log(res);
        this.book = res;

        this.tiles = [
          {content: 'BASE64', cols: 3, rows: 4, color: 'lightblue'},
          {content: this.book.title, cols: 2, rows: 1, color: 'lightgreen'},
          {content: this.book.authors, cols: 2, rows: 1, color: 'lightpink'},
          {content: this.book.price, cols: 2, rows: 1, color: '#DDBDF1'},
          {content: this.book.description, cols: 2, rows: 1, color: 'lightyellow'},
        ];
      });

      
    }
  
    ngOnInit() {
    }

    addToCart(){
      this.cartService.addItem(this.book);
    }
  
  }