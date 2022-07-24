import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PremiumauthGuard implements CanActivate {
  constructor(private loginser: UserService, private route: Router ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.loginser.getPremiumUserLoggedIn())
      {
        this.route.navigate(['/']);
        console.log('You are not loged in');
        return this.loginser.getPremiumUserLoggedIn();
      }
      else 
      return this.loginser.getPremiumUserLoggedIn();     
    }
}
