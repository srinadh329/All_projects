import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AppService } from './../app.service';

@Injectable()
export class StoreGuardService implements CanActivate, CanActivateChild {

    constructor(private appService: AppService,  private router: Router) { }

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
                case '/store/arabia':
                    if (user.roltyp === 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/store/foreignexchange':
                    if (user.roltyp === 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/store/nationalbond':
                    if (user.roltyp === 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/store/instantdraft':
                    if (user.roltyp === 'ADMIN') {

                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/store/telegraphtransfer':
                    if (user.roltyp === 'ADMIN') {

                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/store/dubaipolice':
                    if (user.roltyp === 'ADMIN') {

                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/store/westernunion':
                    if (user.roltyp === 'ADMIN') {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                    break;

                case '/store/instantcash':
                    if (user.roltyp === 'ADMIN') {
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
        } else {
            this.appService.logout();
            this.router.navigate([''], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }

}
