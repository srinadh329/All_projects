import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './../app.service';

@Injectable()
export class AdminGuardService implements CanActivate {

    constructor(private appService: AppService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.appService.isTokenExpired()) {
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
                case '/admin/branch':
                    if (user.roltyp !== 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin/country':
                    if (user.roltyp !== 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin/currency':
                    if (user.roltyp !== 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin/product':
                    if (user.roltyp !== 'ADMIN') {

                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin/productcountry':
                    if (user.roltyp !== 'ADMIN') {

                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin/reports':
                    if (user.roltyp !== 'ADMIN') {

                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin/goldcard':
                    if (user.roltyp !== 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin/rates':
                    if (user.roltyp !== 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin/charges':
                    if (user.roltyp !== 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin/userroles':
                    if (user.roltyp !== 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin/onilneusers':
                    if (user.roltyp !== 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/admin':
                    if (user.roltyp !== 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;


                default:

            }
            return true;
        } else {
            this.appService.logout();
            this.router.navigate([''], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
