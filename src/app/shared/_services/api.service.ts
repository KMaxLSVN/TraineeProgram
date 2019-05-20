import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';

import { Observable } from 'rxjs';

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

  baseUrl: string = 'http://localhost:3000/users/';

  constructor(

    private http: HttpClient,

  ) { }

  getUsers(){
    return this.http.get(this.baseUrl);
  }

  addUser(user: User): Observable<User>{
    return this.http.post<User>(this.baseUrl, user, httpOption);
  }
}
