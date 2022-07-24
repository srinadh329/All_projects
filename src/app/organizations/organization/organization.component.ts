import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { OrganizationsService } from 'src/app/services/organizations.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  user:boolean=false
  loginuserdata;
  Organizationdata
  orgdata;
  divheight: number;
  maindiv: number;
  searchterm:any
  constructor(private messageService:MessageService,public userService:UserService,private router:Router, private route:ActivatedRoute, private Organizationservice:OrganizationsService) { 
    this.messageService.Connectsocket({type:'connect'});
    this.loginuserdata = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.loginuserdata)

  
    }

  ngOnInit() {
    this.divheight = window.innerHeight - 200;
    this.maindiv = window.innerHeight;
   this.Organizationservice.getorganizations().subscribe(data=>{
    console.log(data);
    this.orgdata=data
  })
  
  }

  @HostListener('window:resize') onWindowResize() {
    this.divheight = window.innerHeight - 200;
    this.maindiv = window.innerHeight;
  }

  go(id)
  {
    localStorage.setItem("Organization",JSON.stringify(id))
    this.router.navigate(['home/orgdashboard'])
  }

  LogOut() {
   
    localStorage.removeItem('orgdata')
    this.router.navigate(['']);
  }

}