import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as socketIo from 'socket.io-client';
import { Socket } from '../shared/interfaces';
import { FrontEndConfig } from '../frontendconfig';
import { UserService } from './user.service';
import { Observable, Subject } from 'rxjs';
import { NotificationsService } from './notifications.service';
import { PushNotificationsService } from './push-notifications.service';
declare var io: { connect(url: string): Socket; };

import * as RecordRTC from 'recordrtc'; // for recording audio
import * as moment from 'moment';

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  serverurl: string
  constructor(private http: HttpClient, private router: Router, private userService: UserService, private frontendconfig: FrontEndConfig,
    private notifyService: NotificationsService, private _pushNotifyService: PushNotificationsService) {
    this.serverurl = this.frontendconfig.getserverurl();

  }
  socket: Socket;
  observer: any;
  profile: any;
  // Audio parameters
  private stream;
  private recorder;
  private interval;
  private startTime;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();
  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  @Output() notifier: EventEmitter<boolean> = new EventEmitter();


  Connectsocket(type): Observable<number> {
    console.log('type', type.type)
    if (type.type === 'disconnect') {
      if(this.socket) {
        this.socket.emit("userDisconnect", "this.profile._id");
        this.profile = "disconnected";
      }
    }

    if (type.type == 'connect') {
      this.socket = socketIo(this.serverurl);
      console.log("Socket: ",this.socket);
      this.userService.userprofile().subscribe(data => {
        this.profile = data;
        this.socket.emit("info", this.profile._id);

        // offline Notifications 
        this.notifyService.getNotifications().subscribe(result => {
          let offlinedata: Array<any> = [];
          var i = 1;
          var messages: any = result;
          let count = 0;

          
          
          
          
          for (const message of messages) {
            if (this.profile && !message.read && message.status == 'Pending' && message.receiverid._id == this.profile._id) {
              offlinedata.push({
                'title': message.type,
                'alertContent': `${message.type} By ${message.senderId.Name}`,
                'data': message.senderId.Name

              });
              message.read = true;
              this.notifyService.markAsRead(message).subscribe(read => { });
            }

           
          }
          this._pushNotifyService.generateNotification(offlinedata);
        });
      });

     //***********************************Online*************************************************8 */

    // Notification Message Socket
    this.socket.on('notification:save', (res) => {
      var data = [];
      // console.log(res);
      
      if (res && res.read == false) {

        if(res) {
          if(res.receiverid && res.status && res.senderId) {
            if(res.receiverid._id == this.profile._id && res.status == "!Accepted") {
              data.push({
                'title':res.type,
                'alertContent':`${res.type} By ${res.senderId.Name}`
              })
            }
            if (res.senderId._id == this.profile._id && res.status == "Accepted") {
        
              
              data.push({
                'title': 'Message',
                'alertContent': `${res.type}  ${res.status} By ${res.receiverid.Name}`,
              });
            }
          }
        }

      }

      this._pushNotifyService.generateNotification(data);
    });


      /////// group notifications
      this.socket.on('groupNotifications:save', (res) => {
        var data = [];
        if (res && res.read == false) {
          if (res.memberId._id == this.profile._id && res.status == "Pending") {
            data.push({
              'title': res.type,
              'alertContent': `${res.type}  By ${res.creatorId.Name}`,
            })
          }
          else {
            if (res.creatorId._id == this.profile._id && res.status != "Pending") {
              data.push({
                'title': res.type,
                'alertContent': `${res.type}  ${res.status} By ${res.memberId.Name}`,
              })
            }
          }
          console.log(res);
          
        }

        this._pushNotifyService.generateNotification(data);
      });
      //***********************************Online*************************************************8 */

    }

    Observable.create(observer => {
      this.observer = observer
    });
    return this.createObservable();
  }

  createObservable(): Observable<number> {
    return new Observable<number>(observer => {
      this.observer = observer;
    });
  }
  /*
  
  */
  startSubscriber(userId) {
    console.log(userId);
    var obj = { userId: userId }
    return this.http.post(this.serverurl + '/api/messages/subscriber', obj);
  }
  createData(data)
  {
    console.log(data);
    return this.http.post(this.serverurl + '/api/blogs',data)
  }

  /*
  Function Name: autorefreshFriends
  Input: None
  Output: JSON -- {new friend data}
  Desc: When user accepts friendrequest from invitations it will emit the backend from that we are subscribing the data through socket.on('friendslist:save')
  */

  autorefreshFriends() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('friendslist:save', (data) => {
          observer.next(data); // for subscribe it will emit
        });
    });
    return observable;
  }



  // Notification refresh test
  autoRefreshNotification() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('notification:save', (data) => {
          observer.next(data);
        });
    });
    return observable;
  }



  // Auto refresh groups
  autoRefreshGroups() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('groupsGetting:save', (data) => {
          observer.next(data);
        });
    });
    return observable;
  }

  autoRefreshMemberStatus() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('updateGroup:save', (data) => {
          observer.next(data);
        });
    });
    return observable;
  }
 
  autoRefreshGroupNotifications() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on( 'groupNotifications:save', (data) => {
          observer.next(data);
        });
    });
    return observable;
  }


  autoRefreshremoveNotification() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('notification:remove', (data) => {
          observer.next(data);
        });
    });
    return observable;
  }

  autoRefreshBadgeCount() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('friendsdata:save', (data) => {
          observer.next(data);
        });
    });
    return observable;
  }

  // Message refresh test
  autoRefresMessage() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('message', (data) => {
          console.log("emit function", data)
          observer.next(data);

        });
    });

    return observable;
  }
  autoRefreshEditedMessage() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('editedMessage:save', (data) => {
          console.log("emit function", data)
          observer.next(data);
        });
    });
    return observable;
  }

  //auto refesh group messages
  autoRefreshGroupMessage() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('gmessages:save', (data) => {
          console.log(data);
          observer.next(data);
        });
    });
    return observable;
  }
  // Auto Refresh group delete message
  autoRefreshGroupDeleteMessage(){
    let observable = new Observable<any>(observer=>{
      if(this.socket)
        this.socket.on('gupdate:save', (data)=>{
          observer.next(data);
        });
    });
    return observable;
  }
  // Auto Refresh group clear chat
  autoRefreshGroupClearData(){
    let observable = new Observable<any>(observer=>{
      if(this.socket)
        this.socket.on('gclearData:save', (data)=>{
          observer.next(data);
        });
    });
    return observable;
  }
  // Auto refresh group edit messages
  autoRefreshGroupEditMessage() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('gedit:save', (data) => {
          console.log(data);
          observer.next(data);
        });
    });
    return observable;
  }
  // Auto refresh Unstar group messages
  autoRefreshGroupUnstrarMessage(){
    let observable = new Observable<any>(observer =>{
      if(this.socket)
        this.socket.on('gUnstar:save', (data)=>{
          console.log(data);
          observer.next(data);
        });
    });
    return observable;
  }
  // Auto refresh star status for group messages
  autoRefreshStarStatusGroupMessage(){
    let observable = new Observable<any>(observer=>{
      if(this.socket)
        this.socket.on('gStarStatus', (data)=>{
          console.log(data);
          observer.next(data);
        });
    });
    return observable;
  }

  // auto refresh group removing badge count
  // autoRefreshGroupRemoveBadgeCount() {
  //   let observable = new Observable<any>(observer => {
  //     if (this.socket)
  //       this.socket.on('gcount:save', (data) => {
  //         console.log(data);
  //         observer.next(data);
  //       });
  //   });
  //   return observable;
  // }
  // auto refresh leave groups
  autoRefreshLeaveGroup() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('gleave:save', (data) => {
          console.log(data);
          observer.next(data);
        });
    });
    return observable;
  }
  // rename the group
  autoRefreshRenameGroup() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('grename:save', (data) => {
          console.log(data);
          observer.next(data);
        });
    });
    return observable;
  }
  autoRefreshRemoveMessage() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('message:remove', (data) => {
          console.log(data);
          observer.next(data);
        });
    });
    return observable;
  }

  autoRefreshundoMessage() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('message:undo', (data) => {
          console.log("Undo Message: ", data);
          observer.next(data);
        });
    });
    return observable;
  }
  autoRefreshBlockdata() {
    let observable = new Observable<any>(observer => {

      if (this.socket)
        this.socket.on('blockdata', (data) => {
          observer.next(data);
        });
    });
    return observable;
  }

  autoRefreshPriorityResponse() {
    let observable = new Observable<any>(observer => {

      if (this.socket)
        this.socket.on('priorityresponse', (data) => {

          observer.next(data);
        });
    });
    return observable;
  }

  autoRefreshDeletingAllMessages() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('deletingallmsg', (data) => {
          console.log(data);
          observer.next(data);
        })
    })
    return observable;
  }

  sendMessage(data) {
    console.log(data);
    return this.http.post(this.serverurl + '/api/messages', data);
  }


  getMessages(data) {
    return this.http.get(this.serverurl + '/api/messages/' + data)
  }

  getmydata(id) {
    console.log("id", id);
    var id = id._id
    return this.http.get(this.serverurl + '/api/invitations/getme', id);
  }

  saveFiles(formData: any) {
    return this.http.post(this.serverurl + '/api/medias', formData);
  }
  // This is for paste url link in to the input field
  videoUrl(data) {
    console.log(data, 'ff');

    return this.http.post(this.serverurl + '/api/medias/urldata', data);
  }
  // This is for user login or logout status by emit function from msg controller 
  autoUserStatus() {
    const observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on("userloginstatus", (data) => {
          observer.next(data)
        })
    });
    return observable;
  }


  // This is for msg read reciepts 
  autoMsgReadReciept() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on("msgReadRecipts", (data) => {
          observer.next(data)
        })
    })
    return observable;
  }


  staredMessages(data) {
    console.log(data)
    return this.http.post(this.serverurl + '/api/messages/staredMessage', data)
  }

  // for clearing the message db
  deletingMsgs(data) {
    return this.http.post(this.serverurl + '/api/messages/deletingMsgs', { data })
  }

  // This is for msg read reciepts
  msgSeen(data) {
    return this.http.post(this.serverurl + '/api/messages/seenMsg', data)
  }

  blocking(blockingdata) {
    return this.http.post(this.serverurl + '/api/messages/blocking', blockingdata)
  }

  unstaredMessages(data) {
    console.log(data)
    return this.http.post(this.serverurl + '/api/starredmessages/unstar', data)
  }


  // audio recording functions
  startRecording() {
    console.log('hello receive',navigator)
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }
    this._recordingTime.next('00:00');
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(s => {
      this.stream = s;
      console.log(this.stream);
      this.record();
    }).catch(error => {
      console.log(error)
      this._recordingFailed.next();
    });
  }

  abortRecording() {
    this.stopMedia();
  }

  private record() {
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm'
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(
      () => {
        const currentTime = moment();
        const diffTime = moment.duration(currentTime.diff(this.startTime));
        const time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
        this._recordingTime.next(time);
      },
      1000
    );
  }

  private toString(value) {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop((blob) => {
        console.log("test", blob);
        if (this.startTime) {
          const mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
          this.stopMedia();
          this._recorded.next({ blob: blob, title: mp3Name, data: blob });
        }
      }, () => {
        this.stopMedia();
        this._recordingFailed.next();
      });
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }


  // This function will execute at the time of page loading for getting block status 
  blockingdata(blockingdata1) {
    return this.http.post(this.serverurl + '/api/messages/blocking1', blockingdata1)
  }

  // This function will execute when user clicks on block button for getting response
  blockingData(blockingdata2) {
    return this.http.post(this.serverurl + '/api/messages/blocking2', blockingdata2)
  }

  // This function will execute when user clicks on NotifyMe button 
  slideData(data) {
    return this.http.post(this.serverurl + '/api/messages/slide', data)
  }
  sendEditMessage(Data) {
    return this.http.post(this.serverurl + '/api/messages/updatingMessage', Data)
  }
  sendEditGroupMessage(data) {
    return this.http.post(this.serverurl + '/api/groupmessages/editMessage', data);
  }

  // Forwarding message to multiple users
  forwardmsg(userdata) {
    return this.http.post(this.serverurl + '/api/messages/forwardmsg', userdata)
  }

  // This function will exectue when user clicks 
  starmsg(starmsgs) {
    return this.http.post(this.serverurl + '/api/messages/starmsg', starmsgs)
  }

  // This function will execute when user clicks on hide or show message button
  hidemessage(data) {
    return this.http.post(this.serverurl + '/api/friendslists/hideshow', data)
  }

  // This function will exectute when user clicks on active hide users 
  activehideuser(data) {
    return this.http.post(this.serverurl + '/api/friendslists/activehideusers', { data })
  }

  // This is for active hide user
  hideuser(hideuserdata) {
    console.log(hideuserdata);
    return this.http.post(this.serverurl + '/api/friendslists/hideuser', hideuserdata)
  }

  // This is for reply to exact message
  replymsg(data) {
    return this.http.post(this.serverurl + '/api/messages/replyingmsg', data)
  }

  //This is for incognito chat socket.emit function
  incognitochat() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('incognito:chat', (data) => {
          console.log(data);
          observer.next(data); 
        })
    })
    return observable;
  }

  // This is for incognito chat accept
  incognitoACCEPT2(data) {
    return this.http.post(this.serverurl + '/api/messages/incognitoaccept3', data)
  }


  // This is for video call accept
  videocallACCEPT2(data) {
    console.log("testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",data)
    return this.http.post(this.serverurl + '/api/messages/videocallaccept3', data)
  }
  // This is for incognito chat accept emit function
  INCOGNITOCHATACCEPT6() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('incogacp5', (data) => {
          console.log("incogacp5", data)
          observer.next(data)
        })
    })
    return observable;
  }

    // This is for video call accept emit function
    videocallACCEPT6() {
      let observable = new Observable<any>(observer => {
        if (this.socket)
          this.socket.on('videocallacp5', (data) => {
            console.log("videocallacp5", data)
            observer.next(data)
          })
      })
      return observable;
    }

    solovideocallreceivererror(data) {
      return this.http.post(this.serverurl+"/api/calls/solovideocallreceivererror/",data)
    }

  solovideocallwaiting(data) {

    return this.http.post(this.serverurl+"/api/calls/solovideocallwaiting/",data)
  }

  solovideocallwaitingNotify() {
    let observable = new Observable<any>(observer => {
      if(!this.socket) {
        this.socket = socketIo(this.serverurl);
      }
        this.socket.on('solovideocallwaiting',(data) => {
          console.log("solovideocallwaiting: ",data)
          observer.next(data)
        })
    })
    return observable;
  }

  solovideocallreceivererrorNotify() {
    let observable = new Observable<any>(observer => {
      if(!this.socket) {
        this.socket = socketIo(this.serverurl);
      }
        this.socket.on('solovideocallreceivererror',(data) => {
          console.log("solovideocallreceivererror: ",data)
          observer.next(data)
        })

    })
    return observable;
  }

  solovideoCallAcceptNotify() {
    let observable = new Observable<any>(observer => {
      if(!this.socket) {
        this.socket = socketIo(this.serverurl);
      }
        this.socket.on('solovideocallaccept', (data) => {
          observer.next(data)
        })
    })
    return observable;
  }

  solovideoCallRejectNotify() {
    let observable = new Observable<any>(observer => {
      if(!this.socket) {
        this.socket = socketIo(this.serverurl);
      }
        this.socket.on('solovideocallReject', (data) => {
          observer.next(data)
        })
    })
    return observable;
  }

  solovideoCallEndNotify() {
    let observable = new Observable<any>(observer => {
      if(!this.socket) {
        this.socket = socketIo(this.serverurl);
      }     
        this.socket.on('solovideocallendAlert', (data) => {
          console.log("solovideocallend",data)
          observer.next(data)
        })
    })
    return observable;
  }

  solovideocallTimeoutSocket() {
    let observable = new Observable<any>(observer => {
      if(!this.socket) {
        this.socket = socketIo(this.serverurl);
      }
        this.socket.on('solovideocallTimeout', (data) => {
          observer.next(data)
          console.log("solovideocallTimeout",data)
        })
    })
    return observable;
  }  

  solovideocallInit(data) {
    console.log("Video Call Data: ",data);
    return this.http.post(this.serverurl + '/api/calls/',data)
  }

  solovideocallReject(data) {
    return this.http.post(this.serverurl+'/api/calls/solovideocallReject/',data);
  }

  // This is for incognito chat reject      
  incognitoReject2(data) {
    console.log(data)
    return this.http.post(this.serverurl + '/api/messages/incognitoReject3', data)
  }

    // This is for video call reject      
    videocallReject2(data) {
      console.log(data)
      return this.http.post(this.serverurl + '/api/messages/videocallReject3', data)
    }

  // This is for incognito chat reject emit function
  incognitoRejectemit() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('incogrjt', (data) => {
          console.log(data)
          observer.next(data)
        })
    })
    return observable;
  }

    // This is for incognito chat reject emit function
    videocallRejectemit() {
      let observable = new Observable<any>(observer => {
        if (this.socket)
          this.socket.on('videocallreject', (data) => {
            console.log(data)
            observer.next(data)
          })
      })
      return observable;
    }
  // This is for incognito delete response
  incognitoDeleteResponse() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('incognitodelres', (data) => {
          console.log(data)
          observer.next(data)
        })
    })
    return observable;
  }

  // This is for showresponse null
  showres(data) {
    console.log(data)
    return this.http.post(this.serverurl + '/api/messages/showresp', data)
  }


  // This is for incognitoRes null 
  incognitoshowres() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('showresnull', (data) => {
          console.log("6333333", data)
          observer.next(data)
        })
    })
    return observable;
  }

  // This is for message remove favourite socket emit function
  messageRemoveFavouite() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('msgremfav', (data) => {
          observer.next(data)
        })
    })
    return observable;
  }



  // This is for when user in block state incognito chat request not sending 
  incognitoBlockstate(data) {
    return this.http.post(this.serverurl + '/api/messages/incognitoblock', data)
  }

   //This is for incognito block response
   incognitoblockemit() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('incognitoblockres', (data) => {
          console.log(data);
          observer.next(data); 
        })
    })
    return observable;
  }

  // This is for message indicator
  messageIndicator(data){
  return this.http.post(this.serverurl + '/api/messages/msgIndicator',data)
  }

 //This is for message typing indicator
     msgTypingIndicato() {
      let observable = new Observable<any>(observer => {
      if (this.socket)
      this.socket.on('msgIndicatorr', (data) => {
      observer.next(data); 
        })
      })
      return observable;
    }

    // chatoff loginstatus emit funcction                
      chatoffemit() {
      let observable = new Observable<any>(observer => {
      if (this.socket)
      this.socket.on('userloginstatus', (data) => {
      observer.next(data); 
        })
      })
      return observable;
    }

     // tab close event    
     tabclosingg(){
      let observable = new Observable<any>(observer => {
        if (this.socket)
        this.socket.on('tabcloseevent', (data) => {
          console.log("servicetabcloseevent",data)
        observer.next(data); 
          })
        })
        return observable;
     }

     //refresh event    
     refreshfunc(){
      let observable = new Observable<any>(observer => {
      if (this.socket)
      this.socket.on('refresh', (data) => {
      console.log("refresh",data)
      observer.next(data); 
        })
      })
      return observable;
      }

      // video call
  solovideoCall() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('video:call', (data) => {
          observer.next(data)
        })
    })
    return observable;
  }

  fetchroomid(obj) {
    // console.log("Fetch roomID service: ",obj);
    return this.http.post(this.serverurl+'/api/calls/fetchroomid/',obj)
  }

  solovideocallAccept(data) {
    return this.http.post(this.serverurl+'/api/calls/solovideocallAccept/',data);
  }

  updatecallreject(userid) {
    console.log("updatecallreject: ",userid);
    return this.http.post(this.serverurl+'/api/calls/solocallreject1',{id:userid});
  }

  getSocket() {
    if(this.socket) {
      return this.socket;
    }
  }

  chatingoff(data){
    console.log("this.loginuserdataAAAAAAAAAAAAAAAAAAAAAAAAAAAA",data)
    return this.http.post(this.serverurl+'/api/users/chatoffbutton',data)
  }
  
  solovideocallend(data) {
    // console.log("CallID: ",data.callID);
    return this.http.post(this.serverurl + '/api/calls/solovideocallend',data)
  }

  solovideocallTimeout(data) {
    return this.http.post(this.serverurl+'/api/calls/solovideocallTimeout',data)
  }

  invalidCallRedirect(id) {
    return this.http.post(this.serverurl+'/api/calls/invalidCallRedirect',id);
  }

  unhideallusers(loginuser){
    console.log("88666666666666",loginuser)
    return this.http.post(this.serverurl + '/api/friendslists/unhideall',loginuser)
  }

  videocallJoin(data) {
    console.log("VideoCallJoin: ",data);
    return this.http.post(this.serverurl + '/api/calls/',data);
  }
  // Auto refresh group message notifications
  autoRefreshMuteGroup() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('gmute:save', (data) => {
          console.log(data);
          observer.next(data);
        });
    });
    return observable;
  }
  // Auto refresh group star and unstarred
  autoRefreshStarGroup() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('gstar:save', (data) => {
          console.log(data);
          observer.next(data);
        });
    });
    return observable;
  }
  // Auto refresh block or unblock groups
