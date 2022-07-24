import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatSelect } from '@angular/material';
import {MatListModule} from '@angular/material/list'
import { UserService } from '../services/user.service'
import { LinksService } from '../services/links.service';
import { MessageService } from '../services/message.service';
import { COMMA, ENTER, J } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { FormControl,FormGroup, Validators, NgModel,FormBuilder } from '@angular/forms';
import { GroupsService } from 'src/app/services/groups.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from 'ng2-image-compress';
declare var $ :any
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { config } from '../configFile';
import { FrontEndConfig } from '../frontendconfig';
import { Subscription } from 'rxjs';
import { EmojiComponent } from '../emoji/emoji.component'
import { stat } from 'fs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isDisabled=true;
  wrongPassword: Boolean = false;
  wrongEmail: Boolean = false;
  Repdata: any;
  slugStorage: any;
  loginEvent = true;
  registerEvent = false;
  resetEvent = false;
  signupEmailvalidation = false;
  // Registration
  client: any;
  premium:any = {};
  emailvalidation = false;
  validclick: boolean;
  role;
  userdata;
  resendotpfgpswd;
  clientsform = true;
  clientdata;
  response;
  client_expired_otp;
  client_incorrect_otp;
  premiumUserForm = false;
  premiumData;
  selectedGroup: any;
  selectedGroupDetail: any;
  subscrption: Subscription;
  // Forget Password
  checkemail: Boolean = true;
  checkans: Boolean = false;
  forgotclick: Boolean;
  temp;
  time;
  temp1 = true;
  temp2 = false;
  temp3 = false;
  temp4;
  imgmimetype = ["image/apng", "image/bmp", "image/gif", "image/jpg", "image/jpeg", "image/png", "image/tiff", "image/webp"];
  videomimetype = ["video/mp4", "video/ogg", "video/webm"];
  test;
  statuscomment = '';
  errorres: any;
  selectionform = true; //to show and hide the selection of user
  displayerror: any;
  client1 = true; premium1 = false;
  EmailId
  forgetpage: boolean;
  OTPSuccess=false;
  OTPSuccess1=false;
  //Group members code
  listusers: any = [];
  alreadyExists: boolean;
  membername: any;
  loginUser: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  GroupInvite = [];
  friendlist = [];
  //  tempusers: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  memberCtrl = new FormControl();
  filteredMembers: Observable<string[]>;
  selectedUsers: any = [];
  @ViewChild('memberInput', { static: false }) memberInput: ElementRef;
  @ViewChild('bginput', { static: false }) bginput: ElementRef;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger, { static: false }) trigger: MatAutocompleteTrigger;
  @ViewChild('groupselect',{static: false}) groupselect;
  keyvalue: any;
  Groups: any = [];
  EmailList1: any = [];
  emailvalidation1: boolean;
  emailerror1: string = null;
  Groupss: any;
  ExistingMembers: any;
  weburl:any;
  gInfo: any;
  groupMembers: any;
  GroupSignUp: Object = null;
  otp;
  hide=false;
  hide1=false;
  password;
  confirmPassword;
  username;
  loginClick;
  roleid;
  vpwd;
  companyname:any;
  GroupChoice="1";
  firstFormGroup: any;
  secondFormGroup:any;
  groupControl = new FormControl('');
  groupControlserach=new FormControl();
  SecondStage=false;
  FirstStage=true;
  selectedGroup1:any=null;
  GroupTypeChoice="1";
  ThirdStage: boolean;
  info;
  GroupName;
  alreadyreg;
  imagePreview;
  nogdata;
  num1: any;
  num2: any;
  num3: any;
  num4: any;
  num5: any;
  num6: any;
  getotp=true;
  RadioEnable=false;
  defaultCheckFirst: boolean;
  defaultCheckSecond: boolean;
  serverurl;
  invitationview: boolean;
  nogroupsearch=false;
  toggleCheck=false
  groupform = new FormControl('',[
    Validators.required,
  ]);
  filteredgroups: any=[];
  emailerror: string = null;
  timecount:any
  length:any
  showfilename="Group image";
  filesToUpload: File[];
  userForm: any=[];
  groupphotoid: any;
  status_SecondStage: boolean;
  status_FirstStage: boolean;
  status_ThirdStage: boolean;
  firstformgroup: FormGroup;
  secondformgroup: FormGroup;
  StatusType: any = 'text';
  TextBackground: any = null;
  TextStatus: any = null;
  TextColor: any=null;
  cursorPos: number = 0;
  StatusBold:boolean = false;
  StatusItalic:boolean = false;
  StatusUnderline:boolean = false;
  emojiobservable: Subscription;
  statusObj: {};
  submitstatus: any=null;
  showstatusObj: any=null;
  statusid: any = 0;
  statuslength: any = 0;
  showback: boolean;
  shownext: boolean;
  showusercomments=false;
  showlikes: boolean=false;
  mediaStatusObj: number=0;
  highlightxt: boolean;
  hightlightbg: boolean;
  liked: boolean = false;
  groupcallObj:any;
  selectedVideoCallUsers: any[]=[];
  statususer: any = [];
  VideoCallusers: any = [];
  constructor(private imgCompressService: ImageCompressService, private dialogbox: MatDialog,public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private zone: NgZone,
    public userservice: UserService, private router: Router, private linksService: LinksService, private snackbar: MatSnackBar,
    private route: ActivatedRoute, private messageService: MessageService, private groupService: GroupsService,
    private configs: config, private _formBuilder: FormBuilder,   private frontendconfig: FrontEndConfig) {
      console.log(data);
      this.nogroupsearch=false;
      this.weburl = this.configs.getWeburl();
      this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
      this.serverurl = this.frontendconfig.getserverurl(); // for image url

      if(data.type == 'GroupVideoCall') {
        this.groupcallObj = {
          caller: this.loginUser.id,
          type:'video',
          receiverIDs:[]
        }
        this.toggleCheck = false;
        this.VideoCallusers=[];
        console.log("Group Video Call Work in Progress.")
        this.userservice.getVideoCallFriends(this.loginUser.id).subscribe((users:any) => {
          // this.listusers = users    
          // console.log("Video Call List Users: ",this.listusers);
          for(let user of users) {
            if(user.receiverid._id == this.loginUser.id && user.senderId.loginStatus == 1  && user.senderId.onCall == false) {
              this.VideoCallusers.push(user.senderId);
            }
            else if(user.senderId._id == this.loginUser.id && user.receiverid.loginStatus == 1 && user.receiverid.onCall == false) {
              this.VideoCallusers.push(user.receiverid);
            }
          }
          console.log("VideoCallusers: ",this.VideoCallusers)
        });
      }

      if(data.type=='CreateStatus') {
        console.log("Status InitFirstStage")
        this.status_SecondStage=false;
        this.status_FirstStage=true;
        this.status_ThirdStage=false;
      }

      if(data.type=='ShowStatus') {
        this.data=data;
          // this.statususer = data.statususer
          // console.log("this.data.status.status: ",this.data.status.status);
          this.statuslength=data.status.status.length;
          this.showstatusObj = data.status.status[this.statusid];
          this.showstatusObj.isLiked = false;
          for (let id of this.showstatusObj.likedBy) {
            if(id._id==this.loginUser.id) {
              this.showstatusObj.isLiked=true;
            }
          }
        this.userservice.getStatusFriends(this.loginUser.id).subscribe((users: any) => {
          // console.log("Status Friends: ", users)
          this.statususer.push({id:this.loginUser.id})
          for(let user of users) {
            if(user.receiverid) {
              if (user.receiverid._id == this.loginUser.id && user.senderId) {
                // console.log("Sender ID: ",user.senderId);
                this.statususer.push({ id: user.senderId._id});
              }
              else if(user.senderId) {
                if (user.senderId._id == this.loginUser.id  && user.receiverid) {
                  // console.log("Receiver ID: ",user.receiverid);
                  this.statususer.push({ id: user.receiverid._id});
                }
              }
            }
            

          }

          for (let id of this.showstatusObj.likedBy) {
            id.isFriend = false;
            for(let user of this.statususer) {
              if(user.id == id._id) {
                id.isFriend = true;
              }
            }
          }
          if(this.statusid>0) {
            this.showback=true;
          }
          else {
            this.showback=false;
          }
          if((this.statusid+1)==this.statuslength) {
            this.shownext=false;
          }
          else {
            this.shownext=true;
          }
          if(this.showstatusObj.isUnread==true) {
            let temp=[];
            temp=this.showstatusObj.SeenBy;
            temp.push(this.loginUser.id)
            this.userservice.updateUserStatus({id:this.showstatusObj._id, SeenBy:temp}).subscribe((result:any) => {
              console.log("Update Seen Status: ",result);
            })
          }
          console.log("Status Friends: ",this.statususer);
        })
      }

    if (data.type == 'group') {
      this.GroupChoice="1";
      this.selectedGroup1=data.Groupinfo;
      console.log("selectedGroup1: ",this.selectedGroup1)
      this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log("loginuser: ",this.loginUser);
      this.SecondStage=true;
      this.FirstStage=false;
      this.ThirdStage=false;
      this.userservice.getFriends(this.loginUser.id).subscribe((users: any) => {
        console.log("Users: ", users);
        this.groupService.gettingMembersList(this.selectedGroup1.GroupId._id).subscribe((members: any) => {
          console.log("Members: ", members)
          this.ExistingMembers=members
          console.log("Users: ",users)
          console.log("Existing Members: ",this.ExistingMembers)
          for (let user of users) {
            var flag = 0
            if (user.receiverid._id == this.loginUser.id) {
              for (let member of members) {
                if (user.senderId._id == member.memberId) {
                  flag = 1;
                  break;
                }
              }
              if (flag == 0) {
                this.listusers.push({ id: user.senderId._id, name: user.senderId.Name, emailid: user.senderId.EmailId });
              }
            }

            else if (user.senderId._id == this.loginUser.id) {
              for (let member of members) {
                if (user.receiverid._id == member.memberId) {
                  flag = 1;
                  break;
                }
              }
              if (flag == 0) {
                this.listusers.push({ id: user.receiverid._id, name: user.receiverid.Name, emailid: user.receiverid.EmailId });
              }
            }

          }

          console.log("List Users: ", this.listusers);

        })
        console.log("listusers: ", this.listusers);
        this.listusers = this.listusers.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });
        this.filteredMembers = this.memberCtrl.valueChanges.pipe(
          startWith(this.keyvalue),
          map((selectuser: string | null) => selectuser ? this._filter(selectuser) : this.listusers));
      })

    }
    if(data.type == 'leave'){
      
      
    }
    if(data.type == 'rename'){
      this.gInfo = data.Groupinfo
      console.log(this.gInfo);
      
    }
    if(data.type == 'view'){
      console.log(data.Groupinfo);
      
      this.groupService.gViewMembers(data.Groupinfo.GroupId._id).subscribe(data=>{
        console.log(data);
        this.groupMembers = data
        
      })
    }
    else if (data.type == 'group2') {

      if(data.source=="CreateGroup")
      {
        this.GroupChoice="2";
      }
      this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log("this.loginUser.id: ",this.loginUser.id);
  
      this.userservice.getGroupss(this.loginUser.id).subscribe((groups:any) =>{
    
            this.Groups=groups;
            this.Groups = this.Groups.sort((a, b) => {
              if (a.GroupId.GroupName > b.GroupId.GroupName) {
                return 1;
              } else if (a.GroupId.GroupName < b.GroupId.GroupName) {
                return -1;
              } else {
                return 0;
              }
            });
            for(let group of this.Groups) {
              this.filteredgroups.push(group);
            }
            console.log("filteredgroups: ",this.filteredgroups)
          });

          

    //   this.userservice.getFriends(this.loginUser.id).subscribe(users => {
    //     this.tempusers = users;
    //     for(let user of this.tempusers) {
    //       if(user.receiverid._id == this.loginUser.id) {
    //         this.listusers.push({id: user.senderId._id, name: user.senderId.Name, emailid: user.senderId.EmailId});
    //       }
    //       else if(user.senderId._id == this.loginUser.id) {
    //         this.listusers.push({id: user.receiverid._id, name: user.receiverid.Name, emailid: user.receiverid.EmailId});
    //       }
    //     } 
    //     console.log("listusers: ",this.listusers);
    //     this.listusers=this.listusers.sort((a,b) => {
    //       if(a.name > b.name) {
    //         return 1;
    //       } else if(a.name < b.name) {
    //         return -1;
    //       } else {
    //         return 0;
    //       }
    //     });
    //     this.filteredMembers = this.memberCtrl.valueChanges.pipe(
    //       startWith(this.keyvalue),
    //       map((selectuser: string | null) => selectuser ? this._filter(selectuser) : this.listusers) );
    //   })
    //   this.userservice.getGroups(this.loginUser.id).subscribe(groups =>{
    //     this.Groups = groups;
    //     console.log("groups", this.Groups);
    //   });
    }

    this.messageService.userstatusSeen().subscribe((data:any)=> {
      // console.log("Status Seen: ", data);
        if(this.showstatusObj) {
          if(this.showstatusObj._id == data._id) {
            this.showstatusObj.SeenBy = data.SeenBy;
            this.showstatusObj.isUnread = false;
            console.log("ShowstatusObj updated.",this.showstatusObj);
          }
        }

        
        if(this.data) {
          if(this.data.status) {
            if(this.data.status.status) {
              for(let status of this.data.status.status) {
                if(status._id == data._id) {
                  status.SeenBy = data.SeenBy;
                  status.isUnread = false;
                  console.log("this.data.status updated.",status);
                }
              }
            }
          }
        }
        
    })

    this.messageService.userstatuslike().subscribe((data:any) => {
      // console.log("Status Like Emit: ",data);
      // console.log("ShowStatusObj: ",this.showstatusObj);
     
      if(data && this.statususer && this.showstatusObj && this.data) {
          for(let id of data.likedBy) {
            id.isFriend = false;
            for(let user of this.statususer) {
              if(id._id == user.id) {
                id.isFriend = true;
              }
            }
          }
            if(this.showstatusObj._id == data._id) {
              this.showstatusObj.likedBy = data.likedBy;
              this.showstatusObj.isLiked = false;
              for(let user of this.showstatusObj.likedBy) {
                if(user._id == this.loginUser.id) {
                  this.showstatusObj.isLiked = true;
                }
              }
              console.log("Showstatus Obj: ",this.showstatusObj);
            }

    
          if(this.data.status) {
            if(this.data.status.status) {
              for(let status of this.data.status.status) {
                if(status._id == data._id) {
                  status.likedBy = data.likedBy;
                  status.isLiked = false;
                  for(let user of status.likedBy) {
                    if(user._id == this.loginUser.id) {
                      this.showstatusObj.isLiked = true;
                    }
                  }
                  console.log("this.data.status updated: ",status)
                }
              }
            }
          }

      
        
        
      }
     
    })

    this.messageService.userstatuscomment().subscribe((data: any) => {
      console.log("Status Comment Emit: ",data);
      // console.log("ShowStatusObj: ",this.showstatusObj);

      if (data && this.showstatusObj && this.data) {
          if (this.showstatusObj._id == data._id) {
            this.showstatusObj.comments = data.comments;
            console.log("Showstatus Obj: ", this.showstatusObj);
          }

        if (this.data.status) {
          if (this.data.status.status) {
            for (let status of this.data.status.status) {
              console.log("Status ID: ",status._id);
              console.log("data ID: ",data._id)
              if (status._id == data._id) {
                console.log("Status Matched");
                status.comments = data.comments;
                console.log("this.data.status updated: ", status)
              }
            }
          }
        }
      }

    })
  }
  showgmail() {
    console.log("Code to be added.")
  }

  fileuploadlist: any = [];
  snackcounter = 0;
  caption = [null,null,null,null,null];

  resetMedia() {
    this.fileuploadlist=[];
    this.urlss=[];
    this.imageToCompress=[];
  }

  fileProgress = (fileSelect: any) => {
    console.log("In File Progress: ", this.fileuploadlist.length)

    this.snackcounter = 0;

    var fileInput = [];

    fileInput = Array.from(fileSelect.target.files);
    console.log("FileInput at FileProgress: ", fileInput)
    this.fileProcess(fileInput);
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

  count;
  urlss = [];
  imageToCompress = [];

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
          }
          reader.readAsDataURL(file)
          console.log("URLSS: ",this.urlss)
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
        else if (file['type'].match(/video\/*/) && file['size'] <= (25 * 1024 * 1024)) {
          this.count++;
          this.fileuploadlist.push(file);
          var reader = new FileReader();
          reader.onload = (e: any) => {
            this.urlss.push({ url: e.target.result, type: "video" });
          }
          console.log("URLSS: ",this.urlss)
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
        }

      })
    });
    console.log("URLSS: ", this.urlss);
    console.log("UserForm: ", this.userForm)

  }
  dragFiles=[];
  files=[];

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

  UpdateID(data) {
    if(data=='next') {
      this.statusid+=1;
      this.showstatusObj=this.data.status.status[this.statusid];
      this.showstatusObj.isLiked=false;
      for (let id of this.showstatusObj.likedBy) {
        if(id==this.loginUser.id) {
          this.showstatusObj.isLiked=true;
        }
      }
    }
    else if(data=='back') {
      this.statusid-=1;
      this.showstatusObj=this.data.status.status[this.statusid];
      this.showstatusObj.isLiked=false;
      for (let id of this.showstatusObj.likedBy) {
        if(id==this.loginUser.id) {
          this.showstatusObj.isLiked=true;
        }
      }
    }
    console.log("ShowStatusObj id: ",this.showstatusObj._id, this.showstatusObj.isUnread);
    if(this.statusid>0) {
      this.showback=true;
    }
    else {
      this.showback=false;
    }
    if((this.statusid+1)==this.statuslength) {
      this.shownext=false;
    }
    else {
      this.shownext=true;
    }
    if(this.showstatusObj.isUnread==true) {
      console.log("ShowStatusObj 2: ",this.showstatusObj)
      let temp=[];
      console.log("temp: ",temp)
      temp=this.showstatusObj.SeenBy;
      console.log("temp: ",temp)
      temp.push(this.loginUser.id)
      console.log("Seen By: ",temp, temp.length);
      this.userservice.updateUserStatus({id:this.showstatusObj._id, SeenBy:temp}).subscribe((result:any) => {
        console.log("Update User Status: ",result);
        this.showstatusObj.SeenBy=result.SeenBy;
        this.showstatusObj.isUnread=false;
      })
    }
  }

  openEmoji() {
    var data: any
    this.emojiobservable = this.userservice.getEmoji().subscribe((data: any) => {
      if (data) {
        console.log(data);

        if (this.TextStatus == null) {
          this.TextStatus = data.native;
          this.cursorPos = this.cursorPos + data.native.length;
          console.log(this.TextStatus)
          console.log(this.cursorPos);
        }
        else {
          console.log(this.cursorPos);
          console.log(this.TextStatus)
          console.log("1. ", this.TextStatus.substring(0, this.cursorPos));
          console.log("2. ", data.native.length)
          console.log("3. ", this.TextStatus.substring(this.cursorPos));
          this.TextStatus = this.TextStatus.substring(0, this.cursorPos) + data.native + this.TextStatus.substring(this.cursorPos);
          console.log("4. ", this.TextStatus)
          // this.searchValue=temp;
          this.cursorPos = this.cursorPos + data.native.length;
          console.log(this.cursorPos);
          console.log(this.TextStatus)
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

  TextStatusColor(data){
    this.TextColor=data;
   
    this.highlightxt= true;
  }

  getCursorPosition(Inputfield) {
    if (Inputfield.selectionStart || Inputfield.selectionStart == '0') {
      this.cursorPos = Inputfield.selectionStart;
    }
    // console.log("Cursor Position: ", this.cursorPos);
  }

  searchGroup(query: string,event){
    var temp = event.which || event.keyCode;
    console.log(temp, typeof temp);
    this.nogroupsearch=false;
    console.log('query', query)
    let result = this.select(query.toLowerCase());
    console.log(result);
    this.filteredgroups = result;
    if(temp == 13) {
      
      this.selectedGroup1 = this.filteredgroups[0];
      console.log(this.selectedGroup1);
      this.groupselect.close();
    }
  }

  select(query: any):any[]{
    let result: any[] = [];
    for(let group of this.Groups){
      if(group.GroupId.GroupName.toLowerCase().includes(query)){
        result.push(group)
      }
    }
    console.log("Result: ",result);
    if(result.length==0) {
      this.nogroupsearch=true
    }
    return result
  }

  DownloadSuccess(event) {
    console.log(event);
  }

  DownloadError(event) {
    console.log(event);
  }

  reseterror(event) {
    console.log(event.target.value)
    this.emailerror1 = null;
  }
  add1(event: MatChipInputEvent): void {
    // this.groupService.gettingMembersList(data.Groupinfo.GroupId._id).subscribe((members: any) => {
    // })
    console.log("Existing Members: ",this.ExistingMembers);
    const input = event.input;
    const value = event.value;
    this.emailerror1 = null;
    // Add our fruit
    if ((value || '').trim()) {
      var flag = true;
      var value1 = value.toLowerCase();
      this.emailvalidation1 = false
      var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})');
      if (regexp.test(value1)) {

            
        if(value1== this.loginUser.EmailId){
          this.emailerror1="You can't add yourself to the group. You are already a member.";
          flag = false;
        }

        for (let email of this.EmailList1) {
          if (email.EmailId == value1) {
            this.emailerror1="Email already added to the list. Discarding!!!"
            flag = false;
            break;
          }
        }
        for(let member of this.ExistingMembers) {
          if(value1 == member.memberEmailId) {
            this.emailerror1=value1+" is already a member. Enter another email address."
            flag=false;
            break;
          }
        }
         
      }
      else {
        flag = false;
        this.emailerror1 = "Invalid Email address. Kindly verify and re-enter."
      }

      if(flag==true) {
        this.EmailList1.push({EmailId: value1, category: "2"})
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  remove1(email): void {
    const index = this.EmailList1.indexOf(email);

    if (index >= 0) {
      this.EmailList1.splice(index, 1);
    }
  }

  remove(selectuser, index): void {
    if(selectuser.id!=null) {
      this.listusers.push(selectuser);
    }

    this.listusers = this.listusers.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(this.listusers)
    
    // this.repopulate();


    this.selectedUsers.splice(index, 1);
  }

  keylog(data, event) {
    console.log("Existing Members of Group: ", this.ExistingMembers)
    this.emailerror = null;
    console.log("keylog data: ", data, "event: ", event);
    this.keyvalue = data
    if (event.keyCode == 13 && this.result.length == 0) {
      if ((data || '').trim()) {
        var value1 = data.toLowerCase();
        var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})');
        if (regexp.test(value1)) {
          var flag = false
          var flag2 = false;
          for(let member of this.ExistingMembers) {
            if(member.memberEmailId == value1) {
              flag2 = true;
              break;
            }
          }

          for (let user of this.selectedUsers) {
            if (user.emailid == value1 && user.isJoin == 'Pending') {
              flag = true;
              break;
            }
          }

          if(flag2 == true) {
            this.emailerror = value1 + " is already a member of the group.";
          }
          else if(flag == true) {
            this.emailerror = value1 + " has already been added to the list. Please enter another Email ID.";
          }
          else {
            this.selectedUsers.push({ name: value1, emailid: value1, id: null });
            if (this.memberInput) this.memberInput.nativeElement.value = '';
            this.memberCtrl.setValue(null);
            // this.memberCtrl.disable();
            // this.memberCtrl.enable();
            this.keyvalue = null
          }
        }
        else {
          this.emailerror = "Please enter a valid E-Mail address";
        }
      }

    }
    else if (event.keyCode == 32 && this.result.length == 0) {
      if ((data || '').trim()) {
        var value1 = data.toLowerCase();
        var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})');
        if (regexp.test(value1)) {
          var flag = false
          var flag2 = false;
          for(let member of this.ExistingMembers) {
            if(member.memberEmailId == value1) {
              flag2 = true;
              break;
            }
          }

          for (let user of this.selectedUsers) {
            if (user.emailid == value1 && user.isJoin == 'Pending') {
              flag = true;
              break;
            }
          }

          if(flag2 == true) {
            this.emailerror = value1 + " is already a member of the group.";
          }
          else if(flag == true) {
            this.emailerror = value1 + " has already been added to the list. Please enter another Email ID.";
          }
          else {
            this.selectedUsers.push({ name: value1, emailid: value1, id: null });
            if (this.memberInput) this.memberInput.nativeElement.value = '';
            this.memberCtrl.setValue(null);
            // this.memberCtrl.disable();
            // this.memberCtrl.enable();
            this.keyvalue = null
          }
        }
        else {
          this.emailerror = "Please enter a valid E-Mail address";
        }
      }

    }
  }

  InitStatusFirstStage() {
    console.log('InitStatusFirstStage')
    this.status_FirstStage=true;
    this.status_SecondStage=false;
    this.status_ThirdStage=false;
    this.StatusType=null;
    this.fileuploadlist=[];
    this.urlss=[];
    this.userForm=[];
    this.caption = [null,null,null,null,null];
  }

  previousMediaPreview() {
    this.mediaStatusObj -=1;
    console.log("MediaStatusObj: ",this.mediaStatusObj)
    console.log("Total Strength: ",this.urlss.length)
    if(this.mediaStatusObj>0) {
      this.showback=true;
    }
    else {
      this.showback=false;
    }
    if((this.mediaStatusObj+1)==this.urlss.length) {
      this.shownext=false;
    }
    else {
      this.shownext=true;
    }
  }

  nextMediaPreview() {
    this.mediaStatusObj +=1;
    if(this.mediaStatusObj>0) {
      this.showback=true;
    }
    else {
      this.showback=false;
    }
    if((this.mediaStatusObj+1)==this.urlss.length) {
      this.shownext=false;
    }
    else {
      this.shownext=true;
    }
  }

  InitStatusSecondStage() {
    if(this.StatusType) {
    this.status_FirstStage=false;
    this.status_SecondStage=true;
    this.status_ThirdStage=false;
    if(this.StatusType=='media') {
      this.mediaStatusObj=0;
      this.userForm=[];
    }
    if(this.mediaStatusObj>0) {
      this.showback=true;
    }
    else {
      this.showback=false;
    }
    if((this.mediaStatusObj+1)==this.urlss.length) {
      this.shownext=false;
    }
    else {
      this.shownext=true;
    }
    }
  }

  InitStatusThirdStage() {
    console.log('InitStatusThirdStage')
    this.status_FirstStage=false;
    this.status_SecondStage=false;
    this.status_ThirdStage=true;
    if(this.StatusType=='text') {
      this.statusObj={
        userid: this.loginUser.id,
        StatusType: this.StatusType,
        TextStatus: this.TextStatus,
        TextColor: this.TextColor,
        TextBackground: this.TextBackground,
        Bold: this.StatusBold,
        Italic: this.StatusItalic,
        Underline: this.StatusUnderline
      }
      console.log("Status Object: ",this.statusObj);
      this.userservice.createStatus(this.statusObj).subscribe((result:any)=> {
        console.log("Create Status: ",result);
        this.submitstatus=result;
      })
    }
    else if(this.StatusType=='media') {
      if(this.fileuploadlist.length>0) {
        const formData = new FormData();
        this.fileuploadlist.forEach(file => {
          formData.append("uploads[]", file, file['name']);
        })
        this.messageService.saveFiles(formData).subscribe((mediaupload: any) => {
          console.log("media upload: ",mediaupload);
          if(mediaupload.length>0) {
            for(let value of mediaupload) {
              this.userForm.push(value._id)
            }
            console.log("User Form: ",this.userForm);
            this.statusObj={
              userid: this.loginUser.id,
              StatusType: this.StatusType,
              media: this.userForm,
              caption: this.caption
            }
            console.log("statusObj: ",this.statusObj);
            this.userservice.createStatus(this.statusObj).subscribe((result:any)=> {
              this.submitstatus = result;
            })
          }
        })
      }
    }
  }

  TextStatusBackground(data) {
    this.TextBackground=data;
    this.hightlightbg=true
  }

  enableDisableBold()
  {
    this.StatusBold=!this.StatusBold;
  }

  enableDisableItalic()
  {
    this.StatusItalic=!this.StatusItalic;
  }

  enableDisableUnderline()
  {
    this.StatusUnderline=!this.StatusUnderline;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUsers.push(event.option.value)
    for (var index = 0; index < this.listusers.length; index++) {
      if (this.listusers[index].id == event.option.value.id) {
        this.listusers.splice(index, 1);
        break;
      }
    }
    console.log("event.option.value: ", event.option.value)
    if(this.memberInput) this.memberInput.nativeElement.value = '';
    this.memberCtrl.setValue(null);
    // this.memberCtrl.disable();
    // this.memberCtrl.enable();
    this.keyvalue = null
    // this.repopulate();
    // if (document.activeElement instanceof HTMLElement)
    // document.activeElement.blur();
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    this.emailerror1 = null;
    if ((value || '').trim()) {
      var value1 = value.toLowerCase();
      this.emailvalidation1 = false
      var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})');
      if (regexp.test(value1)) {
        console.log("Checking User Exists");
        this.userservice.checkUserExists(value1).subscribe((response: any) => {
          if(response>0) {
            this.emailerror1 = value1 + " is already a member. Cannot send a request.";
          }
          else {
            this.EmailList1.push(value1);
          }
        })                 
      }
      else {
        this.emailerror1 = "Invalid Email address. Kindly verify and re-enter."
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  result:any[]=[];

  _filter(value: any): any[] {
    let result1:any[]=[];
    let result2:any[]=[];
    this.result = [];
    if (typeof value == "string") {
      console.log("string");
      result1 = this.listusers.filter(selectuser => selectuser.name.toLowerCase().includes(value.toLowerCase()));
      result2 = this.listusers.filter(selectuser => selectuser.emailid.toLowerCase().includes(value.toLowerCase()));
      // console.log("Result1: ",result1);
      // console.log("Result2: ",result2);
      for(let res1 of result1) {
        this.result.push(res1);
      }
      for(let res2 of result2) {
        let flag = false;
        for(let res1 of this.result) {
          if(res2.id == res1.id) {
            flag =true;
            break;
          }
        }
        if(flag == false) {
          this.result.push(res2);
        }
      }
      console.log("Result: ",this.result)
      // this.result = this.listusers.filter(selectuser => selectuser.name.toLowerCase().includes(value.toLowerCase()));
    }
    else if (typeof value == "object") {
      console.log("Object");
      this.result = this.listusers.filter(selectuser => selectuser.name.toLowerCase().includes(value.name.toLowerCase()));
    }
    console.log("result: ",this.result);
    return this.result
  }

  newArr = [];

  SendInvite(emaillist) {
  
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Email List: ", emaillist);
    if(emaillist.length>0) {
    
      this.userservice.sendInviteMail({emaillist: emaillist, sender: this.loginUser, weburl: this.weburl}).subscribe((response:any) => {
        console.log("Response: ",response)
        if(response =="Success") {
          this.invitationview=true;
          // this.zone.run(() => {
          //   this.snackbar.open("Invitations sent Successfully.", "x", {
          //     duration: 5000,
          //     verticalPosition: 'top',
          //     horizontalPosition: 'center'
          //   });
          // });
        }
      })      
    }
  }

  groupInfo(Groupinfo) {
    console.log("loginUser: ",this.loginUser);
    this.newArr = [];
    
    if (this.selectedUsers.length > 0) {
      // console.log(this.selectedUsers);
      console.log("groupInfo: ", Groupinfo);
      console.log("Email List: ", this.EmailList1);
      console.log("Selected Users: ", this.selectedUsers);
      this.selectedUsers.forEach(element => {
        console.log("element: ", element);
        if(element.id!=null) {
          this.newArr.push({ id: element.id, emailid: element.emailid, category:"1"})
        }
        else {
          this.newArr.push({ emailid: element.emailid, category:"2" })
        }       
      });
    }
    console.log("newArr: ",this.newArr);
    var info = {
      groupId: Groupinfo.GroupId,
      creatorId: Groupinfo.creatorId,
      isJoin: 'Pending',
      userEmail: this.loginUser,
      members: this.newArr,
      weburl: this.weburl
    }

    this.groupService.addingMember(info).subscribe(infoRes => {
      console.log('hhhhhhhhhhhhhhhh',infoRes);
    })
  }

  // groupInfo2() {
  //   // console.log("Selected Group: ", this.selectedGroup1, "Selected Members: ",this.selectedUsers, "Selected EMails: ",this.EmailList1);
  //   if (this.selectedUsers.length > 0) {
  //     console.log("selectedUsers: ",this.selectedUsers);
  //     console.log("groupInfo: ", this.selectedGroup1);
  //     console.log("Email List: ", this.EmailList1);
  //     console.log("Selected Users: ", this.selectedUsers);
  //     this.selectedUsers.forEach(element => {
  //       console.log("element: ", element);
  //       this.newArr.push({ id: element.id, emailid: element.emailid, category:"1" })
  //     });
  //   }

  //   if(this.EmailList1.length>0) {
  //     this.EmailList1.forEach(element => {
  //       console.log("element: ", element);
  //       this.newArr.push({ emailid: element.EmailId, category:"2" })
  //     });

  //   }

  //   console.log("newArr: ",this.newArr);
  //   var info = {
  //     groupId: this.selectedGroup1.GroupId,
  //     creatorId: this.selectedGroup1.creatorId,
  //     isJoin: 'Pending',
  //     userEmail: this.loginUser,
  //     members: this.newArr,
  //     weburl: this.weburl
  //   }

  //   this.groupService.addingMember(info).subscribe(infoRes => {
  //     console.log(infoRes);

  //   })
  //   // this.groupService.getgroupdata(this.selectedGroup).subscribe((groupDetails: any) => {
  //   //   console.log("groupDetails: ", groupDetails)
  //   //   this.selectedUsers.forEach(element => {
  //   //     this.newArr.push(element.id)
  //   //   });
  //   //   console.log(this.newArr);
  //   //   var info = {
  //   //     groupId: this.selectedGroup,
  //   //     creatorId: groupDetails.creatorId,
  //   //     memberStatus: 'pending',
  //   //     membersId: this.newArr
  //   //   }
  //   //   console.log("info", info)
  //   //   this.groupService.addingMember(info).subscribe(infoRes => {
  //   //     console.log(infoRes);

  //   //   })
  //   // })
  // }
  // lEave the Group
  leaveGroup(data){
    console.log(data);
    console.log(data._id);
    this.groupService.leaveGroup(data._id, data.GroupId._id,data.memberId._id).subscribe( res=>{
    })
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userservice.getGroupss(this.loginUser.id).subscribe((groups:any)=>{
      this.Groupss=groups;
      if(data.GroupId._id == this.Groupss[0].GroupId._id){
        if(this.Groupss){
          this.router.navigate(['/navbar/main'], {queryParams: {value:true}});
        }
        else{
        this.router.navigate(['/navbar/main'], { queryParams: { gid:this.Groupss[1].GroupId._id, gname: this.Groupss[1].GroupId.GroupName, value:true } }); 
        } 

      }
      else{
      if(this.Groupss){
        this.router.navigate(['/navbar/main'], {queryParams: {value:true}});
      }
      else{
      this.router.navigate(['/navbar/main'], { queryParams: { gid:this.Groupss[0].GroupId._id, gname: this.Groupss[0].GroupId.GroupName, value:true } }); 
      } 
    }
    })  
  }
  // Rename the group
  onRename(name){
    let info = {
      rename: name.name,
      id:this.gInfo.GroupId._id
    }
    this.groupService.renameGroup(info).subscribe((res:any)=>{
      // this.router.navigate(['/navbar/main'], {queryParams : { gid :res._id, gname:res.GroupName, value:true}});
      
    })
    
    
    
  }

  homeClient() {
    this.client1 = true; this.premium1 = false;
    this.premiumUserForm = true;
  }

  homePremiumUser() {
    this.client1 = false; this.premium1 = true;
    this.premiumUserForm = true;
    this.selectionform = false;
  }

  onNoClick(): void {
    this.dialogRef.close("NO");
  }
  showExisting() {
    this.InitFirstStage();
    this.GroupChoice="1"
    this.selectedGroup1=null
    this.Groups=[];
    this.userservice.getGroupss(this.loginUser.id).subscribe((groups:any) =>{
      this.Groups=groups;
      console.log("groupslist: ", this.Groups);
    });
  }
  createNew() {
    this.GroupChoice="2"
    this.selectedGroup1=null
  }

  showpublic() {
    this.GroupTypeChoice="1";
    this.selectedGroup1=null
  }

  showprivate() {
    this.GroupTypeChoice="2";
    this.selectedGroup1=null
  }

  onGroupCreate = function (data) {
    console.log("data.valid: ",data.valid);
    console.log("data.value: ",data.value);
    console.log("Group Create Photo ID: ",this.groupphotoid)
    console.log("UserForm: ",this.userForm);
    // test code
    if (data.valid) {
      this.error = true;

      if (data.value.GroupName == undefined) {
        this.nodata = true;
      }
      else {
        var groupdata = {
          creatorId: this.loginUser.id,
          creatorEmailId: this.loginUser.EmailId,
          creatorName: this.loginUser.Name,
          GroupName: data.value.GroupName,
          info: data.value.info,
          Type: null,
          GroupIcon: this.userForm,
          Role: 'Admin',
        }
        if(this.GroupTypeChoice=="1") {
          groupdata.Type="public";
        }
        else if(this.GroupTypeChoice=="2") {
          groupdata.Type="private";
        }
        console.log("groupdata: ",groupdata);
        this.userservice.createGroup(groupdata).subscribe((groupack:any) => {
          console.log("groupack: ",groupack);
          if (this.sendgroupres == "You already created this group") {
              this.userService.openSnackBar(this.sendgroupres, "X");
            }
          else if(groupack.groupresult) {
            console.log("groupack.group: ",groupack.groupresult)
            this.groupService.fetchMemberDetails(groupack.groupresult._id).subscribe((groupDetail: any) => {
              console.log("groupDetail: ", groupDetail)
              this.selectedGroup1=groupDetail[0];
              this.InitSecondStage();
            })
          }
        });
        document.getElementById("closeModal").click()
      }
    }
    // test code end     
    this.imagePreview = null;
    data.reset()
    
  }

  InitSecondStage() {
    console.log(" InitSecondStage ");

    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("loginuser: ",this.loginUser)
    this.userservice.getFriends(this.loginUser.id).subscribe((users: any) => {
      console.log("Users: ", users);
      this.groupService.gettingMembersList(this.selectedGroup1.GroupId._id).subscribe((members: any) => {
        console.log("Members: ", members)
        this.ExistingMembers=members
        for (let user of users) {
          var flag = 0
          if (user.receiverid._id == this.loginUser.id) {
            for (let member of members) {
              if (user.senderId._id == member.memberId) {
                flag = 1;
                break;
              }
            }
            if (flag == 0) {
              this.listusers.push({ id: user.senderId._id, name: user.senderId.Name, emailid: user.senderId.EmailId });
            }
          }

          else if (user.senderId._id == this.loginUser.id) {
            for (let member of members) {
              if (user.receiverid._id == member.memberId) {
                flag = 1;
                break;
              }
            }
            if (flag == 0) {
              this.listusers.push({ id: user.receiverid._id, name: user.receiverid.Name, emailid: user.receiverid.EmailId });
            }
          }

        }

        console.log("List Users: ", this.listusers);

      })
      // this.tempusers = users;
      // for(let user of this.tempusers) {
      //   if(user.receiverid._id == this.loginUser.id) {
      //     this.listusers.push({id: user.senderId._id, name: user.senderId.Name, emailid: user.senderId.EmailId});
      //   }
      //   else if(user.senderId._id == this.loginUser.id) {
      //     this.listusers.push({id: user.receiverid._id, name: user.receiverid.Name, emailid: user.receiverid.EmailId});
      //   }
      // } 
      console.log("listusers: ", this.listusers);
      this.listusers = this.listusers.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
      this.filteredMembers = this.memberCtrl.valueChanges.pipe(
        startWith(this.keyvalue),
        map((selectuser: string | null) => selectuser ? this._filter(selectuser) : this.listusers));
    })

    this.SecondStage=true;
    this.FirstStage=false;
    this.ThirdStage=false;
  }

  InitFirstStage() {
    console.log(" InitFirstStage ")
    this.SecondStage=false;
    this.FirstStage=true;
    this.ThirdStage=false;
  }

  InitThirdStage() {
    console.log("Selected Users: ",this.selectedUsers);
    this.SecondStage=false;
    this.FirstStage=false;
    this.ThirdStage=true;
    this.groupInfo(this.selectedGroup1);
  }

  // InitThirdStage() {
  //   this.groupInfo(this.selectedGroup1);
  //   console.log(" InitThirdStage ")
  //   this.SecondStage=false;
  //   this.FirstStage=false;
  //   this.ThirdStage=true;
  // }

  onNoClickYes(): void {
    this.dialogRef.close("yes");
  }

  slugdata
  ngOnInit() {

    this.client = {};

    this.firstformgroup = this._formBuilder.group({
      firstctrl: ['', Validators.required]
    });
    this.secondformgroup = this._formBuilder.group({
      secondctrl: ['', Validators.required]
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [''],
      secondCtrl:['']
    });
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: [''],
      secondCtrl:['']
    })
    
    console.log("this.route.snapshot.queryParams ngOnInit: ", this.route.snapshot.queryParams)
    if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.slug) {
      this.slugdata = this.route.snapshot.queryParams.slug.split("/")[1]
      console.log(this.route.snapshot.queryParams.slug.split("/")[1]);
      this.client.EmailId = this.slugdata
    }
    else if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.join) {
      this.GroupSignUp = {
        GroupId: this.route.snapshot.queryParams.join,
        referrer: this.route.snapshot.queryParams.a,
        InviteeEmail: this.route.snapshot.queryParams.b
      }
      
    }
    console.log("slugdata: ",this.slugdata, " GroupSignUp: ",this.GroupSignUp)

    if (this.slugdata !== undefined) {
      console.log(this.slugdata)
      this.loginEvent = false;
      this.registerEvent = true;
      this.EmailId = this.slugdata
      console.log(this.EmailId)
    }
    else if(this.GroupSignUp!==undefined && this.GroupSignUp!==null) {
      console.log("this.GroupSignUp: ",this.GroupSignUp)
      this.loginEvent = false;
      this.registerEvent = true;
    }
    else {
      this.loginEvent = true;
      this.registerEvent = false;
    }
  }

  maketrue() {
    this.premiumUserForm = true;
  }
  ////////////////////////////////////////////////Login///////////////////////////////////////////////////////////////////////////////
  orgdata: any;


  onLog = function (user) {
    this.wrongPassword = false;
    this.wrongEmail = false;
    localStorage.setItem('UserStatus', 'false');
    // if (this.userservice.getClientLoggedIn() || this.userservice.getPremiumUserLoggedIn() || this.userservice.getAdminLoggedIn()) {
    //   // this.translate.get('Refresh_the_page').subscribe(res => {
    //   //   alert(res);
    //   // });
    // }
    // else {
    this.userservice.checkLogin(user).subscribe(data1 => {
      this.Repdata = data1;
      console.log("Logged in user: ",this.Repdata.user);
      console.log(this.Repdata.user.roleid.role_id,this.Repdata.user.role);

      if (this.Repdata.user.roleid.role_id == "1" && this.Repdata.user.role == "Client") {
        let obj = {
          email: this.Repdata.user.EmailId,
          loginStatus: 1
        }
        console.log(this.Repdata.user);
        this.messageService.startSubscriber(this.Repdata.user._id).subscribe(data => {
          console.log(data);
        });

        this.userservice.updateloginstatus(obj).subscribe(data => {
          console.log(data);
        });
        this.onNoClickYes();
        localStorage.setItem('role', this.Repdata.user.role);
        // localStorage.setItem('UserStatus', 'true');
        this.userservice.setClientLoggedIn(this.Repdata);
        if (this.data.refreshNav) this.refreshNavBar(1);
        if (!this.data.navigate) {
          this.userservice.userprofile().subscribe(data => {   // need to create backend api 
            if (data == null) {
              this.router.navigate(['organization']);  // create user folder in that userprofile component need to create
            }
            else {
              this.router.navigate(['organization']);  //create user folder in that chatroom component need to create
            }
          })
        }
        this.router.navigate(['organization']);  // create user folder in that userprofile component need to create
        this.snackbar.open("login successful", "x", {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        })
        this.onNoClick()
        this.router.navigate(['organization'])
      }
      // else{
      if (this.Repdata.message == 'Missing credentials') {
        this.loginClick = true;
      }
      else if (this.Repdata.message == "This email is not registered.") {
        this.wrongEmail = true;
      }
      else if (this.Repdata.message == "This password is not correct.") {
        this.wrongPassword = true;
        this.wrongEmail = false;
      }
      else if (this.Repdata.message == "This is blocked account... Please contact Admin.") {
        this.translate.get('Account_Blocked').subscribe(res => {
          this.userservice.openSnackBarFail(res, "X");
        });
      }
      else {
        if (this.Repdata.user.role == "Client" && this.Repdata.user.roleid.role_id != "1") {
          // newly added for loginstatus update
          let obj = {
            email: this.Repdata.user.EmailId,
            loginStatus: 1
          }
          console.log(this.Repdata.user);
          this.messageService.startSubscriber(this.Repdata.user._id).subscribe(data => {
            console.log(data);
          });

          this.userservice.updateloginstatus(obj).subscribe(data => {
            console.log(data);
          });
          this.onNoClickYes();
          console.log("11", this.Repdata.user);
          localStorage.setItem('role', this.Repdata.user.role);
          localStorage.setItem('userdetails', JSON.stringify(this.Repdata.user));
          this.userservice.setClientLoggedIn(this.Repdata);
          if (this.data.refreshNav) this.refreshNavBar(1);
          if (!this.data.navigate) {
            this.userservice.userprofile().subscribe(data => {   // need to create backend api 
              if (data == null) {
                this.router.navigate(['/navbar/dashboard']);  // create user folder in that userprofile component need to create
              }
              else {
                this.router.navigate(['/navbar/dashboard']);  //create user folder in that chatroom component need to create
              }
            })
          }
          this.router.navigate(['/navbar/dashboard']);  // create user folder in that userprofile component need to create
          this.snackbar.open("login successful", "x", {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          })
        }
        else if (this.Repdata.user.role == "PremiumUser") {
          this.onNoClickYes();
          localStorage.setItem('role', this.Repdata.user.role);
          localStorage.setItem('currentUser', JSON.stringify(this.Repdata.token));
          this.userservice.setPremiumUserLoggedIn(this.Repdata.user);
          if (this.data.refreshNav) this.refreshNavBar(2);
          this.router.navigate(['/navbar/dashboard']);
        }
        else {
          if ((this.Repdata.user.role == "Client" || this.Repdata.user.role == "user") && this.Repdata.user.roleid.role_id != "1") {
            // newly added for loginstatus update
            let obj = {
              email: this.Repdata.user.EmailId,
              loginStatus: 1
            }
            console.log(this.Repdata.user);
            this.messageService.startSubscriber(this.Repdata.user._id).subscribe(data => {
              console.log(data);
            });

            this.userservice.updateloginstatus(obj).subscribe(data => {
              console.log(data);
            });
            this.onNoClickYes();
            console.log("1111111111111111111111111111111111", this.Repdata.user);
            localStorage.setItem('role', this.Repdata.user.role);
            localStorage.setItem('userdetails', JSON.stringify(this.Repdata.user));
            this.userservice.setClientLoggedIn(this.Repdata);
            if (this.data.refreshNav) this.refreshNavBar(1);
            if (!this.data.navigate) {
              this.userservice.userprofile().subscribe(data => {   // need to create backend api 
                if (data == null) {
                  this.router.navigate(['/navbar/dashboard']);  // create user folder in that userprofile component need to create
                }
                else {
                  this.router.navigate(['/navbar/dashboard']);  //create user folder in that chatroom component need to create
                }
              })
            }
            this.router.navigate(['/navbar/dashboard']);  // create user folder in that userprofile component need to create
            this.snackbar.open("login successful", "x", {
              duration: 1000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          }
          else if (this.Repdata.user.role == "PremiumUser") {
            this.onNoClickYes();
            localStorage.setItem('role', this.Repdata.user.role);
            localStorage.setItem('currentUser', JSON.stringify(this.Repdata.token));
            this.userservice.setPremiumUserLoggedIn(this.Repdata.user);
            if (this.data.refreshNav) this.refreshNavBar(2);
            this.router.navigate(['/navbar/dashboard']);
          }
          else if (this.Repdata.user.role == "admin") {
            this.onNoClickYes();
            localStorage.setItem('role', this.Repdata.user.role);
            localStorage.setItem('currentUser', JSON.stringify(this.Repdata.token));
            this.userservice.setAdminLoggedIn();
            if (this.data.refreshNav) this.refreshNavBar(3);
            this.router.navigate(['/navbar/admin/admindashboard']);
          }
        }
      }
      // }
    }, error => {
      this.iserror = true;
      this.errorres = error;
    });

  }
  // }
  // check(data) {
  //   this.userservice.getemail(data).subscribe(data => {
  //   })
  // }

  refreshNavBar(no) {
    this.userservice.refreshNav.emit("yes")
  }

  loginPage() {
    this.loginEvent = true;
    this.registerEvent = false;
    this.resetEvent = false;
  }

  register() {
    this.loginEvent = false;
    this.registerEvent = true;
  }



  ///////////////////////////////////////////////////////Registration////////////////////////////////////////////////////////////////////////
  // roleid ="5e3a4f2cbce9993f682bbc4"
  clientform1(clients, client, roleid) {
    if(this.isDisabled==true) {
      
      console.log("(clients.valid: ", clients.valid);
      console.log("1:", client);
      console.log("2:", clients.value);
  
      console.log("3:", roleid);
      // client.roleid=this.roleid
      this.validclick = true;
      this.spin = false;
      console.log('this.emailvalidation', this.emailvalidation);
      if (clients.valid && this.emailvalidation == false) {
        this.validclick = false;
        this.clientdata = client
        this.isDisabled=false;
        // if(this.slugdata !== undefined || this.slugdata !== null){ this.clientdata.EmailId = this.slugdata;}
        console.log("clientform1", this.clientdata);
        console.log("111111111111111111111:", client);
  
        this.linksService.addOtp(client).subscribe((data:any) => {
  
          console.log("data from OTP request: ",data);
          if(data.result =="Sucessfully Sent"){
            this.OTPSuccess = true;
          }
          this.response = data;
          this.clientsform = false;
          this.spin = true;
          this.timeCount = 120;
          this.displayerror = false;
          if (this.timer) this.pauseTimer();
          this.StartTimer();
        });
      }
    }
    
  }
  userroledata
  rolesdata
  rolenumber
  clientform2(client2) {
    if((client2.value.otp0!=undefined && client2.value.otp1!=undefined && client2.value.otp2!=undefined && client2.value.otp3!=undefined && client2.value.otp4!=undefined && client2.value.otp5!=undefined)||(client2.value.otp0!=null && client2.value.otp1!=null && client2.value.otp2!=null && client2.value.otp3!=null && client2.value.otp4!=null && client2.value.otp5!=null)){
    console.log("client2", client2.value)
    let obj = { otp0: client2.value.otp0, otp1: client2.value.otp1, otp2: client2.value.otp2, otp3: client2.value.otp3, otp4: client2.value.otp4, otp5: client2.value.otp5 }
    this.errorres = null;
    var data;
    this.validclick = true;
    if (client2.valid && this.emailvalidation == false && this.clientdata.EmailId) {
      let signupobj = {
        EmailId: this.clientdata.EmailId,
        otp: obj
      }
      client2.value.EmailId = this.clientdata.EmailId;
      this.userservice.verifyOtp(signupobj).subscribe(res => {
        data = res
        
        // if(this.timer) this.pauseTimer();
        if (data.res == "OTP-expired") {
          this.userservice.openSnackBarFail('otp_expired_Click_resend_otp', "X");
          this.displayerror = true;
        } else if (data.res == "OTPFAILED") {
          this.userservice.openSnackBarFail('Enter_correct_OTP', "X");
          this.displayerror = true;
        } else if (data.res == "success") {
          this.clientdata.role = 'Client';
          var res1;

          //slug creation
          var slug = client2.value.EmailId.substring(0, client2.value.EmailId.lastIndexOf("@"));
          let trimmed = slug.replace(/[!@#%^&*(),.?":{}|<>$]/g, '_');
          var slug2 = trimmed + Math.floor(Math.random() * (10000 - 1000)) + Math.floor(Math.random() * (10000 - 1000));
          this.clientdata.slug = slug2;
          console.log(this.clientdata.slug);
          // saving user data after otp verification SUCCESS

          this.userservice.saveuser(this.clientdata,this.GroupSignUp).subscribe(data => {
            res1 = data;
            console.log(res1);
            var obj = {
              email: res1.result.EmailId,
              loginStatus: 1
            }
            this.messageService.startSubscriber(res1.result._id).subscribe(data => {
              console.log(data);
            });
            this.userservice.updateloginstatus(obj).subscribe(data => {
              console.log(data);
            });
            if (res1) {
              this.onNoClickYes();
              localStorage.setItem('currentUser', JSON.stringify(res1));
              localStorage.setItem('role', this.clientdata.role);
              this.userservice.setClientLoggedIn(res1);
              this.refreshNavBar(6);
              this.router.navigate(['/navbar/dashboard']);
            }
          });

        }
      });
    }
  }
  else
  {
    this.num1=null;
    this.num2=null;
    this.num3=null;
    this.num4=null;
    this.num5=null;
    this.num6=null;
    this.zone.run(() => {
      this.snackbar.open("Kindly Recheck the entered OTP and try again.", "x", {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    });
  }
  }

  premiumUserForm1(premiumUsers, premium) {
    this.validclick = true;
    if (premiumUsers.valid && this.emailvalidation == false) {
      this.spin = false;
      this.validclick = false;
      this.premiumData = premium;
      this.linksService.addOtp(premium).subscribe(data => {
        this.response = data;
        this.premiumUserForm = false;
        this.spin = true;
        this.timeCount = 120;
        this.displayerror = false;
        if (this.timer) this.pauseTimer();
        this.StartTimer();
      });
    }
  }


  ChangeForm(name) {
    this[name] = true;
  }

  disableresendOtpButton: Boolean = false;
  spin = true;
  resendOTP(name, info) {
    this.OTPSuccess=false;
    this.num1=null;
    this.num2=null;
    this.num3=null;
    this.num4=null;
    this.num5=null;
    this.num6=null;
    this.pauseTimer();
    this.timeCount = 120;
    console.log("testingggggggggg", name, info)
    this.displayerror = false;
    this.disableresendOtpButton = true;
    this.spin = false;
    this[name] = info;
    this.linksService.addOtp(info).subscribe((data:any) => {
      this.response = data;
      console.log("Data from OTP resend: ", data);
      if(data.result == "Sucessfully Sent") {
        this.OTPSuccess=true
      }
      this.displayerror = false;
      if (this.timer) this.pauseTimer();
      this.StartTimer();
      this.spin = true;
      this.disableresendOtpButton = false;
    });
  }


  // This is for forgot password resend otp
  resendOTPfgpswd(info){
    this.OTPSuccess1=false;
    console.log(info)
    this.displayerror = false;
    this.disableresendOtpButton = true;
    this.spin = false;
    // this[name] = info;
    this.linksService.addOtp(info).subscribe((data: any) => {
      console.log("Resend OTP Forgot Password: ",data)
      if(data.result == "Sucessfully Sent") {
        this.OTPSuccess1=true;
      }
      this.response = data;
      this.timeCount = 120;
      this.displayerror = false;
      if (this.timer) this.pauseTimer();
      this.StartTimer();
      this.spin = true;
      this.disableresendOtpButton = false;
    });
    }
  premiumUserForm2(premiumUsers) {
    this.errorres = null;
    var data;
    let currentTime = new Date().toISOString();
    this.validclick = true;
    if (premiumUsers.valid && this.emailvalidation == false) {
      premiumUsers.value.EmailId = this.premiumData.EmailId;
      this.userservice.verifyOtp(premiumUsers.value).subscribe(res => {
        data = res
        // if (this.timer) this.pauseTimer();
        if (data.res == "OTP-expired") {
          // this.translate.get('otp_expired').subscribe(res => {
          //   this.errorres = res;
          // });
          this.displayerror = true;
        }
        else if (data.res == "OTPFAILED") {
          // this.translate.get('Enter_correct_OTP').subscribe(res => {
          //   this.errorres = res;
          // });
          this.displayerror = true;
        }
        else if (data.res == "success") {
          this.premiumData.role = 'PremiumUser';
          var slug4 = premiumUsers.value.EmailId.substring(0, premiumUsers.value.EmailId.lastIndexOf("@"));
          let trimmed = slug4.replace(/[!@#%^&*(),.?":{}|<>$]/g, '_');
          var slug5 = trimmed + Math.floor(Math.random() * (10000 - 1000)) + Math.floor(Math.random() * (10000 - 1000));
          this.premiumData.slug = slug5;
          var res1;
          this.userservice.saveuser(this.premiumData,this.GroupSignUp).subscribe(data => {
            res1 = data;
            if (res1) {
              this.onNoClickYes();
              localStorage.setItem('currentUser', JSON.stringify(res1));
              localStorage.setItem('role', this.premiumData.role);
              this.userservice.setPremiumUserLoggedIn(res1.result);
              this.refreshNavBar(7);
              this.router.navigate(['/navbar/dashboard']);
            }
          })
        }
      });
    }
  }

  alert
  onBlurEmail(email) {
    if (email) var email1 = email.toLowerCase();
    this.emailvalidation = false
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})');
    if (regexp.test(email1)) {
      this.userservice.getuseremail(email1).subscribe(data => {
        this.userdata = data;
        console.log(this.userdata);
        if (this.userdata.length != 0) {
          this.emailvalidation = true;
          this.alert = "Email already Exist"
        }
      });
    }
  }

  /////////////////////////////////////////////////////New Forget Password/////////////////////////////////////////////////////////////////////////

  serverResponse = false;
  serverResponseData: any;
  emailchecked = false
  userdata5: any;
  check1 = false
  check5 = true;
  show = false
  req = false;
  step = 'first';
  finalmail: any;
  changepassword = false;
  forgotloader = false;

  sendOtp = function (user) {
    this.OTPSuccess1=false;
    this.resendotpfgpswd = user.value
    this.emailvalidation =false;
    console.log(user.value)
    this.show = true;
    this.req = false;
    this.forgotloader = true;
    if (user.valid && !this.check1 && this.emailchecked) {
      this.finalmail = user.value.EmailId;
      this.userservice.forgotPassEmail(user.value).subscribe((data:any) => {
        console.log("Forgot Password OTP: ",data)
        if(data.res=="success") {
          this.OTPSuccess1=true;
        }
        this.show = false;
        this.check5 = false;
        if (data.res == "success") {
          this.errorres = '';
          this.forgotloader = false;
          this.step = "second";
          this.timeCount = 120;
          this.displayerror = false;
          if (this.timer) this.pauseTimer();
          this.StartTimer();
        }
        else if (data.res == "block") {
          this.translate.get('Account_Blocked_Please_Contact_Admin').subscribe(res => {
            this.errorres = res;
          });
          this.displayerror = true;
        }
        this.otpres = data;
      });
    }
    else {
      this.forgotloader = false;
      this.req = true;
    }
  }

  passwordcheck = false;
  errorMsg;

  otpVerification = function (otp) {
    console.log("Entered OTP: ",otp.value)
    this.passwordcheck = false;
    this.errorres = null;
    this.otpCheck = false;
    this.show = true;
    console.log("OTP Valid: ",otp.valid)
    if(!otp.valid) {
      this.zone.run(() => {
        this.snackbar.open("Kindly Recheck the entered OTP and try again.", "x", {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      });
    }
    if (otp.valid && !this.errorMsg) {
      var user = { EmailId: this.finalmail, otp: otp.value }
      this.userservice.verifyOtp(user).subscribe((data:any) => {
        console.log("data.res: ",data)
        this.changepassword = false;
        if (this.timer) this.pauseTimer();
        if (data.res == "OTPFAILED") {
          this.step = 'second';
          this.StartTimer();
          this.zone.run(() => {
            this.snackbar.open("Kindly Recheck the entered OTP and try again.", "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
          // this.translate.get('Enter_correct_OTP').subscribe(res => {
          //   this.errorres = 'Enter_correct_OTP';
          // });
          this.formhide = false;
          this.show = false;
          this.passwordcheck = true;
          this.displayerror = true;
          // this.otpVerification(user);
        }
        else if (data.res == "OTP-expired") {
          this.step = 'first';
          this.zone.run(() => {
            this.snackbar.open("OTP is expired. Click on Resend OTP to get a new one.", "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
          this.translate.get('otp_expired').subscribe(res => {
            this.errorres = res;
          });
          this.show = false;
          this.displayerror = true;
        }
        else if (data.res == "block") {
          this.zone.run(() => {
            this.snackbar.open("Limit exceeded for OTP Request. Kindly contact admin.", "x", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          });
          this.step = 'second';
          this.show = false;
          this.translate.get('Account_Blocked_Please_Contact_Admin').subscribe(res => {
            this.errorres = res;
          });
          this.displayerror = true;
        }
        else if (data.res == "success") {
          this.step = 'third';
          this.displayerror = true;
          this.changepassword = true;
          this.show = false;
        }
      });
    }
  }

  timer;
  timeCount: any = 120;
  maxTime: any = 0;

  StartTimer() {
    this.timer = setInterval(() => {
      if (this.timeCount > 0) {
        this.timeCount--;
      } else {
        if (!this.displayerror) {
          this.displayerror = true;
          // this.step = 'first';
          // this.translate.get('otp_expired').subscribe(res => {
          //   this.errorres = res;
          // });
        }
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.timer);
  }

  emailresponse;
  forgetDisableButton: Boolean = false;
  
  fpEmailCheck(emailId) { 
    var userdata;
    this.check1 = false;
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})');
    var email = emailId.value.EmailId;
    if (regexp.test(email)) {
      this.emailchecked = false;
      this.forgetDisableButton = true;
      this.emailresponse = ''
      if(this.getotp == true) {
        this.getotp = false;      
      this.userservice.getuseremail(email.toLowerCase()).subscribe((data:any) => {
        this.emailchecked = true;
        userdata = data;
        if (userdata.length == 0) {
          this.emailresponse = "Email doesn't exist"
          this.snackbar.open("Email doesn't exist", "x", {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        } else {
          if (userdata[0].data == 'no') {
            this.check1 = true;
            this.forgetDisableButton = false;
          }
          if (userdata[0]._id) {
            this.sendOtp(emailId);
          }
          if (userdata.data == 'blocked') {
            this.show = false;
            this.displayerror = true;
            this.forgetDisableButton = false;
          }
        }
      });
    }
    }
  }

  changePass = function (user) {
    if ((user.value.password == null || user.value.password == '') || (user.value.confirmPassword == null || user.value.confirmPassword == '')) {
      this.snackbar.open("please enter the data", "x", {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    } else {
      if (user.value.password == user.value.confirmPassword) {
        this.passwordcheck = true;
        if (user.valid) {
          user.value.EmailId = this.finalmail;
          this.userservice.changeforgotpassword(user.value).subscribe(data => {
            var res = data;
            if (data.res == "success") {
              this.check5 = true;
              this.changepassword = false;
              this.onNoClick()
              // this.translate.get('Password_Updated_Successfully').subscribe(res => {
              this.userservice.openSnackBar('Password_Updated_Successfully', "X");
              // });
            } else {
              this.onNoClick();
              // this.translate.get('Password_Update_Failed').subscribe(res => {
              this.userservice.openSnackBarFail('Password_Update_Failed', "X");
              // });
            }
          });
        }
      } else {
        this.snackbar.open("password and confirmPassword not matched ", "x", {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    }
  }

  // to login or signup
  //Resets the parameters required for User login
  showlogin() {
    this.step='first'; 
    this.loginEvent = true;
    this.forgetpage = false;
    this.selectionform = true;
    this.resetEvent = false;
    this.client1 = false;
    this.premium1 = false;
    this.clientsform = true;
    this.isDisabled=true;
    this.OTPSuccess=false;
    this.OTPSuccess1=false;
    this.client.Name=null;
    this.client.EmailId=null;
    this.client.password=null
    this.vpwd=null;
    this.num1=null;
    this.num2=null;
    this.num3=null;
    this.num4=null;
    this.num5=null;
    this.num6=null;
    this.registerEvent = false;
  }

  //Resets the parameters required for user Sign Up
  showsignup() {
    this.step='first';
    this.loginEvent = false;
    this.registerEvent = true;
    this.forgetpage = false;
    this.selectionform = true;
    this.resetEvent = false;
    this.client1 = false;
    this.premium1 = false;
    this.clientsform = true;
    this.isDisabled=true;
    this.OTPSuccess=false;
    this.OTPSuccess1=false;
    this.client.Name=null;
    this.client.EmailId=null;
    this.client.password=null
    this.vpwd=null;
    this.num1=null;
    this.num2=null;
    this.num3=null;
    this.num4=null;
    this.num5=null;
    this.num6=null;
  }

  //Resets the parameters required for forgot password
  showforgotpassword() {
    console.log("Triggering Forgot Password.")
    this.loginEvent = false;
    this.resetEvent = true;
    this.selectionform = false;
    this.forgetpage = true;
    this.step='first';
    this.EmailId=null;
    this.getotp=true;
    this.password=null;
    this.confirmPassword=null;
    this.registerEvent = false;
    this.client1 = false;
    this.premium1 = false;
    this.clientsform = true;
    this.isDisabled=true;
    this.OTPSuccess=false;
    this.OTPSuccess1=false;
    this.client.Name=null;
    this.client.EmailId=null;
    this.client.password=null
    this.vpwd=null;
    this.num1=null;
    this.num2=null;
    this.num3=null;
    this.num4=null;
    this.num5=null;
    this.num6=null;
  }

  next(event, next, prev) {
    var charLimit = 1;
    var keys = [8, 9, 13, /16, 17, 18,/, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 48, , 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 86, 144, 145];

    if (event.which == 8 && event.target.value.length == 0) {
      if (prev) prev.focus();
    } else if ($.inArray(event.which, keys) >= 0) {
      return true;
    } else if (event.target.value.length >= charLimit) {
      if (next) next.focus();
      return false;
    } else if (event.shiftKey || event.which <= 48 || event.which >= 58) {
      return false;
    }

  }


  next2(event, next, prev) {
    if (event.srcElement.selectionStart === 0) {
      event.srcElement.selectionStart = 1;
      event.srcElement.selectionEnd = 1;
    }

    var charLimit = 1;
    if (event.target.value.length >= charLimit) {
      if (next) next.focus();
      return false;
    }

  }

  onClickMethod(event) {
    if (event.srcElement.selectionStart === 0) {
      event.srcElement.selectionEnd = 1;
      event.srcElement.selectionStart = 1;
    }
  }

 
  pasteotp(event: ClipboardEvent) {

    //console.log(event)
    let clipboardData = event.clipboardData || window["clipboardData"];
    let pastedText = clipboardData.getData('text');
    if (pastedText.length > 1) {
      pastedText = pastedText.trim()
      pastedText = pastedText.split('');
      for (let i = 0; i <= pastedText.length; i++) {
        if (i == 0) this.num1 = pastedText[i];
        else if (i == 1) this.num2 = pastedText[i];
        else if (i == 2) this.num3 = pastedText[i];
        else if (i == 3) this.num4 = pastedText[i];
        else if (i == 4) this.num5 = pastedText[i];
        else if (i == 5) this.num6 = pastedText[i];
        $("input[name='otp" + i + "']").focus();
      }

    }

  }
  Restrictcharacter(event) {

    if (event.keyCode == 118) {

      return false;
    }
  }


     // Image Upload 
  /*
  Function Name: onFileSelected
  Input: Image and Image Name
  Output: None
  Desc: Getting image as input and store in collection as path stored the image in uploads folder
   */

  onFileSelected(fileInput:any, title:any) {
  
    console.log(fileInput)
    this.showfilename=this.bginput.nativeElement.value.split("\\").pop()
    console.log(this.showfilename)
    /**
     * need to work on it
     */
    var imagedata;
    const file = fileInput.target.files[0];
    console.log("Uploaded file: ",file)
    console.log("Title: ",title);
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
    this.userservice.saveFiles(formData).subscribe(data => {
      imagedata = data;
      console.log("Group ImageData: ",data);
      
      this.groupphotoid=imagedata[0]._id;
      if (title) {
        title.doc = imagedata[0]._id;
        title.pic = imagedata[0].originalFilename;
        console.log("Condition1: ",title);
      }
      else if (!title) {this.userForm = imagedata[0]._id; console.log("condition2: ",this.userForm)}
    });
  }


 
  Downloadfail(e)
  {
    console.log(e);
    
  }

  showcomments(){
    this.showusercomments=!this.showusercomments;
    this.showlikes =false
  }

  ShowLiked(){
    console.log("ShowLiked.");
    console.log("ShowStatusObj: ",this.showstatusObj);
    console.log("this Data Status: ",this.data.status.status);
    if(this.showstatusObj.isLiked == false){
      console.log("false");
      let temp=this.showstatusObj.likedBy;
      temp.push(this.loginUser.id)
      this.userservice.updateStatusLikes({statusid: this.showstatusObj._id,likedBy:temp}).subscribe((result: any) => {
        console.log("Status liked.")
      })
    }
    else if(this.showstatusObj.isLiked == true) {
      console.log("true");
      let temp = [],i;
      for(let user of this.showstatusObj.likedBy) {
       temp.push(user._id); 
       console.log("Temp: ",temp);
      }
      for(i=0; i<temp.length; i++) {
        if(temp[i] == this.loginUser.id) {
          console.log("Temp User Matched.")
          break;
        }
      }
      if(i<temp.length-1) {
        let temp2 = temp[temp.length-1];
        temp[temp.length-1] = temp[i];
        temp[i] = temp2;
      }
      temp.pop();
      console.log("Temp 2: ",temp);    
      this.userservice.updateStatusLikes({statusid: this.showstatusObj._id,likedBy:temp}).subscribe((result: any) => {
        console.log("Status unliked.")
      })
  }
}

  showlikeview() {
    if(this.statususer) {
      this.showlikes =true;
      this.showusercomments=false;
    }    
  }

  addFriend(user) {
    console.log("Add Friend Status: ", user);
    let UserObj = {
      receiverEmailId: user.EmailId,
      receiverid: user._id,
      senderEmailId: this.loginUser.EmailId,
      senderId: this.loginUser.id,
      status: false
    }
    console.log("UserObj: ", UserObj);
    this.userservice.InvitedUser(UserObj).subscribe(res => {
      console.log('UserObj res', res);
      if (res == 'You already sent a request or Already Your Friend') {
        this.snackbar.open(res.toString(), "X", {
          duration: 5000,
          panelClass: ['bar-color'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        if (this.statususer) {
          this.statususer.push({ id: user._id })

          console.log("Status User: ", this.statususer)
          for (let id of this.showstatusObj.likedBy) {
            id.isFriend = false;
            for (let user of this.statususer) {
              if (user.id == id._id) {
                id.isFriend = true;
              }
            }
          }
        }
      }
      else {
        this.snackbar.open("Invitation sent", "X", {
          duration: 1000,
          panelClass: ['bar-color'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        if (this.statususer) {
          this.statususer.push({ id: user._id })

          console.log("Status User: ", this.statususer)
          for (let id of this.showstatusObj.likedBy) {
            id.isFriend = false;
            for (let user of this.statususer) {
              if (user.id == id._id) {
                id.isFriend = true;
              }
            }
          }
        }
      }
    })
  }

  adduser(event, user) {
    if (event.checked) {
      if (this.groupcallObj.receiverIDs.length < 7) {
        this.groupcallObj.receiverIDs.push(user._id)
      }
      else {
        event.checked = false;
        event.source._checked = false;
        this.zone.run(() => {
          this.snackbar.open(`Maximum 7 users permitted in one call. Cannot add more users.`, "x", {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        });
      }

    } else {
      var index = this.groupcallObj.receiverIDs.findIndex(x => x == user._id)
      if (index != -1) {
        this.groupcallObj.receiverIDs.splice(index, 1)
      }
    }
  }

  groupVideoCallinit() {
    console.log("Group Call Obj: ",this.groupcallObj)
  }

  getPositionStatusComment(event, comment) {
    if (this.showstatusObj) {

      if (event) {
        if (event.shiftKey && (event.keyCode == 13)) {
          console.log("Shift + Enter: ", this.statuscomment);
        }
        else if (event.keyCode == 13 && !event.shiftKey) {
          event.preventDefault();
          console.log("Enter: ", this.statuscomment);
          if (this.loginUser && this.statuscomment) {
            if (this.statuscomment.trim() != '') {
              let commentstatus = {userid: this.loginUser.id, text: this.statuscomment.trim(), timelog: Date.now() };
              // console.log("Status Comment: ", commentstatus);
              this.statuscomment = '';
              this.userservice.addStatusComments({id: this.showstatusObj._id,comments:commentstatus}).subscribe((result: any) => {
                console.log("Comment Added.")
              })
            }
            else {
              this.zone.run(() => {
                this.snackbar.open(`Blank Comments cannot be sent. Kindly add some text and try again...`, "x", {
                  duration: 5000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                });
              });
              this.statuscomment = '';
            }
          }
        }
      }
      if (comment) {
        // console.log("Comment: ",comment.value);
        if (comment.selectionStart || comment.selectionStart == '0') {
          this.cursorPos = comment.selectionStart;
        }
        console.log("Comment Cursor Position: ", this.cursorPos);
      }

    }
  }
  onNgModelChange(event) {
    console.log("EVent: ",event)
  }
}


