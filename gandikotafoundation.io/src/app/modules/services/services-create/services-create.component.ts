import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/core/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.scss']
})
export class ServicesCreateComponent implements OnInit {

  title: any = 'Create'

  constructor(private formBuilder: FormBuilder,
    private apiService: AppService, private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location) { }
  serviceForm: any;
  id: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.serviceForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      is_popular: [false, [Validators.required]],
      image: ['', [Validators.required]]
    });
    if (this.id) {
      this.apiService.getServiceById(this.id).subscribe((response:any) => {
        if(response.status){  
          console.log(response);
          const banner = response.data;
          this.serviceForm.patchValue({
            title:banner.title,
            location:banner.location,
            description:banner.description,
            eventDate:banner.eventDate,
            is_popular:banner.is_popular,
            image:banner.image
          })
        }
      }, error => {
        console.log(error);
      })
    }
  }
  onSubmit() {
    console.log(this.serviceForm)
    this.spinner.show()
    if (this.serviceForm.valid && !this.id) {
      this.apiService.createService(this.serviceForm.value).subscribe((response: any) => {
        this.spinner.hide()
        this.navigateBack()
      }, error => {
       this.spinner.hide()
        console.log(error);
      })
    }
    else if (this.serviceForm.valid && this.id){
      this.apiService.updateService(this.id,this.serviceForm.value).subscribe((response:any)=>{
        if(response.status){
          this.router.navigate(['/admin/services'])
        }
      })
    }
  }

  navigateBack() {
    this.location.back();
  }
  onDrop(event: any) {
    var imagetype = ['image/png', 'image/jpg', 'image/jpeg']
    var file = event.dataTransfer.files[0]
    console.log(imagetype.includes(file.type))
    if (imagetype.includes(file.type)) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.serviceForm.patchValue({
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
        this.serviceForm.patchValue({
          image: reader.result
        })
      }
      reader.readAsDataURL(file[0]);
    }
  }
}
