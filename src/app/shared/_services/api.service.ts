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

  login(data: User){
    return this.http.post(environment.host + environment.auth, data);
  }

  

  getUsers(): Observable<User>{
    return this.http.get<User>(environment.host + environment.getAllUsers);
  }

  getUserById(id: string) {
    return this.http.get(environment.host + environment.getUser + id);
  }

  addUser(data: User): Observable<User>{
    return this.http.post<User>(environment.host + environment.addUser, data, httpOption);
  }

  updateUser(data: User): Observable<User>{
    return this.http.put<User>(environment.host + environment.getUser + data.id, data, httpOption);
  }

  deleteUser(id: string): Observable<User>{
    return this.http.delete<User>(environment.host + environment.getUser + id);
  }
}
