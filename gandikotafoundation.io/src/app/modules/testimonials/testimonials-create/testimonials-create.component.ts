import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/core/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-testimonials-create',
  templateUrl: './testimonials-create.component.html',
  styleUrls: ['./testimonials-create.component.scss']
})
export class TestimonialsCreateComponent implements OnInit {
  title: any = 'Create'


  constructor(private formBuilder: FormBuilder,
    private apiService: AppService, private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private location: Location) { }
  Testimonial: any;
  id: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.Testimonial = this.formBuilder.group({
      name: ['', [Validators.required]],
      review: ['', [Validators.required]],
      image: ['', [Validators.required]],
      status: [true, [Validators.required]]
    });
    if (this.id) {
      this.spinner.show();
      this.apiService.getTestimonialById(this.id).subscribe((response: any) => {
        this.spinner.hide();
        if (response.data) {
          let testimonial = response.data
          this.Testimonial.patchValue({
            name: testimonial.name,
            review: testimonial.review,
            image: testimonial.image
          })
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      })
    }
  }
  onSubmit() {
    console.log(this.Testimonial)
    if (this.Testimonial.valid && !this.id) {
      this.spinner.show();
      this.apiService.createTestimonial(this.Testimonial.value).subscribe((response: any) => {
        this.navigateBack()
      }, error => {
        this.spinner.hide();
      })
    } else if (this.Testimonial.valid && this.id) {
      this.spinner.show();
      this.apiService.updateTestimonial(this.id, this.Testimonial.value).subscribe((response: any) => {
        this.navigateBack()
      }, error => {
        this.spinner.hide();
        console.log(error);
      })
    }
  }

  navigateBack() {
    this.spinner.hide();
    this.location.back();
  }
  onDrop(event: any) {
    var imagetype = ['image/png', 'image/jpg', 'image/jpeg']
    var file = event.dataTransfer.files[0]
    console.log(imagetype.includes(file.type))
    if (imagetype.includes(file.type)) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.Testimonial.patchValue({
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
        this.Testimonial.patchValue({
          image: reader.result
        })
      }
      reader.readAsDataURL(file[0]);
    }
  }

}
