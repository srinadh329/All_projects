import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthardservicesService } from '../services/authardservices.service'
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private Authguardservice: AuthardservicesService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')
    if (token) {
      return true
    }

    this.router.navigateByUrl("/");
    return false;
  }
}
