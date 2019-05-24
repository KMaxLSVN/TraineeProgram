import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
  
  getUsers(): Observable<User[]>{
    return this.http.get<any>(environment.host + environment.getAllUsers).pipe( map(res => res.data as User[]) );
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
