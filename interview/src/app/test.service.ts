import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {environment} from "../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http : HttpClient) { }

  signup(body){
    return  this.http.post(environment.serverUrl+'/api/users',body).subscribe(res=>{
      console.log(res)
  })
  }
  logindetails(body){
    return this.http.post(environment.serverUrl+'/auth/local',body)
  }
  details(){
    return this.http.get(environment.serverUrl+'/api/users/')
  }

}
