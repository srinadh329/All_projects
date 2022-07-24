import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginuser: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
      if(!this.loginuser.getClientLoggedIn()) {
        this.router.navigate(['/']);
        console.log('you are not logged in');
        return this.loginuser.getClientLoggedIn();
      }
      else
      return this.loginuser.getClientLoggedIn();
  }
  
}
