import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }
  details(body){
    return this.http.post('https://backendelectric.herokuapp.com/api/users',body).subscribe(res=>{
      console.log(res);
    })
  }
}
