import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router:Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {
           if(error.status ===401){
               // define Logic here
               localStorage.removeItem('currentUser');
               this.router.navigate(['/'])
           }
            return throwError(error);
        }))
    }
}

