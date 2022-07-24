import { Component, OnInit,HostListener,Inject } from '@angular/core';
import {AppService} from 'src/app/core/services/app.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  serviceList:any = [];
  constructor(private appService:AppService,@Inject(DOCUMENT) private document: any) { }
  isMorePages:boolean = false;
  isApiLoading:boolean = false;
  nextPage=1
  ngOnInit(): void {
  this.loadServices(this.nextPage)
  }
  loadServices(page:number) {
    this.isApiLoading = true;
    this.appService.getServiceEvents({page:page}).subscribe((response:any)=>{
      console.log(response)
    this.isApiLoading = false;
      
      this.serviceList = [...this.serviceList,...response.data.items];
      this.nextPage = response.data.next
      this.isMorePages =( this.serviceList.length != response.data.total) ? true : false
    },error=>{
    this.isApiLoading = false;
      console.log(error);
    })
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event:any) {
    // 200 is the height from bottom from where you want to trigger the infintie scroll, can we zero to detect bottom of window
    if ((document.body.clientHeight + window.scrollY + 400) >= document.body.scrollHeight && this.isMorePages && !this.isApiLoading) {
       this.loadServices(this.nextPage)
    }

  }

}
