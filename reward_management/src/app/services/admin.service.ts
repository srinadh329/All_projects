import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  buildingList = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  getBuildingList() {
    return this.http.get(environment.url + `getCASLProperty/all`).subscribe((data: any) => {
      if (data && data.PropertyAddress) {
        this.buildingList.next(data['PropertyAddress']);
      }
    });
  }

  createUser(obj: any) {
    const url = environment.url;
    return this.http.post<any>(url + 'add/property/user', obj)
  }

  signUp(obj: any) {
    const url = environment.url;
    return this.http.post<any>(url + 'rewards/admin/signup', obj)
  }

  onLogin(loginEmail: any, loginPassword: any) {
    return this.http.post<any>(environment.url + 'rewards/admin/login', { loginEmail: loginEmail, passWord: loginPassword });
  }

  getUserList(obj: any) {
    const url = this.getQueryString(obj);
    return this.http.get(environment.url + `get/property/users?` + url)
  }

  deleteUser(number: any, isEnabled: any) {

    const url = environment.url;
    return this.http.post(url + `remove/property/user?propertyUserId=${number}&isEnabled=${isEnabled}`, {})
  }

  getRewardTransactions(obj: any) {
    const url = this.getQueryString(obj);
    return this.http.get(environment.url + `reward/transactions/all?` + url)
  }

  getRewardTransactionBasedOnId(val: any) {
    return this.http.get(environment.url + `property/get/reward/details?rewardId=${val}`)
  }

  getReconciliation(obj: any) {
    const url = this.getQueryString(obj);
    return this.http.get(environment.url + `get/reward/report?` + url)
  }

  getQueryString(query: any) {
    let queryArray = [];
    let url = ''
    if (query) {
      for (let prop in query) {
        if (query.hasOwnProperty(prop)) {
          const encode = encodeURIComponent(prop);
          const encodeVal = encodeURIComponent(query[prop]);
          if (encodeVal != null && encodeVal != "") {
            queryArray.push(encode + '=' + encodeVal)
          }
        }
      }
      if (queryArray && queryArray.length > 0) {
        url = queryArray.join('&')
      }
    }
    return url;
  }

  refund(rewardId: any, orderId: any) {
    return this.http.post(environment.url + `property/refund/reward?rewardId=${rewardId}&orderId=${orderId}`, {})
  }

  forgotPassword(email: any) {
    let queryString = '';
    queryString = `email=${email}`;
    return this.http.get(environment.url + 'rewards/admin/forgotPassword?' + queryString)
  }

  resetPassword(obj: any) {
    return this.http.post(environment.url + 'rewards/admin/resetPassword', obj)
  }

  getOrderItems(orderId: any) {
    return this.http.get(environment.url + `cart/order/summary?reference=${orderId}`)
  }

  reClaimAmount(id: any) {
    return this.http.post(environment.url + `property/reward/reclaim?propertyId=${id}`, {})
  }

  getClaimAmount(id = null) {
    const propertyId = id ? `?propertyId=${id}` : ''
    return this.http.get(environment.url + `property/reclaim/get` + `${propertyId}`)
  }
}
