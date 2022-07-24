import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common'
@Component({
  selector: 'app-admincreatehomebanner',
  templateUrl: './admincreatehomebanner.component.html',
  styleUrls: ['./admincreatehomebanner.component.scss']
})
export class AdmincreatehomebannerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private banner:AuthService,private router:Router,private route:ActivatedRoute, private location: Location) { }
  homecontentForm:any;
  id:any;
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams)
    this.homecontentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      description: ['', [Validators.required]],
      button_label: ['', [Validators.required]],
      button_action: ['', [Validators.required]],
      image:['',[Validators.required]]
    });
    if(this.id){
      this.banner.getSingleBanner(this.id).subscribe((response:any)=>{
        if(response.status){
          console.log(response);
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
      },error =>{
        console.log(error);
      })
    }
  }
  homecontentsubmit(){
    if(this.homecontentForm.valid && !this.id){
      this.banner.createbanner(this.homecontentForm.value).subscribe((response:any)=>{
        if(response.status){
          console.log(response);
          this.navigateBack()
          this.router.navigate(['/admin/home']);
        }
      },error =>{
        console.log(error);
      })
    }
    else if(this.homecontentForm.valid && this.id){
      this.banner.updatebanner(this.id,this.homecontentForm.value).subscribe((response:any)=>{
        if(response.status){
          this.router.navigate(['/admin/home']);
        }
      })
    }
  }
  navigateBack(){
    this.location.back();
  }
  onDrop(event: any) {
    var imagetype = ['image/png', 'image/jpg', 'image/jpeg']
    var file = event.dataTransfer.files[0]
    console.log(imagetype.includes(file.type))
    if (imagetype.includes(file.type)) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.homecontentForm.patchValue({
          image: reader.result
        })
      }
      reader.readAsDataURL(file);
    }

    event.preventDefault();
  }
  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
  openimage() {
    const element: any = document.getElementById('image');
    element.click()
  }
  fileSelected(file:any) {
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
