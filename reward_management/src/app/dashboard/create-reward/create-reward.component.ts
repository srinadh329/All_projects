import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CREATE_REWARD } from 'src/app/models/interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { RewardmgtService } from '../../services/rewardmgt.service';
import { debounceTime } from 'rxjs/operators';

declare var $:any;

@Component({
  selector: 'app-create-reward',
  templateUrl: './create-reward.component.html',
  styleUrls: ['./create-reward.component.css']
})
export class CreateRewardComponent implements OnInit {
  rewardForm: FormGroup;
  isRewardGenerated: boolean = false;
  buildingDetails:any;
  propertyId :any;
  rewardPromoData:any;
  buildingAmount :any ;
  accountBalance:any;
  buildingAmountDetails : any;
  lastGivenReward : any;
  expDate = new Date();
  loadCash:any = false;
  generatedDate:any;
  minDate = {
    year: this.expDate.getFullYear(),
    month: this.expDate.getMonth() + 1,
    day: this.expDate.getDate(),
  };
  

  @ViewChild('createExistingReward', { static: false }) createExistingReward: ElementRef;

  constructor(private reward:RewardmgtService,private formBuilder: FormBuilder ,private router: Router,
    private storage:StorageService,private spinner:NgxSpinnerService,private toaster:ToastrService) {

     }
 
  ngOnInit(): void {

    this.initRewardForm();
    this.getBuildingName();
    this.rewardForm.get('rewardAmount')?.valueChanges.subscribe((data) => {
      if (data && data > 0 && data <= this.buildingAmount) {
        this.accountBalance = this.buildingAmount - data;
        this.rewardForm.get('rewardAmount')?.setErrors(null);
      }
      else if (data && data > 0 && data > this.buildingAmount) {
        this.rewardForm.get('rewardAmount')?.setErrors({ 'maxNumber': true })
        this.accountBalance = this.buildingAmount;
      }
      else {
        this.accountBalance = this.buildingAmount;
      }
    })

    this.reward.buildingAmount.subscribe((data:any) => {
      if (data) {
           this.buildingAmount = data?.balanceAmount;
           this.accountBalance = this.buildingAmount;
           this.loadCash  = false;
      }
      else {
        this.loadCash = true;
      }
    })
  }

  get formControl () {
    return this.rewardForm.controls
  }
  initRewardForm() {
    this.rewardForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      residentId: [''],
      mobileNo: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      buildingName: [{value:'',disabled:true}],
      rewardAmount: ['', [Validators.required , this.checkForPositiveNumber]],
      dateField:new FormGroup({
        startDate:new FormControl(null),
        endDate:new FormControl(null,Validators.required),
      }),
      email: ['', [Validators.required, Validators.email]],
    })
  }

  checkDateFields(formGroup: AbstractControl): { [key: string]: any } | null {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;
    if (startDate != null && endDate != null) {
      if (new Date(startDate.year, startDate.month, startDate.day) > new Date(endDate.year, endDate.month, endDate.day))
        return { 'incorrectData': true };
        else {
          return null;
        }
    }
    else {
      return null;
    }
  }


  getBuildingName() {
    const userData:any = JSON.parse(this.storage.getUserDetails());
    this.buildingDetails = userData.propertyDataList[0];
    this.propertyId = this.buildingDetails['id'];
    this.rewardForm.patchValue({buildingName:this.buildingDetails['name']})
    }

  getFormattedDate(date:any) {
    return date.year + '-' + date.month + '-' + date.day;
  }

  getExpiryDate(date :any) {
    return new Date(date.year,date.month-1,date.day).getTime();
  }
  
  generateReward() {
    // this.createExistingReward.nativeElement.click();
    if (this.rewardForm.valid) {
      let requestObj: CREATE_REWARD = {} as CREATE_REWARD;
      requestObj = this.rewardForm.value;
      requestObj['propertyId'] = this.propertyId;
      let objDate = {
        endDate:this.getFormattedDate(requestObj?.dateField?.endDate)}
      delete requestObj?.buildingName;
      delete requestObj?.dateField;
      delete requestObj?.mobileNo;
      this.spinner.show();
      this.reward.createReward(requestObj,objDate).subscribe((data) => {
        if (data && data.message != "propery doesn't has balance Amount to create reward, Please load now."
        && data && data.message.trim() != "please check user belongs to,can't give rewards to other property user.".trim()) {
          this.spinner.hide();
          this.rewardPromoData = data;
          this.getLastGeneratedReward(this.rewardPromoData?.rewardHistory);
          this.isRewardGenerated = true;
          this.reward.getBuildingAmount(this.storage.getPropertyId())
        }
        else if (data && data.message.trim() == "please check user belongs to,can't give rewards to other property user.".trim()) {
          this.isRewardGenerated = false;
          this.spinner.hide();
         // this.toaster.error('error');
          $('#deletedReward1').modal('show');
          this.rewardForm.reset()
        }
        else {
          this.toaster.error('Please Load Cash Before Creating Reward');
          this.isRewardGenerated = false;
          this.spinner.hide();
        }
      })
    }
    
  }

  getLastGeneratedReward(rewardHistory: any) {
    if (rewardHistory && rewardHistory.length > 0) {
      const latest = rewardHistory.reduce((a: any, b: any) => {
        return new Date(a.updatedDatetime) > new Date(b.updatedDatetime) ? a : b;
      })
      this.lastGivenReward = latest.rewardAmount ? latest.rewardAmount : 0;
      this.generatedDate = latest.updatedDatetime ? latest.updatedDatetime : ''
    }
  }

  finishRewardCreation() {
    this.router.navigate(['/rewards'])
  }

  onBack() {
    this.router.navigate(['/rewards'])
  }

  checkForPositiveNumber(control: AbstractControl): { [key: string]: any } | null {
    const reward = control.value;
    if (reward > 0) {
      return null;
    }
    else {
      return { 'positiveNumber': true }
    }
  }

  

}
