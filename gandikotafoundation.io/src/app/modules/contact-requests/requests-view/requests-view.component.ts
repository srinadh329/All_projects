import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/core/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-requests-view',
  templateUrl: './requests-view.component.html',
  styleUrls: ['./requests-view.component.scss']
})
export class RequestsViewComponent implements OnInit {
  contactRequest: any;

  constructor(private formBuilder: FormBuilder,
    private apiService: AppService, private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private location: Location) { }
  id: any
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      this.navigateBack()
    }


    this.contactRequest = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    this.spinner.show()
    this.apiService.getContactRequestById(this.id).subscribe((response: any) => {
      this.spinner.hide()
      if (response.status) {
        let info = response.data;
        this.contactRequest.patchValue({
          name: info.name,
          email: info.email,
          phone: info.phone,
          message: info.message,
          status: info.status
        })
      }
    }, error => {
      this.spinner.hide()

    })

  }


  onSubmit() {
    if (this.contactRequest.valid) {
      let { status } = this.contactRequest.value;
      this.spinner.show();
      this.apiService.updateContactRequest(this.id, { status: status }).subscribe((response: any) => {
      this.spinner.hide()
        if (response.status) {
          
         this.navigateBack()
        }
      },error=>{
        this.spinner.hide()
      })
    }
  }



  navigateBack() {
    this.spinner.hide();
    this.location.back();
  }
}