autoRefreshBlockGroup(){
  let observable = new Observable<any>(observer => {
    if (this.socket)
      this.socket.on('gblock:save', (data) => {
        console.log(data);
        observer.next(data);
      });
  });
  return observable;
}

userStatusUpdate() {
  let observable = new Observable<any>(observer => {
    if(this.socket) {
      this.socket.on('statusupdate',(data) => {
        observer.next(data)
      })
    }
  })
  return observable;
}

userstatusEmit(){
  let observable = new Observable<any>(observer => {
    if (this.socket){
      this.socket.on('userstatus', (data) => {
        observer.next(data);
      });
    }      
  });
  return observable;
}

userstatusSeen(){
  let observable = new Observable<any>(observer => {
    if (this.socket){
      this.socket.on('updateseen', (data) => {
        observer.next(data);
      });
    }      
  });
  return observable;
}

userstatuslike() {
  let observable = new Observable<any>(observer => {
    if(this.socket) {
      this.socket.on('statuslike',(data) => {
        observer.next(data);
      })
    }
  })
  return observable;
}

userstatuscomment() {                          
  let observable = new Observable<any>(observer => {
    if(this.socket) {
      this.socket.on('statuscomment',(data) => {
        observer.next(data);
      })
    }
  })
  return observable;
}



Deletecontactemit() {                          
  let observable = new Observable<any>(observer => {
    if(this.socket) {
      this.socket.on('Deletecontact',(data) => {
        observer.next(data);
      })
    }
  })
  return observable;
}

showblog(){
  return this.http.get(this.serverurl+'/api/blogs/');
}

// This is for blocked contacts list
blockcontact(loginuserdata){
console.log(loginuserdata);
return this.http.post(this.serverurl + '/api/friendslists/blockedcontacts',loginuserdata)
}
}
