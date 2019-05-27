import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { finalize, tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(
      private toastr: ToastrService
      ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;

    return next.handle(req)
      .pipe(
        tap(
          event => {
            // ok = event instanceof HttpResponse ? 'succeeded' : '';
            if(event instanceof HttpResponse){
              if(event.body && event.body.success){
                this.toastr.success(event.body.message , "Dev test", {timeOut: 10000});
              }
            }
        },
        // finalize(() => {
        //   const elapsed = Date.now() - started;
        //   const msg = `${req.method} "${req.urlWithParams}"
        //      ${ok} in ${elapsed} ms.`;
        //   this.toastr.show(msg,'', {timeOut: 10000});
        // })
        )
      );
  }
}
