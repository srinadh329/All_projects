import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }
  saveImage(data:any){
    // const formData = new FormData();
    // formData.append('http://walshmedicalmedia.com/', image);
    // console.log(formData)
    return this.http.post('http://walshmedicalmedia.com/', data)
  }
}
