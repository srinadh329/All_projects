import { Component, AfterViewInit ,HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart} from "@angular/router";
import { DocumentService } from './document.service';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'DocIntact';
  constructor(private router: Router,public dialog: MatDialog,private documentService: DocumentService,private http: HttpClient){

  }
  snackBarMeassage: any 
  action = 'x';
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey && event.keyCode == 80) || (event.keyCode == 45)) {
      if (event.keyCode == 45) {
        this.snackBarMeassage = 'PrintScreen is not allowed'
        this.documentService.openSnackBar(this.snackBarMeassage, this.action);
      }
      if (event.ctrlKey && event.keyCode == 80) {
        event.returnValue = false;
        event.preventDefault();
        this.snackBarMeassage = 'Print is not allowed'
        this.documentService.openSnackBar(this.snackBarMeassage, this.action);
      }
   
     
    }
     if (event.keyCode == 123) {
        event.returnValue = false;
        event.preventDefault();
      }
      if ((event.ctrlKey && event.shiftKey &&event.keyCode==73)) {
        event.returnValue = false;
        event.preventDefault();
      }
      if ((event.ctrlKey  && event.keyCode==83)) {
        event.returnValue = false;
        event.preventDefault();
      }
      if ((event.ctrlKey  && event.keyCode==67)) {
        event.returnValue = false;
        event.preventDefault();
        this.snackBarMeassage = 'Copy not allowed'
        this.documentService.openSnackBar(this.snackBarMeassage, this.action);
      }
      // console.log(event.keyCode)

  }
  starturl:any
  ngAfterViewInit(){
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.starturl=this.router.url;
        this.dialog.closeAll()
        this.documentService.sendStartUrl(this.starturl);
        // window.localStorage.setItem('starturl',this.router.url )
      }
      if (event instanceof NavigationEnd) {
        // window.localStorage.setItem('endurl',this.router.url )
      }
    });
  }
  
  rightclickDisable(event : MouseEvent)
  {
    event.preventDefault()
  }

  ngOnInit() {
    //get public ip and location
    var path1='https://freegeoip.app/json/'
    var xhr = new XMLHttpRequest()
    xhr.open("GET", path1)
    xhr.responseType = 'json'
    xhr.onload = function () {
      console.log(typeof (xhr.response))
      if (typeof (xhr.response) != 'object')
        localStorage.setItem('mylocation', JSON.stringify(JSON.parse(xhr.response)))
      else
        localStorage.setItem('mylocation', JSON.stringify(xhr.response))
    }
    xhr.send()
    xhr.onerror = function () {

    }
  //get public ip
  var path='https://api.ipify.org?format=json'
  var xhrr = new XMLHttpRequest()
  xhrr.open("GET", path)
  xhrr.responseType = 'json'
  xhrr.onload = function () {
    console.log(typeof (xhr.response))
    if (typeof (xhr.response) != 'object')
      localStorage.setItem('myip', JSON.stringify(JSON.parse(xhr.response)))
    else
      localStorage.setItem('myip', JSON.stringify(xhr.response))  
  }
  xhrr.send()  

  }

}
