import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { AppService } from '../../app.service';
import { StoreService } from './../store.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainMenuComponent implements OnInit {
  currentproduct: string;
  username: any;

  constructor(public router: Router, public storeservice: StoreService, private appService: AppService) { }
  today: number = Date.now();
  currentRouter: any;
  products: any;
  storeproducts = [];
  time = new Date();
  timer;

  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.username = this.appService.getUserdetails();
    this.storeservice.getproductsbybranch(this.username.brnid).subscribe(data => {
      this.products = data;
      this.products.forEach(element => {
        this.storeproducts.push(element.prdid);
      });
    });
    this.currentRouter = this.router.url.split('/')[1];
    this.currentproduct = this.router.url.split('/')[2];
  }

  routerchanges(data) {
    const n = data.lastIndexOf('/');
    const result = data.substring(n + 1);
    this.currentproduct = result;
    this.router.navigate([data]);
  }

  logOut() {// logout of the application
    this.appService.logout();
  }
}
