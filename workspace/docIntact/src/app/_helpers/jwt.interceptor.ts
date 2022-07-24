import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service'
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: { 
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let ip=JSON.parse(localStorage.getItem('myip')); // set ipAddress to every request
        let location=JSON.parse(localStorage.getItem('mylocation'));// set ipAddress to every request
        if (currentUser && currentUser.token && (location || ip)) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`,
                    IpAddress:(ip)?ip.ip :location.ip
                }
            });
        }
        else if( currentUser && currentUser.token && !location && !ip) {
            let  data=localStorage.getItem('ipaddress')
            let ipadress=this.userService.decryptData(data)
            if(ipadress)
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`,
                    IpAddress:ipadress
                }
            });
            else
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`,
                }
            });
        }
        else if(!currentUser  && (location || ip)){
         
            request = request.clone({
                setHeaders: { 
                    IpAddress:(ip)?ip.ip :location.ip

                }
            });
            
        }
        return next.handle(request);
    }
}
