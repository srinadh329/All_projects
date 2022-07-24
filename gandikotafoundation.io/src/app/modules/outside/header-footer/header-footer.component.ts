import { Component, OnInit,HostListener,Inject } from '@angular/core';
import {SharedModule} from '../../../shared/shared.module'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import {AppService} from 'src/app/core/services/app.service'
@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {
  loginForm:any;
  strickyHeader !: boolean;
  bussinesAddress:any = [];
  constructor(private formBuilder: FormBuilder,private appService:AppService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
    this.appService.getBussinessAddress().subscribe((response:any)=>{
      console.log(response)
      this.bussinesAddress = response.data[0]
      console.log(this.bussinesAddress)
    },error => {
      console.log(error);
    })
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(element:any) {
    this.strickyHeader = (window.pageYOffset > 50) ? true :false;
 }
 gotoTop() {
  window.scroll({ 
    top: 0, 
    left: 0, 
    behavior:'smooth' 
  });
}
  loginsubmit(){
    
  }
  setColor(data:any){
    var color = data;
    console.log(color);
  }
}
