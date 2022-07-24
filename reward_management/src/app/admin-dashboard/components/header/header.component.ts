import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderAdminComponent implements OnInit {

  loginName:any;
  
  constructor(private router:Router , private storage:StorageService) { }

  ngOnInit(): void {
    this.loginName = this.storage.getUserName();
  }


  logOut() {
    this.storage.logOut();
    this.router.navigate(['/superadmin/login'])
  }

}
