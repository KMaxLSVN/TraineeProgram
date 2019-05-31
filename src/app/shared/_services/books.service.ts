import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Book } from '../_models';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
}

@Injectable({
    providedIn: 'root'
  })

export class BooksService {

    constructor(
        private http: HttpClient,
    ) { }

    getBooks(page: string): Observable<Book[]>{
        return this.http.get<any>(environment.host + environment.books + page).pipe( map(res => res.data as Book[]) );
    }

    getBooksByCode(bookCode: string, page: string): Observable<Book>{
        return this.http.get<any>(environment.host + environment.books + page +'/'+bookCode).pipe( map(res => res.data as Book) );
    }

    addBook(data: Book): Observable<Book>{
        return this.http.post<any>(environment.host + environment.books, data, httpOption).pipe(map(res => res.data as Book));
    }

    updataBook(data: Book): Observable<Book>{
        return this.http.put<Book>(environment.host + environment.books + data.bookCode, data, httpOption);
    }

    deleteBook(bookCode: string): Observable<Book>{
        return this.http.delete<Book>(environment.host + environment.books + bookCode);
    }

    searchBook(q: string): Observable<Book>{
        return this.http.get<Book>(environment.host + environment.books + '1/search/' + q);
    }
}