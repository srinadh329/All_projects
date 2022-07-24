import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FrontEndConfig } from '../frontendconfig';


@Injectable({
  providedIn: 'root'
})

export class OrganizationsService {
  
  constructor(private http: HttpClient,private frontendconfig: FrontEndConfig) { }
  serverurl = this.frontendconfig.getserverurl();

getorganizations(){
  return this.http.get(this.serverurl +'/api/admins');
 }
 getorganizationsusers(uid){
   
  return this.http.get(this.serverurl +'/api/users/organization/'+uid);
 }
 getorganizationdetais(orgid){
   console.log("6666",orgid)
  // return this.http.get(this.serverurl +'/api/admins/'+orgid);
  return this.http.get(this.serverurl +'/api/users/organization/'+orgid);

 }
 getgetroles(){
  return this.http.get(this.serverurl +'/api/roless');
 } 
 createorgemp(data){
  return this.http.post(this.serverurl +'/api/admins/createuser',data)
 }

 organizationDetails(id)
 {
  return this.http.get(this.serverurl +'/api/userprofiles/'+id);
 } 

}
