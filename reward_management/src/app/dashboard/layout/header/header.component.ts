import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggle = false;
  loginName:any;
  constructor(private storage:StorageService,private router: Router) { }

  ngOnInit(): void {
    this.loginName = this.storage.getUserName();
  }

  logOut() {
       this.storage.logOut();
       this.router.navigate(['login'])
  }

}
