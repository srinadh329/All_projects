import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from './../environments/environment';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class AppService {
    user: any;
    isUserLoggedIn: any;
    token: any;
    apiURL = environment.apiURL;
    role: any;
    userdetails: any;
    constructor(private http: HttpClient, private router: Router) {

    }

    /******************************* Local Storage ***************************************** */

    setLocalStoarge(key: string, val: string) {
        window.localStorage.setItem(key, val);
    }

    getLocalStoarge(key: string) {
        return window.localStorage.getItem(key);
    }

    removeLocalStoarge(key: string) {
        return window.localStorage.removeItem(key);
    }

    /********************************** User Service ***************************************/

    getUser() {
        const authUser = this.getLocalStoarge('auth.user');
        this.user = JSON.parse(authUser);
        return this.user;
    }

    getUserdetails() {
        const User = this.getLocalStoarge('user');
        this.userdetails = JSON.parse(User);
        return this.userdetails;
    }
    GetProducts(branchid) {
        return this.http.get(this.apiURL + '/api/masterdata/getproductsforbranch/' + branchid);
    }
    getrole() {
        const User = this.getLocalStoarge('user');
        this.userdetails = JSON.parse(User);
        if (this.userdetails) {
            const role = this.userdetails.roltyp;
            return role;
        }

    }
    getbranch() {
        const User = this.getLocalStoarge('user');
        this.userdetails = JSON.parse(User);
        if (this.userdetails) {
            const branchid = this.userdetails.brnid;
            return branchid;
        }

    }
    Login(LoginData) {
        return this.http.post(this.apiURL + '/auth/local/', LoginData);
    }

    logout() {
window.localStorage.clear();
this.router.navigate(['/']);
    }



    userNavigate() {
        const user = this.getrole();
        if (user === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']); } else {
            this.router.navigate(['/store/dashboard']); }

        }


    getToken(): string {
        const authUser = this.getUser();
        if (authUser) { return authUser; }
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
        if (decoded.exp === undefined) { return null; }
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) { token = this.getToken(); }
        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) { return false; }
        return !(date.valueOf() > new Date().valueOf());
    }



}
