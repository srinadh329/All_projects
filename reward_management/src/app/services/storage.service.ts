import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setUserDetails(data: any) {
    localStorage.setItem('userDetails', JSON.stringify(data));
  }

  getUserDetails() : any{
   return localStorage.getItem('userDetails');
  }

  getUserName() :any  {
    const userDetails = JSON.parse(this.getUserDetails());
    return `${userDetails['firstName']} ${userDetails['lastName']}`
  
  }

  logOut() {
    localStorage.clear();
  }

  getAccessToken(): any {
    const userDetails = JSON.parse(this.getUserDetails());
    return userDetails ? userDetails['id'] : null;
  }

  getPropertyId(): any {
    const userDetails = JSON.parse(this.getUserDetails());
    return (userDetails && userDetails.propertyDataList && userDetails.propertyDataList.length > 0) ? userDetails.propertyDataList[0]?.id : null
  }

  getPropertyName(): any {
    const userDetails = JSON.parse(this.getUserDetails());
    return (userDetails.propertyDataList && userDetails.propertyDataList.length > 0) ? userDetails.propertyDataList[0]?.name : null
  }
}
