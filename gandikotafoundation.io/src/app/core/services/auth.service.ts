import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(data:any){
    return this.http.post(`${environment.baseUrl}/login`,data)
  }
  homebannerget(){
    return this.http.get(`${environment.baseUrl}/admin/home-banner`)
  }
  createbanner(data:any){
    return this.http.post(`${environment.baseUrl}/admin/home-banner`,data)
  }
  getSingleBanner(id:any){
    return this.http.get(`${environment.baseUrl}/admin/home-banner/`+id)
  }
  updatebanner(id:any,data:any){
    return this.http.put(`${environment.baseUrl}/admin/home-banner/`+id,data)
  }
  deleteBannerById(id:any){
    return this.http.delete(`${environment.baseUrl}/admin/home-banner/`+id)
  }
}
