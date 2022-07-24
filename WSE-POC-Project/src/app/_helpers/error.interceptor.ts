import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw'
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public router: Router) {    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

              if (err.status === 401) {
                var userToken={'token':null}
                localStorage.setItem('auth.user',JSON.stringify(userToken))
                this.router.navigate(['**']);
            }
            const error = err.error || err.statusText;

            return _throw(error);
        }))
    }
}


// ???

