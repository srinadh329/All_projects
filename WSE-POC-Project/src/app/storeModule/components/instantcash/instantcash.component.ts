import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { StoreService } from '../../store.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-instantcash',
  templateUrl: './instantcash.component.html',
  styleUrls: ['./instantcash.component.scss']
})
export class InstantcashComponent implements OnInit {
  instantcashForm: any; // form builder name
  numberdetails: any = []; // Based on account no getting bankname 
  goldcarddetails: any = []; // Getting goldcard details
  totalamount: any // total amount
  charges: any; // charges
  vat: any; // vat
  rate: any; // currency rate
  amount: any; // fc amount
  lcamount: any; // lcamount
  products: any; // Getting product wise details
  bankname = false; // Boolean variable for displaying bankname field
  banknames: any = []; // array for banknames getting
  username: any; // variable for getting login user details
  today: any = new Date().toISOString() // today date
  currencyrates:any =[];
  constructor(private formBuilder: FormBuilder, private toaster: ToastrManager, public appservice: AppService,
    public storeservice: StoreService, public router: Router) { }

  ngOnInit() {
    this.getBanknames(); // Getting Banknames

    this.username = this.appservice.getUserdetails(); // Getting  login user details
    this.products = JSON.parse(localStorage.getItem('products')); // getting product details 

     // Getting Currency rates
     const obj = { createduser: this.username.loginid, branchid: Number(this.username.brnid), prodid: 'IC' };
     this.storeservice.getCurrencyRates(obj).subscribe((data: any) => {
       this.currencyrates = data;
       this.getcharges();
     }, (error: any) => {
       this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
     });

    // Instantcash form Formbuilder
    this.instantcashForm = this.formBuilder.group({
      gcnumber: ['', Validators.required],
      applicantname: [''],
      applicantmobileno: [''],
      applicationaddress: [''],
      applicantcountry: [''],
      benefname: ['', Validators.required],
      benfmobileno: ['', Validators.required],
      benfaddress: ['', Validators.required],
      currencyid: [this.products.cntcurrency, Validators.required],
      rate: [this.products.currencyrate, Validators.required],
      bankname: ['', Validators.required],
      accountno: ['', Validators.required],
      amount: [this.products.fcamount],
      lcamount: [this.products.lcamount],
      vat: [''],
      charges: [''],
      totalamount: ['']
    });
  }


  currencycharges=false
  getcharges() {
    this.currencycharges=false
    // this.lcamount = this.products.lcamount;
    if(this.products && !this.products.lcamount){
      this.lcamount = this.products.fcamount *this.products.currencyrate;
    }else{
      this.lcamount = this.products.lcamount;
    }
    let sortedArray: string[] = this.currencyrates.sort((n1, n2) => {
      if (Number(n1.transactionlimit ) < Number(n2.transactionlimit)) {
        return 1;
      }
      if (Number(n1.transactionlimit) > Number(n2.transactionlimit)) {
        return -1;
      }
      return 0;
    });
    this.currencyrates.forEach(element => {
      if (Number(element.transactionlimit)  >= this.lcamount && element.currencyid === this.products.cntcurrency && 
      element.transactionlimit != null) {
        this.currencycharges=true
        this.instantcashForm.patchValue({
          charges: element.chargeamount,
          vat: Number(element.chargeamount) * 0.05
        });
      }
   
    });
    if(this.currencycharges==false) {
        this.instantcashForm.patchValue({
          charges:0,
          vat: 0
        });
      } 
  }

  // Getting Goldcard Details
  goldcardDetails(goldcardnumber) { // Getting Goldcard Details
    if (goldcardnumber.length === 16) {
      this.storeservice.goldcardDetailsGetting(goldcardnumber).subscribe((data: any) => {
        this.goldcarddetails = data;
        if (this.goldcarddetails && this.goldcarddetails.gcmgcexpd <= this.today) {
          this.toaster.errorToastr('Goldcard is Expired', '', { position: 'bottom-center', maxShown:1 });
        } else {
          if (this.goldcarddetails && this.goldcarddetails.gcmgcstat != 'A') {
            this.toaster.errorToastr('Goldcard is Inactive', '', { position: 'bottom-center', maxShown:1});
          } else {
            if (this.goldcarddetails == null) {
              this.toaster.errorToastr('Invalid Goldcard', '', { position: 'bottom-center', maxShown:1 });
            } else {
              this.instantcashForm.patchValue({
                applicantname: this.goldcarddetails.gcmcname,
                applicantmobileno: this.goldcarddetails.gcmphnum,
                applicationaddress: this.goldcarddetails.gcmcaddr,
                applicantcountry: this.goldcarddetails.gcmcucnty
              });
            }
          }
        }
      })
    }
  }
  back() {
    this.router.navigate(['/store/remittance']);
  }

