import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginuser: UserService, private route: Router ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.loginuser.getAdminLoggedIn()) {
        this.route.navigate(['/']);
        console.log('you are not logged in');
        return this.loginuser.getAdminLoggedIn();
      }
      else return this.loginuser.getAdminLoggedIn();
    }
  
}
