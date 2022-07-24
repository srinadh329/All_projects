import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService implements Resolve<any>{

  constructor() { }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    console.log('Called Get Product in resolver...', route);
   return new Promise((resolve,reject)=>{
      resolve({value:'any'})
    })

  }
}
