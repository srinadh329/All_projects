import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationsService } from 'src/app/services/organizations.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('slideInOut2', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)',
        left: '-6rem'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class HomeComponent implements OnInit {

  maindiv
  loginuserdata
  Organizationdata
  organiztionDetails
  OrganizationName
  changepasswordState: string ='out';
  isShown: boolean;
  constructor(private router:Router,private Organization:OrganizationsService,private userservice:UserService) {
    this.loginuserdata = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.loginuserdata);
    this.Organizationdata=JSON.parse(localStorage.getItem('Organization'))
    console.log(this.Organizationdata);

    // this.Organization.organizationDetails(this.Organizationdata._id).subscribe(data=>{
    //   console.log(data);
    //   this.organiztionDetails=data
   
      
    // })
    
   }

  ngOnInit() {
   
 

  }

  closemodalbox() {
    this.changepasswordState ='out';
    this.isShown = false;
  }

  openchangepassword() {
    this.changepasswordState = this.changepasswordState === 'out' ? 'in' : 'out';
 
  }
  LogOut() {
    this.router.navigate([''])
  }
  
  homeone()
  {
    this.router.navigate(['organization'])
  }
  navigateEmp()
  {
    this.router.navigate(['home/employee'])
  }

  settings(data)
{
  console.log(data);
  
  this.changepasswordState = this.changepasswordState === 'out' ? 'in' : 'out';
  this.isShown =false;
  this.router.navigate(['/home/orgsettings'], { queryParams:{settings: data}});

}


}
