import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FrontEndConfig } from '../frontendconfig';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private http: HttpClient, private frontendconfig: FrontEndConfig) { }
  
  serverurl = this.frontendconfig.getserverurl();


  addOtp(data) {
    return this.http.post(this.serverurl + '/api/links/otp/', data);
  }
}
