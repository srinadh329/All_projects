import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, NgZone, TemplateRef, ɵConsole, HostListener, } from '@angular/core'
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar, MatDialog, MatChipInputEvent } from '@angular/material';
import { FrontEndConfig } from 'src/app/frontendconfig';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from 'ng2-image-compress';
import { GroupsService } from 'src/app/services/groups.service';
import { LoginComponent } from '../login/login.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MapviewComponent } from '../mapview/mapview.component';
import { config } from '../configFile';
import { EmojiComponent } from '../emoji/emoji.component'
import { COMMA, ENTER, F1 } from '@angular/cdk/keycodes';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';
import { CameraComponent } from '../camera/camera.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { element } from 'protractor';
import { CallComponent } from '../call/call.component';
import * as DetectRTC from 'detectrtc';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as moment from 'moment';
import { doesNotThrow } from 'assert';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])


  ]
})
export class MainComponent implements OnInit {
  msg: any;
  fwdsearch: any
  subscription: Subscription
  userMessage: any = []
  usermsg:any
  user;
  list;

  sample;
  hideuserdata;
  frwdmsggroups;
  selectedgrpfrwdgrpid: any = [];
  loginuserdata;
  selectall: any;
  id;
  msgIndicator;
  chatoffdata;
  Countt = 0;
  countt = 0;
  emailSentMsg;
  incognitoRes;
  videocallResponse;
  videocallres=null;
  incognitoo: boolean = false;
  videocallll: boolean = false;
  incognitores;
  Staredmessage: any;  // this is for star messages
  searchTerm: any;
  forwardlistusers;
  forwardmsgdata;         // this is for forward message
  listofusersfrwdmsgEmails = []; // this is for listusers emails data for sending forward msg 
  listofusersfrwdmsgId = []; // this is for listusers id's data for sending forward msg
  frwdmsglistusers = []; // This is for forward message search listusers data
  x;  // This is for forward message search listusers data
  currentuser
  listusers;
  chatbuttonoff
  data;
  profiledata;
  sendMess: String
  receviedMess;
  groupcount: any = null;
  hideEmail; // this is for hide user
  replying; // this is for replying to exact message
  incognitoBlockState;
  _id;
  name;
  userProfilepic;
  test;
  showModal;
  display
  imgmimetype = ["image/apng", "image/bmp", "image/gif", "image/jpg", "image/jpeg", "image/png", "image/tiff", "image/webp"];
  audiomimetype = ["audio/mpeg", "audio/ogg", "audio/wav", "audio/mp3"];
  videomimetype = ["video/mp4", "video/ogg", "video/webm"];
  docmimetype = ["application/msword", "text/csv", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  blockdfltdata
  isMedia: boolean = false;
  starmsg1: boolean = false;
  message: String
  searchValue: string = '';
  counter = 0;
  uploadedFilePath: string = null;
  userForm = [];
  serverurl; // form image path url
  BlockedByReceiver: Boolean = false
  BlockedBySender: Boolean = false;
  flag: boolean = false;
  Pos: number;
  fileuploadlist: any = [];
  enablesend: any = true;
  imageLoader = true;
  message3
  // @Output() sentMessage = new EventEmitter();
  // @ViewChild('scroll', { static: false }) scroll: ElementRef //Scroll down messages
  // To open the fwdmsg dialog box
  @ViewChild('DismissCallModal',{static: false}) DismissCallModal: ElementRef;
  @ViewChild('calllogModal', { static: false }) calllogModal: TemplateRef<any>;
  @ViewChild('fwdMsgModal', { static: false }) fwdMsgModal: TemplateRef<any>;
  // Groupsmodal
  @ViewChild('groupsModal', { static: false }) groupsModal: TemplateRef<any>;
  @ViewChild('imgRenderer', { static: false }) imgRenderer: ElementRef;
  // For Groups forward message
  @ViewChild('forwardGMessages', { static: false }) forwardGMessages: TemplateRef<any>;
  deletingMessage;
  chatuserdata: any;
  chatuserid: any;
  // order:any
  staredMessage: any;
  userdata: any;
  unstaredMessage: any;
  selectphoto: any;
  blockResponse: any;
  blockinguser;
  msgindex;
  // scroll: ScrolldownDirective;

  isRecording = false; // is audio recording boolean
  recordedTime; // time of recording
  blobUrl; // url of the audio
  blobdata; // user audio data
  audiodata;
  audiotitle;
  location = null;
  locationlink
  locationurl = null;
  locationlabel = null;
  blockdata: any;
  blockingRes;
  urls = [];
  roleid
  dragFiles = [];
  snackcounter = 0;
  files: NgxFileDropEntry[] = [];
  scrolltop: any
  showIput;
  Userdetails;
  Userselected;
  priorityResponse
  selectedUser: any;
  chatuser;
  calllog: any = []
  Userlastmessage;
  searchenable: boolean = false;
  response: any;
  EmailId;
  invitefriendres: any;
  emailcheck: Boolean = false;
  regresponse: any;
  alreadyreg: Boolean;
  activehideuserslist: any;
  change: any;
  Groups: any = [];
  selectedGroup: any;
  deletecontact;
  divheight: number;
  weburl: any;
  viewcontact: boolean;
  message2: any;
  gotlocation: any;
  firstGroup: any;
  groupMembersCount: any;
  groupMembersInfo: any;
  groupMessages: any;
  firstGroupId: any;
  publicgroup: boolean = true;
  count;
  selectedEmoji: any;
  gInformation: any;
  showemoji: boolean;
  invitationview;
  personadd;
  index;
  slidedata1;
  imagePreview;
  nogdata;
  GroupName;

  info;
  Emailid;
  nodata;
  searchterm: any;
  filesToUpload: Array<File> = [];
  group;
  length: any;
  cursorPos: number = 0;
  groupcreated: boolean;
  mediatype;
  flag1:boolean
  // for unsubscribing observable
  autoRefreshFriends: Subscription;
  autoRefreshMessage: Subscription;
  autoRefreshRemoveMessage: Subscription;
  autorefreshgroupmessages: Subscription;
  autoRefreshRenameGroup: Subscription;
  autoRefreshLeaveGroup: Subscription;
  AutoRefreshMemberStatus: Subscription;
  AutoRefreshGroups: Subscription;
  IcognitoShowRes: Subscription;
  IcognitoDelRes: Subscription;
  IcognitoReject: Subscription;
  IcognitoChatAccept: Subscription;
  IcognitoChat: Subscription;
  getFriends: Subscription;
  autoRefreshPriorityRes: Subscription;
  autoRefreshDelAllMsg: Subscription;
  autoRefreshBlockdata: Subscription;
  autoMessageReceipt: Subscription;
  autoRefreshUndoMessage: Subscription;
  incognitopopupshow: boolean = false;
  // mediatype;
  chtheight: number;
  userid
  loginUser: any;
  emojiobservable: Subscription;
  editUserdata: any;
  selectedmessage: any
  autoRefreshGroupEditMessage: Subscription;
  autoRefrshEditedMessage: Subscription;
  autoRefreshGroupDeleteMessage: Subscription;
  autoRefreshGroupClearData: Subscription;
  searchTerm1: any;
  imageToCompress: any = [];
  starGroupMessages: any;
  Gps: any;
  autoRefreshGroupUnstrarMessage: Subscription;
  autoRefreshStarStatusGroupMessage: Subscription;
  arrowup: boolean;
  camerawidth: number;
  cameraheight: number;
  videocallenable: boolean = true;
  activeusershide: string = 'in';
  grp: any;
  firstGroupPic: any = null;
  call: any;
  autoRefreshMuteGroup: Subscription;
  autoRefreshStarGroup: Subscription;
  listStatus =[];
  autoRefreshBlockGroup: Subscription;
  mystatus;
  currentStatusID: any;
  
  Statusfetch: boolean = false;
  statususer: any = [];
  statusunread: boolean = false;
  statusread: boolean = false;
  statusmuted: boolean = false;
  calldata: any=null;
  deletedcontact: any;
  checkTimeout: boolean;
  solovideoCall: Subscription;
  solovideocallwaitingNotify: Subscription;
  fetchcalllogs: Subscription;

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.tabclose(this.loginuserdata)
  }

