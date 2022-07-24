import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private storage:StorageService) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =  this.storage.getAccessToken();
    if (token) {
        const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        
        const AuthRequest = request.clone( { headers: headers});
        return next.handle(AuthRequest);
    } else {
        return next.handle(request);
    }
  }
}
