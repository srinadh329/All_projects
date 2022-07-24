import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FrontEndConfig } from "./frontendConfig"
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})


export class AdminService {

  constructor(private http: HttpClient, private router: Router, private frontendconfig: FrontEndConfig, public CookieService: CookieService) { }


  serverurl = this.frontendconfig.getserverurl();
  getserverurl() {
    return this.serverurl
  }
  updatenewuser(){
    var id=""
    return this.http.put(this.serverurl + '/api/users/updatenewuser/',id)

  }

  saveuser(user)
   {
     
    return this.http.post(this.serverurl + '/api/users/', user)
  }
  activateemail(data) {
    return this.http.post(this.serverurl + '/api/users/emailactivate', data)
  }

  resendConfirmationEmail(data) {
    return this.http.post(this.serverurl + '/api/users/resendEmail', data)
  }
  resedEmailforemp(data) {
    return this.http.post(this.serverurl + '/api/users/resendEmailforemployee', data)
  }
  resendEmailforemployee

  employeelogin(employee) {
    return this.http.post(this.serverurl + '/api/users/employeelogin', employee)
  }

  getProfile() {
    return this.http.get(this.serverurl + '/api/users/me')
  }
  checkStatus(id){
    return this.http.get(this.serverurl+'/api/users/checkstatus/'+id)
  }
activatenewemail(data) {
    return this.http.post(this.serverurl + '/api/users/newemailactivate', data)
  }
  user_folders_files(userid) {
    return this.http.get(this.serverurl + '/api/folders/user_folders_files/' + userid)
  }
  getadminfolderdetails(id)
  {
    return this.http.get(this.serverurl + '/api/folders/adminfolderdetails/' + id)
  }
  logout() {
    var userToken = { 'token': null }
    localStorage.setItem('loggedIn', "false")
    localStorage.setItem('currentUser', JSON.stringify(userToken))
    this.CookieService.delete('token', '/')
    this.router.navigate(['/']);
  }

  getdates = new EventEmitter<any>();
  gettdates = new EventEmitter<any>();
  getdatespick = new EventEmitter<any>();
}
