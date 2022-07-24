import { AfterViewChecked, Component, ElementRef, ViewChild, OnInit, Input, Output, EventEmitter ,HostListener} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { DataService } from '../core/data.service';
import { GeneralService } from '../general.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private generalservice: GeneralService, private userService: UserService, private dataservice: DataService , public router: Router) {
    // for registered user
    this.dataservice.newChatReceived().subscribe(data => {
      this.chathistory();
    });
    // for public user socket
    this.generalservice.newChatReceivedRefresh().subscribe(data => {
      this.chathistory();
    })
  }

  @Input('chatContent') chatData: any;
  @Input('emailContent') emailData: any;
  @Input('profile') profileData: any;

  @Output() closeModel = new EventEmitter<any>();

  message: String;
  chatHistory: any;
  messageDivHeight: any;
  chatDivHeight: any;
  onlineusers: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(this.router.url.includes('sharereview'))   {
      this.messageDivHeight = window.innerHeight - 410;
         this.chatDivHeight = this.messageDivHeight - 610;
     } 
     else {   
        this.messageDivHeight = window.innerHeight - 374;
        this.chatDivHeight = this.messageDivHeight - 560;
     }
        this.chathistory();
        this.getOnlineUsers();

  }
  ngOnInit() {
    

 if(this.router.url.includes('sharereview'))   {
  this.messageDivHeight = window.innerHeight - 410;
     this.chatDivHeight = this.messageDivHeight - 610;
 } 
 else {   
    this.messageDivHeight = window.innerHeight - 374;
    this.chatDivHeight = this.messageDivHeight - 560;
 }
    this.chathistory();
    this.getOnlineUsers();
  }

  getOnlineUsers()
  {
    this.generalservice.GetonlineUsers(this.chatData).subscribe(data => {
      this.onlineusers = data
    })
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  chathistory = function () {
    this.userService.getChatHistory(this.chatData).subscribe(data => {
      this.chatHistory = data
      setTimeout(() => {
        this.scrollToBottom();
      }, 1);
    })
  }
  chat(event, chatForm) {
    if (event.keyCode == 13) {
      this.sendChat(chatForm);
    }
  }

  sendChat(data) {
    if (/\S/.test(data.value.message) ) {
      if (this.profileData) data.value.uid = this.profileData.id?this.profileData.id:this.profileData._id;
      data.value.email = this.emailData;
      data.value.documentid = this.chatData;
      this.userService.createChat(data.value).subscribe(res => {
        data.resetForm()
        this.chathistory();
      })
    }
  }

}

