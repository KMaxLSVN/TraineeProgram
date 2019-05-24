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
    // const authToken = this.auth.getAuthToken();
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHNob3AuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTU4NzA3MjcwLCJleHAiOjE1NTg3MTA4NzB9.qfqaBYd4qhUvdUK2Pd0f5zwqo9LWO1_ZZ0U3uxnupLM';
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
    return next.handle(authReq);
  }

}