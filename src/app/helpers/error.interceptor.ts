import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service'


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private userService: UserService,private dataService:MessageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.userService.logout(err.error.message);
                var type = { type: 'disconnect' }
                this.dataService.Connectsocket(type).subscribe(socket => { });                      //to disconnect the socket during logout
            }
            if (err.status === 403) {
                // auto logout if 401 response returned from api
                this.userService.logout("Your Account Is Blocked,Please Contact Admin");
                var type = { type: 'disconnect' }
                 this.dataService.Connectsocket(type).subscribe(socket => { });                      //to disconnect the socket during logout
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }    

}