import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from '../_models';
import { environment } from 'src/environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators'; 

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  // private errorHandler(error: HttpErrorResponse){
  //   return Observable.throwError(error.message || 'Server Message')
  // }
  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log('api serv client-side', error.error.message)
    } else {
      console.log('api serv else server-side', error.status)
    }
    return throwError(error);
  }
  
  getUsers(): Observable<User[]>{
    return this.http.get<any>(environment.host + environment.getAllUsers).pipe( map(res => res.data as User[]) );
  }

  getUserById(id: number) {
    return this.http.get(environment.host + environment.getUser + id);
  }

  addUser(data: User): Observable<User>{
    return this.http.post<User>(environment.host + environment.addUser, data, httpOption)
      .pipe(map(res=>res),catchError(this.handleError))
      // .catchError(this.errorHandler);
  }

  updateUser(data: User): Observable<User>{
    return this.http.put<User>(environment.host + environment.getUser + data.id, data, httpOption);
  }

  deleteUser(id: string): Observable<User>{
    return this.http.delete<User>(environment.host + environment.getUser + id);
  }
}
