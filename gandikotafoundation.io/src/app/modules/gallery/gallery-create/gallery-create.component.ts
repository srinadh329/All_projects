import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/core/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-gallery-create',
  templateUrl: './gallery-create.component.html',
  styleUrls: ['./gallery-create.component.scss']
})
export class GalleryCreateComponent implements OnInit {
  title: any = 'Create'

  constructor(private formBuilder: FormBuilder,
    private apiService: AppService, private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private location: Location) { }
  galleryForm: any;
  id: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.galleryForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date_at: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
    if (this.id) {
      this.spinner.show();
      this.title = 'Update'
      this.apiService.getGalleryById(this.id).subscribe((response: any) => {
        this.spinner.hide()
        if (response.status) {
          let gallery = response.data
          this.galleryForm.patchValue({
            title: gallery.title,
            location: gallery.location,
            description: gallery.description,
            date_at: gallery.date_at,
            image: gallery.image
          })
        }

      }, error => {
        this.spinner.hide()
        console.log(error);
      })
    }
  }
  onSubmit() {
    if (this.galleryForm.valid && !this.id) {
      this.spinner.show()
      this.apiService.createGallery(this.galleryForm.value).subscribe((response: any) => {
        this.spinner.hide()
        this.navigateBack()
      }, error => {
        this.spinner.hide()
        console.log(error);
      })
    } else if (this.galleryForm.valid && this.id) {
      this.spinner.show()
      this.apiService.updateGallery(this.id, this.galleryForm.value).subscribe((response: any) => {
        this.spinner.hide()
        this.navigateBack()
      }, error => {
        this.spinner.hide()
        console.log(error);
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
        this.galleryForm.patchValue({
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
        this.galleryForm.patchValue({
          image: reader.result
        })
      }
      reader.readAsDataURL(file[0]);
    }
  }
}
