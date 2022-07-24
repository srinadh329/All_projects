import { Component, OnInit } from '@angular/core';
import {SharedModule} from '../../../shared/shared.module'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppService} from 'src/app/core/services/app.service'
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  loginForm:any;
  constructor(private formBuilder: FormBuilder, private appService:AppService) {
   
    
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      message: ['', []]
    });
  }
  loginsubmit(){
    if(this.loginForm.valid){
      this.appService.createContact(this.loginForm.value).subscribe((response:any)=>{
        console.log(response)
      },error =>{
        console.log(error)
      })
    }
    
  }
}
