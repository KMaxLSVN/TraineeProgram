import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { Book } from '../_models/book';
import { ToastrService } from 'ngx-toastr';

const BOOK_KEY = 'booksBase';

@Injectable({
    providedIn: 'root',
})
export class BookSevice {

    private booksSubject: BehaviorSubject<Book[]>;
    public bookList: Observable<Book[]>;
    public books: Book[];

    constructor(
        private toastr: ToastrService,
    ){
        this.booksSubject = new BehaviorSubject<Book[]>(JSON.parse(localStorage.getItem(BOOK_KEY,)));
        this.bookList = this.booksSubject.asObservable();
    }

    private saveToLocalStorage(items: Book[]){
        localStorage.setItem(BOOK_KEY, JSON.stringify(items));
        this.booksSubject.next(items);
    }    

    createBook(item: Book): Book[] {
        let books = this.readBooks();
        books.push(item);
        this.saveToLocalStorage(books);
        return books;
    }

    readBooks(): Book[] {
        // return JSON.parse(localStorage.getItem(BOOK_KEY)) || [];
       this.books = JSON.parse(localStorage.getItem(BOOK_KEY)) || [];
       return [...this.books];
    }

    updateBook(item: Book): Book[]{
        let books: Book[] = this.readBooks();
        for(let i=0; i<=books.length; i++){
            if(item.id == books[i].id){
                this.toastr.info(`${books[i].title} title name was change on ${item.title}`);
                books[i].title = item.title;
                this.saveToLocalStorage(books)
                break;
            }
        }
        return books;
    }

    deleteBook(item: Book): Observable<Book[]> {
        let books = this.readBooks();
        for(let i=0; i<=this.books.length; i++){
            if( item.id == this.books[i].id ) {
                books.splice(i, 1);
                this.toastr.info(`${item.title} is removed`);
                this.saveToLocalStorage(books);
                break;
            }
        }
        return of(books);
    }

    readBooksById(key: number){
        return this.readBooks().find((item: Book) => {
            if(item.id === key){
                return true;
            }
        })
    }

addBook(item: Book): Observable<Book[]> {
        let books: Book[] = this.readBooks();
        if(books.length === 0) {
            books = this.createBook(item);
            this.toastr.success("The first book was add!", "Congratulation!");
        } else {
            let isBookExist = this.readBooksById(item.id);
            if(isBookExist){
                this.toastr.warning('Book with this id is already exist');
                return;
            }
            books = this.createBook(item);
            this.toastr.success('Need more books!');
        }
        return of(books);
    }
    
}