  // Getting Banknames 
  getBanknames() {
    this.storeservice.getBanknames().subscribe(data => {
      this.banknames = data;
      this.bankname = false;
    });
  }

  // Getting Bank Details while entering account number
  accountNumber(number) {
    if (number.length === 20) {
      this.storeservice.accountNumberCheck(number).subscribe(data => {
        this.numberdetails = data;
        if(this.numberdetails == null){
          this.toaster.errorToastr('Invalid Account Number','', { position: 'bottom-center',maxShown:1});
        } else {
        this.bankname = true;
        this.instantcashForm.patchValue({
          bankname: this.numberdetails.bnknam
        });
      }
      });
    }
  }

  //  calculations for total amount,charges,vat,rate
  get calculations() {
    this.vat = Number(this.instantcashForm.get('charges').value) * 0.05;
    if (this.products.cntcurrency !== 'AED') {
      this.lcamount = Number(this.instantcashForm.get('amount').value) * Number(this.instantcashForm.get('rate').value);
      this.totalamount = Number(this.lcamount) +
        Number(this.instantcashForm.get('charges').value) + Number(this.vat);
        this.instantcashForm.patchValue({
          totalamount: this.totalamount
        })
    } else {
      this.totalamount = Number(this.instantcashForm.get('lcamount').value) + Number(this.instantcashForm.get('charges').value) + Number(this.vat);
      this.instantcashForm.patchValue({
        totalamount: this.totalamount
      })
    }
    return {
      totalamount: this.totalamount, lcamount: Number(this.lcamount), vat: Number(this.vat),
      amount: this.instantcashForm.get('amount').value
    };
  }
  
  // Instant cash form creation
  icformSubmit(instantForm) {
    console.log(instantForm.value)
    if (instantForm.valid) {
      this.getcharges();
      instantForm.value.status = 'C';
      instantForm.value.createddate = moment(instantForm.value.createddate).format('DD-MM-YYYY');
      instantForm.value.createdtime = moment(instantForm.value.createdtime).format('hh:mm:ss');
      instantForm.value.createduser = this.username.loginid;
      instantForm.value.branchid = Number(this.username.brnid);
      instantForm.value.productid = this.products.productid;
      instantForm.value.productgrp = this.products.productgroup;
      if (this.products.cntcurrency !== 'AED') {instantForm.value.amount = Number(this.products.fcamount)}
      if (this.products.cntcurrency === 'AED') {instantForm.value.amount = Number(this.products.lcamount)}
      instantForm.value.rate = Number(this.products.currencyrate);
      instantForm.value.applicantcountry = Number(instantForm.value.applicantcountry);
      delete instantForm.value.lcamount;
      this.storeservice.icapplicationCreate(instantForm.value).subscribe((data: any) => {
        if (data.res) {
          this.toaster.successToastr(data.res, '', { position: 'bottom-center', maxShown: 1 });
        }
      }, (error: any) => {
        this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
      })
      this.router.navigate(['/store/remittance']);
    }
  }

  // Reset Instantcash Form
  reset(formDirective: FormGroupDirective) {
  if (this.products.cntcurrency !== 'AED') {
    var LcAmount= Number(this.instantcashForm.get('amount').value) * Number(this.instantcashForm.get('rate').value)
  }else{
    var LcAmount= Number(this.instantcashForm.get('lcamount').value); 
  }
  formDirective.resetForm({
    // charges:this.products.chargeamount, vat:(this.products.chargeamount)*0.05,
    currencyid: this.products.cntcurrency, rate: this.products.currencyrate,amount: this.products.fcamount,
    lcamount:LcAmount
  });
this.getcharges();
}
}
