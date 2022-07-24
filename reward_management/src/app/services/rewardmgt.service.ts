import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RewardmgtService {

  buildingAmount = new BehaviorSubject(null);
  buildingList = new BehaviorSubject(null);
  private loginurl = "http://localhost:3000/login"
  private signupUrl = "http://localhost:3000/signup"
  private rewardUrl = "http://localhost:3000/reward"
  constructor(private http:HttpClient, private storage :StorageService) { }

  getRewardList(){
    console.log("Reward List")
    return this.http.get(this.signupUrl);
  }
  

  signUp(obj:any) {
    const url = environment.url;
    return this.http.post<any>(url+'property/user/signup',obj)
  }

  getBuldingList() {
    return this.http.get(environment.url + `getCASLProperty/all`);
  }

  onLogin(loginEmail: any, loginPassword: any) {
    return this.http.post<any>(environment.url + 'property/user/login', { loginEmail: loginEmail, passWord: loginPassword });
  }

  createReward(obj:any,objDate:any) {
    const url = environment.url;
    return this.http.post<any>(url+`property/create/reward?endDate=${objDate.endDate}`,obj)
  }
  
  getRewards(searchString:String) {
    let queryString = '';
    const propertyId = this.storage.getPropertyId();
    if (propertyId) {
      queryString = `?propertyId=${propertyId}`
    }

    if(searchString) {
      queryString +=  `&searchString=${searchString}`
    }

    return this.http.get(environment.url + `property/get/rewards` + queryString);
  }
  getRecentlyRewards(query:any) {
    let queryString = '';
    const propertyId = this.storage.getPropertyId();
    if (propertyId) {
      queryString = `&propertyId=${propertyId}`
    }

    if(query.searchString) {
      queryString +=  `&searchString=${query.searchString}`
    }
    return this.http.get(environment.url + `property/rewards/get?start=${query.start}&count=${query.count}` + queryString +``);
  }

  getRewardTransaction() {
    return this.http.get(environment.url + 'property/user/reward/transactions')
  }

  getRewardTransactionBasedOnId(val: any) {
    return this.http.get(environment.url + `property/get/reward/details?rewardId=${val}`)
  }

  loadAmount(obj:any) {
    let queryString;
    queryString = `?propertyId=${obj.id}&propertyLoadAmount=${obj.amount}&paymentToken=${obj.token}&paymentType=${obj.paymentType}`
    return this.http.post(environment.url + 'property/load/amount'+ queryString,{})
  }

  getBuildingAmount(id: any) {
    return this.http.get(environment.url + `property/amount/get?propertyId=${id}`).subscribe((data:any) => {
      if (data) {
        this.buildingAmount.next(data);
      }
    })
  }

  forgotPassword(email:any) {
    let queryString = '';
    queryString = `email=${email}`;
    return this.http.get(environment.url + 'property/user/forgotPassword?'+ queryString)
  }

  resetPassword(obj: any) {
    return this.http.post(environment.url + 'property/user/resetPassword', obj)
  }

  deleteReward(id: any) {
    return this.http.post(environment.url + `property/delete/reward?rewardId=${id}`,{})
  }
}
