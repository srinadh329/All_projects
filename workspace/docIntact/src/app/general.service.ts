import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as socketIo from 'socket.io-client';
import { Socket } from './shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FrontEndConfig } from "./frontendConfig"
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  type
  outsideUserSocket: Socket;
  observer: any
  constructor(private http: HttpClient, private router: Router, private frontendconfig: FrontEndConfig) {
    if (localStorage.getItem('loggedIn') == 'true') {
      // this.type = { type: "connect" }
      // var sub = this.dataService.Connectsocket(this.type)
      //   .subscribe(quote => {

      //     var stockQuote = quote
      //   });
    }
  }
  Connectsocket(type): Observable<number> {
    Observable.create(observer => {
      this.observer = observer;
    });
    if (type.type == 'connect') {
      this.outsideUserSocket = socketIo(this.serverurl);
    }
    if (type.type == 'disconnect') {
      this.outsideUserSocket.emit("onDisconnect", '')
    }
    return this.createObservable();

  }
  //=========================
  contact(user){
    return this.http.post(this.serverurl+'/api/users/contact',user);
  }
  //[==================================]
  newCommentReceived() {
    let observable = new Observable<any>(observer => {
      this.outsideUserSocket.on('comment:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  newChatReceivedRefresh() {
    let observable = new Observable<any>(observer => {
      if (this.outsideUserSocket) {
        this.outsideUserSocket.on('chat:save', (data) => {
          observer.next(data);
        });
      }
    });
    return observable;
  }

  onlineUserRefresh() {
    let observable = new Observable<any>(observer => {
      this.outsideUserSocket.on('onlineuser:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  createObservable(): Observable<number> {
    return new Observable<number>(observer => {
      this.observer = observer;
    });
  }

  private handleError(error) {
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }
  // For getting the backend server URL
  serverurl = this.frontendconfig.getserverurl();

  // For setting of token in local storage
  setUserLoggedIn(data) {
    var userToken = data
    localStorage.setItem('currentUser', JSON.stringify(userToken))
  }

  // To make the token null and logout the user
  logout() {
    var userToken = { 'token': null }
    localStorage.setItem('currentUser', JSON.stringify(userToken))
    this.router.navigate(['/']);
  }

  // For user Login 
  checkLogin(user) {
    return this.http.post(this.serverurl + '/auth/local', user);
  }

  googlelogin(){
    return this.http.get(this.serverurl + '/auth/google');
  }


  createnotification(i)
{ 
    return this.http.post(this.serverurl+'/api/notifications/',i);  
}
getnotification()
{
  return this.http.get(this.serverurl+'/api/notifications/');  

}
getOfflinenotification()
{
  return this.http.get(this.serverurl+'/api/notifications/getOfflinenotification/');  

}
getnotificationbyId(id)
{
  return this.http.get(this.serverurl+'/api/notifications/'+id);  

}
markedread(i)
{
 
    return this.http.put(this.serverurl+'/api/notifications/'+i._id, i)
}
clearAllNotifications(i)
{
  var i1 ={}
  return this.http.post(this.serverurl+'/api/notifications/clearAll/Notifications',i1);  

}
clearAllNotificationsactive(i)
{
  i={};
  return this.http.post(this.serverurl+'/api/notifications/clearAllNotificationsactive',i); 
}
countNotifications()
{
  return this.http.get(this.serverurl+'/api/notifications/count/');  

}
onlineuser(log) {
    return this.http.post(this.serverurl + '/api/onlineusers', log);

  }
  GetonlineUsers(doc) {

    return this.http.get(this.serverurl + '/api/onlineusers/'+doc);

  }
  auditlog(data){
    return this.http.post(this.serverurl + '/api/auditlogs', data);
  }
  
  getAuditlogs(element) {
    return this.http.get(this.serverurl + '/api/auditlogs/'+element._id);
  }
  
  updatetime(documentlog,endtime)
  {
    documentlog.endTime=endtime
        return this.http.put(this.serverurl+'/api/documentlogs/'+documentlog._id, documentlog)

    // return this.http.put(this.serverurl+'/api/auditlogs/'+id, v)

  }

  offline(Data) {
    Data.viewStatus=false
   return this.http.put(this.serverurl + '/api/onlineusers/' + Data._id,Data);
  }

  signatureUpload(x,f){
    return x
  }
}
