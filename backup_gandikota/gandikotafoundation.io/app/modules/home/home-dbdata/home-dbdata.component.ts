import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthardservicesService } from '../../../core/services/authardservices.service';
import {Router,ActivatedRoute} from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-home-dbdata',
  templateUrl: './home-dbdata.component.html',
  styleUrls: ['./home-dbdata.component.css']
})
export class HomeDbdataComponent implements OnInit {
  homecontentForm:FormGroup;
  id:any;
  success:any;
  constructor(private formBuilder: FormBuilder,private homeservice:AuthardservicesService,private router:Router,
    private route:ActivatedRoute,private toastr: ToastrManager) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.homecontentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      description: ['', [Validators.required]],
      button_label: ['', [Validators.required]],
      button_action: ['', [Validators.required]],
      image:['',[Validators.required]]
    });
    if(this.id) {
      this.homeservice.getSingleBanner(this.id).subscribe((response:any)=>{
      if(response.status){
     console.log(response)
     const banner = response.data;
     this.homecontentForm.patchValue({
      title:banner.title,
      tags:banner.tags,
      description:banner.description,
      button_label:banner.button_label,
      button_action:banner.button_action,
      image:banner.image
     })
      }
      })
    }
  }
  homecontentsubmit(){
    if(this.homecontentForm.valid && !this.id){
    this.homeservice.homebannerdata(this.homecontentForm.value).subscribe((response:any) =>{
      if(response.status){
        console.log(response);
        this.toastr.successToastr(response.message);
        this.router.navigate(['/dashboard/home']);
      }

    },error=>{
      console.log(error);
      this.toastr.errorToastr(error);
    })
  } else if(this.homecontentForm.valid && this.id) {
    this.homeservice.updateBanner(this.id,this.homecontentForm.value).subscribe((response:any)=>{
      if(response.status) {
        this.toastr.successToastr(response.message);
      this.router.navigate(['/dashboard/home']);
      }
    })
  }
  }

  fileSelected(file) {
    console.log(file)
    var reader = new FileReader();

    reader.onload = (e) => {
      console.log("e.target.result ==>",reader.result);
      this.homecontentForm.patchValue({
        image :reader.result
      })
      // this.imageBackground = reader.result;

    }
    reader.readAsDataURL(file[0]);
  }

}
