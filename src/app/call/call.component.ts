
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import {
  Component, ElementRef, ViewChild, TemplateRef, OnInit, AfterViewInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef, ɵConsole, HostListener
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import * as socketIo from 'socket.io-client';
import * as RTCMultiConnection from 'rtcmulticonnection';
import * as DetectRTC from 'detectrtc';
import * as RecordRTC from 'recordrtc';
import { Socket } from '../call/interfaces'
import { FrontEndConfig } from '../frontendconfig';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css'],
  changeDetection: ChangeDetectionStrategy.Default, inputs: ['data']
})
export class CallComponent {

  timeLeft: any;
  localStream: boolean;
  width;
  Streamid;
  roomid;
  Streams = [];
  recorder;
  device = true;
  startblock: boolean;
  joinblock: boolean;
  webcam: boolean = false;
  questiondescription = false;
  // Video Call Variables
  ise: any;
  ie: any;
  inputflag = false;
  showpanel = true;
  compiledcount = 0;
  roomlist: boolean;
  tokens: any;
  cssRate = 1;
  cssRateE = 1;
  showtextarea = true;
  session_id = null;
  editor = null;
  collaborator = null;
  buffer_dumped = false;
  last_applied_change = null;
  just_cleared_buffer = null;
  // rtcPeerConnection;
  questionshow = false;
  Usersdata: any = {};
  Useroles: any = {};
  connection_userid;
  valid = false;
  room: any;
  user;
  username: any;
  Users = [];
  chatmessages = [];
  messagedata: any;
  chatcount
  currentUser: any;
  fileToUpload: File = null;
  videocall = false;
  compilerstate = false;
  id: string;
  originaldata: any;
  interviewdata: any;
  serverResponse: any;
  canview = false;
  config: any;
  selectedLanguage: boolean;
  languagesList: any = [];
  languagesData: any = [];
  chatshow = true;
  sendmessage: any;
  loadadta: any;
  online: any;
  chatid: any;
  chatname: any;
  startmodel: any;
  joinmodel: any;
  callingid = false;
  chatdata: any = [];
  noteseditor = null;
  inputeditor = null;
  // inputeditor:any
  collaborator1 = null;
  buffer_dumpedn = false;
  last_applied_changen = null;
  just_cleared_buffern = null;
  userslist: any = [];
  tempcode: any;
  editorstate: boolean;
  countdownconfig = {};
  questions: any = {};
  s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  x: any = 4;
  error: boolean;
  req: any;
  totalCount: any;
  page = 1;
  perPage = 3;
  totalCount1: any;
  page1 = 1;
  type: any;
  adminquestions: any;
  questionmodal: any;
  question;
  reciveddata: any;
  output: any;
  lang: any;
  selectedTab = 0;
  showaccordiandiv = false;
  showOuputdiv = true;
  testcasedata: any = [];
  totaltestcases = 0;
  passedtestcases = 0;
  questionslist: any = [];
  comments: any;
  result: any;
  feedbackmodal: any;
  msg: any;
  chatmax: any;
  suggestionsArray = [];
  connection = new RTCMultiConnection();
  endTime: any;
  startTime: any;
  Profiledata: any;
  showquestions = false;
  showinterview = false;
  Mute: boolean = false;
  Videoshow: boolean = true;
  data = {}
  callerstatus: any;
  isRoomExist: any;
  listusers: any;
  _id: any;
  loginuserdata: any;
  users: any[];
  userid: any = [];
  divheight: number;
  RTCserverurl: string;
  CallObject: any;
  solovideoCallEndNotify: any;
  solovideoCallRejectNotify: any;
  getFriends: any;
  invalidCallRedirect: any;
  solovideocallend: any;
  solovideocallTimeout: any;
  waitRoomCreation: any;
  switchToUser: any;
  callListUsers:any=[]
  constructor(private userService: UserService, private router: Router, private messageService: MessageService, public frontendconfig: FrontEndConfig, private changing: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private route: Router) {
    // this.callerstatus=JSON.parse(localStorage.getItem('CallerStatus'));
    this.CallObject = JSON.parse(localStorage.getItem('CallObject'))
    this.loginuserdata = JSON.parse(localStorage.getItem('currentUser'));
    this.switchToUser = JSON.parse(JSON.stringify(localStorage.getItem('switchToUser')));
    console.log("Login User Data: ", this.loginuserdata)
    console.log("SwitchToUser: ", this.switchToUser);
    console.log("Call Object: ",this.CallObject);
    this.solovideoCallEndNotify = this.messageService.solovideoCallEndNotify().subscribe((data: any) => {
      console.log("solovideoCallEndNotify: ", data);
      if (this.connection && this.roomid) {
        if (data.ReceiverID[0].id._id == this.loginuserdata.id) {
          const self = this;

          //Close Local Stream
          self.connection.attachStreams.forEach((localStream) => {
            if (localStream.type === 'local') {
              localStream.stop();
              self.Streams = [];
            }
            //Check Room Exists and Close Room and Socket Connection
            self.connection.checkPresence(self.roomid, function (isRoomExist, _roomid, error) {
              self.isRoomExist = isRoomExist;
              if (self.isRoomExist) {
                self.connection.socket.emit("deleteroom", self.roomid);
                self.roomid = null;
              }

              self.connection.closeSocket();
              
              self.CallObject = null;

              if (error) { console.log(error); }
            });
          });

          //Redirect to Chat
          if (this.listusers.length <= 0) {
            this.router.navigate(['/navbar/main'], { queryParams: { value: false } })
          }
          else if (this.listusers.length > 0) {
            for (let listuser of this.listusers) {
              if (this._id == listuser.receiverid._id && this.switchToUser == listuser.senderId._id) {
                this.router.navigate(['/navbar/main'], { queryParams: { id: listuser._id, userid: listuser.senderId._id, value: false } });
              }
              else if (this._id == listuser.senderId._id && this.switchToUser == listuser.receiverid._id) {
                this.router.navigate(['/navbar/main'], { queryParams: { id: listuser._id, userid: listuser.receiverid._id, value: false } });
              }
            }
          }
        }

        //Caller Code
        else if (data.SenderID._id == this.loginuserdata.id) {
          const self = this;

          //Close Local Stream
          self.connection.attachStreams.forEach((localStream) => {
            if (localStream.type === 'local') {
              localStream.stop();
              self.Streams = [];
            }
            //Check Room Exists and Close Room and Socket Connection
            self.connection.checkPresence(self.roomid, function (isRoomExist, _roomid, error) {
              self.isRoomExist = isRoomExist;
              if (self.isRoomExist) {
                self.connection.socket.emit("deleteroom", self.roomid);
                self.roomid = null;
              }

              self.connection.closeSocket();
              
              self.CallObject = null;

              if (error) { console.log(error); }
            });
          });

          //Redirect to Chat
          if (this.listusers.length <= 0) {
            this.router.navigate(['/navbar/main'], { queryParams: { value: false } })
          }
          else if (this.listusers.length > 0) {
            for (let listuser of this.listusers) {
              if (this._id == listuser.receiverid._id && this.switchToUser == listuser.senderId._id) {
                this.router.navigate(['/navbar/main'], { queryParams: { id: listuser._id, userid: listuser.senderId._id, value: false } });
              }
              else if (this._id == listuser.senderId._id && this.switchToUser == listuser.receiverid._id) {
                this.router.navigate(['/navbar/main'], { queryParams: { id: listuser._id, userid: listuser.receiverid._id, value: false } });
              }
            }
          }
        }
      }
      this.CallObject = null;
    })

    this.solovideocallTimeout = this.messageService.solovideocallTimeoutSocket().subscribe((data: any) => {

      console.log("Solo Video Call Timeout: ", data)
      if (this.loginuserdata) {

        //Caller Code
        if (data.SenderID._id == this.loginuserdata.id) {
          const self = this;

          //Close Local Stream
          self.connection.attachStreams.forEach((localStream) => {
            if (localStream.type === 'local') {
              localStream.stop();
              self.Streams = [];
            }
            //Check Room Exists and Close Room and Socket Connection
            self.connection.checkPresence(self.roomid, function (isRoomExist, _roomid, error) {
              self.isRoomExist = isRoomExist;
              if (self.isRoomExist) {
                self.connection.socket.emit("deleteroom", self.roomid);
                self.roomid = null;
              }

              self.connection.closeSocket();
              self.CallObject = null;

              if (error) { console.log(error); }
            });
          });

          //Redirect to Chat
          if (this.listusers.length <= 0) {
            this.router.navigate(['/navbar/main'], { queryParams: { value: false } })
          }
          else if (this.listusers.length > 0) {
            for (let listuser of this.listusers) {
              if (this._id == listuser.receiverid._id && this.switchToUser == listuser.senderId._id) {
                this.router.navigate(['/navbar/main'], { queryParams: { id: listuser._id, userid: listuser.senderId._id, value: false } });
              }
              else if (this._id == listuser.senderId._id && this.switchToUser == listuser.receiverid._id) {
                this.router.navigate(['/navbar/main'], { queryParams: { id: listuser._id, userid: listuser.receiverid._id, value: false } });
              }
            }
          }
        }
      }
    })

    this.solovideoCallRejectNotify = this.messageService.solovideoCallRejectNotify().subscribe((data: any) => {
      console.log("solovideoCallRejectNotify: ", data);
      let msg = data.ReceiverID[0].id.Name + " has declined the call.";
      if (this.loginuserdata && this.connection) {

        //Caller Code
        if (data.SenderID._id == this.loginuserdata.id) {

          const self = this;

          //Close Local Stream
          self.connection.attachStreams.forEach((localStream) => {
            if (localStream.type === 'local') {
              localStream.stop();
              self.Streams = [];
            }
            //Check Room Exists and Close Room and Socket Connection
            self.connection.checkPresence(self.roomid, function (isRoomExist, _roomid, error) {
              self.isRoomExist = isRoomExist;
              if (self.isRoomExist) {
                self.connection.socket.emit("deleteroom", self.roomid);
                self.roomid = null;
              }

              self.connection.closeSocket();
              
              self.CallObject = null;

              if (error) { console.log(error); }
            });
          });

          //Redirect to Chat
          if (this.listusers.length <= 0) {
            this.router.navigate(['/navbar/main'], { queryParams: { value: false } })
          }
          else if (this.listusers.length > 0) {
            for (let listuser of this.listusers) {
              if (this._id == listuser.receiverid._id && this.switchToUser == listuser.senderId._id) {
                this.router.navigate(['/navbar/main'], { queryParams: { id: listuser._id, userid: listuser.senderId._id, value: false } });
              }
              else if (this._id == listuser.senderId._id && this.switchToUser == listuser.receiverid._id) {
                this.router.navigate(['/navbar/main'], { queryParams: { id: listuser._id, userid: listuser.receiverid._id, value: false } });
              }
            }
          }
        }
      }
      
      this.CallObject = null;
    })

    if (!this.loginuserdata) {
      console.log("Invalid Redirection.");
      this.router.navigate(['/login']);
    }
    else {
      this._id = this.loginuserdata.id
      this.user = this.loginuserdata.Name;
      this.RTCserverurl = this.frontendconfig.getRTCUrl();
      this.Streams = []
      this.getFriends = this.userService.getFriends(this._id).subscribe((users:any) => {
        this.listusers = users;
        console.log("listusers: ", this.listusers);
        for(let listuser of this.listusers) {
          if(listuser.senderId._id == this.loginuserdata.id) {
            this.callListUsers.push(listuser.receiverid)
          }
          else if(listuser.receiverid._id == this.loginuserdata.id) {
            this.callListUsers.push(listuser.senderId)
          }
        }
        if (!this.CallObject) {
          console.log("Invalid Redirection.");
          this.invalidCallRedirect = this.messageService.invalidCallRedirect(this.loginuserdata.id).subscribe((data: any) => {
            console.log("invalidCallRedirect: ", data);

            //Redirect to Chat
          if (this.listusers.length <= 0) {
            this.router.navigate(['/navbar/main'], { queryParams: { value: false } })
          }
          else if (this.listusers.length > 0) {
            for (let listuser of this.listusers) {
              if (this._id == listuser.receiverid._id && this.switchToUser == listuser.senderId._id) {
                this.router.navigate(['/navbar/main'], { queryParams: { id: listuser._id, userid: listuser.senderId._id, value: false } });
              }
              else if (this._id == listuser.senderId._id && this.switchToUser == listuser.receiverid._id) {
                this.router.navigate(['/navbar/main'], { queryParams: { id: listuser._id, userid: listuser.receiverid._id, value: false } });
              }
            }
          }
          })
        }
        else {
          console.log("CallObject: ", this.CallObject);
          this.roomid = this.CallObject.RoomID;
          if (this.CallObject && this.loginuserdata) {
            if (this.CallObject.SenderID._id == this.loginuserdata.id) {
              console.log("Caller Room ID: ", this.roomid);
              this.callerstatus = 'VideoCall.caller';
              this.CallInit();
            }
            else {
              for (let receiver of this.CallObject.ReceiverID) {
                if (receiver.id._id == this.loginuserdata.id) {
                  console.log("Receiver caller Room ID: ", this.roomid);
                  this.callerstatus = 'VideoCall.receiver';
                  this.CallInit();
                }
              }
            }
          }
        }
      })
    }
  }

