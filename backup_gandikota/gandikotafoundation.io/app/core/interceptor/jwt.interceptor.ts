import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: { 
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                timezoneoffset: String(new Date().getTimezoneOffset())
            }
        });
        // add authorization header with jwt token if available
        let token =localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: { 
                    'x-auth-token': token,
                }
            });
        }
     
        
        return next
            .handle(request)
            .pipe(
                tap((ev: HttpEvent<any>) => {
                    if (ev instanceof HttpResponse) {
                        // request response Logic here
                        console.log('processing response', ev);
                    }
                })
            )
    }
}
