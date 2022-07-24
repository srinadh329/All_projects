import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SIGNUP } from 'src/app/models/interfaces';
import { RewardmgtService } from 'src/app/services/rewardmgt.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  email:any;
  buildingList: any;
  id:any;

  get signUpControls() {
    return this.signUpForm.controls
  }
  constructor(private _router: Router, private formBuilder: FormBuilder, private reward: RewardmgtService,private toastr: ToastrService
    ,private storage: StorageService , private spinner: NgxSpinnerService , private route:ActivatedRoute) { 
      this.route.params.subscribe(val => {
        if (val && val?.email && val?.id) { 
            this.email = val?.email;
            this.id = val?.id;
        }
      });
    }
  backToLogin() {
    this._router.navigateByUrl('/login');
  }
  ngOnInit(): void {
    this.initSignUpForm();
    this.getBuildingList();
  }

  getBuildingList() {
    this.reward.getBuldingList().subscribe((data: any) => {
      if (data) {
        this.buildingList = data['PropertyAddress'];
        if (this.email && this.id) {
          this.patchForm();
        }
      }
    })
  }

  patchForm() {
    if (this.buildingList && this.buildingList.length) {
      const obj = this.buildingList.find((item: any) => item.id == this.id);
      if (obj) {
        this.signUpForm.patchValue({ buildingName: obj.id });
        this.signUpForm.controls['buildingName'].disable();
      }
      if (this.email) {
        this.signUpForm.patchValue({ loginEmail: this.email, disabled: true })
        this.signUpForm.controls['loginEmail'].disable();
      }
    }
  }


  signUp() {
    if (this.signUpForm.valid) {
      let requestObj: SIGNUP = {} as any;
      requestObj = this.signUpForm.getRawValue();
      const propertyObj = this.buildingList.find((item: { id: any; }) => item.id == this.signUpForm.get('buildingName')?.value)
      if (propertyObj) {
        requestObj.address = propertyObj.address;
        requestObj.state = propertyObj.propertyStateName;
        requestObj.city = propertyObj.city;
        requestObj.country = propertyObj.country;
        requestObj.zipcode = propertyObj.postalCode;
        requestObj.propertyIdList = [(Number(this.signUpForm.get('buildingName')?.value))]
        delete requestObj?.buildingName
      }
      this.reward.signUp(requestObj).subscribe((data) => {
        this.spinner.show();
        if (!data.message) {
             this.storage.setUserDetails(data);
             this.spinner.hide();
             this.toastr.success('SignUp Successful')
             this._router.navigate(['/login'])
        }
        else {
          this.spinner.hide();
          this.toastr.error(data?.message)
        }
      })
    }

  }

  initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      buildingName: [{ value: null, disabled: false }, Validators.required],
      passWord: ['', [Validators.required, Validators.minLength(6)]],
      loginEmail: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
    })
  }

}
