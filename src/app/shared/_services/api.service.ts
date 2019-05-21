import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getUsers(){
    return this.http.get(environment.host);
  }

  addUser(user: User): Observable<User>{
    return this.http.post<User>(environment.host + environment.add, user, httpOption);
  }
}
