import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../shared/_services';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
      private auth: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const authToken = this.auth.getAuthToken();
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
    console.log(authToken);
    console.log(this.auth.isAuthenticated());
    return next.handle(authReq);
  }

}