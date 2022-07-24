import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  myform:any;
  userdata = [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }
  datasubmit(){
    if(this.myform.valid){
      this.userdata.push(this.myform.value);
      this.myform.reset();
      // this.myform.reset(this.myform.value);
    } 
  
  }
 
}
