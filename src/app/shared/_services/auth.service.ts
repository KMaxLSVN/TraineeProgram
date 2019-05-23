import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  getAuthToken(): string{
    return (JSON.parse(localStorage.getItem('currentUserAPI')) || {}).token;
  }

  isAuthenticated(): boolean {
    const status = this.getAuthToken();
    return (status !== null);
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
    return this.http.post(environment.host + environment.auth, {email, password})
      .pipe( map((data: any) => {
        if(data && data.token){
          localStorage.setItem('currentUserAPI', JSON.stringify(data));
          return true;
        }
      }) )
  }

  logout(){
    localStorage.removeItem('currentUserAPI');
  }

}