  constructor(private imgCompressService: ImageCompressService, private groupService: GroupsService,
    private dialogbox: MatDialog,
    private frontendconfig: FrontEndConfig,
    private zone: NgZone,
    private cdref: ChangeDetectorRef,
    private userService: UserService,
    private messageService: MessageService,
    private snackbar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private router: ActivatedRoute,
    private route: Router,
    private configs: config,

    public dialog: MatDialog) {
    this.weburl = this.configs.getWeburl();
    this.videocallll=false;
    this.videocallres = null;
    localStorage.removeItem('CallObject')
    this.roleid = JSON.parse(localStorage.getItem('userdetails'));
    this.loginuserdata = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Login User data: ", this.loginuserdata.id)
    //Fetch call log start

    this.fetchcalllogs=this.userService.fetchcalllogs(this.loginuserdata.id).subscribe((calls: any) => {
      console.log("Calls: ",calls);

      for(let call of calls) {
        let callrecord = {id: null, RoomID: null, type1:null, type2:null, start:null, end:null, duration:null, Caller:null, Receiver:[]};
        if (call.SenderID._id == this.loginuserdata.id) {
          callrecord.type1 = 'Outgoing';
        }
        else {
          callrecord.type1 = 'Incoming';
        }
        callrecord.id = call._id;
        callrecord.RoomID = call.RoomID
        callrecord.type2 = call.CallType;
        callrecord.start = moment(call.CallStartedAt).format('MMMM Do YYYY, hh:mm a');
        if (call.CallEndedAt != null) {
          callrecord.end = moment(call.CallEndedAt).format('MMMM Do YYYY, hh:mm a');
          var duration = Math.floor((new Date(call.CallEndedAt).getTime() - new Date(call.CallStartedAt).getTime()) / 1000);
          callrecord.duration = {
            days: Math.floor(duration / 86400),
            hours: Math.floor((duration % 86400) / 3600),
            mins: Math.floor((duration % 3600) / 60),
            secs: Math.floor((duration % 60))
          }
        }
        else {
          callrecord.end = null;
        }
        callrecord.Caller = call.SenderID;
        for (let receiver of call.ReceiverID) {
          callrecord.Receiver.push(receiver);
        }
        this.calllog.push(callrecord)
      }
      console.log("Call log: ", this.calllog);
    })

    this.autoRefreshFriends = this.messageService.autorefreshFriends().subscribe(data => {
      if (data.senderId._id == this.id || data.receiverid._id == this.id) {
        this.listusers.push(data);
        console.log("Updated Listusers: ",this.listusers)
      }
    });

    this.solovideocallwaitingNotify=this.messageService.solovideocallwaitingNotify().subscribe((data:any) => {
      console.log("solovideocallwaitingNotify: ",data);
      let msg = 'Waiting for '+data.ReceiverID[0].id.Name+" to join. Please wait!!";
      if(data.SenderID._id == this.loginuserdata.id) {
        this.zone.run(() => {
          this.snackbar.open(msg, "x", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        });
      }
    })

    this.messageService.solovideoCallEndNotify().subscribe((data:any) => {
      console.log("Main Video Call End: ", data);
      this.addtoCalllogSolo(data);
      let msg='';
      if(this.loginuserdata) {
        if(data.ReceiverID[0].id._id == this.loginuserdata.id) {
          this.videocallll = false;
          this.videocallres = null;
          if(this.DismissCallModal) {
            this.DismissCallModal.nativeElement.click()
          }
          this.checkTimeout=false;
          if(data.usertype == 'caller') {
            msg = data.SenderID.Name+' has ended the call.';
            this.zone.run(() => {
              this.snackbar.open(msg, "x", {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
        }
        else if(data.SenderID._id == this.loginuserdata.id) {
          this.videocallenable = false;
          if(data.usertype == 'receiver') {
            msg = data.ReceiverID[0].id.Name+' has ended the call.';
            this.zone.run(() => {
              this.snackbar.open(msg, "x", {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
        }
      }
    })

    this.messageService.solovideocallTimeoutSocket().subscribe((data:any) => {
      console.log("Solo Video Call Timeout: ",data)
      this.videocallll = false;
      if(this.loginuserdata) {

        //Caller Code
        if(data.SenderID._id == this.loginuserdata.id) {
          let msg = data.ReceiverID[0].id.Name+" didn't answer the call.";
          this.zone.run(() => {
            this.snackbar.open(msg, "x", {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
          this.videocallenable = false;
          this.addtoCalllogSolo(data);
        }
        //Receiver Code
        else if(data.ReceiverID[0].id._id == this.loginuserdata.id) {
          if(this.DismissCallModal) {
            this.DismissCallModal.nativeElement.click()
          }
          this.addtoCalllogSolo(data);
        }
      }

    })

    this.messageService.solovideocallreceivererrorNotify().subscribe((data:any) => {
      console.log("solovideocallreceivererror: ",data);
      let msg = data.ReceiverID[0].id.Name+" is unable to accept the call due to technical reasons. Please try again later.!!";
      if(this.loginuserdata) {
        if(data.SenderID._id == this.loginuserdata.id) {
          this.zone.run(() => {
            this.snackbar.open(msg, "x", {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
          this.videocallenable = false;
          this.addtoCalllogSolo(data);
        }
        else if(data.ReceiverID[0].id._id == this.loginuserdata.id) {
          this.videocallll=false;
          if(this.DismissCallModal) {
            this.DismissCallModal.nativeElement.click()
          }
          this.videocallres=null;
          this.checkTimeout = false;
          this.addtoCalllogSolo(data)
        }
      }
    })

    this.messageService.solovideoCallAcceptNotify().subscribe((data:any) => {
      console.log("solovideoCallAcceptNotify: ",data);
      let msg = data.ReceiverID[0].id.Name+" has joined the call.";
      if(this.loginuserdata) {
        if(data.SenderID._id == this.loginuserdata.id) {
          this.zone.run(() => {
            this.snackbar.open(msg, "x", {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
        }
        else if(data.ReceiverID[0].id._id == this.loginuserdata.id) {
          this.checkTimeout = false;
        }
      }
      this.addtoCalllogSolo(data);
    })

    this.messageService.solovideoCallRejectNotify().subscribe((data:any) => {
      console.log("solovideoCallRejectNotify: ",data);
      let msg = data.ReceiverID[0].id.Name+" has declined the call.";
      if(this.loginuserdata) {
        if(data.SenderID._id == this.loginuserdata.id) {
          this.videocallenable = false;
          this.zone.run(() => {
            this.snackbar.open(msg, "x", {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
        }
        else if(data.ReceiverID[0].id._id == this.loginuserdata.id) {
          this.videocallll = false;
          if(this.DismissCallModal) {
            this.DismissCallModal.nativeElement.click()
          }
          this.videocallres = null;
          this.checkTimeout = false
        }
      }
      this.addtoCalllogSolo(data);
    })

    // video calls one to one() 
    this.solovideoCall=this.messageService.solovideoCall().subscribe((data:any) => {
      if(this.chatuser) {
        console.log("ChatUser: ",this.chatuser);
        localStorage.setItem('switchToUser', this.chatuser._id);
      }
      for(let receiver of data.ReceiverID) {
        console.log("Receiver: ",receiver);
        console.log("LoginuserData: ",this.loginuserdata);
        if(receiver.id._id == this.loginuserdata.id) {
          this.videocallres = data;
          this.videocallll = true;
          DetectRTC.load(function () {
              let f1 = true, f2 = true, f3 = true;
              if (DetectRTC.isWebRTCSupported === false) {
                this.videocallll = false;
                this.videocallres = null;
                this.receivercallstatus='Unable to receive call due to technical reasons.'
                this.zone.run(() => {
                  this.snackbar.open(`Your browser doesn't support Video Calls. Please switch to another browser.`, "x", {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                  });
                });
              }
              else {
                if (DetectRTC.hasMicrophone === false) {
                  f1 = false;
                  this.videocallll = false;
                  if(this.DismissCallModal) {
                    this.DismissCallModal.nativeElement.click()
                  }
                  this.videocallres = null;
                  this.receivercallstatus='Unable to receive call due to technical reasons.'
                }
                if (DetectRTC.hasWebcam === false) {
                  f2 = false;
                  this.videocallll = false;
                  if(this.DismissCallModal) {
                    this.DismissCallModal.nativeElement.click()
                  }
                  this.videocallres = null;
                  this.receivercallstatus='Unable to receive call due to technical reasons.'
                }
                if (DetectRTC.hasSpeakers === false) { // checking for "false"
                  f3 = false;
                  this.videocallll = false;
                  if(this.DismissCallModal) {
                    this.DismissCallModal.nativeElement.click()
                  }
                  this.videocallres = null;
                  this.receivercallstatus='Unable to receive call due to technical reasons.'
                }
                /*
                f1 - Microphone
                f2 - Webcam
                f3 - Speaker
                */
      
                if (!f1 && !f2 && !f3) {
                  this.zone.run(() => {
                    this.snackbar.open(`Microphone, Webcam and Speakers are being used by another process or not connected. Unable to call.`, "x", {
                      duration: 5000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  });
                }
                else if (!f1 && !f2) {
                  this.zone.run(() => {
                    this.snackbar.open(`Microphone and Webcam are being used by another process or not connected. Unable to call.`, "x", {
                      duration: 5000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  });
                }
                else if (!f1 && !f3) {
                  this.zone.run(() => {
                    this.snackbar.open(`Microphone and Speaker are being used by another process or not connected. Unable to call.`, "x", {
                      duration: 5000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  });
                }
                else if (!f2 && !f3) {
                  this.zone.run(() => {
                    this.snackbar.open(`Webcam and Speaker are being used by another process or not connected. Unable to call.`, "x", {
                      duration: 5000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  });
                }
                else if (!f1) {
                  this.zone.run(() => {
                    this.snackbar.open(`Microphone is being used by another process or not connected. Unable to call.`, "x", {
                      duration: 5000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  });
                }
                else if (!f2) {
                  this.zone.run(() => {
                    this.snackbar.open(`Webcam is being used by another process or not connected. Unable to call.`, "x", {
                      duration: 5000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  });
                }
                else if (!f3) {
                  this.zone.run(() => {
                    this.snackbar.open(`Speaker is being used by another process or not connected. Unable to call.`, "x", {
                      duration: 5000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  });
                }
              }      
          });
          console.log("Final Videocall: ",this.videocallll)
          if(this.videocallll) {
            if(this.loginuserdata) {
              this.messageService.solovideocallwaiting(data).subscribe((res:any) => {
                console.log(res);
                this.checkTimeout = true;
                setTimeout(()=> {
                  if(this.checkTimeout) {                    
                    this.messageService.solovideocallTimeout(data).subscribe((resp:any) => {
                      console.log(resp);
                      this.videocallll = false;
                      this.checkTimeout = false;
                    })
                  }
                },60000)
              })
            }
          }
          else {
            if(this.loginuserdata) {
              this.messageService.solovideocallreceivererror(data).subscribe((data:any) => {
                console.log(data);
              })
            }
          }

          console.log("Videocallres: ",this.videocallres);
          localStorage.setItem('CallObject', JSON.stringify(data));
          // localStorage.setItem('CallerStatus', JSON.stringify('VideoCall.caller'));
          document.getElementById("videocalll").click();

        }
      }
      this.addtoCalllogSolo(data);
    })
//


    // tab close event
    this.messageService.tabclosingg().subscribe(data => {
      let Data = data;
      if (this.chatuser.EmailId == Data.EmailId) {
        this.chatuser.loginStatus = Data.loginStatus;
        this.chatuser.updatedAt = Data.updatedAt
      }
      for (let i = 0; i < this.listusers.length; i++) {
        if (this.listusers[i].senderId.EmailId == Data.EmailId) {
          this.listusers[i].senderId.loginStatus = Data.loginStatus
          this.listusers[i].senderId.updatedAt = Data.updatedAt
        } else if (this.listusers[i].receiverid.EmailId == Data.EmailId) {
          this.listusers[i].receiverid.loginStatus = Data.loginStatus
          this.listusers[i].receiverid.updatedAt = Data.updatedAt
        }
      }
    })

    // refresh event 
    this.messageService.refreshfunc().subscribe(data => {
      if (this.chatuser) {
        if(this.chatuser.EmailId == data.EmailId) {
          this.chatuser.loginStatus = data.loginStatus;
        }

      }
      if (this.listusers) {
        for (let i = 0; i < this.listusers.length; i++) {
          if (this.listusers[i].senderId.EmailId == data.EmailId) {
            this.listusers[i].senderId.loginStatus = data.loginStatus
          } else if (this.listusers[i].receiverid.EmailId == data.EmailId) {
            this.listusers[i].receiverid.loginStatus = data.loginStatus
          }
        }
      }
    });

    // This is for message typing indicator
    this.messageService.msgTypingIndicato().subscribe(data => {
      this.msgIndicator = data
      setTimeout(() => {
        this.msgIndicator = null
      }, 100);
    })

    // this.messageService.userStatusUpdate().subscribe((data:any) => {
    //   console.log("User Status Data: ",data);
    //   if(data.userId==this.loginuserdata.id) {
    //     for(let status of this.mystatus.status) {
    //       if(status._id==data._id) {
    //         status.likedBy=data.likedBy;
    //         status.comments=data.comments;
    //         status.isLiked = false;
    //         if(status.likedBy.length>0) {
    //           for(let id of status.likedBy) {
    //             if(id == this.loginUser.id) {
    //               status.isLiked = true;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   else {
    //     console.log("Service List Status: ",this.listStatus);
    //     for (let user of this.listStatus) {
    //       if(user.id==data.userId) {
    //         for(let status of user.status) {
    //           if(status._id==data._id) {
    //             // status.likedBy=data.likedBy;
    //             break;
    //           }
    //         }
    //         break;
    //       }
    //     }
    //   }

    // })

    this.messageService.userstatuscomment().subscribe((data: any) => {
      console.log("Main comment emit: ",data)

      let flag =false;
        if(data.userId._id == this.loginuserdata.id) {
          for(let status of this.mystatus.status) {
            if(status._id == data._id) {
              status.comments = data.comments;
              console.log("Updated Status comment: ",status);
            }
          }
        }

            for(let user of this.listStatus) {
              if(user.id == data.userId._id) {
                for(let status of user.status) {
                  if(status._id == data._id) {
                    status.comments = data.comments;
                    console.log("Updated Status comment: ",status);
                  }
                }
              }
            }
      console.log("Status comment Data: ", data);
      if (this.listStatus.length > 0) {
        console.log("ListStatus like: ", this.listStatus);
      }

  })

    this.messageService.userstatuslike().subscribe((data: any) => {

        let flag =false;
          if(data.userId._id == this.loginuserdata.id) {
            for(let status of this.mystatus.status) {
              if(status._id == data._id) {
                status.likedBy = data.likedBy;
                console.log("Updated Status like: ",status);
              }
            }
          }

              for(let user of this.listStatus) {
                if(user.id == data.userId._id) {
                  for(let status of user.status) {
                    if(status._id == data._id) {
                      status.likedBy = data.likedBy;
                      console.log("Updated Status like: ",status);
                    }
                  }
                }
              }
        console.log("Status Like Data: ", data);
        if (this.listStatus.length > 0) {
          console.log("ListStatus like: ", this.listStatus);
        }

    })

    this.messageService.userstatusSeen().subscribe((data:any)=> {
      console.log("Status Seen: ", data);
      console.log("ListStatus: ",this.listStatus)
      for(let user of this.listStatus) {
        if(user.id == data.userId._id) {
          console.log("User Matched.");
          for(let status of user.status) {
            if(status._id == data._id) {
              console.log("Status Matched.");
              status.SeenBy = data.SeenBy;
              status.isUnread = false;
            }
          }
          let flag = null,temp=null;
          for(let i=0;i<user.status.length - 1;i++) {
            if(user.status[i].isUnread == false) {
              flag = false;
              for(let j=i+1;j<user.status.length;j++) {
                if(user.status[i].isUnread == true) {
                  flag = true;
                  temp= user.status[i];
                  user.status[i] = user.status[j];
                  user.status[j] = temp;
                  break;
                }
              }
              if(flag = false) {
                break;
              }
            }
          }
        }
        if(user.status[0].isUnread == true) {
          user.isUnread = true;
        }
        else if(user.status[0].isUnread == false) {
          user.isUnread = false;
        }
      }
      let flag2=null,temp2=null;
      for(let i=0; i<this.listStatus.length - 1; i++) {
        if(this.listStatus[i].isUnread == false) {
          flag2 = false;
          for(let j = i+1;j<this.listStatus.length;j++) {
            if(this.listStatus[j].isUnread == true) {
              flag2 = true;
              temp2 = this.listStatus[i];
              this.listStatus[i] = this.listStatus[j];
              this.listStatus[j] = temp2;
              break;
            }
          }
        }
        if(flag2 == false) {
          break;
        }
      }
      this.statusunread = false;
          this.statusread = false;
          this.statusmuted = false;
          console.log("List Status: ",this.listStatus);
          for(let status of this.listStatus) {
            console.log("Is Unread Liststatus: ",status);
            if(status.isMuted == true) {
              this.statusmuted = true;
            }
            else {
              if(status.isUnread == true) {
                this.statusunread = true;
              }
              else {
                this.statusread = true;
              }
            }
          }
    })


    // This is for userstatus emit 
    this.messageService.userstatusEmit().subscribe(data => {
      data.isUnread = true;
      // console.log("Status User: ", this.statususer);
      console.log("Status Emit: ", data);
      console.log("List Status : ", this.listStatus);

      if (data.userId._id == this.loginuserdata.id) {
        data.isUnread = false;
        this.mystatus.status.push(data);
        this.cdref.markForCheck();
        for (let k = 0; k < this.mystatus.status.length - 1; k++) {
          this.mystatus.status[k + 1] = this.mystatus.status[k];
          this.cdref.markForCheck();
        }
        this.mystatus.status[0] = data;
        this.cdref.markForCheck();
      }
      else {
        data.isUnread = true;
        let userstatusexists = false;
        //If previous status exists for the user
        for (let i = 0; i < this.listStatus.length; i++) {
          if (data.userId._id == this.listStatus[i].id) {

            userstatusexists = true;
            let temp = this.listStatus[i];
            temp.isUnread = true;
            temp.status.push(data);

            //Move newly created status to the top
            for (let k = 0; k < temp.status.length - 1; k++) {
              temp.status[k + 1] = temp.status[k];
            }
            temp.status[0] = data;

            //Move the user status to the top
            for (let j = i - 1; j >= 0; j--) {
              this.listStatus[j + 1] = this.listStatus[j];
            }
            this.listStatus[0] = temp;
            this.cdref.markForCheck();
            break;
          }
        }

        //Users not having existing status
        if (userstatusexists == false) {
          for (let user of this.statususer) {
            console.log("USER: ",user);
            if(user.id == data.userId._id) {
              let temp = {id: data.userId._id, Name: data.userId.Name, EmailId: data.userId.EmailId, isUnread: true, isMuted: user.isMuted, status: []};
              temp.status.push(data);
              this.listStatus.push(temp);
              this.cdref.markForCheck();
              for(let i=0;i<this.listStatus.length-1;i++) {
                this.listStatus[i+1] = this.listStatus[i];
                this.cdref.markForCheck();
              }
              this.listStatus[0]=temp;
              this.cdref.markForCheck();
              break;
            }
          }
        }
      }
      this.statusunread = false;
          this.statusread = false;
          this.statusmuted = false;
          console.log("List Status: ",this.listStatus);
          for(let status of this.listStatus) {
            if(status.isMuted == true) {
              this.statusmuted = true;
            }
            else {
              if(status.isUnread == true) {
                this.statusunread = true;
              }
              else {
                this.statusread = true;
              }
            }
          }
      //Code for users with no status but in status user
      // console.log("Status: ", this.listStatus);
    })
      // let flag = false, flag2 = false, statusExists = false, temp = null, statusPushed = false;
      // console.log("Status Fetch: ", this.Statusfetch)
      // if (this.Statusfetch && data.userId != this.id) {
      //   console.log("emit status", data);
      //   console.log("Status User: ", this.statususer);
      //   console.log("Status List: ", this.listStatus);

      //   for (let user of this.listStatus) {

      //     //Checking if user exists in Status list
      //     if (user.id == data.userId) {
      //       statusExists = true;

      //       //Adding User Status
      //       user.status.push(data);
      //       statusPushed = true;
      //       console.log("Status List: ", user);

      //       //Sort Status list for user
      //       for (let i = 0; i < user.status.length - 1; i++) {
      //         flag = false;
      //         if (user.status[i].isUnread == false) {
      //           for (let j = i + 1; j < user.status.length; j++) {
      //             if (user.status[j].isUnread == true) {
      //               flag = true;
      //               temp = user.status[i];
      //               user.status[i] = user.status[j];
      //               user.status[j] = temp;
      //               break;
      //             }
      //           }
      //         }
      //         if (flag == false) {
      //           break;
      //         }
      //       }
      //       if (user.status[0].isUnread == true) {
      //         user.isUnread = true;
      //       }
      //     }
      //   }

      //   if (statusExists == false) {
      //     for (let i=0;i<this.statususer.length;i++) {
      //       if(this.statususer[i].id==data.userId) {
      //         this.listStatus.push({id: this.statususer[i].id, Name: this.statususer[i].Name, isUnread: true, status:[data]})
      //         statusPushed = true;
      //       }
      //     }
      //   }

      //   //Pushing users with unread status on top
      //   if(statusPushed == true) {
      //     for (let i = 0; i < this.listStatus.length - 1; i++) {
      //       if (this.listStatus[i].isUnread == false) {
      //         for (let j = i + 1; j < this.listStatus.length; j++) {
      //           if (this.listStatus[j].isUnread == true) {
      //             flag2 = true;
      //             temp = this.listStatus[i];
      //             this.listStatus[i] = this.listStatus[j];
      //             this.listStatus[j] = temp;
      //             break;
      //           }
      //         }
      //       }
      //       if (flag2 == false) {
      //         break;
      //       }
      //     }
      //   }
      // }
    // })

    this.autoRefreshMessage = this.messageService.autoRefresMessage().subscribe(data => {
      if ((data.receiverId == this.userid && data.senderId == this.id) || (data.receiverId == this.id && data.senderId == this.userid)) {
        this.userMessage.push(data);
        setTimeout(() => {
          var test = document.getElementById("test");
          if (test && test.scrollHeight) this.scrolltop = test.scrollHeight;
        }, 100);
        if(this.userMessage)
        {
        for(let message of this.userMessage)
        {
        if(message.deletingMsgstatus == 'value will be updated')
        {
        this.flag1=true
        }
        else
        {
        this.flag1=false
        }
        }
        }
      }

      if (data.receiverId == this.loginuserdata.id && this.userid != data.senderId) {
        // This is for chatlist emit function when user sends the message
        this.userService.getFriends(this.id).subscribe(users => {
          this.listusers = users;
          console.log("listusers: ",this.listusers);

        });
        var index = this.listusers.findIndex(x => (x.senderId._id == data.senderId) || (x.receiverid._id == data.senderId))
        console.log(this.userid, this.chatuser._id);

        if (this.userid != this.chatuser._id) {
          this.listusers[index].count = this.listusers[index].count + 1;
        }
      }

      // This is for msg read reciepts
      if (data.receiverId == this.loginuserdata.id && (this.userid == data.senderId || this.userid == data.senderId)) {
        this.messageService.msgSeen(data).subscribe(data1 => {
          console.log(data1)
        })
      }
      this.mediatype = data
      console.log(this.mediatype);
      //  var index = this.userMessage.findIndex(x=>x._id == data.parentId)
      //  {
      //   console.log("123",index);
      //   if (index) this.userMessage[index] = data.message
      //   console.log("123456789", this.userMessage[index-1]);

      //  }

    });

    // This is for message remove faviourite
    this.messageService.messageRemoveFavouite().subscribe(data => {
      let Data = data;
      for (var i = 0; i < this.userMessage.length; i++) {
        if (this.userMessage[i]._id == Data._id) {
          this.userMessage.splice(i, 1, Data)
        }
      }
    })
 
      // This is for  when user deleted the contact then updating deleted contact  users list
      this.messageService.Deletecontactemit().subscribe(data=>{
        console.log("Data103111111111",data)
        if(data.Data2.receiverid == this.loginuserdata.id){
          this.listusers=data.Data1
          this.deletedcontact = data.Data1
        if (this.deletedcontact.length != 0) {
          if (this.loginuserdata.id == this.deletedcontact[0].receiverid._id) {
            this.selectedUser = this.deletedcontact[0];
            console.log("hellooooooo",this.selectedUser)
            this.route.navigate(['/navbar/main'], { queryParams: { id: this.selectedUser._id, userid: this.selectedUser.senderId._id, value: false } });
          } else {
            this.selectedUser = this.deletedcontact[0]
            console.log("hellooooooo1",this.selectedUser)
            this.route.navigate(['/navbar/main'], { queryParams: { id: this.selectedUser._id, userid: this.selectedUser.receiverid._id, value: false } });
          }
        }
        }
       })

    // This is for incognito block emit response
    this.messageService.incognitoblockemit().subscribe(data => {
      console.log("contact name changing",data)
      for(var i=0;i<this.listusers.length;i++){
        if(this.listusers[i]._id == data._id){
          this.listusers.splice(i,1,data)
        }
      }

        // if (this.loginuserdata.id == data.receiverid._id ) {
        //   this.selectedUser = data;
        //   console.log("this.selectedddd",this.selectedUser)
        //   this.route.navigate(['/navbar/main'], { queryParams: { id: this.selectedUser._id, userid: this.selectedUser.senderId._id, value: false } });
        // } else if( this.loginuserdata.id == data.senderId._id) {
        //   this.selectedUser = data
        //   console.log("this.seleeeeeeeeeee",this.selectedUser)
        //   this.route.navigate(['/navbar/main'], { queryParams: { id: this.selectedUser._id, userid: this.selectedUser.receiverid._id, value: false } });
        // }

      
      if (data.fromblockingStatus == 'blocked' || data.toblockingStatus == 'blocked') {
        this.incognitopopupshow = true
      } else {
        this.incognitopopupshow = false
      }
    })

    this.subscription = this.userService.sendObs().subscribe(msg => {
      this.msg = msg
      // this.chatuser=msg.chat;
      if (this.msg.receiverid._id == this.id && this.msg.BlockedByReceiver) this.msg.block = true;
      else if (this.msg.senderId._id == this.id && this.msg.BlockedBySender) this.msg.block = true;
      else this.msg.block = false;
    });
    this.serverurl = this.frontendconfig.getserverurl(); // for image url
    this.display = 'none'

    this.loginuserdata = JSON.parse(localStorage.getItem('currentUser'));
    this.id = this.loginuserdata.id;
    this.EmailId = this.loginuserdata.EmailId
    this.createSlug(this.loginuserdata)


    this.autoRefreshRemoveMessage = this.messageService.autoRefreshRemoveMessage().subscribe(data => {
      if (this.userMessage) {
        for(let message of this.userMessage)
        {
        if(message.deletingMsgstatus == 'value will be updated')
        {
        this.flag1=true
        }
       else
        {
        this.flag1=false
        }
      }
    
        var index = this.userMessage.findIndex(x => x._id == data._id)
        if (index) this.userMessage[index] = data
      }

      if (this.Staredmessage) {
        var index = this.Staredmessage.findIndex(x => x._id == data._id)
        if (index) this.Staredmessage[index] = data
      }
    })

    this.autoRefreshUndoMessage = this.messageService.autoRefreshundoMessage().subscribe(data => {
      if (this.userMessage) {
        var index = this.userMessage.findIndex(x => x._id == data._id)
        if (index) this.userMessage[index] = data
      }

      if (this.Staredmessage) {
        var index = this.Staredmessage.findIndex(x => x._id == data._id)
        if (index) this.Staredmessage[index] = data
      }
    })

    this.messageService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.messageService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });


    // This is for msg read reciepts status by emit function
    this.autoMessageReceipt = this.messageService.autoMsgReadReciept().subscribe(data => {
      this.userMessage = data;
    })

    this.messageService.getRecordedBlob().subscribe((data) => {
      this.audiotitle = data.title;
      this.blobdata = data.blob;

      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.blobdata));
      let file = new File([this.blobdata], this.audiotitle, {
        type: "audio/wav"
      });
      const formData: any = new FormData();
      formData.append("uploads[]", file, file['name']);

      this.messageService.saveFiles(formData).subscribe(data => {
        this.audiodata = data;
        this.audiodata = this.audiodata[0]._id;
      });
    });

    this.autoRefreshBlockdata = this.messageService.autoRefreshBlockdata().subscribe(data => {
      this.blockdata = data
    });
 // This is for socket emit when deleting all messages
    this.autoRefreshDelAllMsg = this.messageService.autoRefreshDeletingAllMessages().subscribe(data => {
      this.userMessage = data
      if(this.userMessage){
      for(let message of this.userMessage){
      if(message.deletingMsgstatus == 'value will be updated'){
      this.flag1=true
      }else{
      this.flag1=false
         }
        }
       }
      })

    this.autoRefreshPriorityRes = this.messageService.autoRefreshPriorityResponse().subscribe(data => {
      if ((this.id == data.receiverid._id) || (this.id == data.senderId._id)) {
        this.priorityResponse = data;
        this.userService.getFriends(this.id).subscribe(users => {
          this.listusers = users;
        
        });
      }
    });

    this.getFriends = this.userService.getFriends(this.id).subscribe((users: any) => {
      this.listusers = users;
      console.log("List Users: ",this.listusers);
      this.statususer.push({id:this.loginuserdata.id,EmailId: this.loginuserdata.EmailId, Name: this.loginuserdata.Name, isMuted: false})
      // console.log( "List Users List: ",this.listusers);
      // console.log("LoginUserData: ",this.loginuserdata)
      for (let user of this.listusers) {
        if (user.receiverid._id == this.id) {
          this.statususer.push({ id: user.senderId._id,EmailId: user.senderId.EmailId, Name: user.senderId.Name, isMuted: user.fromUserStatusMute});
        }
        else if (user.senderId._id == this.id) {
          this.statususer.push({ id: user.receiverid._id, EmailId: user.receiverid.EmailId, Name: user.receiverid.Name, isMuted: user.ToUserStatusMute});
        }
      }
      console.log("Status User: ",this.statususer);
      // fetching status
      this.mystatus={id:this.loginuserdata.id, Name: this.loginuserdata.Name, status:[]}; 
      if(this.statususer.length>0) {
        this.userService.getStatus(this.statususer).subscribe((result: any) => {
          console.log("Fetch Status Result: ",result);
          let temp, flag = false, flag2 = false;
          if(result) {
            for(let res of result) {
              console.log("Fetched Status: ",res);
              if(res.id == this.loginuserdata.id) {
                this.mystatus = res;
              }
              else {
                this.listStatus.push(res);
              }            
            }
          }
          if(this.listStatus) {

            //Mark Unread Status
            for(let user of this.listStatus) {
              for(let i=0;i<user.status.length;i++) {
                user.status[i].isUnread = true;
                for(let id of user.status[i].SeenBy) {
                  // console.log("Seen By ID: ",id)
                  if(id._id == this.loginuserdata.id) {
                    user.status[i].isUnread = false;
                  }
                }
              }
              for(let i=0;i<user.status.length-1;i++) {
                if(user.status[i].isUnread == false) {
                  for(let j=i+1;j<user.status.length;j++) {
                    if(user.status[j].isUnread== true) {
                      flag2 = true;
                      temp = user.status[j];
                      user.status[j] = user.status[i];
                      user.status[i] = temp;
                      break;
                    }
                  }
                }
                if(flag2 == false) {
                  break;
                }
              }
            }

            //Mark user Unread
            for(let user of this.listStatus) {
              if(user.status[0].isUnread == true) {
                user.isUnread = true;
              }
              else {
                user.isUnread = false;
              }
            }
            
            //Move unread users to top
            for(let i=0;i<this.listStatus.length-1;i++) {
              if(this.listStatus[i].isUnread == false) {
                for(let j =i+1;j<this.listStatus.length;j++) {
                  if(this.listStatus[j].isUnread == true) {
                    flag = true;
                    temp = this.listStatus[i];
                    this.listStatus[i] = this.listStatus[j];
                    this.listStatus[j] = temp;
                    break;
                  }
                }
              }
              if(flag == false) {
                break;
              }
            }
          }
          this.statusunread = false;
          this.statusread = false;
          this.statusmuted = false;
          console.log("List Status: ",this.listStatus);
          for(let status of this.listStatus) {
            console.log("Is Unread Liststatus: ",status);
            if(status.isMuted == true) {
              this.statusmuted = true;
            }
            else {
              if(status.isUnread == true) {
                this.statusunread = true;
              }
              else {
                this.statusread = true;
              }
            }
          }
        })
      }
    })

    

    // This is for incognito chat socket emit function
    this.IcognitoChat = this.messageService.incognitochat().subscribe(data => {
      let Data = data;
      if (Data.loginuser == this.loginuserdata.id) {
        this.incognitores = data;
        this.incognitoo = true;
        document.getElementById("incognito").click()
      }
    })

    // This is for incognitoaccept chat socket emit function
    this.IcognitoChatAccept = this.messageService.INCOGNITOCHATACCEPT6().subscribe(data => {
      this.incognitoRes = data
      if (this.incognitoRes.chatuser == this.loginuserdata.id) {
        this.snackbar.open("user was accepted your request Let's start incognito chat", "x", {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    })


    // This is for video call socket emit function
    this.messageService.videocallACCEPT6().subscribe(data => {
      // this.videocallResponse= data
      this.incognitoRes = data
      if (this.incognitoRes.chatuser == this.loginuserdata.id) {
        this.snackbar.open("user was accepted your video call request", "x", {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    })

    // This is for incognitoreject chat socket emit function   videocallRejectemit
    this.IcognitoReject = this.messageService.incognitoRejectemit().subscribe(data => {
      // this.incognitoRes = data;
      let Data = data
      console.log(Data)
      if (Data) {
        if (Data.chatuser == this.loginuserdata.id) {
          this.snackbar.open("user was rejected your request", "x", {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      }
    });


    // This is for videocallRejectemit call socket emit function   
    this.messageService.videocallRejectemit().subscribe(data => {
      let Data = data
      console.log(Data)
      if (Data) {
        if (Data.chatuser == this.loginuserdata.id) {
          this.snackbar.open("user was rejected your video call request", "x", {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      }
    });

    // This is for incognito delete response socket emit function
    this.IcognitoDelRes = this.messageService.incognitoDeleteResponse().subscribe(data => {
      for (var i = 0; i < this.userMessage.length; i++) {
        if (this.userMessage[i].create_At == data.create_At) {
          this.userMessage.splice(i, 1, data)
        }
      }
    })

    //This is for incognito showresponse null
    this.IcognitoShowRes = this.messageService.incognitoshowres().subscribe(data => {
      let Data = data
      if (Data) {
        if (this.incognitoRes.chatuser == this.loginuserdata.id || this.incognitoRes.loginuser == this.loginuserdata.id) {
          if (Data == "incognitoResnull") {
            this.incognitoRes = null
            this.snackbar.open("user was left from incognito chat", "x", {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        }
      }
    })

    // for automatically refresh groups this service
    this.AutoRefreshGroups = this.messageService.autoRefreshGroups().subscribe(data => {
      this.getGroups()
    });

    // user accepts group request this socket will emit and shows group in
    this.AutoRefreshMemberStatus = this.messageService.autoRefreshMemberStatus().subscribe(data => {
      this.firstGroupId = data.GroupId._id;
      this.gettingMembersCount();
    });

    // Auto Refresh group messages
    this.autorefreshgroupmessages = this.messageService.autoRefreshGroupMessage().subscribe(messages => {
      if (!this.secondco) {
        if (this.gInformation.GroupId._id === messages.GroupId._id) {
          this.groupMessages.push(messages);
        }
      }


      console.log('groupmessages updated', this.groupMessages)
      this.gettingBadgeCount();
    });
    // Auto Refresh group delete message
    this.autoRefreshGroupDeleteMessage = this.messageService.autoRefreshGroupDeleteMessage().subscribe(deleteMessage => {
      console.log(deleteMessage);
      this.groupMessages.find(item => item._id == deleteMessage._id).deletedStatus = deleteMessage.deletedStatus;
    })
    // Auto refresh group edit messages
    this.autoRefreshGroupEditMessage = this.messageService.autoRefreshGroupEditMessage().subscribe(editMessage => {
      console.log("Edit Message: ", editMessage);
      for (let message of this.groupMessages) {
        if (message._id == editMessage._id) {
          message.message = editMessage.message;
          message.photo = editMessage.photo;
          message.Gps = editMessage.Gps
          message.locationurl = editMessage.locationurl;
          message.locationlabel = editMessage.locationlabel;
          console.log("After Editing: ", message)
        }

      }

    });
    // Auto refresh group clear data
    this.autoRefreshGroupClearData = this.messageService.autoRefreshGroupClearData().subscribe(clearRes => {
      console.log(clearRes);
      this.getGroupMessages();


    })
    // Auto refresh One-One edit message
    this.autoRefrshEditedMessage = this.messageService.autoRefreshEditedMessage().subscribe(editedMessage => {
      console.log("editedMessage: ", editedMessage);
      for (let message of this.userMessage) {
        if (message._id == editedMessage._id) {
          // message=editedMessage
          message.message = editedMessage.message;
          message.photo = editedMessage.photo;
          message.Gps = editedMessage.Gps
          message.locationurl = editedMessage.locationurl;
          message.locationlabel = editedMessage.locationlabel;
          // message.Gps
          console.log("message: ", message)

        }
      }

    })
    // Auto Refresh Leave the group
    this.autoRefreshLeaveGroup = this.messageService.autoRefreshLeaveGroup().subscribe(leave => {
      this.userService.getGroupss(this.id).subscribe(groups => {
        console.log(groups);
        this.Groups = groups;
      });
    });
    // Auto refresh rename the group
    this.autoRefreshRenameGroup = this.messageService.autoRefreshRenameGroup().subscribe(rename => {
      console.log(rename);
      if (this.firstGroupId == rename._id)
        this.firstGroup = rename.GroupName
      this.userService.getGroupss(this.id).subscribe((groups: any) => {
        this.Groups = groups;
      });
    });
    // Auto Refresh Unstar group messages
    this.autoRefreshGroupUnstrarMessage = this.messageService.autoRefreshGroupUnstrarMessage().subscribe(data => {
      this.starGroupMessages.forEach((starMessage, index) => {
        if (starMessage._id == data._id) {
          this.starGroupMessages.splice(index, 1);
        }
      });
    });

    // Auto refresh star status
    this.autoRefreshStarStatusGroupMessage = this.messageService.autoRefreshStarStatusGroupMessage().subscribe(res => {
      this.getGroupMessages();
    })
    // Auto refresh group messages notifications
    this.autoRefreshMuteGroup = this.messageService.autoRefreshMuteGroup().subscribe(res => {
      for (let group of this.Groups) {
        if (group._id == res._id) {
          group.messageNotification = res.messageNotification
        }
      }
    })
    // Auto refresh group star and unstarred
    this.autoRefreshStarGroup = this.messageService.autoRefreshStarGroup().subscribe(res => {
      for (let group of this.Groups) {
        if (group._id == res._id) {
          group.starStatus = res.starStatus
        }
      }
    })
    // Auto refresh block and unblock groups
    this.autoRefreshBlockGroup = this.messageService.autoRefreshBlockGroup().subscribe(res => {
      for (let group of this.Groups) {
        if (group._id == res._id) {
          group.blockStatus = res.blockStatus
          this.gettingMembersCount()
        }
      }
    })
  }
  ngOnInit() {
    this.divheight = window.innerHeight - 200;
    this.chtheight = window.innerHeight - 200;
    this.camerawidth = screen.availWidth;
    this.cameraheight = screen.availHeight;
    console.log(this.divheight)
    this.router.queryParams.subscribe(params => {

      // Don't remove this params value == true we 'll get cast error
      if (params.value == 'true') {

        this.userForm = [];
        this.urls = [];
        this.urlss = [];
        this.dragFiles = [];
        this.blobUrl = null
        this.blobdata = null
        this.audiodata = null
        this.locationurl = null;
        this.gotlocation = null;
        this.locationlabel = null;
        this.message2 = null
        this.files = [];
        this.change = params.value;
        this.firstGroupId = params.gid;
        if (this.firstGroupId) {
          this.userService.fetchgrouppic(this.firstGroupId).subscribe((data: any) => {
            console.log("Pic Data: ", data);
            this.firstGroupPic = data.GroupIcon;
          })
        }
        console.log("Params: ", params)
        this.firstGroup = params.gname;
        if (!this.selectedGroup) { this.getGroups() }
        else { this.getGroupMessages(); this.gettingMembersCount(); }
      }
      this.Userdetails = params.id;
      this.userid = params.userid;
      
      this.change = params.value;
      this.firstGroupId = params.gid;
      this.firstGroup = params.gname;
      // this.useremail=params.useremail
      if (this.userid) {
        this.userService.getuserdata(this.userid).subscribe(data => {
          this.chatuser = data;
          console.log("123456", this.chatuser);

          this.searchValue = null;
          this.searchTerm = [];
          this.message2 = null
          this.locationurl = null;
          this.gotlocation = null;
          this.locationlabel = null;
          this.urls = [];
          this.urlss = []
          this.userForm = [];

          this.blobUrl = null;
          this.blobdata = null;
          this.audiodata = null;
          this.getMessage()
        })
      }

    });
    this.ActiveHideUsers(this.loginuserdata.EmailId);
    this.userService.refreshevent(this.loginuserdata).subscribe(data => {
      console.log("82444444444444444444", data)
    });

    this.messageService.chatingoff(this.loginuserdata).subscribe(data => {
      console.log("6700000000", data)
      this.chatbuttonoff = data
    })
  }
  @HostListener('window:resize') onWindowResize() {
    this.divheight = window.innerHeight - 200;
    this.chtheight = window.innerHeight - 200;
    this.camerawidth = screen.availWidth;
    this.cameraheight = screen.availHeight;
  }

  DownloadMedia(data, recorded) {
    const logindialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
      data: {
        type: 'MediaDownload',
        source: data,
        audiorecord: recorded
      }
    })
    logindialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  CreateStatus() {
    console.log("Current User: ", this.loginuserdata.id);
    const logindialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
      height:'350px',
      data: {
        type: 'CreateStatus'
      },
      panelClass: 'statusmodal'
    })
    logindialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  showstatus(status) {
    this.currentStatusID=status.id
    
    const logindialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
      
      data: {
        type: 'ShowStatus',
        status: status,
        statususer: this.statususer
      },
   
    })
    logindialogRef.afterClosed().subscribe(result => {
      console.log("After ShowStatus Dialog: ",result);      
    });
  }

  videocallInit(chatuser) {
    console.log("videocallInit");
    console.log("loginuser: ", this.loginuserdata);
    console.log("chatuser: ", chatuser);
    this.videocallenable = true;
    if (chatuser.loginStatus == '0') {
      let msg = chatuser.Name+" isn't online. Unable to call.";
      this.videocallenable = false;
      this.zone.run(() => {
        this.snackbar.open(msg, "x", {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      });
    }
    else if (chatuser.onCall == true) {
      let msg = chatuser.Name+" is on another call. Unable to call";
      this.videocallenable = false;
      this.zone.run(() => {
        this.snackbar.open(msg, "x", {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      });
    }
    else {
      DetectRTC.load(function () {
        let f1 = true, f2 = true, f3 = true;
        if (DetectRTC.isWebRTCSupported === false) {
          this.videocallenable = false;
          this.zone.run(() => {
            this.snackbar.open(`Your browser doesn't support Video Calls. Please switch to another browser.`, "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
        }
        else {
          if (DetectRTC.hasMicrophone === false) {
            f1 = false;
            this.videocallenable = false;
          }
          if (DetectRTC.hasWebcam === false) {
            f2 = false;
            this.videocallenable = false;
          }
          if (DetectRTC.hasSpeakers === false) { // checking for "false"
            f3 = false;
            this.videocallenable = false;
          }
          /*
          f1 - Microphone
          f2 - Webcam
          f3 - Speaker
          */

          if (!f1 && !f2 && !f3) {
            this.zone.run(() => {
              this.snackbar.open(`Microphone, Webcam and Speakers are being used by another process or not connected. Unable to call.`, "x", {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
          else if (!f1 && !f2) {
            this.zone.run(() => {
              this.snackbar.open(`Microphone and Webcam are being used by another process or not connected. Unable to call.`, "x", {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
          else if (!f1 && !f3) {
            this.zone.run(() => {
              this.snackbar.open(`Microphone and Speaker are being used by another process or not connected. Unable to call.`, "x", {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
          else if (!f2 && !f3) {
            this.zone.run(() => {
              this.snackbar.open(`Webcam and Speaker are being used by another process or not connected. Unable to call.`, "x", {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
          else if (!f1) {
            this.zone.run(() => {
              this.snackbar.open(`Microphone is being used by another process or not connected. Unable to call.`, "x", {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
          else if (!f2) {
            this.zone.run(() => {
              this.snackbar.open(`Webcam is being used by another process or not connected. Unable to call.`, "x", {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
          else if (!f3) {
            this.zone.run(() => {
              this.snackbar.open(`Speaker is being used by another process or not connected. Unable to call.`, "x", {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
        }

      });
    }
    console.log("VideoCallEnable: ", this.videocallenable);
  }

  InviteUser() {
    const logindialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
      data: {
        type: 'InviteUser'
      }
    })
    logindialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  // onScroll()
  // {
  //   console.log("scrolled");
   
  //   var test=document.getElementById('test')
  //   console.log(test);
    
  //   this.scrolltop = test.scrollHeight
  //   console.log(this.scrolltop);

  //   var data = document.getElementById('test').textContent
  //   console.log(data);
    
  //    this.spinner.show()
  //   this.getNewMessages()
    
  // }
  
  // getNewMessages()
  // {
  //   console.log("new");
    
  // }

  getMessage() {

    // chatoff emit calling function
    this.messageService.chatoffemit().subscribe(data => {
      this.chatoffdata = data
      this.loginuserdata.loginStatus = this.chatoffdata.loginStatus;
    })

    this.messageService.getMessages(this.Userdetails).subscribe(data => {
      this.userMessage = data
       console.log(this.userMessage);

       if(this.userMessage)
{
for(let message of this.userMessage)
{
if(message.deletingMsgstatus == 'value will be updated')
{
this.flag1=true
}
else
{
this.flag1=false
}
}
}

      setTimeout(() => {
        var test = document.getElementById("test");
        if (test && test.scrollHeight) this.scrolltop = test.scrollHeight;
      }, 100);

      // This is for getting user default response for show the block or unblock state
      let obj = {
        from: this.loginuserdata.EmailId,
        to: this.chatuser.EmailId
      }
      this.messageService.blockingdata(obj).subscribe(data => {
        this.blockdfltdata = data
        // This is for incognito block when page loading
        if(this.blockdfltdata) {
          if (this.blockdfltdata.fromblockingStatus == 'blocked' || this.blockdfltdata.toblockingStatus == 'blocked') {
            this.incognitopopupshow = true
          } else {
            this.incognitopopupshow = false
          }
        }        
      });

      // This is for user login status  by emit function
      this.messageService.autoUserStatus().subscribe(data => {
        this.chatoffdata = data
        if (this.chatuser.EmailId == data.EmailId) {
          this.chatuser.loginStatus = data.loginStatus
        }
        this.getFriends = this.userService.getFriends(this.id).subscribe(users => {
          this.listusers = users;
        })
      });
    })
  }
  select($event) {
    console.log($event);
    this.selectedEmoji = $event.emoji;
  }


  // Getting groups
  ForOneToOneGroups() {
    this.userService.getGroupss(this.id).subscribe((groups: any) => {
      this.Groups = groups;
    })
  }

  getGroups() {
    this.userService.getGroupss(this.id).subscribe((groups: any) => {
      console.log("Fetched Groups: ", groups);
      this.Groups = groups;
      this.groupcount = groups.length;

      if (this.Groups.length > 0) {
        console.log("First Group ID: ", this.firstGroupId);
        if (this.firstGroupId) {
          this.groupService.gInfor(this.firstGroupId, this.id).subscribe((res: any) => {
            console.log("res: ", res);
            if (res.length > 0) {
              this.gInformation = res[0]
              console.log("gingormation. ", this.gInformation)
              this.route.navigate(['/navbar/main'], { queryParams: { gid: this.gInformation.GroupId._id, gname: this.gInformation.GroupId.GroupName, value: true } });
            }
            else {
              if (this.Groups) {
                this.route.navigate(['/navbar/main'], { queryParams: { value: true } });
              }
              else {
                this.route.navigate(['/navbar/main'], { queryParams: { gid: this.Groups[0].GroupId._id, gname: this.Groups[0].GroupId.GroupName, value: true } });
              }
            }
          })
          this.gettingMembersCount();
          this.getGroupMessages();
          this.gettingBadgeCount();

        }
        else {
          this.groupService.gInfor(this.Groups[0].GroupId._id, this.id).subscribe(res => {
            console.log(res);
            this.gInformation = res[0]
            this.route.navigate(['/navbar/main'], { queryParams: { gid: this.gInformation.GroupId._id, gname: this.gInformation.GroupId.GroupName, value: true } })
          })
        }
      }
    })
  }
  // Getting Badge count

  resetrecordaudio() {
    this.blobUrl = null;
  }
  // Clear chat of group
  clearChat(data) {
  
    this.groupService.clearData(data.GroupId._id, this.id).subscribe(result => {
      
      console.log(result)
      this.cdref.detectChanges();

    })

  }
  // Getting Badge count
  gropuids = [];
  gettingBadgeCount() {
    this.Groups.forEach(element => {
      this.gropuids.push(element.GroupId._id);
    });
    let obj = {
      gids: this.gropuids,
      id: this.loginuserdata.id
    }
    this.groupService.getBadgeCount(obj).subscribe(response => {
      console.log(response);
      this.Groups = response
    })

  }
  // Delete group message
  deleteGroupMessage(message, index) {
    console.log(message, index);
    var data = {
      id: message._id,
      status: false
    }
    this.groupService.deleteGroupMessage(data).subscribe(deletedRes => {
    });
  };
  // Getting meembers count
  gettingMembersCount() {
    this.groupService.gettingMembersCount(this.firstGroupId).subscribe((count: any) => {
      this.groupMembersInfo = count
      this.groupMembersCount = count.length
    })
  }
  // Getting group messages
  getGroupMessages() {
    this.groupService.getGroupMessages(this.firstGroupId).subscribe((res: any) => {
      this.groupMessages = res
      this.groupMessages.forEach(document => {
        document.starIds.forEach(starId => {
          if (this.id == starId) {
            document.starStatus = true;
          }
        })
      })
    })
  }

  // leave the group
  leaveGroup(group) {
    console.log(group);

    const logindialogRef = this.dialog.open(LoginComponent, {
      width: '650px',
      data: {
        type: 'leave',
        Groupinfo: group
      }
    })
    logindialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }
  // View members
  gView(group) {
    this.arrowup = true;
    const logindialogRef = this.dialog.open(LoginComponent, {

      // disableClose: true,
      width: '600px',
      data: {
        type: 'view',
        Groupinfo: group
      },
      backdropClass: 'mapdrop',
      panelClass: 'membersgroup'
    });
    logindialogRef.afterClosed().subscribe(result => {
      this.arrowup = false;
      console.log(result)
    });


  }
  myGroup(group) {
    console.log("Test", group)
    const logindialogRef = this.dialog.open(LoginComponent, {
      // disableClose: true,
      width: '800px',
      data: {
        type: 'group',
        Groupinfo: group

      }

    });
    logindialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  myGroup2() {
    console.log("myGroup2")
    const logindialogRef = this.dialog.open(LoginComponent, {
      // disableClose: true,
      width: '600px',
      data: {
        type: 'group2',
        source: "AddMember"
      }

    });
    logindialogRef.afterClosed().subscribe(result => {
      console.log(result)

    });
  }

  groupdetails(group) {
    // this.getGroups()
    this.notStarred = false;
    this.highlightedBatch = [];
    this.highlightedBatch2 = [];
    this.selectedGroup = group;
    this.gInformation = this.selectedGroup
    console.log("selected Group", this.selectedGroup);
    this.route.navigate(['/navbar/main'], { queryParams: { gid: this.selectedGroup.GroupId._id, gname: this.selectedGroup.GroupId.GroupName, value: true } });
  }
  //Remove badge count
  removeBadgeCount(group) {
    let info = {
      gid: group.GroupId._id,
      id: this.id
    }
    this.groupService.removeBadgeCount(info).subscribe(result => {
      console.log(result);
      this.gettingBadgeCount();
    })
  }
  // Renaming the group
  gRename(info) {
    console.log(info);
    const logindialogRef = this.dialog.open(LoginComponent, {
      // disableClose: true,
      width: '600px',
      data: {
        type: 'rename',
        Groupinfo: info
      }

    });
    logindialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });

  }

  /*
    FunctionName : getFrienddata
   
    Input: Friendlist id
    Output: JSON
    Desc: Getting Particular friendlist data when user clicks on friend
   
    getFrienddata = function (id) {
      console.log(id);
      this.userService.get('friendslists/' + id).subscribe(data => {
        this.order = data;
        console.log(this.order);
        localStorage.setItem('chatuser', JSON.stringify(this.order));
      })
    }
   */

  closeModal() {
    this.display = 'none';
  }
  reset2(index) {
    this.urlss.splice(index, 1);
    this.fileuploadlist.splice(index, 1);
    this.newEditData = this.urlss;
  }
  // Reset the data for media
  reset(index) {
    this.userForm.splice(index, 1);
    this.urls.splice(index, 1);
  }

  editingData(data, id, user) {
    let editData = {
      message: data,
      id: id,
      photo: this.userForm
    }
    console.log("editData: ", editData);
    // console.log(this.newEditData);
    //     this.messageService.sendEditMessage(editData).subscribe(res => {
    //       console.log(res);
    //       this.newEditData=[];
    //       this.urlss =[];
    //     });
  }

  // Editing for 1-1 chat
  editingDataOnetoOne(data) {
    console.log("message: ", data);
    console.log("this.editUserdata: ", this.editUserdata)
    console.log(" UserForm: ", this.userForm);
    console.log("SearchValue: ", this.searchValue);

    // let editData = {
    //   message: data,
    //   id: id,
    //   photo: this.newEditData
    // }
    // console.log(editData);
    // this.messageService.sendEditMessage(editData).subscribe(res => {
    //   console.log(res);
    //   this.newEditData=[];
    //   this.urlss =[];
    // });
  }
  // Editing for Group chat
  editingData2(data, id, groupmessage) {
    let editData = {
      message: data,
      id: id,
      photo: this.newEditData
    }
    console.log(editData);
    this.messageService.sendEditGroupMessage(editData).subscribe(res => {
      console.log(res);
      this.newEditData = [];
      this.urlss = [];
    });
  }
  message1;
  newEditData = [];
  urlss = [];
  firstco = false;
  // Edit messages for 1-1 chat
  edit1(user) {
    this.gotlocation = user.Gps
    this.firstco = true
    this.searchValue = user.message
    this.editUserdata = user
    this.locationurl = user.locationurl;
    this.locationlabel = user.locationlabel
    this.editUserdata.photo.forEach(photo => {
      this.urlss.push(photo);
      this.fileuploadlist.push(photo);

    });
    this.newEditData = this.urlss
    console.log(this.urlss);
    console.log(this.fileuploadlist);

  }
  // Edit messages for Group chat
  secondco = false
  edit2(groupmessage) {
    this.secondco = true
    this.gotlocation = groupmessage.Gps
    this.searchValue = groupmessage.message
    this.editUserdata = groupmessage
    this.locationurl = groupmessage.locationurl;
    this.locationlabel = groupmessage.locationlabel
    this.editUserdata.photo.forEach(photo => {
      this.urlss.push(photo);
      this.fileuploadlist.push(photo)
    });
    this.newEditData = this.urlss;
    console.log("Edit: ", this.fileuploadlist)

  }
  keyDownFunction(event, data, id, user) {
    if (event.keyCode === 13) {
      if (this.message1 !== data.toString().trim()) {
        if (data == '') {
        }
        else {
          this.editingData(data, id, user)
        }
      }
    }
  }


  openModal(user) {
    this.selectphoto = user;
    this.display = 'block';
  }
  // Group chat box
  listArr = [];
  groupBadgeIds = [];
  blockIds = [];
  groupbox(message) {
    this.enablesend = false
    this.userForm = [];
    var mediaUploaded = false;
    console.log("Message: ", message);
    console.log("Files to Upload: ", this.fileuploadlist, this.fileuploadlist.length);
    console.log("Preview URL: ", this.urlss, this.urlss.length)
    console.log("secondco: ", this.secondco);
    this.groupMembersInfo.forEach(element=>{
      if(element.blockStatus == true){
        console.log('lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll');
        
        this.blockIds.push(element.memberId);
        console.log(this.blockIds,'pppppppppppppppppppppppppp');
        
      }
    })

    // If Message has media, it will be triggered.
    if (this.fileuploadlist.length > 0) {
      const formData = new FormData();
      this.fileuploadlist.forEach(file => {
        console.log("fileid1: ", file)
        //Uploading Additional FIles
        if (!file._id) {
          formData.append("uploads[]", file, file['name']);
          mediaUploaded = true;
        }
        // Passing uploaded files to userform
        else {
          this.userForm.push(file._id);
          console.log("uf: ", this.userForm)
        }
      });

      //Triggers when you upload new media
      if (mediaUploaded) {
        this.messageService.saveFiles(formData).subscribe((data: any) => {
          console.log("data: ", data);
          for (let value of data) {
            this.userForm.push(value._id)
          }
          console.log("userForm: ", this.userForm);
          //for Editing Messages
          if (this.secondco) {
            //Checking if any new recorded audio is available and pushing it to userForm
            if (this.audiodata) {
              console.log("audiodata: ", this.audiodata)
              this.userForm.push(this.audiodata);
              this.audiodata = null;
            }
            //Creating Message Object for Edit Message
            var messageData: any = {
              message: message.message,
              parentId: null,
              photo: this.userForm,
              isMedia: true,
              blobdata: this.blobdata,
              Gps: this.gotlocation,
              locationurl: this.locationurl,
              locationlabel: this.locationlabel,
              incognitoStatus: 'null'
            }
            console.log("MessageID: ", this.editUserdata._id)
            console.log("secondco", messageData)

            //Sending Edit Message Object to DB
            if (messageData.message || messageData.photo.length > 0 || messageData.Gps || messageData.locationurl) {
              this.messageService.sendEditGroupMessage({ messageData: messageData, id: this.editUserdata._id }).subscribe((updateResult: any) => {
                console.log("updateResult: ", updateResult);
                this.counter = 1;
                this.firstco = false;
                this.secondco = false;
                this.searchValue = null;
                this.message2 = null;
                this.userForm = [];
                this.urls = [];
                this.urlss = [];
                this.fileuploadlist = [],
                  this.imageToCompress = [],
                  this.dragFiles = [];
                this.gotlocation = null;
                this.blobUrl = null
                this.blobdata = null
                this.audiodata = null
                this.locationurl = null;
                this.locationlabel = null;
                this.files = [];
                this.enablesend = true
              });
            }
            else {
              this.zone.run(() => {
                this.snackbar.open(`No Input Data`, "x", {
                  duration: 5000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              });
            }
          }
          else {
            this.counter = 1;
            this.searchValue = null;
            console.log(this.userForm)
            this.groupMembersInfo.forEach(element => {
              this.listArr.push(element.memberId);
            });
            this.listArr.forEach(mid => {
              if (this.id == mid) {
                console.log('Nothing is pushed');
              }
              else {
                this.groupBadgeIds.push(mid);
              }
            })
            this.groupMembersInfo.forEach(element => {
              if (element.blockStatus == true) {
                this.blockIds.push(element.memberId);
              }
            })
            if (message.message != null && message.message.trim() == '' && this.userForm.length == 0) {
              return false
            } else {
              //For Normal Messaging
              if (this.audiodata) {
                console.log("audiodata: ", this.audiodata)
                this.userForm.push(this.audiodata);
                this.audiodata = null;
              }
              //Creating Normal Message Object
              var messageData: any = {
                message: message.message,
                parentId: null,
                groupSenderId: this.loginuserdata.id,
                groupReceiverId: this.listArr,
                clearChat: this.listArr,
                groupId: this.groupMembersInfo[0].GroupId,
                unReadMessages: this.groupBadgeIds,
                photo: this.userForm,
                isMedia: true,
                blobdata: this.blobdata,
                Gps: this.gotlocation,
                locationurl: this.locationurl,
                locationlabel: this.locationlabel,
                blockIds: this.blockIds
              }
            }
          }

          console.log("messageData: ", messageData)
          //CHecking for blank message
          if ((messageData.message == null || messageData.message == undefined) && (messageData.isMedia == false) && (this.location == null)) {
            this.snackbar.open("No Input data", "x", {
              duration: 1000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
          else {
            this.groupService.groupMessage(messageData).subscribe(msgRes => {
              console.log(msgRes);

              this.listArr = [];
              this.groupBadgeIds = [];
              this.searchValue = null;
              this.fileuploadlist = []
              this.userForm = [];
              this.urlss = [];
              this.dragFiles = [];
              this.blobUrl = null
              this.blobdata = null
              this.audiodata = null
              this.locationurl = null;
              this.gotlocation = null;
              this.locationlabel = null;
              this.files = [];
              this.enablesend = true;
              this.firstco = false;
              this.secondco = false;
            })
          }

        })
      }
      //Triggers when no new media is uploaded
      else {
        if (this.secondco) {
          //Checking if any new recorded audio is available and pushing it to userForm
          if (this.audiodata) {
            console.log("audiodata: ", this.audiodata)
            this.userForm.push(this.audiodata);
            this.audiodata = null;
          }
          //Creating Message Object for Edit Message
          var messageData: any = {
            message: message.message,
            parentId: null,
            photo: this.userForm,
            isMedia: true,
            blobdata: this.blobdata,
            Gps: this.gotlocation,
            locationurl: this.locationurl,
            locationlabel: this.locationlabel,
            incognitoStatus: 'null'
          }
          console.log("MessageID: ", this.editUserdata._id)
          console.log("secondco", messageData)
          //Sending Edit Message Object to DB
          if (messageData.message || messageData.photo.length > 0 || messageData.Gps || messageData.locationurl) {
            this.messageService.sendEditGroupMessage({ messageData: messageData, id: this.editUserdata._id }).subscribe((updateResult: any) => {
              console.log("updateResult: ", updateResult);
              this.counter = 1;
              this.firstco = false;
              this.secondco = false;
              this.searchValue = null;
              this.message2 = null;
              this.userForm = [];
              this.urls = [];
              this.urlss = [];
              this.fileuploadlist = [],
                this.imageToCompress = [],
                this.dragFiles = [];
              this.gotlocation = null;
              this.blobUrl = null
              this.blobdata = null
              this.audiodata = null
              this.locationurl = null;
              this.locationlabel = null;
              this.files = [];
              this.enablesend = true
            });
          }
          else {
            this.zone.run(() => {
              this.snackbar.open(`No Input Data`, "x", {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
        }
        else {
          this.counter = 1;
          this.searchValue = null;
          console.log(this.userForm);
          this.groupMembersInfo.forEach(element => {
            this.listArr.push(element.memberId);
          });
          this.listArr.forEach(mid => {
            if (this.id == mid) {
              console.log('Nothing is pushed');
            }
            else {
              this.groupBadgeIds.push(mid);
            }
          })

          if (message.message != null && message.message.trim() == '' && this.userForm.length == 0) {
            return false
          } else {
            //For Normal Messaging
            if (this.audiodata) {
              console.log("audiodata: ", this.audiodata)
              this.userForm.push(this.audiodata);
              this.audiodata = null;
            }
            //Creating Normal Message Object
            var messageData: any = {
              message: message.message,
              groupSenderId: this.loginuserdata.id,
              groupReceiverId: this.listArr,
              clearChat: this.listArr,
              groupId: this.groupMembersInfo[0].GroupId,
              unReadMessages: this.groupBadgeIds,
              photo: this.userForm,
              isMedia: true,
              blobdata: this.blobdata,
              Gps: this.gotlocation,
              locationurl: this.locationurl,
              locationlabel: this.locationlabel,
              blockIds:this.blockIds
            }
          }
        }

        console.log("messageData: ", messageData)
        //CHecking for blank message
        if ((messageData.message == null || messageData.message == undefined) && (messageData.isMedia == false) && (this.location == null)) {
          this.snackbar.open("No Input data", "x", {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
        else {
          this.groupService.groupMessage(messageData).subscribe(msgRes => {
            console.log(msgRes);
            this.firstco = false;
            this.secondco = false;
            this.searchValue = null;
            this.fileuploadlist = []
            this.listArr = [];
            this.groupBadgeIds = [];
            this.userForm = [];
            this.urlss = [];
            this.dragFiles = [];
            this.blobUrl = null
            this.blobdata = null
            this.audiodata = null
            this.locationurl = null;
            this.gotlocation = null;
            this.locationlabel = null;
            this.files = [];
            this.enablesend = true;
          })
        }
      }

    }
    else {
      //Triggers when message has no media
      if (this.secondco) {
        //Checking if any new recorded audio is available and pushing it to userForm
        if (this.audiodata) {
          console.log("audiodata: ", this.audiodata)
          this.userForm.push(this.audiodata);
          this.audiodata = null;
        }
        //Creating Message Object for Edit Message
        var messageData: any = {
          message: message.message,
          parentId: null,
          photo: this.userForm,
          isMedia: true,
          blobdata: this.blobdata,
          Gps: this.gotlocation,
          locationurl: this.locationurl,
          locationlabel: this.locationlabel,
          incognitoStatus: 'null'
        }
        console.log("MessageID: ", this.editUserdata._id)
        console.log("secondco", messageData)
        this.groupMembersInfo.forEach(element => {
          this.listArr.push(element.memberId);
        });
        this.listArr.forEach(mid => {
          if (this.id == mid) {
            console.log('Nothing is pushed');
          }
          else {
            this.groupBadgeIds.push(mid);
          }
        })
        //Sending Edit Message Object to DB
        if (messageData.message || messageData.photo.length > 0 || messageData.Gps || messageData.locationurl) {
          this.messageService.sendEditGroupMessage({ messageData: messageData, id: this.editUserdata._id }).subscribe((updateResult: any) => {
            console.log("updateResult: ", updateResult);
            this.counter = 1;
            this.firstco = false;
            this.secondco = false;
            this.searchValue = null;
            this.message2 = null;
            this.userForm = [];
            this.urls = [];
            this.urlss = [];
            this.fileuploadlist = [],
              this.imageToCompress = [],
              this.dragFiles = [];
            this.gotlocation = null;
            this.blobUrl = null
            this.blobdata = null
            this.audiodata = null
            this.locationurl = null;
            this.locationlabel = null;
            this.files = [];
            this.enablesend = true;
            this.listArr = []
          });
        }
        else {
          this.zone.run(() => {
            this.snackbar.open(`No Input Data`, "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
        }
      }
      else {
        this.counter = 1;
        this.searchValue = null;
        this.groupMembersInfo.forEach(element => {
          this.listArr.push(element.memberId);
        });
        this.listArr.forEach(mid => {
          if (this.id == mid) {
            console.log('Nothing is pushed');
          }
          else {
            this.groupBadgeIds.push(mid);
          }
        })
        console.log(this.userForm)
        if ((message.message == null || message.message == undefined) && !this.gotlocation && this.userForm.length == 0) {
          console.log("Condition1")
          return false
        }
        else {
          if (message.message) {
            if (message.message.trim() == '' && !this.gotlocation && this.userForm.length == 0) {
              console.log("Condition2")
              return false;
            }
          }

          //For Normal Messaging
          else if (this.audiodata) {
            console.log("audiodata: ", this.audiodata)
            this.userForm.push(this.audiodata);
            this.audiodata = null;
          }
          //Creating Normal Message Object
          var messageData: any = {
            message: message.message,
            parentId: this.message3 ? this.message3._id : null,
            groupSenderId: this.loginuserdata.id,
            groupReceiverId: this.listArr,
            clearChat: this.listArr,
            groupId: this.groupMembersInfo[0].GroupId,
            unReadMessages: this.groupBadgeIds,
            photo: this.userForm,
            isMedia: true,
            blobdata: this.blobdata,
            Gps: this.gotlocation,
            locationurl: this.locationurl,
            locationlabel: this.locationlabel,
            blockIds:this.blockIds
          }
        }
      }

      console.log("messageData: ", messageData)
      //CHecking for blank message
      if ((messageData.message == null || messageData.message == undefined) && (messageData.isMedia == false) && (this.location == null)) {
        this.snackbar.open("No Input data", "x", {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
      else {
        this.groupService.groupMessage(messageData).subscribe(msgRes => {
          console.log(msgRes);
          this.searchValue = null;
          this.fileuploadlist = [];
          this.listArr = [];
          this.groupBadgeIds = [];
          this.userForm = [];
          this.urlss = [];
          this.dragFiles = [];
          this.blobUrl = null
          this.blobdata = null
          this.audiodata = null
          this.locationurl = null;
          this.gotlocation = null;
          this.locationlabel = null;
          this.files = [];
          this.enablesend = true;

        })
      }

    }
  }
  // multi Forward group messages
  highlightedBatch = [];
  forwardButton: boolean = false;
  multiSelect(groupmessage) {
    this.forwardButton = true;

    if (this.highlightedBatch.indexOf(groupmessage) === -1) {
      this.highlightedBatch.push(groupmessage);
      console.log('add', this.highlightedBatch);

    }
    else {
      const _index = this.highlightedBatch.indexOf(groupmessage);
      this.highlightedBatch.splice(_index, 1);
      console.log('remove', this.highlightedBatch);
      if (this.highlightedBatch.length == 0) {
        this.forwardButton = false;
      }

    }
  }
  // Groups multi forward messages
  highlightedBatch2 = [];
  multiForward(group) {
    if (this.highlightedBatch2.indexOf(group) === -1) {
      this.highlightedBatch2.push(group);
      console.log('add2', this.highlightedBatch2);
      this.matCount = this.highlightedBatch2.length;
    }
    else {
      const _index = this.highlightedBatch2.indexOf(group);
      this.highlightedBatch2.splice(_index, 1);
      console.log('remove2', this.highlightedBatch2);
      this.matCount = this.highlightedBatch2.length;

    }
  }
  matCount = 0;
  selectAll() {
    console.log(this.selectall)
    if (this.selectall) {
      this.Groups.forEach((item, index) => {
        this.Groups[index].checked = true;
      })
    }
    else {
      this.Groups.forEach((item, index) => {
        this.Groups[index].checked = false;
      })

    }
    // console.log(gInformation);

    // this.Groups.forEach(group => {
    //   if (group.GroupId._id != gInformation.GroupId._id) {
    //     if (this.highlightedBatch2.indexOf(group) === -1) {
    //       this.highlightedBatch2.push(group);
    //       this.matCount = this.highlightedBatch2.length
    //     }
    //   }
    //   else {
    //     console.log('nothing');

    //   }
    // })
    // console.log(this.highlightedBatch2);



  }
  // Send multi messages forward to multi groups
  forwardBadge = [];
  sendMultiForward() {
    console.log(this.highlightedBatch, this.highlightedBatch2);
    this.highlightedBatch2.forEach(group => {
      console.log(group);

      this.highlightedBatch.forEach(message => {
        message.groupReceiverId.forEach(ids => {
          if (this.loginuserdata.id == ids) {
          }
          else {
            this.forwardBadge.push(ids);
          }
        })
        console.log(message);
        var obj = {
          message: message.message,
          groupSenderId: this.loginuserdata.id,
          groupReceiverId: message.groupReceiverId,
          clearChat: message.groupReceiverId,
          groupId: group.GroupId._id,
          unReadMessages: this.forwardBadge,
          photo: message.photo,
          media: this.audiodata,
          isMedia: false,
          blobdata: this.blobdata,
          Gps: this.gotlocation,
          locationurl: this.locationurl,
          locationlabel: this.locationlabel,
        }
        this.groupService.groupMessage(obj).subscribe(msgRes => {
          console.log(msgRes);
          this.forwardButton = false;

        })
      });
    });

  }
  forwardGModal() {
    let dialogRef = this.dialog.open(this.forwardGMessages);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'yes') {
          console.log('User clicked yes');
        }
        else if (result === 'no') {
          console.log('User clicked no');

        }
      }
    })
  }
  // Star group message option
  notStarred = false;
  starGroupMessage() {
    this.notStarred = true;
    this.highlightedBatch2 = [];
    this.highlightedBatch = [];
    this.getStarGroupMessages()
  }
  // UnStar Group messages option
  unStarGroupMessage() {
    this.notStarred = false;
    this.highlightedBatch2 = [];
    this.highlightedBatch = [];
    this.getGroupMessages();

  }
  // Make Star for Group Messages
  makeStarred(message) {

    console.log(message);
    var data = {
      originalId: message._id,
      message: message.message,
      photo: message.photo,
      GroupId: message.GroupId._id,
      groupSenderId: message.groupSenderId._id,
      hashForm: message.hashForm,
      groupReceiverId: message.clearChat,
      starId: this.loginuserdata.id
    }
    message.starStatus = true;
    this.groupService.groupStarMessage(data).subscribe(result => {
      console.log(result);

    })
    this.groupService.addStarMessage(this.loginuserdata.id, message._id).subscribe(result => {
      console.log(result);

    })


  };
  // Make unstar for group messages
  makeUnStarred2(message) {
    console.log('kkkkkkkkkkk');
    console.log(this.gInformation.GroupId._id, this.loginuserdata.id);

    this.groupService.getStarGroupMessage(this.gInformation.GroupId._id, this.loginuserdata.id).subscribe((data) => {
      console.log(data);
      this.starGroupMessages = data;
      this.starGroupMessages.forEach(starmsg => {
        if (starmsg.originalId == message._id) {
          let data = {
            id: starmsg._id,
            status: false,
            myId: this.loginuserdata.id
          };
          this.groupService.removeStarGroupMessage(data).subscribe(res => {
            console.log(res);

          })
        }

      });

    });


    let info = {
      id: message._id,
      lid: this.loginuserdata.id
    }
    this.groupService.removeStarStatus(info).subscribe(result => {
      console.log(result);

    });

  }
  // Make UnStar for Group messages
  makeUnStarred(message) {
    console.log(message);
    let data = {
      id: message._id,
      status: false,
      myId: this.loginuserdata.id
    }
    let info = {
      id: message.originalId,
      lid: this.loginuserdata.id
    }
    this.groupService.removeStarGroupMessage(data).subscribe(res => {
      console.log(res);
    })

    this.groupService.removeStarStatus(info).subscribe(result => {
      console.log(result);

    })

  }
  // Getting Star Group Message
  getStarGroupMessages() {
    console.log(this.gInformation.GroupId._id, this.loginuserdata.id);

    this.groupService.getStarGroupMessage(this.gInformation.GroupId._id, this.loginuserdata.id).subscribe((data) => {
      console.log(data);
      this.starGroupMessages = data

    })
  }



  chatbox(message) {
    this.enablesend = false
    this.userForm = [];
    var mediaUploaded = false;
    // If Message has media, it will be triggered.
    if (this.fileuploadlist.length > 0) {
      const formData = new FormData();
      this.fileuploadlist.forEach(file => {
        //Uploading Additional FIles
        if (!file._id) {
          formData.append("uploads[]", file, file['name']);
          mediaUploaded = true;
        }
        // Passing uploaded files to userform
        else {
          console.log("fileid1: ", file._id)
          this.userForm.push(file._id);
          console.log("uf: ", this.userForm)
        }
      });

      //Triggers when you upload new media
      if (mediaUploaded) {
        this.messageService.saveFiles(formData).subscribe((data: any) => {
          console.log("data: ", data);
          for (let value of data) {
            this.userForm.push(value._id)
          }
          console.log("userForm: ", this.userForm);
          //for Editing Messages
          if (this.firstco) {
            //Checking if any new recorded audio is available and pushing it to userForm
            if (this.audiodata) {
              console.log("audiodata: ", this.audiodata)
              this.userForm.push(this.audiodata);
              this.audiodata = null;
            }
            //Creating Message Object for Edit Message
            var messageData: any = {
              message: this.searchValue,
              parentId: null,
              senderId: this.loginuserdata.id,
              senderEmail: this.loginuserdata.EmailId,
              senderName: this.loginuserdata.Name,
              receiverId: this.chatuser._id,
              receiverEmailId: this.chatuser.EmailId,
              photo: this.userForm,
              isMedia: true,
              blobdata: this.blobdata,
              Gps: this.gotlocation,
              locationurl: this.locationurl,
              locationlabel: this.locationlabel,
              incognitoStatus: 'null'
            }
            console.log("MessageID: ", this.editUserdata._id)
            console.log("firstco", messageData)
            //Sending Edit Message Object to DB
            if (messageData.message || messageData.photo.length > 0 || messageData.Gps || messageData.locationurl) {
              this.messageService.sendEditMessage({ messageData: messageData, id: this.editUserdata._id }).subscribe((updateResult: any) => {
                console.log("updateResult: ", updateResult);
                this.counter = 1;
                this.firstco = false;
                this.searchValue = null;
                this.message2 = null;
                this.userForm = [];
                this.urls = [];
                this.urlss = [];
                this.fileuploadlist = [],
                  this.imageToCompress = [],
                  this.dragFiles = [];
                this.gotlocation = null;
                this.blobUrl = null
                this.blobdata = null
                this.audiodata = null
                this.locationurl = null;
                this.locationlabel = null;
                this.files = [];
                this.enablesend = true
              });
            }
            else {
              this.zone.run(() => {
                this.snackbar.open(`No Input Data`, "x", {
                  duration: 5000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              });
            }
          }
          else {
            //Checking for Blank Messages in Incognito Mode
            if (this.incognitoRes) {
              this.counter = 1;
              this.searchValue = null;
              this.message2 = null;
              if (message.message != null && message.message.trim() == '') {
                return false
              }
              //Creating Message Object in Incognito mode
              else {
                var messageData1 = {
                  message: message.message,
                  senderId: this.loginuserdata.id,
                  senderEmail: this.loginuserdata.EmailId,
                  senderName: this.loginuserdata.Name,
                  receiverId: this.chatuser._id,
                  receiverEmailId: this.chatuser.EmailId,
                  photo: this.userForm,
                  isMedia: true,
                  blobdata: this.blobdata,
                  Gps: this.gotlocation,
                  locationurl: this.locationurl,
                  locationlabel: this.locationlabel,
                  incognito: "incognito chat",
                  incognitoStatus: '0',
                  parentId: null
                }

              }
              if ((messageData1.message == null || messageData1.message == undefined) && (messageData1.isMedia == false) && (this.location == null)) {
                this.snackbar.open("No Input data", "x", {
                  duration: 1000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              }
              else {
                //Uploading Incognito Message Object to DB
                console.log("messageData", messageData1);
                this.messageService.sendMessage(messageData1).subscribe(res => {
                  this.userService.getFriends(this.id).subscribe(users => {
                    this.listusers = users;
                    console.log("friendsssssssss", this.listusers)
                  });
                  console.log("Res: ", res)
                  this.blockingRes = res;
                  if (this.blockingRes.emailsentmsg == 1) {
                    this.snackbar.open("message sent to user mail sucessfully ", "x", {
                      duration: 2000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  }
                  if (res == "receiverblocked") {
                    this.searchValue = null;
                    this.userForm = [];
                    this.urls = [];
                    this.urlss = [];
                    this.fileuploadlist = [];
                    this.imageToCompress = []
                    this.blobUrl = null
                    this.blobdata = null
                    this.audiodata = null
                    this.locationurl = null;
                    this.gotlocation = null;
                    this.locationlabel = null;
                    this.enablesend = true
                    this.snackbar.open("user was blocked to you ", "x", {
                      duration: 2000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  } else if (res == 'senderblocked') {
                    this.searchValue = null;
                    this.userForm = [];
                    this.urls = [];
                    this.urlss = [];
                    this.fileuploadlist = [];
                    this.imageToCompress = []
                    this.blobUrl = null
                    this.blobdata = null
                    this.audiodata = null
                    this.locationurl = null;
                    this.gotlocation = null;
                    this.locationlabel = null;
                    this.enablesend = true
                    this.snackbar.open("please, Remove the user from block state", "x", {
                      duration: 2000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  } else {
                    this.userForm = [];
                    this.urls = [];
                    this.urlss = [];
                    this.fileuploadlist = [];
                    this.dragFiles = [];
                    this.blobUrl = null
                    this.blobdata = null
                    this.audiodata = null
                    this.locationurl = null;
                    this.gotlocation = null;
                    this.locationlabel = null;
                    this.files = [];
                    this.enablesend = true
                  }
                });
              };
            } else {

              //For Replying to Messages
              this.counter = 1;
              this.searchValue = null;
              console.log(this.userForm)
              if (message.message != null && message.message.trim() == '' && this.userForm.length == 0) {
                return false
              } else {
                //Checking if User is replying to a message
                if (this.message2) {
                  if (this.audiodata) {
                    console.log("audiodata: ", this.audiodata)
                    this.userForm.push(this.audiodata);
                    this.audiodata = null;
                  }
                  // Creating Reply message object
                  var messageData: any = {
                    message: message.message,
                    parentId: this.message2._id,
                  
                    senderId: this.loginuserdata.id,
                    senderEmail: this.loginuserdata.EmailId,
                    senderName: this.loginuserdata.Name,
                    receiverId: this.chatuser._id,
                    receiverEmailId: this.chatuser.EmailId,
                    photo: this.userForm,
                    isMedia: true,
                    blobdata: this.blobdata,
                    Gps: this.gotlocation,
                    locationurl: this.locationurl,
                    locationlabel: this.locationlabel,
                    incognitoStatus: 'null',
                  }
                } else {
                  //For Normal Messaging
                  if (this.audiodata) {
                    console.log("audiodata: ", this.audiodata)
                    this.userForm.push(this.audiodata);
                    this.audiodata = null;
                  }
                  //Creating Normal Message Object
                  var messageData: any = {
                    message: message.message,
                    parentId: null,
                    senderId: this.loginuserdata.id,
                    senderEmail: this.loginuserdata.EmailId,
                    senderName: this.loginuserdata.Name,
                    receiverId: this.chatuser._id,
                    receiverEmailId: this.chatuser.EmailId,
                    photo: this.userForm,
                    isMedia: true,
                    blobdata: this.blobdata,
                    Gps: this.gotlocation,
                    locationurl: this.locationurl,
                    locationlabel: this.locationlabel,
                    incognitoStatus: 'null',

                  }
                }
                //console.log("messageData: ",messageData)
                // if (!messageData.photo && !messageData.Gps && !messageData.locationurl) { messageData.isMedia = false }
                if ((messageData.photo.length == 0) && (messageData.media == null || !messageData.blobdata == null)
                  && (!messageData.Gps && !messageData.locationurl)) { messageData.isMedia = false }
                else {
                  messageData.isMedia = true;
                }
              }

              console.log("messageData: ", messageData)
              //CHecking for blank message
              if ((messageData.message == null || messageData.message == undefined) && (messageData.isMedia == false) && (this.location == null)) {
                this.snackbar.open("No Input data", "x", {
                  duration: 1000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              }
              else {
                //Uploading Message Object to DB
                console.log("messageData", messageData);
                this.messageService.sendMessage(messageData).subscribe(res => {
                  this.userService.getFriends(this.id).subscribe(users => {
                    this.listusers = users;
                    console.log("friendsssssssss", this.listusers)
                  });
                  this.emailSentMsg = res;
                  console.log("Res: ", res)
                  this.blockingRes = res
                  if (res == "receiverblocked") {
                    this.userForm = [];
                    this.urls = [];
                    this.fileuploadlist = [];
                    this.urlss = [];
                    this.imageToCompress = [];
                    this.blobUrl = null;
                    this.blobdata = null;
                    this.audiodata = null;
                    this.gotlocation = null;
                    this.locationurl = null;
                    this.locationlabel = null;
                    this.enablesend = true
                    this.snackbar.open("user was blocked to you", "x", {
                      duration: 2000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  } else if (res == 'senderblocked') {
                    this.userForm = [];
                    this.urls = [];
                    this.fileuploadlist = [];
                    this.imageToCompress = []
                    this.urlss = []
                    this.blobUrl = null
                    this.blobdata = null
                    this.audiodata = null
                    this.locationurl = null;
                    this.gotlocation = null;
                    this.locationlabel = null;
                    this.enablesend = true
                    this.snackbar.open("please, Remove the user from block state", "x", {
                      duration: 2000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  } else {
                    this.userForm = [];
                    this.urls = [];
                    this.urlss = [];
                    this.fileuploadlist = [];
                    this.imageToCompress = []
                    this.dragFiles = [];
                    this.blobUrl = null
                    this.blobdata = null
                    this.audiodata = null
                    this.locationurl = null;
                    this.gotlocation = null;
                    this.locationlabel = null;
                    this.message2 = null
                    this.files = [];
                    this.enablesend = true
                  }

                });
              };
            }

          }
        })
      }
      //Triggers when no new media is uploaded
      else {
        if (this.firstco) {
          //Checking if any new recorded audio is available and pushing it to userForm
          if (this.audiodata) {
            console.log("audiodata: ", this.audiodata)
            this.userForm.push(this.audiodata);
            this.audiodata = null;
          }
          //Creating Message Object for Edit Message
          var messageData: any = {
            message: this.searchValue,
            parentId: null,
            senderId: this.loginuserdata.id,
            senderEmail: this.loginuserdata.EmailId,
            senderName: this.loginuserdata.Name,
            receiverId: this.chatuser._id,
            receiverEmailId: this.chatuser.EmailId,
            photo: this.userForm,
            isMedia: true,
            blobdata: this.blobdata,
            Gps: this.gotlocation,
            locationurl: this.locationurl,
            locationlabel: this.locationlabel,
            incognitoStatus: 'null'
          }
          console.log("MessageID: ", this.editUserdata._id)
          console.log("firstco", messageData)
          //Sending Edit Message Object to DB
          if (messageData.message || messageData.photo.length > 0 || messageData.Gps || messageData.locationurl) {
            this.messageService.sendEditMessage({ messageData: messageData, id: this.editUserdata._id }).subscribe((updateResult: any) => {
              console.log("updateResult: ", updateResult);
              this.firstco = false;
              this.counter = 1;
              this.searchValue = null;
              this.message2 = null;
              this.userForm = [];
              this.urls = [];
              this.urlss = [];
              this.fileuploadlist = [];
              this.imageToCompress = []
              this.gotlocation = null;
              this.dragFiles = [];
              this.blobUrl = null
              this.blobdata = null
              this.audiodata = null
              this.locationurl = null;
              this.locationlabel = null;
              this.files = [];
              this.enablesend = true
            });
          }
          else {
            this.zone.run(() => {
              this.snackbar.open(`No Input Data`, "x", {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            });
          }
        }
        else {
          //Checking for Blank Messages in Incognito Mode
          if (this.incognitoRes) {
            this.counter = 1;
            this.searchValue = null;
            this.message2 = null;
            if (message.message != null && message.message.trim() == '') {
              return false
            }
            //Creating Message Object in Incognito mode
            else {
              var messageData1 = {
                message: message.message,
                senderId: this.loginuserdata.id,
                senderEmail: this.loginuserdata.EmailId,
                senderName: this.loginuserdata.Name,
                receiverId: this.chatuser._id,
                receiverEmailId: this.chatuser.EmailId,
                photo: this.userForm,
                isMedia: true,
                blobdata: this.blobdata,
                Gps: this.gotlocation,
                locationurl: this.locationurl,
                locationlabel: this.locationlabel,
                incognito: "incognito chat",
                incognitoStatus: '0',
                parentId: null
              }

            }
            if ((messageData1.message == null || messageData1.message == undefined) && (messageData1.isMedia == false) && (this.location == null)) {
              this.snackbar.open("No Input data", "x", {
                duration: 1000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            }
            else {
              //Uploading Incognito Message Object to DB
              console.log("messageData", messageData1);
              this.messageService.sendMessage(messageData1).subscribe(res => {
                this.userService.getFriends(this.id).subscribe(users => {
                  this.listusers = users;
                  console.log("friendsssssssss", this.listusers)
                });
                console.log("Res: ", res)
                this.blockingRes = res
                if (res == "receiverblocked") {
                  this.userForm = [];
                  this.urls = [];
                  this.urlss = [];
                  this.fileuploadlist = [];
                  this.imageToCompress = []
                  this.blobUrl = null
                  this.blobdata = null
                  this.audiodata = null
                  this.locationurl = null;
                  this.gotlocation = null;
                  this.locationlabel = null;
                  this.snackbar.open("user was blocked to you ", "x", {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                  });
                } else if (res == 'senderblocked') {
                  this.userForm = [];
                  this.urls = [];
                  this.urlss = [];
                  this.fileuploadlist = [];
                  this.imageToCompress = []
                  this.blobUrl = null
                  this.blobdata = null
                  this.audiodata = null
                  this.locationurl = null;
                  this.gotlocation = null;
                  this.locationlabel = null;
                  this.snackbar.open("please, Remove the user from block state", "x", {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                  });
                } else {
                  this.userForm = [];
                  this.urls = [];
                  this.urlss = [];
                  this.fileuploadlist = [];
                  this.imageToCompress = []
                  this.dragFiles = [];
                  this.blobUrl = null
                  this.blobdata = null
                  this.audiodata = null
                  this.locationurl = null;
                  this.gotlocation = null;
                  this.locationlabel = null;
                  this.files = [];
                }
              });
            };
          } else {

            //For Replying to Messages
            this.counter = 1;
            this.searchValue = null;
            console.log(this.userForm)
            if (message.message != null && message.message.trim() == '' && this.userForm.length == 0) {
              return false
            } else {
              //Checking if User is replying to a message
              if (this.message2) {
                if (this.audiodata) {
                  console.log("audiodata: ", this.audiodata)
                  this.userForm.push(this.audiodata);
                  this.audiodata = null;
                }
                // Creating Reply message object
                var messageData: any = {
                  message: message.message,
                  parentId: this.message2._id,
                  preciverimg:this.message2.reciverimg._id,
                psenderimg:this.message2.senderimg._id,
                  senderId: this.loginuserdata.id,
                  senderEmail: this.loginuserdata.EmailId,
                  senderName: this.loginuserdata.Name,
                  receiverId: this.chatuser._id,
                  receiverEmailId: this.chatuser.EmailId,
                  photo: this.userForm,
                  isMedia: true,
                  blobdata: this.blobdata,
                  Gps: this.gotlocation,
                  locationurl: this.locationurl,
                  locationlabel: this.locationlabel,
                  incognitoStatus: 'null',
                }
              } else {
                //For Normal Messaging
                if (this.audiodata) {
                  console.log("audiodata: ", this.audiodata)
                  this.userForm.push(this.audiodata);
                  this.audiodata = null;
                }
                //Creating Normal Message Object
                var messageData: any = {
                  message: message.message,
                  parentId: null,
                  senderId: this.loginuserdata.id,
                  senderEmail: this.loginuserdata.EmailId,
                  senderName: this.loginuserdata.Name,
                  receiverId: this.chatuser._id,
                  receiverEmailId: this.chatuser.EmailId,
                  photo: this.userForm,
                  isMedia: true,
                  blobdata: this.blobdata,
                  Gps: this.gotlocation,
                  locationurl: this.locationurl,
                  locationlabel: this.locationlabel,
                  incognitoStatus: 'null',

                }
              }
              //console.log("messageData: ",messageData)
              // if (!messageData.photo && !messageData.Gps && !messageData.locationurl) { messageData.isMedia = false }
              if ((messageData.photo.length == 0) && (messageData.media == null || !messageData.blobdata == null)
                && (!messageData.Gps && !messageData.locationurl)) { messageData.isMedia = false }
              else {
                messageData.isMedia = true;
              }
            }

            console.log("messageData: ", messageData)
            //CHecking for blank message
            if ((messageData.message == null || messageData.message == undefined) && (messageData.isMedia == false) && (this.location == null)) {
              this.snackbar.open("No Input data", "x", {
                duration: 1000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            }
            else {
              //Uploading Message Object to DB
              this.messageService.sendMessage(messageData).subscribe(res => {
                this.userService.getFriends(this.id).subscribe(users => {
                  this.listusers = users;
                });
                this.emailSentMsg = res;
                console.log("Res: ", res)
                this.blockingRes = res
                if (res == "receiverblocked") {
                  this.userForm = [];
                  this.urls = [];
                  this.fileuploadlist = [];
                  this.urlss = [];
                  this.imageToCompress = []
                  this.blobUrl = null
                  this.blobdata = null
                  this.audiodata = null;
                  this.gotlocation = null;
                  this.locationurl = null;
                  this.locationlabel = null;
                  this.snackbar.open("user was blocked to you", "x", {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                  });
                } else if (res == 'senderblocked') {
                  this.userForm = [];
                  this.urls = [];
                  this.fileuploadlist = [];
                  this.imageToCompress = []
                  this.urlss = []
                  this.blobUrl = null
                  this.blobdata = null
                  this.audiodata = null
                  this.locationurl = null;
                  this.gotlocation = null;
                  this.locationlabel = null;
                  this.snackbar.open("please, Remove the user from block state", "x", {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                  });
                } else {
                  this.userForm = [];
                  this.imageToCompress = []
                  this.urls = [];
                  this.urlss = [];
                  this.fileuploadlist = []
                  this.dragFiles = [];
                  this.blobUrl = null
                  this.blobdata = null
                  this.audiodata = null
                  this.locationurl = null;
                  this.gotlocation = null;
                  this.locationlabel = null;
                  this.message2 = null
                  this.files = [];
                }
              });
            };
          }

        }
      }

    }
    else {
      //Triggers when message has no media
      if (this.firstco) {
        //Checking if any new recorded audio is available and pushing it to userForm
        if (this.audiodata) {
          console.log("audiodata: ", this.audiodata)
          this.userForm.push(this.audiodata);
          this.audiodata = null;
        }
        //Creating Message Object for Edit Message
        var messageData: any = {
          message: this.searchValue,
          parentId: null,
          senderId: this.loginuserdata.id,
          senderEmail: this.loginuserdata.EmailId,
          senderName: this.loginuserdata.Name,
          receiverId: this.chatuser._id,
          receiverEmailId: this.chatuser.EmailId,
          photo: this.userForm,
          isMedia: true,
          blobdata: this.blobdata,
          Gps: this.gotlocation,
          locationurl: this.locationurl,
          locationlabel: this.locationlabel,
          incognitoStatus: 'null'
        }
        console.log("MessageID: ", this.editUserdata._id)
        console.log("firstco", messageData)
        //Sending Edit Message Object to DB
        if (messageData.message || messageData.photo.length > 0 || messageData.Gps || messageData.locationurl) {
          this.messageService.sendEditMessage({ messageData: messageData, id: this.editUserdata._id }).subscribe((updateResult: any) => {
            console.log("updateResult: ", updateResult);
            this.firstco = false;
            this.counter = 1;
            this.searchValue = null;
            this.message2 = null;
            this.userForm = [];
            this.imageToCompress = []
            this.urls = [];
            this.urlss = [];
            this.fileuploadlist = [];
            this.gotlocation = null;
            this.dragFiles = [];
            this.blobUrl = null
            this.blobdata = null
            this.audiodata = null
            this.locationurl = null;
            this.locationlabel = null;
            this.files = [];
            this.enablesend = true
          });
        }
        else {
          this.zone.run(() => {
            this.snackbar.open(`No Input Data`, "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
        }
      }
      else {
        //Checking for Blank Messages in Incognito Mode
        if (this.incognitoRes) {
          this.counter = 1;
          this.searchValue = null;
          this.message2 = null;
          if (message.message != null && message.message.trim() == '') {
            return false
          }
          //Creating Message Object in Incognito mode
          else {
            var messageData1 = {
              message: message.message,
              senderId: this.loginuserdata.id,
              senderEmail: this.loginuserdata.EmailId,
              senderName: this.loginuserdata.Name,
              receiverId: this.chatuser._id,
              receiverEmailId: this.chatuser.EmailId,
              photo: this.userForm,
              isMedia: true,
              blobdata: this.blobdata,
              Gps: this.gotlocation,
              locationurl: this.locationurl,
              locationlabel: this.locationlabel,
              incognito: "incognito chat",
              incognitoStatus: '0',
              parentId: null
            }

          }
          if ((messageData1.message == null || messageData1.message == undefined) && (messageData1.isMedia == false) && (this.location == null)) {
            this.snackbar.open("No Input data", "x", {
              duration: 1000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
          else {
            //Uploading Incognito Message Object to DB
            console.log("messageData", messageData1);
            this.messageService.sendMessage(messageData1).subscribe(res => {
              this.userService.getFriends(this.id).subscribe(users => {
                this.listusers = users;
                console.log("friendsssssssss", this.listusers)
              });
              console.log("Res: ", res)
              this.blockingRes = res
              if (res == "receiverblocked") {
                this.userForm = [];
                this.urls = [];
                this.urlss = [];
                this.fileuploadlist = [];
                this.imageToCompress = []
                this.blobUrl = null
                this.blobdata = null
                this.audiodata = null
                this.locationurl = null;
                this.gotlocation = null;
                this.locationlabel = null;
                this.enablesend = true
                this.snackbar.open("user was blocked to you ", "x", {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              } else if (res == 'senderblocked') {
                this.userForm = [];
                this.urls = [];
                this.urlss = [];
                this.fileuploadlist = []
                this.imageToCompress = []
                this.blobUrl = null
                this.blobdata = null
                this.audiodata = null
                this.locationurl = null;
                this.gotlocation = null;
                this.locationlabel = null;
                this.enablesend = true
                this.snackbar.open("please, Remove the user from block state", "x", {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              } else {
                this.userForm = [];
                this.urls = [];
                this.urlss = [];
                this.fileuploadlist = [];
                this.imageToCompress = []
                this.dragFiles = [];
                this.blobUrl = null
                this.blobdata = null
                this.audiodata = null
                this.locationurl = null;
                this.gotlocation = null;
                this.locationlabel = null;
                this.files = [];
                this.enablesend = true
              }
            });
          };
        } else {

          //For Replying to Messages
          this.counter = 1;
          this.searchValue = null;
          console.log(this.userForm)
          if (message.message != null && message.message.trim() == '' && this.userForm.length == 0) {
            return false
          } else {
            //Checking if User is replying to a message
            if (this.message2) {
              if (this.audiodata) {
                console.log("audiodata: ", this.audiodata)
                this.userForm.push(this.audiodata);
                this.audiodata = null;
              }
              // Creating Reply message object
              var messageData: any = {
                message: message.message,
                parentId: this.message2._id,
                preciverimg:this.message2.reciverimg._id,
               psenderimg:this.message2.senderimg._id,
                senderId: this.loginuserdata.id,
                senderEmail: this.loginuserdata.EmailId,
                senderName: this.loginuserdata.Name,
                receiverId: this.chatuser._id,
                receiverEmailId: this.chatuser.EmailId,
                photo: this.userForm,
                isMedia: true,
                blobdata: this.blobdata,
                Gps: this.gotlocation,
                locationurl: this.locationurl,
                locationlabel: this.locationlabel,
                incognitoStatus: 'null',
              }
            } else {
              //For Normal Messaging
              if (this.audiodata) {
                console.log("audiodata: ", this.audiodata)
                this.userForm.push(this.audiodata);
                this.audiodata = null;
              }
              //Creating Normal Message Object
              var messageData: any = {
                message: message.message,
                parentId: null,
                senderId: this.loginuserdata.id,
                senderEmail: this.loginuserdata.EmailId,
                senderName: this.loginuserdata.Name,
                receiverId: this.chatuser._id,
                receiverEmailId: this.chatuser.EmailId,
                photo: this.userForm,
                isMedia: true,
                blobdata: this.blobdata,
                Gps: this.gotlocation,
                locationurl: this.locationurl,
                locationlabel: this.locationlabel,
                incognitoStatus: 'null',

              }
            }
            //console.log("messageData: ",messageData)
            // if (!messageData.photo && !messageData.Gps && !messageData.locationurl) { messageData.isMedia = false }
            if ((messageData.photo.length == 0) && (messageData.media == null || !messageData.blobdata == null)
              && (!messageData.Gps && !messageData.locationurl)) { messageData.isMedia = false }
            else {
              messageData.isMedia = true;
            }
          }

          console.log("messageData: ", messageData)
          //CHecking for blank message
          if ((messageData.message == null || messageData.message == undefined) && (messageData.isMedia == false) && (this.location == null)) {
            this.snackbar.open("No Input data", "x", {
              duration: 1000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
          else {
            //Uploading Message Object to DB
            console.log("messageData", messageData);
            this.messageService.sendMessage(messageData).subscribe(res => {
              this.userService.getFriends(this.id).subscribe(users => {
                this.listusers = users;
                console.log("friendsssssssss", this.listusers)
              });
              this.emailSentMsg = res;
              console.log("Res: ", res)
              this.blockingRes = res;
              if (this.blockingRes.emailsentmsg == 1) {
                this.snackbar.open("message sent to user mail sucessfully ", "x", {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              }
              if (res == "receiverblocked") {
                this.userForm = [];
                this.urls = [];
                this.fileuploadlist = [];
                this.urlss = []
                this.imageToCompress = []
                this.blobUrl = null
                this.blobdata = null
                this.audiodata = null;
                this.gotlocation = null;
                this.locationurl = null;
                this.enablesend = true
                this.locationlabel = null;
                this.snackbar.open("user was blocked to you", "x", {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              } else if (res == 'senderblocked') {
                this.userForm = [];
                this.urls = [];
                this.fileuploadlist = []
                this.urlss = []
                this.imageToCompress = []
                this.blobUrl = null
                this.blobdata = null
                this.audiodata = null
                this.locationurl = null;
                this.gotlocation = null;
                this.locationlabel = null;
                this.enablesend = true
                this.snackbar.open("please, Remove the user from block state", "x", {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              } else {
                this.userForm = [];
                this.urls = [];
                this.urlss = [];
                this.fileuploadlist = []
                this.imageToCompress = []
                this.dragFiles = [];
                this.blobUrl = null
                this.blobdata = null
                this.audiodata = null
                this.locationurl = null;
                this.gotlocation = null;
                this.locationlabel = null;
                this.message2 = null
                this.files = [];
                this.enablesend = true
              }
            });
          };
        }

      }

      // }
    };
  }

  canceledit() {
    this.firstco = false;
    this.secondco = false;
    this.gotlocation = null
    this.urlss = [];
    this.urls = [];
    this.fileuploadlist = [];
    this.imageToCompress = [];
    this.searchValue = null
    this.locationurl = null;
    this.locationlabel = null
  }

  FetchExtension(file: any) {
    console.log("File Dragged: ", file);
    console.log("File name length: ", file.name.length)

    var pos = file.name.length;
    while (pos > 0) {
      if (file.name.charAt(pos - 1) == '.') {
        break;
      }
      else {
        pos--;
      }
    }
    var extension = file.name.substring(pos);
    console.log("File extension: ", extension);
    return extension;
  }

  //Create Image Blob
  CreateBlobImage(dataURI, filename) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var bb = new Blob([ab], { type: mimeString });
    const imgFile = new File([bb], filename, { type: mimeString });
    return imgFile;
  }

  fileProgress = (fileSelect: any) => {
    console.log("In File Progress: ", this.fileuploadlist.length)

    this.snackcounter = 0;

    var fileInput = [];

    fileInput = Array.from(fileSelect.target.files);
    console.log("FileInput at FileProgress: ", fileInput)
    this.fileProcess(fileInput);
  }

  fileProcess(fileInput: any) {

    console.log("In File Process")
    this.count = this.fileuploadlist.length;
    for (let file of fileInput) {
      let extension = this.FetchExtension(file);
      if (this.count < 5) {
        console.log("fileProcess: ", file);
        if (file['type'].match(/image\/*/) && file.size <= 1024 * 1024) {
          this.count++;
          this.fileuploadlist.push(file);
          var reader = new FileReader();
          reader.onload = (e: any) => {
            this.urlss.push({ url: e.target.result, type: "image" })
            this.spinner.show()
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 5000);
          }
          reader.readAsDataURL(file)
        }
        else if (file['type'].match(/image\/*/) && file.size > 1024 * 1024) {
          this.count++;
          this.imageToCompress.push(file);
          this.zone.run(() => {
            this.snackbar.open(`Some images are larger than 1 MB. Will be compressed.`, "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
        }
        else if (file['type'].match(/audio\/*/) && file['size'] <= (25 * 1024 * 1024)) {
          this.count++;
          this.fileuploadlist.push(file);
          var reader = new FileReader();
          reader.onload = (e: any) => {
            this.urlss.push({ url: e.target.result, type: "audio" });
          }
          reader.readAsDataURL(file);
        }
        else if (file['type'].match(/audio\/*/) && file['size'] > (25 * 1024 * 1024)) {
          this.zone.run(() => {
            this.snackbar.open(`Audio files larger than 25 MB not allowed. Discarding!!!`, "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
        }
        else if (file['type'].match(/video\/*/) && file['size'] <= (25 * 1024 * 1024)) {
          this.count++;
          this.fileuploadlist.push(file);
          var reader = new FileReader();
          reader.onload = (e: any) => {
            this.urlss.push({ url: e.target.result, type: "video" });
          }
          reader.readAsDataURL(file);
        }
        else if (file['type'].match(/video\/*/) && file['size'] > (25 * 1024 * 1024)) {
          this.zone.run(() => {
            this.snackbar.open(`Video files larger than 25 MB not allowed. Discarding!!!`, "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
        }
        else if ((file['type'].match(/application\/*/) || file['type'].match(/text\/*/) || extension == "txt" || extension == "csv" || extension == "pdf" || extension == "doc" || extension == "docx" || extension == "xls" || extension == "xlsx" || extension == "ppt" || extension == "pptx") && file['size'] < (25 * 1024 * 1024)) {
          this.count++;
          this.fileuploadlist.push(file);
          var reader = new FileReader();
          reader.onload = (e: any) => {
            this.urlss.push({ url: e.target.result, type: "document", extension: extension, name: file['name'] });
          }
          reader.readAsDataURL(file);
        }
        else if ((file['type'].match(/application\/*/) || file['type'].match(/text\/*/) || extension == "txt" || extension == "csv" || extension == "pdf" || extension == "doc" || extension == "docx" || extension == "xls" || extension == "xlsx" || extension == "ppt" || extension == "pptx") && file['size'] > (25 * 1024 * 1024)) {
          this.zone.run(() => {
            this.snackbar.open(`Documents larger than 25 MB not allowed. Discarding!!!`, "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
        }
        else {
          this.zone.run(() => {
            this.snackbar.open(`Unsupported file. Discarding!!!`, "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
        }
      }
      else break;
    }
    console.log("Count: ", this.count)
    console.log("Upload List: ", this.fileuploadlist, this.fileuploadlist.length)
    console.log("Preview URL: ", this.urlss, this.urlss.length)
    console.log("Files to Compress: ", this.imageToCompress, this.imageToCompress.length);
    this.imgprocess(this.imageToCompress);
  }

  //To process image files inserted by user
  imgprocess(filelist: any) {

    var imagedata = [], tempfiles = [];

    let images: Array<IImage> = [];

    ImageCompressService.filesArrayToCompressedImageSource(filelist).then(observableImages => {

      observableImages.subscribe((image) => {

        images.push(image);

      }, (error) => {

        console.log("Error while converting: ", error);

      }, () => {

        let i = 0;
        for (let image of images) {
          var file = this.CreateBlobImage(image.compressedImage.imageDataUrl, filelist[i]['name']);
          // this.fileData.push(file);
          tempfiles.push(file);
          i++;
          // console.log("BlobFile: ",this.fileData[j]);          
          // i++;
          // console.log("File successfully inserted. ", this.fileData)
        }

        // console.log("FileData after inserting compressed images: ", this.fileData)
        var imagedata = [];
        if (tempfiles != []) {

          for (let file of tempfiles) {
            this.fileuploadlist.push(file);
            var reader = new FileReader();
            reader.onload = (e: any) => {
              this.urlss.push({ url: e.target.result, type: "image" });

            }
            reader.readAsDataURL(file);
          }

          // this.messageService.saveFiles(formData).subscribe((data:any) => {
          //   data.forEach(element => {
          //     console.log(element);
          //     // this.newEditData.push(element)
          //    this.urlss.push(element);

          //   });
          //   for (let i in data) {
          //     imagedata.push(data[i]);
          //     this.userForm.push(imagedata[i]._id);
          //   }
          // });
        }

      })
    });
    console.log("URLSS: ", this.urlss);
    console.log("UserForm: ", this.userForm)

  }

  draggedFilesList(file) {
    console.log("In dragged files list");
    this.dragFiles.push(file);
    if (this.dragFiles.length == this.files.length) {
      this.fileProcess(this.dragFiles);
      console.log("drag length: ", this.files.length);
      console.log("Exported length: ", this.dragFiles.length);
    }
  }

  // Drag and Drop

  dropped(files: NgxFileDropEntry[]) {
    this.files = [];
    this.dragFiles = [];
    this.snackcounter = 0;
    console.log("Typeof: ", typeof this.files);
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.files.push(droppedFile);
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log("Dragged File: ", file)
          this.draggedFilesList(file);
        });
      }
      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  fileDrag: any;
  public fileOver(event) {
    console.log(event);
    this.fileDrag = event
  }

  public fileLeave(event) {
    console.log(event);
  }

  DownloadSuccess(event) {
    console.log("DownloadEvent: ", event)
    this.zone.run(() => {
      this.snackbar.open(`File successfully downloaded!!`, "x", {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    });
  }
  Downloadfail(event) {
    console.log("DownloadEvent: ", event)
    this.zone.run(() => {
      this.snackbar.open(`Unable to download file. Verify the permissions!!`, "x", {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    });
  }


  // deltingAllmsgs will execute if user clicks clear chat then it will updatd senderDeltedEmailId == userlogin emailId
  deltingAllmsgs() {
    var details = {
      loginuser: this.id,
      chatuser: this.chatuser._id
    }
    this.userService.deltingAllmsgs(details).subscribe(data => {
      console.log("data",data);
      this.cdref.detectChanges();
    })
  }



  //This function wil execute when user clicks a single msg deleting
  del(delSinglemsgdata, index) {
    this.userService.deltingSinglemsg(delSinglemsgdata).subscribe(data => {
      this.userMessage[index] = data
      this.userMessage[index]
   
    })

    for(let message of this.userMessage)
    {
    if(message.deletingMsgstatus == 'value will be updated')
    {
    this.flag1=true
    }
   else
    {
    this.flag1=false
    }
  }
  }

  undel(delSinglemsgdata, index) {
    this.userService.undeltingSinglemsg(delSinglemsgdata).subscribe(data => {
      this.userMessage[index] = data
    })
  }

  star(data, data1, index) {
    var obj = {
      data: data,
      data1: data1
    }
    this.messageService.staredMessages(obj).subscribe(res => {
      this.Staredmessage = res;
    })
  }

  /*
 Function Name: sendlocation
 Input: None
 Output: Latitude and Longitude (Geo location of current user)
 Desc: When user clicks on send location, Check Grant permissions for location access or else send location link
 */

  sendlocation() {
    console.log("show my location");
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported/ Disabled by your browser')
    }
    else {
      navigator.geolocation.getCurrentPosition((Position) => {
        this.location = {
          latitude: Position.coords.latitude,
          longitude: Position.coords.longitude
        }
        console.log(this.location);
        this.locationlink = "https://www.google.com/maps?q="
        // console.log(this.locationlink)
        this.locationurl = `${this.locationlink}${this.location.latitude},${this.location.longitude}`;
        console.log(this.locationurl)
      },
        function () {
          // alert('unable to fetch location')
        })
    }
    this.cdref.detectChanges();
  }



  /*
Function Name: startRecording
Input: None
Output: Stream Bloburl with Blobdata (size and type of audio)
Desc: Calling the service for recording audio
Error:
*/

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.messageService.startRecording();
    }
  }
  /*
  Function Name: stopRecording
  Input: None
  Output: None
  Desc: Calling the service to stop audio recording
  Error:
  */
  stopRecording() {
    if (this.isRecording) {
      this.messageService.stopRecording();
      this.isRecording = false;
    }
  }

  /*
  Function Name: clearRecordedData
  Input: None
  Output: Clearing the recorded Data
  Desc: deleting existing recorded audio data
  Error: --
  */
  clearRecordedData() {
    this.blobUrl = null;
    this.blobdata = null;
    this.audiodata = null;
  }

  //This function will execute when user clicks on block or unblock button
  blocking(blockdata1, blockdata2) {
    let obj = {
      senderEmailId: blockdata1,
      recieverEmailId: blockdata2
    }
    this.messageService.blockingData(obj).subscribe(data => {
      this.blockdfltdata = data
      console.log(this.blockdfltdata)
    })
  }


  //This function will execute when user clicks on notify me button
  slideData;
  slide(data1) {
    console.log(data1)
    let obj = {
      data1: data1
    }
    this.messageService.slideData(obj).subscribe(data => {
      this.slideData = data
      this.chatuser.slidedata = this.slideData.slidedata
      console.log(this.chatuser)
    })
  };


  resetloc() {
    this.locationurl = null;
    this.gotlocation.latitude = null;
    this.gotlocation.longitude = null;
    this.gotlocation.label = null;
  }

  // This function will execute when user clicks on forward message
  forwardmsg(userdata) {
    // document.getElementById('forwardmsg').click()

    this.messageService.forwardmsg(userdata).subscribe(data => {
      this.forwardmsgdata = data
    })

    let dialogRef = this.dialog.open(this.fwdMsgModal);
    dialogRef.afterClosed().subscribe(result => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === 'yes') {
          // TODO: Replace the following line with your code.
          console.log('User clicked yes.');
        } else if (result === 'no') {
          // TODO: Replace the following line with your code.
          console.log('User clicked no.');
        }
      }
    })
  }



  // This is for forward message to multiple users
  frwdmsguserdetails(user) {



    console.log(user)
    this.listusers[this.listusers.indexOf(user)].checked = user.checked;
    user.checked ? this.countt++ : this.countt--;
    this.selectall ? !user.checked ? this.selectall = false : '' : ''

  }

  frwdgrpmsguserdetails(group) {
    console.log(group)
    this.Groups[this.Groups.indexOf(group)].checked = group.checked;
    group.checked ? this.countt++ : this.countt--;
    this.selectall ? !group.checked ? this.selectall = false : '' : ''
  }

  selectAllGroups(selectall) {
    console.log(selectall);
    if (selectall) {
      this.Groups.forEach((item) => {
        if (item._id == this.firstGroupId) {
          item.checked = false
        }
        else { item.checked = true }
      });
      this.countt = this.Groups.length - 1
    }
    else {
      this.Groups.map((item) => { item.checked = false });
      this.countt = 0
    }
  }

  //This message will execute when user clicks
  receiverId = [];
  badgeCountId = [];
  groupRes: any;
  sendForwardMsg(emails, id, msgdata) {
    if (this.highlightedBatch2) {
      this.highlightedBatch2.findIndex(group => {
        this.groupService.gettingMembersCount(group.GroupId._id).subscribe((result: any) => {
          console.log(result);
          this.groupRes = result
          this.groupRes.findIndex(info => {
            this.receiverId.push(info.memberId);
            if (info.memberId != this.loginuserdata.id) {
              this.badgeCountId.push(info.memberId)
            }
          })
          let data = {
            message: msgdata.message,
            groupSenderId: this.loginuserdata.id,
            groupReceiverId: this.receiverId,
            clearChat: this.receiverId,
            groupId: group.GroupId._id,
            unReadMessages: this.receiverId,
            photo: msgdata.photo,
            media: this.audiodata,
            isMedia: false,
            blobdata: this.blobdata,
            Gps: this.gotlocation,
            locationurl: this.locationurl,
            locationlabel: this.locationlabel
          }
          console.log('jjj');
          this.receiverId = []
          this.badgeCountId = []
          this.groupService.groupMessage(data).subscribe(msgRes => {


            this.receiverId = []
            this.badgeCountId = []
            console.log('kkkkkkkkkkkkkkkk', this.receiverId, this.badgeCountId);
          })
        })
      })
    }
    this.highlightedBatch2 = [];
    if (this.highlightedBatch2) {
      console.log("222222", msgdata);
      this.listofusersfrwdmsgEmails = []
      this.listofusersfrwdmsgId = [];
      var checkUsers = [];
      this.selectall = null;
      this.countt = 0
      this.listusers.forEach((item) => {
        if (item.checked) checkUsers.push(item);
        item.checked = null
      })
      emails = checkUsers
      if (emails.length) {
        for (var i = 0; i < emails.length; i++) {
          if (i == emails.length) {
            this.listofusersfrwdmsgEmails = []
            this.listofusersfrwdmsgId = []
          }
          this.counter = 1;
          this.searchValue = null;
          if (msgdata == null) {
            return false
          } else {
            var messageData = {
              message: msgdata.message,
              senderId: this.loginuserdata.id,
              senderEmail: this.loginuserdata.EmailId,
              senderName: this.loginuserdata.Name,
              receiverId: checkUsers[i].senderId._id === this.loginuserdata.id ? checkUsers[i].receiverid._id : checkUsers[i].senderId._id,
              receiverEmailId: checkUsers[i].senderId.EmailId === this.loginuserdata.EmailId ? checkUsers[i].receiverid.EmailId : checkUsers[i].senderId.EmailId,
              photo: msgdata.photo,
              media: msgdata.media,
              isMedia: false,
              blobdata: this.blobdata,
              Gps: this.location,
              locationurl: this.locationurl
            }
            // if (!messageData.photo && !messageData.Gps && !messageData.locationurl) { messageData.isMedia = false }
            if ((messageData.photo.length == 0) && (messageData.media == null || !messageData.blobdata == null)
              && (!messageData.Gps && !messageData.locationurl)) { messageData.isMedia = false }
            else {
              messageData.isMedia = true;
            }
          }

          if ((messageData.message == null || messageData.message == undefined) && (messageData.isMedia == false) && (this.location == null)) {
            this.snackbar.open("No Input data", "x", {
              duration: 1000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
          else {
            console.log("messageData", messageData);
            this.messageService.sendMessage(messageData).subscribe(res => {
              console.log("Res: ", res)
              this.blockingRes = res
              if (res == "You are in blocking state") {

                this.userForm = [];
                this.urls = [];
                this.blobUrl = null
                this.blobdata = null
                this.audiodata = null
                this.locationurl = null;
                this.gotlocation = null;
                this.snackbar.open("you are in blocked ", "x", {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              } else {
                console.log("PreviewURL", this.urlss);
                // this.userMessage.push(res);
                // var test = document.getElementById("test");
                // this.scrolltop = test.scrollHeight;
                // this.cdref.detectChanges();
                this.userForm = [];

                this.urls = [];
                this.dragFiles = [];
                this.blobUrl = null
                this.blobdata = null
                this.audiodata = null
                this.locationurl = null;
                this.gotlocation = null;
                this.files = [];
              }
            });
          };
        }
      } else {
        this.snackbar.open("Please select the user", "x", {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'


        });
      }
      document.getElementById("exampleModal").click();
    }



  }

  //forward msg clear selected users data close function 
  frwdmsgcleardata() {
    this.selectall = null;
    this.countt = 0;
    this.listusers.forEach((item) => {
      if (item.checked)
        item.checked = null
    })

  }

  // select all users for forward message to all users
  selectallusers(selectallusers) {
    console.log(selectallusers);
    if (selectallusers) {
      this.listusers.forEach((item) => {
        if (item._id == this.Userdetails) {
          item.checked = false
        }
        else { item.checked = true }
      });
      this.countt = this.listusers.length - 1
    }
    else {
      this.listusers.map((item) => { item.checked = false });
      this.countt = 0
    }
  }





  // This function will execute when user wants to forward for a specific user search
  searchName(data) {
    this.x = data;
    this.frwdmsglistusers = []
    for (var i = 0; i < this.listusers.length; i++) {
      if (this.loginuserdata.EmailId == this.listusers[i].from) {
        var search1 = this.listusers[i].receiverid.Name.includes(this.x);
        if (search1 == true) {
          this.frwdmsglistusers.push(this.listusers[i])
        }
      } else {
        var search2 = this.listusers[i].senderId.Name.includes(this.x);
        if (search2 == true) {
          this.frwdmsglistusers.push(this.listusers[i])
        }
      }
    }
  }


  // This function will execute when user clicks on star msgs then it will get all faviourates message
  STARMSGS(loginuserdata, chatuser) {
    let obj = {
      loginuserdata: loginuserdata,
      chatuser: chatuser
    }
    if (this.starmsg1 == false) {
      this.starmsg1 = true
      this.messageService.starmsg(obj).subscribe(statmsgsdata => {
        console.log(statmsgsdata)
        this.Staredmessage = statmsgsdata
      })
    } else {
      this.starmsg1 = false
    }
  }

  openCamera() {
    let mediaConstraints: any = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }, audio: true
    };

    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((stream) => {
        const dialogRef = this.dialogbox.open(CameraComponent, {

          disableClose: false,
          autoFocus: true,
          panelClass: 'cameramodal',
          maxWidth: '100%',

          width: this.camerawidth + 'px',
          height: this.cameraheight + 'px',
          // position: {
          //   top:'15rem',
          //   left: 'auto'

          // }
        });

        dialogRef.beforeClosed().subscribe((result: any) => {
          this.imageToCompress = [];
          console.log("Camera Result: ", result);
          setTimeout(() => {
            stream.getTracks().forEach(track => {
              console.log(track)
              console.log(track.stop());
            });
          }, 0);
          // stream.getTracks().forEach(track => {
          //   console.log("Stopping Track: ",track)
          //   track.stop()});
          if (result) {
            if (result.type == "image/png") {
              if (result.size <= 1024 * 1024) {
                this.fileuploadlist.push(result);
                var reader = new FileReader();
                reader.onload = (e: any) => {
                  this.urlss.push({ url: e.target.result, type: "image" });
                }
                reader.readAsDataURL(result);
              }
              else {
                this.imageToCompress.push(result);
                this.zone.run(() => {
                  this.snackbar.open(`Image is larger than 1 MB. Will be compressed.`, "x", {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                  });
                });
                this.imgprocess(this.imageToCompress)
              }

            }
            else {
              console.log("Video file: ", result);
              this.fileuploadlist.push(result);
              var reader = new FileReader();
              reader.onload = (e: any) => {
                this.urlss.push({ url: e.target.result, type: "video" });
              }
              reader.readAsDataURL(result);
            }
          }



        })


      }, (stream) => {
        //handle error here
        console.log("No Devices Found.");
        this.zone.run(() => {
          this.snackbar.open(`No Camera Devices Found or Devices are being used by another application.`, "x", {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        });
      });

  }

  openMap() {
    const dialogRef = this.dialogbox.open(MapviewComponent, {

      disableClose: true,
      autoFocus: true,
      width: '526px',
      height: '590px',
      backdropClass: 'mapdrop',
      // position: {
      //   top:'15rem',
      //   left: 'auto'
      // },
      panelClass: 'mapdialog'
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      await result;
      console.log('The dialog was closed: ', result);
      if (result) {
        if (result.locationlabel)
          console.log("Result1: ", result);
      }

      if (result && result.locationId) {
        console.log("Condition1")
        var gets = this;
        var xhr = new XMLHttpRequest()
        xhr.open("GET", 'https://geocoder.api.here.com/6.2/geocode.json?app_id=xeeSniVGFJguQieOyDvg&app_code=CYXw3RyDsetaa5pSVf3EAw&locationid=' + result.locationId + '&jsonattributes=1&gen=9')
        xhr.responseType = 'json'
        xhr.onload = function () {
          if (xhr && xhr.response) {
            let location = xhr.response.response.view[0].result[0].location.displayPosition;
            console.log("location", location);
            gets.gotlocation = {
              label: result.label,
              latitude: location.latitude,
              longitude: location.longitude
            }
            console.log("result", gets.gotlocation);
            gets.locationlink = "https://www.google.com/maps?q="
            console.log(gets.locationlink)
            gets.locationurl = `${gets.locationlink}${gets.gotlocation.latitude},${gets.gotlocation.longitude}`;
            gets.locationlabel = gets.gotlocation.label;
          }
        }
        xhr.send()
        xhr.onerror = function () {
        }
      }
      else {
        let ResArray = null;
        if (result) {
          ResArray = Array.isArray(result.position);
          console.log("result2", result, Array.isArray(result.position));
        }
        if (result && ResArray == true) {
          console.log("Condition2")
          this.gotlocation = {
            latitude: result.position[0],
            longitude: result.position[1],
          }
          console.log("result3", this.gotlocation);
          this.locationlink = "https://www.google.com/maps?q="
          this.locationurl = `${this.locationlink}${this.gotlocation.latitude},${this.gotlocation.longitude}`;
        }
        else {
          if (result && ResArray == false) {
            console.log("Condition3 ", result)
            this.gotlocation = {
              latitude: result.latitude,
              longitude: result.longitude,
              label: result.locationlabel

            }
            // while(this.gotlocation.locationlabel==null || this.gotlocation.locationlabel==undefined || this.gotlocation.locationlabel=="") {
            //   this.gotlocation.locationlabel=result.locationlabel;
            //   console.log("temp: ",this.gotlocation.locationlabel)
            // }            
            console.log("result4", this.gotlocation);
            this.locationlink = "https://www.google.com/maps?q="
            console.log(this.locationlink)
            this.locationurl = `${this.locationlink}${this.gotlocation.latitude},${this.gotlocation.longitude}`;
            this.locationlabel = this.gotlocation.label
          }
          console.log('No result');
        }
      }
    });
  }

  msgIndication() {
    let obj = {
      login: this.loginuserdata,
      chat: this.chatuser
    }
    this.messageService.messageIndicator(obj).subscribe(data => {
    })
  }

  getCursorPosition(Inputfield) {
    if (Inputfield.selectionStart || Inputfield.selectionStart == '0') {
      this.cursorPos = Inputfield.selectionStart;
    }
    console.log("Cursor Position: ", this.cursorPos);
  }

  EmojisArray = []; //Emoji array

  openEmoji() {
    var data: any
    this.emojiobservable = this.userService.getEmoji().subscribe((data: any) => {
      if (data) {
        console.log(data);

        if (this.searchValue == null) {
          this.searchValue = data.native;
          this.cursorPos = this.cursorPos + data.native.length;
        }
        else {
          console.log(this.cursorPos);
          console.log(this.searchValue)
          console.log("1. ", this.searchValue.substring(0, this.cursorPos));
          console.log("2. ", data.native.length)
          console.log("3. ", this.searchValue.substring(this.cursorPos));
          this.searchValue = this.searchValue.substring(0, this.cursorPos) + data.native + this.searchValue.substring(this.cursorPos);
          console.log("4. ", this.searchValue)
          // this.searchValue=temp;
          this.cursorPos = this.cursorPos + data.native.length;
          console.log(this.cursorPos);
          console.log(this.searchValue)
        }
      }
    })
    const dialogRef = this.dialogbox.open(EmojiComponent, {

      disableClose: false,
      autoFocus: true,
      width: 'auto',
      height: 'auto',
      backdropClass: 'mapdrop',
      panelClass: 'emojidialog'
    });

    // dialogRef.afterOpened().subscribe(emojiresponse => {
    //   console.log("emojiresponse: ",emojiresponse);
    //   return emojiresponse;
    // })

    //dialog closed
    dialogRef.afterClosed().subscribe(emojiresponse => {
      console.log("After Closed")
      // console.log('emoji response', emojiresponse);
      this.emojiobservable.unsubscribe();
      // if (emojiresponse){
      //   if(this.searchValue==null) {
      //     this.searchValue=emojiresponse.native
      //   }
      //   else {
      //     this.searchValue+=emojiresponse.native
      //   }
      // }

    });

  }
  emojicollect(data) {
    console.log("invoking Emoji Collect: ", data)
    this.EmojisArray.push(data);
    this.EmojisArray.forEach(emoji => {
      console.log(emoji.native, emoji.id)
    })
  }

  incognitochatCancel(user) {
    console.log("666666666", user);
    var data = { data: "incognitoResnull" }
    this.messageService.showres(data).subscribe(data => {
    })
    document.getElementById("incognitoTerminate").click()
    if (this.id == user.receiverid._id) {
      this.route.navigate(['/navbar/main'], { queryParams: { id: user._id, userid: user.senderId._id, value: false } });
    }
    else if (this.id == user.senderId._id) {
      this.route.navigate(['/navbar/main'], { queryParams: { id: user._id, userid: user.receiverid._id, value: false } });
    }
  }

  // incognito terminate 
  incognitoterminate() {
    if (this.incognitoRes) {
      if (this.incognitoRes.chatuser == this.loginuserdata.id || this.incognitoRes.loginuser == this.loginuserdata.id) {
        document.getElementById("incognitoTerminate").click()
      }
    }
  }
  users(user) {
    // if (this.incognitoRes) {
    //   if (this.incognitoRes.chatuser == this.loginuserdata.id || this.incognitoRes.loginuser == this.loginuserdata.id) {
    //     document.getElementById("incognitoTerminate").click()
    //   }
    // }
    console.log("testing", user);
    this.starmsg1 = false
    user.count = 0
    this.Userselected = user
    if (!this.incognitoRes) {
      if (this.id == user.receiverid._id) {
        console.log("senderid", user.senderId._id)
        this.userService.getuserdata(user.senderId._id).subscribe(data => {
          console.log("responsedata", data);
          // this.valueChange=(data);
          this.route.navigate(['/navbar/main'], { queryParams: { id: this.Userselected._id, userid: user.senderId._id, value: false } });
        });
      }
      else if (this.id == user.senderId._id) {
        console.log("receiverid", user.receiverid)
        this.userService.getuserdata(user.receiverid._id).subscribe(data => {
          // this.valueChange=(data);
          this.route.navigate(['/navbar/main'], { queryParams: { id: this.Userselected._id, userid: user.receiverid._id, value: false } });
        });
      }
    }
  }

  priores
  /*
  Function Name: makePriority
  Input: Selected User data is coming
  Output: Sending priority status to backend
  Desc: Putting users in priority list and getting back into friends list
  Error: None
  */
  makePriority(priorityUser) {
    if (this.id == priorityUser.senderId._id) {
      priorityUser.priorityBySender = !priorityUser.priorityBySender
    }
    else if (this.id == priorityUser.receiverid._id) {
      priorityUser.priorityByReceiver = !priorityUser.priorityByReceiver
    }
    let info = {
      id: priorityUser._id,
      priorityBySender: priorityUser.priorityBySender,
      priorityByReceiver: priorityUser.priorityByReceiver
    }
    this.userService.priorityFriends(info).subscribe(res => {
      this.priores = res
    });
  }

  SearchMail21(e) {
    if ((e.which === 32 || e.which === 9 || e.which === 8 || e.which === 46) && e.target.value.trim() === "") {
      console.log('!!!!!!!!!!!!!!')
      return this.searchenable = false;
    }
    else { this.searchenable = true }
  }

  email
  SearchMail(email) {

    this.email = email
    if (this.email != undefined && this.email != '') {
      console.log("this.email: ", this.email);
      this.userService.getsearchedemail(this.email).subscribe((res: any) => {
        if (res !== null || res !== undefined) {
          console.log("res: ", res);
          this.response = res;
          this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
          console.log("loginUser: ", this.loginUser);
          this.userService.getFriends(this.loginUser.id).subscribe((users: any) => {
            console.log("Users: ", users);
            for (let resp of this.response) {
              resp.user = null;
              var flag = false;
              for (let user of users) {
                if (user.senderId.EmailId == this.loginUser.EmailId) {
                  if (resp.EmailId == user.receiverid.EmailId) {
                    flag = true;
                    resp.user = user
                  }
                }
                else if (user.receiverid.EmailId == this.loginUser.EmailId) {
                  if (resp.EmailId == user.senderId.EmailId) {
                    flag = true;
                    resp.user = user;
                  }
                }
              }
              if (flag == true) {
                resp.status = true;
              }
              else {
                resp.status = false;
              }
            }
            console.log("resp: ", this.response)
          });
        }
      });
    }

  }




  searchOrgEmail(orgemail, roleData, e) {
    this.email = orgemail
    console.log(this.email, e.target.value);

    this.searchenable || orgemail == undefined ? roleData : roleData = undefined

    if (roleData != undefined) {
      console.log("333333333333333", orgemail, roleData);
      // let orgobj={EmailId:orgemail,org_id:this.roleid.organization_id._id}
      this.userService.getOrgUsers(this.email, roleData).subscribe((orgusers: any) => {
        console.log("Orgusers: ", orgusers);
        if (orgusers !== null || orgusers !== undefined) {
          console.log("res: ", orgusers);
          this.response = orgusers;
          console.log(this.response);

          this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
          console.log("loginUser: ", this.loginUser);
          this.userService.getFriends(this.loginUser.id).subscribe((users: any) => {
            console.log("Users: ", users);
            for (let resp of this.response) {
              resp.user = null;
              var flag = false;
              for (let user of users) {
                if (user.senderId.EmailId == this.loginUser.EmailId) {
                  if (resp.EmailId == user.receiverid.EmailId) {
                    flag = true;
                    resp.user = user
                  }
                }
                else if (user.receiverid.EmailId == this.loginUser.EmailId) {
                  if (resp.EmailId == user.senderId.EmailId) {
                    flag = true;
                    resp.user = user;
                  }
                }
              }
              if (flag == true) {
                resp.status = true;
              }
              else {
                resp.status = false;
              }
            }
            console.log("resp: ", this.response)
          });
        }
      })
    }
  }



  status: boolean = false
  InviteFriend(user) {
    console.log("user", user);
    user = {
      senderId: this.id,
      receiverid: user._id,
      senderEmailId: this.EmailId,
      receiverEmailId: user.EmailId,
      status: this.status,
    }
    console.log(user)
    this.userService.InvitedUser(user).subscribe(res => {
      console.log('res', res);
      this.invitefriendres = res;
      if (this.invitefriendres == 'You already sent a request or Already Your Friend') {
        this.snackbar.open(this.invitefriendres, "X", {
          duration: 5000,
          panelClass: ['bar-color'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
      else {
        this.snackbar.open("Invitation sent", "X", {
          duration: 1000,
          panelClass: ['bar-color'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    })
    // user.reset()
  }

  onInvite = function (data) {
    console.log(data)
    if (data.valid) {
      this.recevData = data.value
      this.recmail = this.recevData.Emailid;
      console.log(this.recmail);
      this.error = true;

      if (this.recmail == undefined) {
        this.nodata = true;
      }

      else {
        data.value.slug = this.loginuserdata.slug;
        data.value.urllink = this.urllink;
        data.value.senderId = this.loginuserdata.id;
        data.value.senderEmailId = this.loginuserdata.EmailId;
        data.value.senderName = this.loginuserdata.Name;
        if (this.response) {
          data.value.receiverid = this.response._id;
          data.value.Name = this.response.Name
        }
        console.log("data: ", data)

        this.userService.sendInviteMail(data.value).subscribe(invitationack => {
          console.log("invack", invitationack);
          this.error = false;
          this.sendMailres = invitationack;

          if (this.sendMailres.result == "error") {
            this.userService.openSnackBar("NOO!! Something went wrong", "X");
          }
          else if (this.sendMailres == "Invitation Sent") {

            // to display success message
            this.invitationview = true;

            console.log(this.sendMailres);
            this.userService.openSnackBar(this.sendMailres, "X");
          }
          // you already sent the invitation
          else if (this.sendMailres == "you already sent the invitation") {
            this.userService.openSnackBar(this.sendMailres, "X");
          }
          console.log(this.recevData);
        });
        // document.getElementById("closeModal").click()
      }
    }

    data.reset()
  }


  createSlug = function (profile) {
    this.urllink = this.weburl + '/?slug=' + profile.slug;
  }


  checkInvitationMail(email) {
    console.log(email);
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})');
    if (regexp.test(email)) {
      console.log(email);
      this.emailcheck = true
      this.userService.getuseremail(email).subscribe((res) => {
        if (res !== null || res !== undefined) {
          console.log(res);
          this.regresponse = res;

        }
      });

    }
  }

  showgmail() {
    this.viewcontact = true;
  }

  // This is for hide user
  hideUser(data1, data2) {
    let obj = {
      senderId: data1.id,
      receiverid: data2._id,
    }
    if (this.listusers.length > 1) {
      this.messageService.hidemessage(obj).subscribe(data => {
        this.hideEmail = data
        console.log("hideEmaillllllssss", this.hideEmail)
        this.ActiveHideUsers(this.loginuserdata.EmailId)
        if (this.hideEmail.length != 0) {
          if (this.loginuserdata.id == this.hideEmail[0].receiverid._id) {
            this.selectedUser = this.hideEmail[0];
            this.route.navigate(['/navbar/main'], { queryParams: { id: this.selectedUser._id, userid: this.selectedUser.senderId._id, value: false } });
          } else {
            this.selectedUser = this.hideEmail[0]
            this.route.navigate(['/navbar/main'], { queryParams: { id: this.selectedUser._id, userid: this.selectedUser.receiverid._id, value: false } });
          }
        }
        this.hideEmail.forEach(element => {
          element.count = 0
        });
        this.listusers = data;
      })
    }
  }

  // This is for unhide users list
  ActiveHideUsers(data) {
    this.activeusershide = this.activeusershide === 'out' ? 'in' : 'out';
    this.messageService.activehideuser(data).subscribe(data => {
      this.activehideuserslist = data
      console.log("445555555555555555", this.activehideuserslist)
    })
  }

  // This is for hide user into active user
  sendhidedata(loginuser, hideuser) {
    // document.getElementById('activehideusers').click()
    let obj = {
      from: loginuser.EmailId,
      to: loginuser.EmailId == hideuser.to ? hideuser.from : hideuser.to,
      senderId: loginuser.EmailId == hideuser.to ? hideuser.senderId : hideuser.receiverid,
      receiverId: loginuser.id
    }
    this.messageService.hideuser(obj).subscribe(data => {
      this.hideuserdata = data;
      this.listusers = this.hideuserdata.data;
      this.ActiveHideUsers(this.loginuserdata.EmailId)
    })
  }


  // This is for UnhideAll users
  unhideAll(loginuserdata) {
    this.messageService.unhideallusers(loginuserdata).subscribe(data => {
      console.log("dataaaaaaa", data)
      this.listusers = data
      this.ActiveHideUsers(this.loginuserdata.EmailId)
    })
    this.activeusershide = 'out';
  }



  // This is for reply to exact message
  messagename
  reply(data) {
    console.log(data);
    this.message2 = data
    if (this.message2.photo && !this.message2.media && !(this.message2.Gps) && !(this.message2.message)) {
      this.messagename = this.message2.photo[0].originalFilename.substring(0, this.message2.photo[0].originalFilename.lastIndexOf("."))
    }
    if (this.message2.media && !(this.message2.message)) {
      console.log(this.message2.media);

      this.messagename = this.message2.media.originalFilename.substring(0, this.message2.media.originalFilename.lastIndexOf("."))
    }

  }


  // to close the modal
  close() {

    document.getElementById("closeModal").click()

  }

  // This is for delete contact from friendslist permanently
  deleteContact(data1, data2) {
    let obj = {
      senderId: data1.id,
      receiverid: data2._id
    }
    this.userService.deletecontact(obj).subscribe(data => {
      console.log("deletecontact", data)
      this.listusers = data;
      this.deletecontact = data
      if (this.deletecontact.length != 0) {
        if (this.loginuserdata.id == this.deletecontact[0].receiverid._id) {
          this.selectedUser = this.deletecontact[0];
          this.route.navigate(['/navbar/main'], { queryParams: { id: this.selectedUser._id, userid: this.selectedUser.senderId._id, value: false } });
        } else {
          this.selectedUser = this.deletecontact[0]
          this.route.navigate(['/navbar/main'], { queryParams: { id: this.selectedUser._id, userid: this.selectedUser.receiverid._id, value: false } });
        }
      }
      this.deletecontact.forEach(element => {
        element.count = 0
      });
    })
  }

  //Triggers on sender's end on confirming call
  videocall(loginuser, chatuser,type) {
    console.log("ChatUser: ",chatuser);
    if(chatuser) {
      localStorage.setItem('switchToUser', chatuser._id);
      let receiverID=[];
      if(type == 'solo') {
        receiverID.push(chatuser)
      }
    let obj = {

      type: 'VideoCall.caller',
      callerID: loginuser,
      receiverID: receiverID
    }
    localStorage.setItem('CallerStatus', JSON.stringify('VideoCall.caller'));
    this.messageService.solovideocallInit(obj).subscribe((roomid: any) => {
      console.log("RoomID VideoCall: ", roomid);
      localStorage.setItem('CallObject', JSON.stringify(roomid));
      this.route.navigate(['/call']);
    })
    }
  }



  // This is for incognito button click function
  incognito(loginuser, chatuser) {
    let obj = {
      loginuserid: loginuser.id,
      chatuserid: chatuser._id
    }
    this.userService.inCognito(obj).subscribe(data => {
      console.log(data)
    })
  }

  // Image Upload
  /*
  Function Name: onFileSelected
  Input: Image and Image Name
  Output: None
  Desc: Getting image as input and store in collection as path stored the image in uploads folder
   */

  onFileSelected(fileInput: any, title: any) {

    var imagedata;
    const file = fileInput.target.files[0];
    const reader = new FileReader();
    if (!title)
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    reader.readAsDataURL(file);
    this.filesToUpload = <Array<File>>fileInput.target.files;
    const formData: any = new FormData(); // for image
    const files: Array<File> = this.filesToUpload;

    formData.append("uploads[]", files[0], files[0]['name']);
    this.userService.saveFiles(formData).subscribe(data => {
      imagedata = data;
      if (title) {
        title.doc = imagedata._id;
        title.pic = imagedata.originalFilename;
      }
      else if (!title) this.userForm = imagedata._id
    });
  }


  // To select either public or private groups
  showpublic() {
    this.publicgroup = true;
  }

  showprivate() {
    this.publicgroup = false;
  }

  // To select either public or private groups end

  // emoji selector
  emojiview() {
    this.showemoji = !this.showemoji;
  }



  // When user accept the incognito chat
  incognitoACCEPT1(data) {
    this.messageService.incognitoACCEPT2(data).subscribe(data => {
      console.log(data)
    })
    for (var i = 0; i <= this.listusers.length; i++) {
      if (this.listusers[i].senderId._id == data.chatuser) {
        return this.route.navigate(['/navbar/main'], { queryParams: { id: this.listusers[i]._id, userid: this.listusers[i].senderId._id, value: false } });
      }
      if (this.listusers[i].receiverid._id == data.chatuser) {
        return this.route.navigate(['/navbar/main'], { queryParams: { id: this.listusers[i]._id, userid: this.listusers[i].receiverid._id, value: false } });
      }
    }
  }


  // When user accept the video call 
  solovideocallACCEPT(calldata) {
    
    console.log("CallData: ",calldata);
    let recID=[];
    for(let receiver of calldata.ReceiverID) {
      if(receiver.id._id == this.loginuserdata.id) {
        recID.push({id: receiver.id._id,status: 'Answered'})
      }
      else {
        recID.push({id: receiver.id._id})
      }
    }
    if(recID.length>0) {
      this.messageService.solovideocallAccept({id: calldata._id, receiver: recID}).subscribe((data:any) => {
        console.log(this.loginuserdata.Name+' has joined the call.');
        this.route.navigate(['/call']);
      })
    }
  }

  solovideocallReject(calldata) {

    console.log("solovideocallReject: ",calldata)
    this.messageService.solovideocallReject(calldata).subscribe((data:any) => {
      console.log("Receiver rejected call: ",data)
      this.videocallll=false;
      this.videocallres=null;
    })
  }

  // When user reject the incogntio chat    
  incognitoreject1(data) {
    console.log(data)
    this.messageService.incognitoReject2(data).subscribe(data => {
      console.log(data)
    })
  }

  // When user reject the video call   
  videocallReject1(data) {
    console.log(data)
    this.messageService.videocallReject2(data).subscribe(data => {
      console.log(data)
    })
  }

  // This is for incognito user offline
  incognitoUserOffline(loginuser, chatuser) {
    if (this.chatuser.loginStatus == 0) {
      this.snackbar.open("user is not in online", "x", {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    } else {
      let obj = {
        login: loginuser,
        chat: chatuser
      }
      this.messageService.incognitoBlockstate(obj).subscribe(data => {
        console.log(data);
        this.incognitoBlockState = data;
        if (this.incognitoBlockState.from == this.loginuserdata.EmailId) {
          if (this.incognitoBlockState.fromblockingStatus == "blocked") {
            this.snackbar.open("please remove the user from block state", "x", {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });

          }
          if (this.incognitoBlockState.toblockingStatus == "blocked") {
            this.snackbar.open("user was blocked to you", "x", {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        }
        if (this.incognitoBlockState.to == this.loginuserdata.EmailId) {
          if (this.incognitoBlockState.fromblockingStatus == "blocked") {
            this.snackbar.open("user was blocked to you", "x", {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
          if (this.incognitoBlockState.toblockingStatus == "blocked") {
            this.snackbar.open("please remove the user from block state", "x", {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        }
      })
    }
  }

  //  To open groups modal
  CreateGroup() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '600px',
      data: {
        type: 'group2',
        source: "CreateGroup"
      }


    });
    dialogRef.afterClosed().subscribe(result => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === 'yes') {
          // TODO: Replace the following line with your code.
          this.groupcreated = false;
          console.log('User clicked yes.');
        } else if (result === 'no') {
          // TODO: Replace the following line with your code.
          console.log('User clicked no.');
        }
      }
    })
  }
  chatFriend(data) {
    console.log(data);
    for (let i = 0; i <= this.listusers.length; i++) {
      if (data.EmailId == this.listusers[i].receiverid.EmailId) {
        this.route.navigate(['/navbar/main'], { queryParams: { id: this.listusers[i]._id, userid: this.listusers[i].receiverid._id, value: false } });
      }
      if (data.EmailId == this.listusers[i].senderId.EmailId) {
        this.route.navigate(['/navbar/main'], { queryParams: { id: this.listusers[i]._id, userid: this.listusers[i].senderId._id, value: false } });
      }
    }


  }



  replymsg() {
    this.message2 = null
  }

  // for unsubscribing the observable services
  ngOnDestroy() {
    this.fetchcalllogs.unsubscribe();
    this.solovideoCall.unsubscribe();
    this.autorefreshgroupmessages.unsubscribe();
    this.autoRefreshFriends.unsubscribe();
    this.autoRefreshMessage.unsubscribe();
    this.autoRefreshRemoveMessage.unsubscribe();
    this.autoRefreshRenameGroup.unsubscribe();
    this.autoRefreshLeaveGroup.unsubscribe();
    this.AutoRefreshMemberStatus.unsubscribe();
    this.AutoRefreshGroups.unsubscribe();
    this.IcognitoShowRes.unsubscribe();
    this.IcognitoDelRes.unsubscribe();
    // this.IcognitoReject.unsubscribe();
    // this.IcognitoChatAccept.unsubscribe();
    // this.IcognitoChat.unsubscribe();
    this.getFriends.unsubscribe();
    this.autoRefreshPriorityRes.unsubscribe();
    this.autoRefreshDelAllMsg.unsubscribe();
    this.autoRefreshBlockdata.unsubscribe();
    this.autoMessageReceipt.unsubscribe();
    this.autoRefreshUndoMessage.unsubscribe();
    this.autoRefreshGroupEditMessage.unsubscribe();
    this.autoRefrshEditedMessage.unsubscribe();
    this.autoRefreshGroupDeleteMessage.unsubscribe();
    this.autoRefreshGroupUnstrarMessage.unsubscribe();
    this.autoRefreshStarStatusGroupMessage.unsubscribe();
    this.autoRefreshMuteGroup.unsubscribe();
    this.autoRefreshStarGroup.unsubscribe();
    this.autoRefreshBlockGroup.unsubscribe();
  }

  //Copying Hash to clipboard
  copyHash(val: string) {
    console.log("CopyHash Message: ", val);
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.zone.run(() => {
      this.snackbar.open(`Hash Key copied to Clipboard`, "x", {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    });
  }


  //// copying the message to clipboard

  copyMessage(val: string) {
    console.log("Message: ", val)
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.zone.run(() => {
      this.snackbar.open(`Message Text copied to clipboard.`, "x", {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    });
  }
  Searchnew(e) {
    console.log("34543", e);
  }
  one
  Searchnewone(one) {
    this.one = one
    if (one != '') {

      this.Pos = 1;

      console.log("Position: ", this.Pos)
    } else {
      this.Pos = 0;
      this.urls.push(null);
      console.log("Position: ", this.Pos)
      console.log("343254235", this.one);
    }
  }


  /// pasting the image in to input by using ctrl v

  mediaPaste(event: any, url) {
    setTimeout(() => {
      console.log(url.value)
      console.log(url.value);
      var data = {
        url: url.value
      }
      var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
      console.log(regex.test(url.value))
      if (regex.test(url.value)) {
        this.messageService.videoUrl(data).subscribe((data: any) => {
          var path = this.serverurl + '/' + data.path;
          this.urls.push({ url: path, type: "video" });
          console.log(data)
          this.userForm.push(data._id)
          url = '';
          this.userForm = []
        })
      }

    }, 1);


    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
        this.pasteimages(blob)
      }
    }
  }

  onInput(content: string) {
    console.log("New content: ", content);
  }
  pasteimages = (data: any) => {

    const formData: any = new FormData();
    console.log(formData);

    formData.append("uploads[]", data, data['name']);
    this.messageService.saveFiles(formData).subscribe(data => {
      var path = this.serverurl + '/' + data[0].path;
      this.urls.push({ url: path, type: "image" });
      this.userForm.push(data[0]._id)

    })
  }

  selectedMessage(data, value) {
    var index = this.userMessage.findIndex(x => x._id == data.parentId._id)
    console.log(index);
    this.selectedmessage = this.userMessage[index]._id
    console.log(this.selectedmessage)
    var element = document.getElementById(`${this.selectedmessage}`);
    console.log(element)
    element.scrollIntoView({ behavior: "smooth" })
  }

  // This is for show the contact list bio when user drag the mouse to contact
  Biodata
  showbio(data) {
    if (this.id == data.receiverid._id) {
      var obj = {
        data: data.from
      }
    } else if (this.id == data.senderId._id) {
      var obj = { data: data.to }
    }
    this.userService.chatcontactbio(obj).subscribe(data => {
      this.Biodata = data
    })
  }
  navigategroup(searchedUser) {
    this.route.navigate(['/navbar/main'], { queryParams: { gid: searchedUser.GroupId, gname: searchedUser.Grname, value: true } });
  }

  searchData(data) {
    this.searchTerm1 = JSON.parse(JSON.stringify(data.trim()))

  }


  groupReply(data) {

    console.log(data);
    this.message3 = data
    // if (this.message2.photo && !this.message2.media && !(this.message2.Gps) && !(this.message2.message)) {
    //   this.messagename = this.message2.photo[0].originalFilename.substring(0, this.message2.photo[0].originalFilename.lastIndexOf("."))
    // }
    // if (this.message2.media && !(this.message2.message)) {
    //   console.log(this.message2.media);

    //   this.messagename = this.message2.media.originalFilename.substring(0, this.message2.media.originalFilename.lastIndexOf("."))
    // }

  }


  // to close the modal
  close1() {

    document.getElementById("closeModal").click()

  }
  closecalllog() {
    this.activeusershide = 'out';
  }
  // This is for select group for forwarding message 
  selectgruopfrwd(data) {
    if (this.selectedgrpfrwdgrpid.includes(data.GroupId)) {
      let x = this.selectedgrpfrwdgrpid.indexOf(data.GroupId)
      this.selectedgrpfrwdgrpid.splice(x, 1)
      console.log(this.selectedgrpfrwdgrpid)
    } else {
      this.selectedgrpfrwdgrpid.push(data.GroupId);
      console.log(this.selectedgrpfrwdgrpid)
    }
  }

  // chatOFF 
  chatOff(data) {
    this.userService.chatoff(data).subscribe(data => {
      this.chatbuttonoff = data
    })
  }

  // tab close event 
  tabclose(data) {
    this.userService.tabClosee(data).subscribe(data => {
      console.log(data)
    })
  }

  greplymessage() {
    this.message3 = null;
  }


  showcalllog(call) {
    this.call = null;
    this.call = call;
    console.log("Call Modal Data: ", this.call);
    console.log("Show Call Log", this.calllogModal)
    let dialogRef = this.dialog.open(this.calllogModal, {
      width: '800px',
      panelClass: 'calllog'
    })

    dialogRef.afterClosed().subscribe(result => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === 'yes') {
          // TODO: Replace the following line with your code.
          console.log('User clicked yes.');
        } else if (result === 'no') {
          // TODO: Replace the following line with your code.
          console.log('User clicked no.');
        }
      }
    })
  }
  // Mute notifications for group messages
  muteBadge(id) {
    let info = {
      value: true,
      id: id
    }
    this.groupService.muteBadge(info).subscribe(data => {
      console.log(data);
    })
  }
  // Unmute message notificationf for group messages
  unMuteBadge(id) {
    let info = {
      value: false,
      id: id
    }
    this.groupService.muteBadge(info).subscribe(data => {
      console.log(data);
    })
  }
  // Star groups
  changeStarStatus(id) {
    let info = {
      value: true,
      id: id
    }
    this.groupService.starStatus(info).subscribe(data => {
      console.log(data);

    })
  }
  // Unstar groups
  changeStarStatus2(id) {
    let info = {
      value: false,
      id: id
    }
    this.groupService.starStatus(info).subscribe(data => {
      console.log(data);

    })
  }
  // Block the group
  groupBlock(id) {
    let groupinfo = {
      value: true,
      id: id
    }
  


      this.groupService.groupblockstatus(groupinfo).subscribe(data => {
      console.log(data);

    })
  }

  MuteStatus(loginEmail, statusEmail, action) {

    if (action == 'mute') {
      this.userService.muteStatus({ loginEmail: loginEmail, statusEmail: statusEmail }).subscribe((result: any) => {
        console.log(" Mute Status Result: ", result);
        if (result == 'success' && this.listStatus) {
          for (let status of this.listStatus) {
            if (status.EmailId == statusEmail) {
              status.isMuted = true;
            }
          }
        }
        this.statusunread = false;
        this.statusread = false;
        this.statusmuted = false;
        console.log("List Status: ", this.listStatus);
        for (let status of this.listStatus) {
          console.log("Is Unread Liststatus: ", status);
          if (status.isMuted == true) {
            this.statusmuted = true;
          }
          else {
            if (status.isUnread == true) {
              this.statusunread = true;
            }
            else {
              this.statusread = true;
            }
          }
        }
      })
    }
    else if (action == 'unmute') {
      this.userService.unmuteStatus({ loginEmail: loginEmail, statusEmail: statusEmail }).subscribe((result: any) => {
        console.log(" Mute Status Result: ", result);
        if (result == 'success' && this.listStatus) {
          for (let status of this.listStatus) {
            if (status.EmailId == statusEmail) {
              status.isMuted = false;
            }
          }
        }
        this.statusunread = false;
        this.statusread = false;
        this.statusmuted = false;
        console.log("List Status: ", this.listStatus);
        for (let status of this.listStatus) {
          console.log("Is Unread Liststatus: ", status);
          if (status.isMuted == true) {
            this.statusmuted = true;
          }
          else {
            if (status.isUnread == true) {
              this.statusunread = true;
            }
            else {
              this.statusread = true;
            }
          }
        }
        this.statusunread = false;
        this.statusread = false;
        this.statusmuted = false;
        console.log("List Status: ", this.listStatus);
        for (let status of this.listStatus) {
          console.log("Is Unread Liststatus: ", status);
          if (status.isMuted == true) {
            this.statusmuted = true;
          }
          else {
            if (status.isUnread == true) {
              this.statusunread = true;
            }
            else {
              this.statusread = true;
            }
          }
        }
      })
    }
  }

  // Unblock group
  groupUnblock(id) {
    let groupinfo = {
      value: false,
      id: id
    }
    this.groupService.groupblockstatus(groupinfo).subscribe(data => {
      console.log(data);

    })
  }

  addtoCalllogSolo(data) {
    // console.log("Socket call Data: ",data)
    let valid = false;
    if(data.SenderID._id == this.loginuserdata.id){
      valid = true;
    }
    else {
      for(let receiver of data.ReceiverID) {
        if(receiver.id._id == this.loginuserdata.id) {
          valid = true;
        }
      }
    }
    let receiverlist=[];
    receiverlist.push(data.SenderID);
    for(let receiver of data.ReceiverID) {
      receiverlist.push(receiver.id);
    }
    if(receiverlist.length>0) {
      this.updatelistusersSolo(receiverlist);
    }
    if(valid == true) {
      let callrecord = {id: null, RoomID:null, type1:null, type2:null, start:null, end:null, duration:null, Caller:null, Receiver:[]};
      if (data.SenderID._id == this.loginuserdata.id) {
        callrecord.type1 = 'Outgoing';
      }
      else {
        callrecord.type1 = 'Incoming';
      }
      callrecord.id = data._id;
      callrecord.RoomID = data.RoomID;
      callrecord.type2 = data.CallType;
      callrecord.start = moment(data.CallStartedAt).format('MMMM Do YYYY, hh:mm a');
      if (data.CallEndedAt != null) {
        callrecord.end = moment(data.CallEndedAt).format('MMMM Do YYYY, hh:mm a');
        var duration = Math.floor((new Date(data.CallEndedAt).getTime() - new Date(data.CallStartedAt).getTime()) / 1000);
        callrecord.duration = {
          days: Math.floor(duration / 86400),
          hours: Math.floor((duration % 86400) / 3600),
          mins: Math.floor((duration % 3600) / 60),
          secs: Math.floor((duration % 60))
        }
      }
      else {
        callrecord.end = null;
      }
      callrecord.Caller = data.SenderID;
      for (let receiver of data.ReceiverID) {
        callrecord.Receiver.push(receiver);
      }
      
      let flag = false;
      console.log("CallRecord: ",callrecord)
  
      for(let call of this.calllog) {
        if(call.id == callrecord.id) {
          call = JSON.parse(JSON.stringify(data));
          flag = true;
        }
      }
      if(flag == false) {
        for(let i = this.calllog.length -1; i>=0; i--) {
          this.calllog[i+1]=this.calllog[i];
        }
        this.calllog[0]=callrecord;
        while(this.calllog.length > 25) {
          this.calllog.pop();
        }
      }
      console.log("Add log Call Log: ",this.calllog);
    }
  }

  updatelistusersSolo(data) {
    console.log("updateusersSolo List Users: ",this.listusers);
    console.log("updatelistusersSolo Data: ",data);
    console.log("Update solo ChatUser: ",this.chatuser)

    if(data.length>0) {
      for(let user1 of data) {

        //Update Chatuser
  
        if(this.chatuser) {
          if(user1._id == this.chatuser._id) {
            this.chatuser.onCall = user1.onCall;
            console.log("ChatUser updated.");
          }
        }

        //Update ListUsers

        if(this.listusers) {
          for(let user2 of this.listusers) {
            if(user1._id == user2.receiverid._id) {
              user2.receiverid.onCall = user1.onCall;
              console.log("ListUsers Updated.");
            }
            else if(user1._id == user2.senderId._id) {
              user2.senderId.onCall = user1.onCall;
              console.log("ListUsers Updated.");
            }
          }
        }
      }
    }

  }

  // Blocked contacts list
  blockedcontacts(loginuserdata){
   console.log(loginuserdata);
   this.messageService.blockcontact(loginuserdata).subscribe(data =>{
     console.log(data)
   })
  }
}