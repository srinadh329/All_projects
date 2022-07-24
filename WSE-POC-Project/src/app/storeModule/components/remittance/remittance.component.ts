import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { StoreService } from '../../store.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import * as moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-remittance',
  templateUrl: './remittance.component.html',
  styleUrls: ['./remittance.component.scss']
})
export class RemittanceComponent implements OnInit {
  // @Output() searchdata = new EventEmitter<string>();// search
  searchdata: any = [];
  remittanceheader = ['Application No', 'Product', 'Benificiary Name', 'Created User', 'Date', 'Status', 'Action']; // header details
  rejectedapplication = false; // boolean variable for 2nd level authorization
  viewdata: any = []; // viewdata array for ic,id and tt
  tabledata = true; // boolean variable for table data showing
  remittanceForm: any; // Remittance form group name
  countries: any = []; // Getting countries
  productsdata: any = []; // Getting product details based on country and currency selection
  remittancedata: any = []; // Get all created applications data in table view
  username: any; // Getting login user details
  showremittancedata = false; // boolean variable for remittance form
  totalamount: any; // totalamount
  lcamount: any; // lcamount
  amount: any; // fcamount
  charges: any; // charges
  vat: any; // vat
  remittanceviewForm: any; // Form group name for ic,id and tt view data
  action: any; // boolean variable for buttons
  check = false; // boolean variable for  getting prodcut details
  currencychange: any; // variable for country change elements
  userrole: any; // User roles getting
  currencyrates: any = [];
  constructor(private formBuilder: FormBuilder, public storeservice: StoreService, public router: Router,
    private appservice: AppService, private toaster: ToastrManager, public dialog: MatDialog) { }

  ngOnInit() {
    this.username = this.appservice.getUserdetails(); // Getting login user details
    this.getCountry(); // getting Countries
    this.userrole = this.appservice.getrole();
    if (this.userrole === 'CASHIER') {
      this.action = true;
      this.getallapplications(); // getting all created applications list in table view

    } else {
      this.action = false;
      this.getallapplications(); // getting all created applications list in table view
    }

    // remittance Form builder
    this.remittanceForm = this.formBuilder.group({
      countryid: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required],
    });

