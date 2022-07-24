import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/core/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-abouts-edit',
  templateUrl: './abouts-edit.component.html',
  styleUrls: ['./abouts-edit.component.scss']
})
export class AboutsEditComponent implements OnInit {
title:any='Edit'
  constructor(private formBuilder: FormBuilder,
    private apiService: AppService, private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService) { }
    aboutForm !:FormGroup
    id:any
  ngOnInit(): void {
    this.aboutForm = this.formBuilder.group({
      experience:['',[Validators.required]],
      image:['',[Validators.required]],
      description:['',[Validators.required]],
      mission:['',[Validators.required]],
      vision:['',[Validators.required]],
      values:['',[Validators.required]]
    })

    this.getAboutInfo();
  }

  getAboutInfo() {
    this.spinner.show()
    this.apiService.getAboutInfo().subscribe((response:any)=>{
    this.spinner.hide()
      if(response.status) {
        const data = response.data[0];
        this.id = data._id
        this.aboutForm.patchValue({
          experience:data.experience,
          image:data.image,
          description:data.description,
          mission:data.mission,
          vision:data.vision,
          values:data.values
        })
      }
    },error=>{
      this.spinner.hide()
     })
  }

  navigateBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.aboutForm.valid) {
      this.apiService.updateAboutInfo(this.id,this.aboutForm.value).subscribe((response: any) => {
        this.navigateBack()
      }, error => {
        console.log(error);
      })
    }
  }
  onDrop(event: any) {
    var imagetype = ['image/png', 'image/jpg', 'image/jpeg']
    var file = event.dataTransfer.files[0]
    console.log(imagetype.includes(file.type))
    if (imagetype.includes(file.type)) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.aboutForm.patchValue({
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

  uploadImage(file: any) {
    if (file && file[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.aboutForm.patchValue({
          image: reader.result
        })
      }
      reader.readAsDataURL(file[0]);
    }
  }
}
