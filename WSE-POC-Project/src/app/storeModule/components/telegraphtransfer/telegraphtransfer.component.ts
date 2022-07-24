import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from '../../store.service';
import { AppService } from 'src/app/app.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-telegraphtransfer',
  templateUrl: './telegraphtransfer.component.html',
  styleUrls: ['./telegraphtransfer.component.scss']
})
export class TelegraphtransferComponent implements OnInit {
  today: any = new Date().toISOString() // today date
  telegraphForm: any; // telegraph form
  goldcarddetails: any = []; // getting goldcard details array
  vat: any; // vat
  charges: any; // charges
  totalamount: any; // totalamount
  lcamount: any; // lcamount
  fcamount: any; // fcamount
  numberdetails: any = []; // account number details getting array
  banknames: any = []; // getting banknames array
  bankname = false; // Boolean variable for bankname field
  username: any; // variable for user details
  products; // variable for getting product wise details
  currencyrates: any = [];
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public storeservice: StoreService,
    public appservice: AppService, private toaster: ToastrManager, public router: Router) { }

  ngOnInit() {
    this.getBanknames(); // Getting Banknames
    this.products = JSON.parse(localStorage.getItem('products')); // Getting product details
    this.username = this.appservice.getUserdetails(); // Getting login user details
    // Getting Currency rates
    const obj = { createduser: this.username.loginid, branchid: Number(this.username.brnid), prodid: 'TT' };
    this.storeservice.getCurrencyRates(obj).subscribe((data: any) => {
      this.currencyrates = data;
      this.getcharges();
    }, (error: any) => {
      this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
    });

    // Telegraph form Builder Group
    this.telegraphForm = this.formBuilder.group({
      goldcardnumber: ['', Validators.required],
      applicantname: [''],
      applicantmobno: [''],
      applicantadrress: [''],
      country: [''],
      accountno: ['', Validators.required],
      benfname: ['', Validators.required],
      benfmobileno: ['', Validators.required],
      benfaddr: ['', Validators.required],
      currencyid: [this.products.cntcurrency, Validators.required],
      rate: [this.products.currencyrate, Validators.required],
      bankname: ['', Validators.required],
      fcamount: [this.products.fcamount],
      lcamount: [this.products.lcamount],
      vat: [''],
      charges: ['', Validators.required],
      totalamount: ['']
    });

  }

  // Getting Bank name based on account no
  accountNumber(number) {
    if (number.length === 20) {
      this.storeservice.accountNumberCheck(number).subscribe(data => {
        this.numberdetails = data;
        if (this.numberdetails == null) {
          this.toaster.errorToastr('Invalid Account Number', '', { position: 'bottom-center', maxShown: 1 });
        } else {
          this.bankname = true;
          this.telegraphForm.patchValue({
            bankname: this.numberdetails.bnknam
          });
        }
      });
    }
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
        this.telegraphForm.patchValue({
          charges: element.chargeamount,
          vat: Number(element.chargeamount) * 0.05
        });
      }
   
    });
    if(this.currencycharges==false) {
        this.telegraphForm.patchValue({
          charges:0,
          vat: 0
        });
      } 
  }

  // Back button for Remittance page navigation
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

  // Calculations for vat,charges and totalamount
  get calculations() {
    this.vat = Number(this.telegraphForm.get('charges').value) * 0.05;
    if (this.products.cntcurrency !== 'AED') {
      this.lcamount = Number(this.telegraphForm.get('fcamount').value) * Number(this.telegraphForm.get('rate').value);
      this.totalamount = Number(this.lcamount) +
        Number(this.telegraphForm.get('charges').value) + Number(this.vat);
      this.telegraphForm.patchValue({
        totalamount: this.totalamount
      })

    } else {
      this.totalamount = Number(this.telegraphForm.get('lcamount').value) + Number(this.telegraphForm.get('charges').value) + Number(this.vat);
      this.telegraphForm.patchValue({
        totalamount: this.totalamount
      })
    }
    return {
      totalamount: this.totalamount, lcamount: Number(this.lcamount), vat: Number(this.vat),
      amount: this.telegraphForm.get('fcamount').value
    };

  }


  // Getting Goldcard Details
  goldcardDetails(goldcardnumber) { // Getting Goldcard Details
    if (goldcardnumber.length === 16) {
      this.storeservice.goldcardDetailsGetting(goldcardnumber).subscribe((data: any) => {
        this.goldcarddetails = data;
        if (this.goldcarddetails && this.goldcarddetails.gcmgcexpd <= this.today) {
          this.toaster.errorToastr('Goldcard is Expired', '', { position: 'bottom-center', maxShown: 1 });
        } else {
          if (this.goldcarddetails && this.goldcarddetails.gcmgcstat != 'A') {
            this.toaster.errorToastr('Goldcard is Inactive', '', { position: 'bottom-center', maxShown: 1 });
          } else {
            if (this.goldcarddetails == null) {
              this.toaster.errorToastr('Invalid Goldcard', '', { position: 'bottom-center', maxShown: 1 });
            } else {
              this.telegraphForm.patchValue({
                applicantname: this.goldcarddetails.gcmcname,
                applicantmobno: this.goldcarddetails.gcmphnum,
                applicantadrress: this.goldcarddetails.gcmcaddr,
                country: this.goldcarddetails.gcmcucnty
              });
            }
          }
        }
      })
    }
  }

  // Telegraph form submit
  telegraphSubmit(telegraphForm) {
    if (telegraphForm.valid) {
      this.getcharges();
      telegraphForm.value.createdstatus = 'C';
      telegraphForm.value.createddate = moment(this.telegraphForm.value.createddate).format('DD-MM-YYYY');
      telegraphForm.value.createdtime = moment(this.telegraphForm.value.createdtime).format('hh:mm:ss');
      telegraphForm.value.createduser = this.username.loginid;
      telegraphForm.value.branchid = Number(this.username.brnid);
      telegraphForm.value.productid = this.products.productid;
      telegraphForm.value.country = Number(telegraphForm.value.country);
      telegraphForm.value.rate = parseFloat(this.products.currencyrate);
      if (this.products.cntcurrency !== 'AED') { telegraphForm.value.fcamount = Number(this.products.fcamount); }
      if (this.products.cntcurrency === 'AED') { telegraphForm.value.fcamount = Number(this.products.lcamount) }
      telegraphForm.value.productgrp = this.products.productgroup;
      delete telegraphForm.value.lcamount;
      this.storeservice.ttapplicationCreate(telegraphForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, 'Created Successfully', { position: 'bottom-center', maxShown: 1 });
      }, (error: any) => {
        this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
      });
      this.router.navigate(['/store/remittance']);
    }
  }


  // Reset application
  reset(formDirective) {
    if (this.products.cntcurrency !== 'AED') {
      var LcAmount = Number(this.telegraphForm.get('fcamount').value) * Number(this.telegraphForm.get('rate').value)
    } else {
      var LcAmount = Number(this.telegraphForm.get('lcamount').value);
    }

    formDirective.resetForm({
      // charges: this.products.chargeamount, vat: (this.products.chargeamount) * 0.05,
      currencyid: this.products.cntcurrency, rate: this.products.currencyrate, fcamount: this.products.fcamount,
      lcamount: LcAmount
    });
    this.getcharges();
  }

}
