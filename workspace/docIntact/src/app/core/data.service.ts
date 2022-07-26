import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as socketIo from 'socket.io-client';
import { Socket } from '../shared/interfaces';
import { DocumentService } from '../document.service';
import { FrontEndConfig } from '../frontendConfig';
import {
  PushNotificationsService
} from '../push-notifications.service';
import { UserService } from '../user.service'
import { GeneralService } from '../general.service';

declare var io: {
  connect(url: string): Socket;
};

@Injectable()
export class DataService {
  serverurl: string
  constructor(private documentervice: DocumentService, private generalservice: GeneralService, private frontendconfig: FrontEndConfig, private _notificationService: PushNotificationsService, private userservice: UserService) {
    this.serverurl = this.frontendconfig.getserverurl();
    this._notificationService.requestPermission();

  }
  socket: Socket;
  observer: any
  profile: any
  res: any
  appData: any
  chatdoc: any
  loggedIn
  emailData
  Connectsocket(type): Observable<number> {
    console.log(type)
    Observable.create(observer => {
      this.observer = observer;
    });
    if (type.type == 'connect') {
      this.socket = socketIo(this.serverurl);
      this.loggedIn = localStorage.getItem('loggedIn')
      this.emailData = JSON.parse(localStorage.getItem('currentUser'))
      if(this.emailData && this.emailData.email)
      this.emailData.email = this.userservice.decryptData(this.emailData.email);
      if (this.loggedIn != 'false') {
        this.userservice.getProfile().subscribe(data => {
          this.profile = data;
          this.socket.emit("info", this.profile.mobilenumber);

          //Notification
          if (this.profile) {
            //online Notification
            this.socket.on('notification:save', (res) => {
              this.generalservice.getnotificationbyId(res._id).subscribe(notification => {
                var result: any = notification;
                this.observer.next(result);
                let data: Array<any> = [];
                if (result.toid && result.toid._id == this.profile._id && result.read == false && result.type == 'Shared' && result.active == true) {
                  if (result.documentid) var info = ((!result.fromid)?(result.fromemail):(result.fromid.name)?(result.fromid.name):(result.fromid.companyname)?(result.fromid.companyname):(result.fromid.email)) + " shared a document";
                  if (result.folderid) var info = ((!result.fromid)?(result.fromemail):(result.fromid.name)?(result.fromid.name):(result.fromid.companyname)?(result.fromid.companyname):(result.fromid.email)) + " shared a folder";
                  data.push
                    ({
                      'title': "Sharing",
                      'alertContent': info,
                      'data': result.created_at
                    });
                  this._notificationService.generateNotification(data);
                  // result.read = true
                  // this.generalservice.markedread(result).subscribe(readres => { console.log(readres) });
                }

                else if (result.read == false && result.toid && (result.toid._id == this.profile._id || result.toid.email == this.profile.email) && result.type == 'submit' && result.active == true) {
                  let name=(result.fromid && result.fromid.name)?result.fromid.name:(result.fromemail).split('@')[0]
                  data.push
                    ({
                      'title': "Sharing",
                      'alertContent': name + " submitted a document",
                      'data': result.created_at
                    });

                  this._notificationService.generateNotification(data);
                  // result.read = true
                  // this.generalservice.markedread(result).subscribe(read => { });
                }
                
                else if (result.read == false && result.toid && (result.toid._id == this.profile._id || result.toid.email == this.profile.email) && result.type == 'closed' && result.active == true) {
                  let name=(result.fromid && result.fromid.name)?result.fromid.name:(result.fromemail).split('@')[0]                  
                  data.push
                    ({
                      'title': "Document Closed",
                      'alertContent': name + " closed a document",
                      'data': result.created_at
                    });
                  this._notificationService.generateNotification(data);
                  // result.read = true
                  // this.generalservice.markedread(result).subscribe(read => { });
                }

              });
            });

            //offline Notification
            // this.generalservice.getnotification().subscribe(result => {
            //   var messages: any = result;
            //   for (const message of messages) {
            //     let data: Array<any> = [];
            //     if (message.read == false && message.active == true &&  message.toid && message.toid._id == this.profile._id && message.type == 'Shared') {
            //       console.log(message)
            //       data.push
            //         ({
            //           'title': "Sharing",
            //           'alertContent': (!message.fromid)?(message.fromemail):(message.fromid.name)?(message.fromid.name):(message.fromid.companyname)?(message.fromid.companyname):(message.fromid.email) + " shared a document",
            //           'data': message.created_at
            //         });
            //       // this._notificationService.generateNotification(data);
            //       // message.read = true
            //       // this.generalservice.markedread(message).subscribe(readres => { console.log(readres) });
            //     }

            //     if (message.read == false && message.active == true && message.toid && message.toid._id == this.profile._id && message.type == 'submit') {
            //       let name=(message.fromid && message.fromid.name)?message.fromid.name:(message.fromemail).split('@')[0]                                                      
            //       data.push
            //         ({
            //           'title': "Sharing",
            //           'alertContent': name + " submitted a document",
            //           'data': message.created_at
            //         });
            //       // this._notificationService.generateNotification(data);
            //       // message.read = true
            //       // this.generalservice.markedread(message).subscribe(readres => { console.log(readres) });
            //     }
            //     if (message.read == false && message.active == true && message.toid && message.toid._id == this.profile._id && message.type == 'closed') {
            //       let name=(message.fromid && message.fromid.name)?message.fromid.name:(message.fromemail).split('@')[0]                                    
            //       data.push
            //         ({
            //           'title': "Document Closed",
            //           'alertContent': name + " closed a document",
            //           'data': message.created_at
            //         });
            //       // this._notificationService.generateNotification(data);
            //       // message.read = true
            //       // this.generalservice.markedread(message).subscribe(readres => { console.log(readres) });
            //     }

            //   }

            // });
          }
        })
      }
    }

    if (type.type == 'disconnect') this.socket.emit("onDisconnect", '');
    return this.createObservable();
  }

