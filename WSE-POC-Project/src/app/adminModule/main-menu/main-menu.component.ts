import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainMenuComponent implements OnInit {
  name:any;
  constructor(public  router:Router,private appService:AppService) { }
  today: number = Date.now();
  currentProducts:any=[  
  {url:'dashboard',product:'Dashboard'},
  {url:'branch',product:'Branch'},
  {url:'country',product:'Country'},
  {url:'currency',product:'Currency'},
  {url:'product',product:'Products'},
  {url:'prdcnt',product:'Country Products'},
  {url:'onlusrreports',product:'Online Users Reports'},
  {url:'brnusrreports',product:'Branch Users Reports'},
  {url:'brnwisetransactions',product:'Branch Wise Transactions'},
  {url:'prdwisetransactions',product:'Product Wise Transaction'},
  {url:'brnusrwisetransactions',product:'Branch User Wise Transaction'},
  {url:'goldcard',product:'Goldcard'},
  {url:'rates',product:'Rates'},
  {url:'charges',product:'Charges'},
  {url:'userroles',product:'User Roles'},
  {url:'onilneusers',product:'Online Users'},
  {url:'changepassword',product:'Change Password'}];
  currentRouter:any
  toggle:any
  username:any;
  currentproduct:any={};
  time = new Date();
  timer;
  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.currentRouter = this.router.url.split('/')[1];
    this.currentproduct = this.currentProducts.find(e=>e.url===this.router.url.split('/')[2]);
    this.username = this.appService.getUserdetails();
   
  }

  routerchanges(data){
    this.router.navigate([data]);
    this.toggle=false;
    setTimeout(()=>{
      this.currentproduct={};
        this.currentproduct = this.currentProducts.find(e=>e.url===data.split('/')[1]);
    },100);
    // if(data && window.innerWidth>756){
    //   this.toggle='false';
    // }

  
  }
  homelink(){
    this.router.navigate(['admin/dashboard'])
  }
  logOut() {
    this.appService.logout();
  }

  report(){
    this.toggle=true;
  }

}
