import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RewardmgtService } from 'src/app/services/rewardmgt.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-load-cash',
  templateUrl: './load-cash.component.html',
  styleUrls: ['./load-cash.component.css']
})
export class LoadCashComponent implements OnInit {
  
  @Input() showRewards: boolean;
  propertyId:any;
  payType :any = 'Credit'
  paymentModeCredit:any = 'Credit';
  paymentModeBank:any = 'Bank';
  amountBlock = true;
  amount = new FormControl('', Validators.required);
  token:any;
  buildingAmountDetails:any;

  constructor(private router:Router , private spinner:NgxSpinnerService,
    private rewardService:RewardmgtService , private storage:StorageService , private renderer :Renderer2) { }

  ngOnInit(): void {
    this.amount.valueChanges.subscribe((data) => {
      if (data) {
        this.checkValidity(data);
      }
      if(data == 0) {
        this.checkValidity(data);
      }
    })

    this.propertyId = this.storage.getPropertyId();
    this.rewardService.buildingAmount.subscribe((data) => {
      if (data) {
           this.buildingAmountDetails = data;
      }
    })
  }

  promoList() {
   this.router.navigate(['/rewards']);
  }

  checkValidity(value: any) {
    if (value <= 0) {
      this.amount.setErrors({ 'positiveNumber': true })
    }
    else {
      this.amount.setErrors(null)
    }
  }

  submitAmount() {
    this.amount.markAllAsTouched();
    if (this.amount.valid) {
      this.amountBlock = !this.amountBlock;
    }
  }

  payNow() {
    if (this.payType == 'Credit') {
      this.stripePayment();
    }
    else {
       this.bankPayment();
    }
  }

  stripePayment() {
    const self = this;
    const handler = (window as any).StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'USD',
      token(response: any) {
        self.spinner.show();
        self.token = response.id;
        self.completePayment();
      }, 
      closed: function() {
        self.renderer.removeStyle(document.body,'overflow');
      }
    });

    const amountInCents = Math.floor(self.amount.value * 100);
    handler.open({
      name: 'Inhabitr',
      currency: 'USD',
      amount: amountInCents
    });
  }

  setMode(event: any) {
    this.payType = <HTMLInputElement>(event.target).value
  }

  completePayment() {
    const obj = { id: this.propertyId, amount: this.amount.value, token: this.token ,paymentType: this.payType == 'Credit'?'CARD':'BANK'}
    this.rewardService.loadAmount(obj).subscribe((data: any) => {
      
      if(data) {
        this.rewardService.getBuildingAmount(this.propertyId);
        this.spinner.hide();
        this.amount.reset();
        this.renderer.removeStyle(document.body,'overflow');
        // this.router.navigate(['/create-reward']);
      }
    },err => {
      this.spinner.hide();
    })
  }


  bankPayment() {
    const self = this;
    const handler = (window as any).Plaid.create({
      env: 'sandbox',
      clientName: 'Inhabitr',
      key: '74ca8ca3dead06d399c082d47e9a1d',
      product: ['auth'],
      selectAccount: true,
      onLoad() { },
      onSuccess(publicToken:any, metadata:any) {
        self.spinner.show();
        self.token = publicToken;
        self.completePayment();
      },
      onExit(err:any, metadata:any) {
        self.spinner.hide();
        self.renderer.removeStyle(document.body,'overflow');
        if (err != null) {
        }
        
      },
      onEvent(eventName:any, metadata:any) {
        self.spinner.hide();
        self.renderer.removeStyle(document.body,'overflow');
      }
    });
    handler.open();
  }
}
