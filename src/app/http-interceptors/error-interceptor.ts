import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../shared/_services';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
      private toastr: ToastrService,
      private router: Router,
      private auth: AuthService,
      ) {}

      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        return next.handle(req)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage: any = '';
                    // client-side error
                    if(error.error instanceof ErrorEvent) {
                        errorMessage = this.toastr.error(error.message,'',{timeOut: 10000});
                    // server-side error
                    } else {
                        switch (error.status) {
                            case 404:
                                errorMessage = this.toastr.error(error.error.message, `${error.status}`, {timeOut: 10000});
                                // redirect to page not found
                                break;
                            case 401:
                                errorMessage = this.toastr.error(error.error.message, `${error.status}` , {timeOut: 10000});
                                this.auth.logout();
                                this.router.navigate(['/login']);
                                // redirect to login component
                                break;
                            case 400:
                                errorMessage = error.error.message;
                                break;
                            case 500:
                                errorMessage = this.toastr.error(error.error.message, `${error.status}` , {timeOut: 10000});
                                break;
                            default:
                                console.log(error)
                                errorMessage = this.toastr.error(error.error.message, `${error.status}` , {timeOut: 10000});
                                // redirect to page something go wrong
                        }
                    }
                    return throwError(errorMessage);
                    // return Observable.throw(errorMessage);
                })
            )

      }

  
}