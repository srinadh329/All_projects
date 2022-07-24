import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router'
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  currentRouter:any;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  routerlink(data){
    this.currentRouter=data;
  }
}
