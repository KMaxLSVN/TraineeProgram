import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../_models';

import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser = new Subject<any>();

  currentUser$ = this.currentUser.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

   getAuthToken(): string{
    return (JSON.parse(localStorage.getItem('currentUserAPI')) || {}).token;
  }

  isAuthenticated(): boolean {
    const status = this.getAuthToken();
    // return (status !== null);
    return !!status;
  }

  isAdmin(): boolean{
    return this.getDecodedAuthToken().isAdmin;
  }

  currentEmail(){
    // return this.getDecodedAuthToken().email;
    // return this.currentUser.next(this.getDecodedAuthToken().email);
    let email = this.getDecodedAuthToken().email;
    this.currentUser.next(email);
    return email;
  }

  getDecodedAuthToken(){
    try{
      return jwt_decode(this.getAuthToken());
    }
    catch{
      return false;
    }
  }

  login(email: string, password: string){
    return this.http.post(environment.host + environment.auth, {email, password}, {withCredentials: true})
      .pipe( map((data: any) => {
        if(data && data.token){
          localStorage.setItem('currentUserAPI', JSON.stringify(data));
          this.currentEmail();
          return true;
        }
      }) );
  }

  logout(){
    localStorage.removeItem('currentUserAPI');
    this.currentUser.next();
  }

  getSession(){
    return this.http.get(environment.host + 'session',{withCredentials: true});
  }

}
