import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class AppGuardService implements CanActivate, CanActivateChild {

    constructor(private appService: AppService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.appService.isTokenExpired()) {
            // this.appService.userNavigate()
            return true;
        } else {
            this.router.navigate([''], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.appService.isTokenExpired()) {

            const user = this.appService.getUserdetails();
            const urlCheck = state.url.includes('?');
            if (urlCheck) {

                const index = state.url.indexOf('?');
                if (index > 0) {
                    state.url = state.url.substring(0, index);
                }
            }

            switch (state.url) {
                case '/admin':
                    if (user.roltyp !== 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;


                case '/store':
                    if (user.roltyp === 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;


                default:

            }
            return true;
        }
        else {
            this.appService.logout();
            this.router.navigate([''], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}

