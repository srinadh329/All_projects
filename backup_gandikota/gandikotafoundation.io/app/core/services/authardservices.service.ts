import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthardservicesService {

  constructor(private http:HttpClient) { }

  login(data){
    return this.http.post(`${environment.baseUrl}/login`,data)
  }
  home(){
    return this.http.get(`${environment.baseUrl}/admin/home-banner`)
  }
  homebannerdata(data){
    return this.http.post(`${environment.baseUrl}/admin/home-banner`,data)
  }

  getSingleBanner(id) {
    return this.http.get(`${environment.baseUrl}/admin/home-banner/`+id)
  }
  updateBanner(id,data){
    return this.http.put(`${environment.baseUrl}/admin/home-banner/`+id,data)
  }
  deleteBanner(id) {
    return this.http.delete(`${environment.baseUrl}/admin/home-banner/`+id)
  }
  homeevent(){
    return this.http.get(`${environment.baseUrl}/admin/home-events`)
  }
  homeventcontent(data){
    return this.http.post(`${environment.baseUrl}/admin/home-events`,data)
  }
  homeeventupdate(id){
    return this.http.get(`${environment.baseUrl}/admin/home-events/`+id)
  }
}