  newMessageReceived() {
    let observable = new Observable<any>(observer => {
      this.socket.on('sharingpeople:save', (data) => {
       if(this.profile&& this.profile.email == data.toemail)
       {
        observer.next(data);
       }        
      });
    });
    return observable;
  }
  newNotificationReceived() {
    let observable = new Observable<any>(observer => {
      this.socket.on('notification:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  documentUpdate() {
    let observable = new Observable<any>(observer => {
      this.socket.on('document:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  folderUpdate() {
    let observable = new Observable<any>(observer => {
      this.socket.on('folder:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  newCommentReceived() {
    let observable = new Observable<any>(observer => {
      this.socket.on('comment:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  newChatReceived() {

    let observable = new Observable<any>(observer => {
      if (this.socket) {
        this.socket.on('chat:save', (data) => {
          observer.next(data);
        });
      }
    });
    return observable;
  }


  newfavorite() {
    let observable = new Observable<any>(observer => {
      this.socket.on('favorite:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  onlineusers() {
    let observable = new Observable<any>(observer => {
      this.socket.on('onlineuser:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  mobilelinkupdate() {
    let observable = new Observable<any>(observer => {
      this.socket.on('mobilelink:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  FieldsValueUpdate() {
    let observable = new Observable<any>(observer => {
      this.socket.on('fieldvalue:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  getsignatureDocs()
  {
    let observable = new Observable<any>(observer => {
      this.socket.on('signature:save', (data) => {
        if(data.email ==  this.emailData.email)
        observer.next(data);
      });
    });
    return observable;
  }
  getphotoDocs()
  {
    let observable = new Observable<any>(observer => {
      this.socket.on('photo:save', (data) => {
        if(data.email ==  this.emailData.email)
        observer.next(data);
      });
    });
    return observable;
  }
  getstampDocs()
  {
    let observable = new Observable<any>(observer => {
      this.socket.on('stamp:save', (data) => {
        if(data.email ==  this.emailData.email)
        observer.next(data);
      });
    });
    return observable;
  }
  FieldsOptionsUpdate() {
    let observable = new Observable<any>(observer => {
      this.socket.on('fieldoption:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  documentLogsUpdate() {
  
    let observable = new Observable<any>(observer => {     
      this.socket.on('documentlogs:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  disconnectsocket() {
    this.socket.emit("disconnect", "")
  }

  createObservable(): Observable<number> {
    return new Observable<number>(observer => {
      this.observer = observer;
    });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }
}
