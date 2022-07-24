import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/core/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss']
})
export class BusinessEditComponent implements OnInit {
  title: any = 'Edit'
  constructor(private formBuilder: FormBuilder,
    private apiService: AppService, private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private location: Location) {
    this.contactusForm = this.formBuilder.group({
      email: this.formBuilder.array([]),
      phone: this.formBuilder.array([]),
      address: this.formBuilder.group({ // make a nested group
        line_1: ['', Validators.required],
        line_2: ['', Validators.required],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', Validators.required],
        pincode: ['', Validators.required],
        location: ['', Validators.required]
      }),
    });
  }
  contactusForm !: FormGroup
  id: any
  ngOnInit(): void {


    this.getContactInfo();
  }


  //Add Feild Item start
  addItem(type: any, value: any): void {
    if (type == 'email') {
      (this.contactusForm.get(type) as FormArray).push(
        this.formBuilder.control(value, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
      );
    } else {
      (this.contactusForm.get(type) as FormArray).push(
        this.formBuilder.control(value, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)])
      );
    }

  }

  removeItem(index: any, type: any) {
    (this.contactusForm.get(type) as FormArray).removeAt(index);
  }

  getContactInfo() {
    this.spinner.show();
    this.apiService.getContactInfo().subscribe((response: any) => {
      this.spinner.hide();
      if (response.status) {
        const data = response.data[0];
        this.id = data._id;
        this.contactusForm.patchValue({
          address: data.address
        })
        data.phone.forEach((element: any) => {
          this.addItem('phone', element);

        });
        data.email.forEach((element: any) => {
          this.addItem('email', element);

        });
      }
    }, error => {
      this.spinner.hide();
    })
  }

  navigateBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.contactusForm)
    if (this.contactusForm.valid) {
      this.spinner.show()
      this.apiService.updateContactInfo(this.id,this.contactusForm.value).subscribe((response: any) => {
      this.spinner.hide()
        this.navigateBack()
      }, error => {
      this.spinner.hide()
        console.log(error);
      })
    }
  }


  getItemFormControls(type: any): any[] {
    return (<FormArray>this.contactusForm.get(type)).controls
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
