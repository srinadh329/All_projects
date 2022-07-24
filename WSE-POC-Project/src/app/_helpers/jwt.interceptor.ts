import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private appService : AppService){
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        request = request.clone({
            setHeaders: {
                'Cache-Control': 'no-cache'
            }
        });
        let currentUser = JSON.parse(this.appService.getLocalStoarge('auth.user'))
        if (currentUser && currentUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser}`
                }

            });
        }

        return next.handle(request);
    }
}