  CallInit() {
    console.log("RoomID: ", this.roomid);
    console.log("USER: ", this.user);
    this.divheight = window.innerHeight;
    this.CallStart();
  }

  CallStart() {

    console.log("Caller Status: ", this.callerstatus);
    if (this.callerstatus == 'VideoCall.caller' || this.callerstatus == 'VideoCall.receiver') {
      this.connection.socketURL = this.RTCserverurl;
      // this.connection.extra.user =this.user.name;
      if (this.CallObject.ReceiverID.length == 1) {
        // this.connection.autoCloseEntireSession = true;
      }
      this.connection.maxParticipantsAllowed = 8;
      this.connection.socketMessageEvent = 'video-conference-demo';
      this.connection.chunkSize = 16000;
      this.connection.enableFileSharing = true;
      this.connection.enableLogs = true;
      this.connection.mediaConstraints.audio = true;
      this.connection.session.audio = true;
      this.connection.userid = this.loginuserdata.id;
      this.webcam = true;
      this.connection.mediaConstraints.video = true;
      this.connection.session.video = true;
      this.connection.extra = {
        id: this.loginuserdata.id,
        user: this.loginuserdata.Name,
        email: this.loginuserdata.EmailId,
      };
      this.connection.session = {
        audio: true,
        video: true
      };
      this.connection.mediaConstraints = {
        video: true,
        audio: true
      };

      this.connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
      };
      // use your own TURN-server here!
      this.connection.iceServers = [{
        'url': 'turn:172.16.1.118:3487',
        'username': 'hrmsturnadmin',
        'credential': 'hrmsturnadmin'
      }, {
        'urls': [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun.l.google.com:19302?transport=udp',
        ]
      }
      ];

      this.AddListeners();
      // console.log("RTCMultiConnection",this.connection)
      this.connection.videosContainer = document.getElementById('videos-container');

      if (this.callerstatus == 'VideoCall.caller') {
        this.connection.isInitiator = true;
        this.openroom()
      }
      else if (this.callerstatus == 'VideoCall.receiver' && this.roomid) {
        this.checkroomavailability(this.roomid);
        // console.log("Is Room Exist", this.isRoomExist);

      }
    }


  }
  video: any;
  video1: any;


  @HostListener('window:resize') onWindowResize() {
    this.divheight = window.innerHeight;

  }
  mute() {
    this.connection.attachStreams[0].mute('audio');
    this.Mute = false;
  }
  Unmute() {
    const localStream = this.connection.attachStreams[0].unmute('audio');
    this.Mute = true;

  }
  Dontshowvideo() {
    this.connection.attachStreams[0].mute('video');
    // localStream.mute('video');
    this.Videoshow = false;
  }
  showvideo() {
    this.connection.attachStreams[0].unmute('video');
    this.Videoshow = true;
  }

  chatpage() {
    let usertype = null;
    if (this.CallObject) {
      if (this.CallObject.ReceiverID.length == 1) {

        if (this.CallObject.SenderID._id == this.loginuserdata.id) {
          this.CallObject.usertype = 'caller';
        }
        else {
          this.CallObject.usertype = 'receiver';
        }
        this.solovideocallend = this.messageService.solovideocallend(this.CallObject).subscribe((endres: any) => {
          console.log("Videocall Exit: ", endres);

        })
      }
    }
  }

  checkroomavailability = (roomid) => {
    const self = this;
    self.waitRoomCreation = setInterval(() => {
      console.log("Waiting for Room Cretion.");
      self.connection.checkPresence(roomid, function (isRoomExist, _roomid, error) {
        self.isRoomExist = isRoomExist;
        console.log(self.isRoomExist, roomid)
        if (error) { console.log(error); }
        if (self.isRoomExist == true) {
          self.joinroom();
        }
      });
    }, 500)
  }
  joinroom() {

    clearInterval(this.waitRoomCreation);
    console.log("Joining Room")
    this.changing.detectChanges();

    this.joinblock = false
    this.roomlist = true

    // this.socket.emit('join', this.roomid);
    this.connection.isInitiator = false;
    this.connection.join(this.roomid);
    console.log("Streams: ", this.Streams);
  }

  openroom() {
    this.changing.detectChanges();
    const self = this;
    self.connection.openOrJoin(self.roomid, function (isRoomCreated, roomid, error) {
      if (self.connection.isInitiator === true) {
        console.log("You created the room.")
      } else {
        console.log("You joined the room.")
      }
      console.log("Streams: ", self.Streams);
    });
  }

  AddListeners = () => {
    const self = this;
    self.connection.onUserStatusChanged = function (event) {
      let users = [];
      console.log("Participants: ", self.connection.getAllParticipants());
      // self.connection.getAllParticipants().forEach(function (i) {
      //   console.log("Participant: ", i);

      // });
      // console.log("Users: ", users)
    };

    self.connection.onunmute = function (e) {
      e.mediaElement.removeAttribute('poster');
      e.mediaElement.srcObject = e.stream;
    };
    self.connection.onopen = function (event) {

      self.connection.onUserStatusChanged(event);

      self.connection.send({
        showMainVideo: true
      }, event.userid);

    };

    self.connection.onPeerStateChanged = function (state) {
      if (state.iceConnectionState.search(/closed|failed/gi) !== -1) {

      }
    };

    self.connection.onclose = function (event) {
    };
    self.connection.onEntireSessionClosed = function (event) {
      // tslint:disable-next-line: no-console
      console.info('Entire session is closed: ', event.sessionid, event.extra);
    };
    self.connection.onleave = function (event) {
      if (self.Streams.length) {
        self.Streams.forEach((i, index) => {
          if (i.stream.active) { console.log('stream is present'); } else {
            self.Streams.splice(index, 1);

          }
        });
      }

    };

    self.connection.onstreamended = function (e) {
      if (self.Streams.length) {
        self.Streams.forEach((i, index) => {
          if (e.userid === i.userid) { self.Streams.splice(index, 1); }
        });
      }
    };
    self.connection.onMediaError = function (error) {
    };
    self.connection.onstream = function (event) {
      self.Streams.push(event);
    };

  }

  ShowCallMembers(users) {
    let callusers = [];
    for (let user of users) {
      user.extra.isFriend = false;
      for(let calluser of this.callListUsers) {
        if(calluser._id == user.extra.id) {
          user.extra.isFriend = true;
        }
        else if(user.extra.id == this.loginuserdata.id) {
          user.extra.isFriend = true;
        }
      }
      callusers.push(user.extra);
    }
    console.log("Call Members: ", callusers);
  }

  ngOnDestroy() {

    if (this.solovideocallTimeout) {
      this.solovideocallTimeout.unsubscribe();
    }

    if (this.solovideoCallEndNotify) {
      this.solovideoCallEndNotify.unsubscribe();
    }

    if (this.solovideoCallRejectNotify) {
      this.solovideoCallRejectNotify.unsubscribe();
    }

    if (this.getFriends) {
      this.getFriends.unsubscribe();
    }

    if (this.invalidCallRedirect) {
      this.invalidCallRedirect.unsubscribe();
    }

    if (this.solovideocallend) {
      this.solovideocallend.unsubscribe();
    }

  }

}