    // IC,ID,TT data view Form
    this.remittanceviewForm = this.formBuilder.group({
      gcnumber: ['', Validators.required],
      applicantname: ['', Validators.required],
      applicantmobileno: ['', Validators.required],
      applicationaddress: ['', Validators.required],
      applicantcountry: ['', Validators.required],
      benefname: ['', Validators.required],
      benfmobileno: ['', Validators.required],
      benfaddress: ['', Validators.required],
      currencyid: ['', Validators.required],
      rate: ['', Validators.required],
      bankname: ['', Validators.required],
      accountno: ['', Validators.required],
      amount: ['', Validators.required],
      lcamount: [''],
      vat: [''],
      charges: ['', Validators.required],
      totalamount: ['']
    });
  }

  // Based on product create application form
  createForm() {
    this.tabledata = false;
  }

  // Getting Countries
  getCountry() {
    this.storeservice.getCountries().subscribe((data: any) => {
      var countriesfilterarray = []
      data.forEach((element) => {
        if (element && countriesfilterarray.length == 0) {
          countriesfilterarray.push(element)
        }else if (element && countriesfilterarray.length > 0) {
          var checking = countriesfilterarray.filter((value) => {
            if (value.cntnam == element.cntnam)
              return value
          })
          if (checking.length == 0) {
            countriesfilterarray.push(element)
          }
        }
      });
      this.countries = countriesfilterarray;
    });
  }
  // Getting Currencies Based on Country selection
  countrychange(event) {
    this.countries.forEach(element => {
      if (element.cntid === event.value) {
        this.remittanceForm.patchValue({
          currency: element.cntccy,
        });
        this.currencychange = element;
        this.check = true;
      }
    });
    if (this.check === true) {
      const obj = {
        countryid: Number(this.currencychange.cntid),
        currency: this.currencychange.cntccy,
        branchid: Number(this.username.brnid)
      };
      this.storeservice.getProducts(obj).subscribe((data: any) => {
        this.productsdata = data;
        console.log(this.productsdata)
      }, (error: any) => {
        this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
      });
    }
  }

  // Get all created applications for Ic,ID,TT
  getallapplications() {
    const obj = { productgroup: this.productsdata.productgroup, branchid: this.username.brnid };
    this.storeservice.getremittanceapplications(obj).subscribe(data => {
      this.remittancedata = data;
      this.searchdata = data;
    });
  }

  // search
  search(event) {
    // this.storeservice.text = event;
    this.remittancedata = this.searchdata.filter(element => {
      if (element.appno.includes(event) || element.prdid.includes(event) ||
        element.bnfname.toLowerCase().includes(event.toLowerCase()) || element.crtdat.includes(event) ||
        element.crtusr.includes(event) || element.status.toLowerCase().includes(event.toLowerCase())) { return element; }
    });
  }



  // Remittance form submit
  remittanceformSubmit(formdata) {
    if (formdata.valid) {
      if (this.productsdata === null) {
        const dialogRef = this.dialog.open(DialogboxComponent, {
          width: '400px',
          height: '250px',
          data: { title: 'Success', dialogType: 'blocked' }
        });
      }
      const copy = { ...this.productsdata };
      if (copy.cntcurrency === 'AED') {
        copy.lcamount = Number(formdata.value.amount);
      } else { copy.fcamount = Number(formdata.value.amount); }
      formdata.value.productgrp = copy.productgroup;
      if (this.productsdata) {
        if (Number(formdata.value.amount) > Number(this.productsdata.countrylimit)) {
          this.toaster.errorToastr('Transaction amount exceeds country limit', '', { position: 'bottom-center', maxShown: 1 });
        } else if (Number(formdata.value.amount) < Number(this.productsdata.countrylimit)) {
          localStorage.setItem('products', JSON.stringify(copy));
          if (this.productsdata.productid === 'IC') {
            this.router.navigate(['/store/instantcash']);
          } else if (this.productsdata.productid === 'ID') {
            this.router.navigate(['/store/instantdraft']);
          } else if (this.productsdata.productid === 'TT') {
            this.router.navigate(['/store/telegraphtransfer']);
          } else if (this.productsdata.productid !== 'IC' || 'ID' || 'TT') {
            this.toaster.errorToastr('This product doesnt belong to this application Please contact admin',
              this.productsdata.productid, { position: 'bottom-center', maxShown: 1 });
          }
        }
      }
    }
  }

  // Calculations for charges,vat,totalamount
  get calculations() {

    this.lcamount = Number(this.remittanceviewForm.get('amount').value) * parseFloat(this.remittanceviewForm.get('rate').value);

    this.totalamount = Number(this.lcamount) +
      Number(this.remittanceviewForm.get('charges').value) + Number(this.remittanceviewForm.get('vat').value);

    return {
      totalamount: this.totalamount, lcamount: Number(this.lcamount),
      amount: this.remittanceviewForm.get('amount').value
    };
  }

  back() {
    this.showremittancedata = false;
    this.rejectedapplication = false;
    if (this.userrole === 'CASHIER') { this.action = true; }
    if (this.userrole === 'SUPERVISOR') { this.action = false }
  }

  // View data for IC,ID,TT
  editForm(event) {
    this.showremittancedata = true;
    this.storeservice.viewRemittanceApplication(event.appno).subscribe(data => {
      this.viewdata = data;
      console.log(this.viewdata)
      if (this.userrole === 'CASHIER') {
        this.action = true;
        if (this.viewdata.prdid !== 'TT') {
          if (this.viewdata.status === 'R') { this.rejectedapplication = true; this.action = false; } else { this.action = false; }
        }
        if (this.viewdata.prdid === 'TT') {
          if (this.viewdata.status === 'A' || this.viewdata.status === 'C' || this.viewdata.status === 'R') { this.rejectedapplication = false; this.action = false; }
        }
      }
      if (this.userrole === 'SUPERVISOR') {
        this.action = false;
        if (this.viewdata.status === 'C') { this.action = true; } else { this.action = false; }
      }
      this.remittanceviewForm = this.formBuilder.group({
        gcnumber: [this.viewdata.gcmnumber],
        applicantname: [this.viewdata.appname],
        applicantmobileno: [this.viewdata.appmobno],
        applicationaddress: [this.viewdata.appadr],
        applicantcountry: [this.viewdata.actr],
        benefname: [this.viewdata.bnfname],
        benfmobileno: [this.viewdata.bmobno],
        benfaddress: [this.viewdata.baddr],
        currencyid: [this.viewdata.curid],
        rate: [this.viewdata.rate],
        bankname: [this.viewdata.bnknm],
        accountno: [this.viewdata.accno],
        amount: [this.viewdata.fca],
        lcamount: [this.viewdata.amount],
        vat: [this.viewdata.vat],
        charges: [this.viewdata.charges],
        totalamount: [this.viewdata.totalamount]
      });
    });
  }


  // Authorize application for IC,ID,TT
  authorizeremittanceApplication(type) {
    // TT authorize
    if (this.viewdata.prdid === 'TT') {
      const obj = {
        authstatus: type,
        applicationnumber: Number(this.viewdata.appno),
        authuser: this.username.loginid,
        authdate: moment().format('DD-MM-YYYY'),
        authtime: moment().format('hh:mm:ss'),
        branchid: Number(this.username.brnid)
      };
      this.storeservice.authorizeTTApplication(obj).subscribe((data: any) => {
        this.ngOnInit();
        if (data.res && type === 'A') {
          this.storeservice.openSnackBar('Transaction Number :' + '' + data.res + '' + 'Authorized Successfully', 'X');
        }
        if (data.res && type === 'R') {
          this.storeservice.openSnackBar('' + data.res, 'X');
        }
      });
      this.showremittancedata = false;
    } else {
      const data = {
        updateddate: moment().format('DD-MM-YYYY'),
        updatedtime: moment().format('hh:mm:ss'),
        authstatus: type,
        applicationnumber: Number(this.viewdata.appno),
        authorizeduser: this.username.loginid,
        branchid: Number(this.username.brnid)
      };
      this.storeservice.authorizeICID(data).subscribe((data: any) => {
        this.ngOnInit();
        if (data.res && type === 'A') {
          this.storeservice.openSnackBar('Transaction Number :' + '' + data.res + '', 'X');
        }
        if (data.res && type === 'R') {
          this.storeservice.openSnackBar('' + data.res + '' + 'Rejected Successfully', 'X');
        }
      }, (error: any) => {
        this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
      });
      this.showremittancedata = false;
    }
  }

  // 2nd level authorization for rejected applications of IC,ID
  authorizeRejectedApplication(type) {
    const rejectdata = {
      updateddate: moment().format('DD-MM-YYYY'),
      updatedtime: moment().format('hh:mm:ss'),
      authstatus: type,
      applicationnumber: Number(this.viewdata.appno),
      authorizeduser: this.username.loginid,
      branchid: Number(this.username.brnid)
    };
    this.storeservice.rejectedApplication(rejectdata).subscribe((data: any) => {
      this.ngOnInit();
      if (data.res) {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center', maxShown: 1 });
        this.rejectedapplication = false;
      }
    }, (error: any) => {
      this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
    });
    this.showremittancedata = false;
  }
}
