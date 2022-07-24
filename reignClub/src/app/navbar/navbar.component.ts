import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  mobilemenu:any;
  constructor() { }

  ngOnInit(): void {
  }
  button(data){
    this.mobilemenu=data;
  }
}
