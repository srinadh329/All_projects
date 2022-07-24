import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StoreService } from '../../store.service';
import { DialogboxComponent } from '../../components/dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-branch',
  templateUrl: './nationalbond.component.html',
  styleUrls: ['./nationalbond.component.scss']
})
export class NationalBondComponent implements OnInit {
  foreignCreative: any; // boolean function for create and edit
  nationalForm: any; // form builder name
  productcharges: any; // charges
  total: any; // total
  ticketamount = 0; // amount
  productvat; // vat
  product: any; // product
  national = ['S.No', 'Application No', 'Applicant Name', 'Created User', 'Date', 'Status', 'Action'];
  nationaldata: any = [];
  editdata: any = [];
  update = false;
  appno: any;
  action: any;
  userrole: any;
  branchid: any;
  searchdata: any = [];
  constructor(private appService: AppService, private formBuilder: FormBuilder, public dialog: MatDialog, private toaster: ToastrManager,
              public storeservice: StoreService) { }

  ngOnInit() {
    this.product = 'NB';
    this.branchid = this.appService.getbranch();
    this.userrole = this.appService.getrole();
    const obj = { product: this.product, branchid: this.branchid };
    this.storeservice.productbasedcharges(obj).subscribe(data => {
    this.productcharges = data;
    });

    this.getform();
    if (this.userrole !== 'SUPERVISOR') {
      this.action = false;
      this.getapplications();
    } else {
      this.action = true;
      this.getapplications();
    }
  }
  getapplications() {
    const obj = { product: this.product, branchid: this.branchid };
    this.storeservice.getallapplications(obj).subscribe(data => {
      this.nationaldata = data;
      this.searchdata = data;
    });
  }

  // getpendingapplications() {
  //   const obj = { product: this.product, branchid: this.branchid };
  //   this.storeservice.getpendingapps(obj).subscribe(data => {
  //     this.nationaldata = data;
  //     this.searchdata = data;
  //   });
  // }

getform() {
  this.nationalForm = this.formBuilder.group({
    applicantname: ['', Validators.required],
    applicantmobno: ['', Validators.required],
    applicationdetail: [0, Validators.required],
    ticketamount: [0],
    productcharges: this.productcharges,
    productvat: this.productcharges * 0.05,
    total: ['']
  });
}

  get calculations() {
    this.total = 0;
    this.ticketamount = 0;
    this.ticketamount = Number(this.nationalForm.get('applicationdetail').value) * 10;
    this.nationalForm.get('ticketamount').setValue(Number(this.ticketamount));
    this.total = Number(this.nationalForm.get('ticketamount').value) + Number(this.nationalForm.get('productcharges').value)
      + Number(this.nationalForm.get('productvat').value);
    return {
      total: this.total, ticketamount: Number(this.ticketamount),
      applicationdetail: this.nationalForm.get('applicationdetail').value
    };
  }

  onNationalBondSubmit(nationalForm) {
    if (nationalForm.valid) {
      nationalForm.value.branchid = this.branchid;
      nationalForm.value.productid = this.product;
      nationalForm.value.ticketamount = Number(nationalForm.value.ticketamount);
      this.storeservice.misapplicationcreate(nationalForm.value).subscribe((data: any) => {
        if (data.res) {
          const dialogRef = this.dialog.open(DialogboxComponent, {
            width: '400px',
            height: '200px',
            data: { title: 'Success', res: data.res, dialogType: 'success' }
          });
          dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
            this.foreignCreative = false;
          });
        }
      }, (error: any) => {
        this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
      });
    }
  }
  back() {
    this.appno = '';
    this.foreignCreative = false;
    this.ngOnInit();
  }

  updateNbForm(type) {
    this.nationalForm.value.authstatus = type;
    this.nationalForm.value.applicationno = Number(this.appno);
    this.nationalForm.value.productid = this.product;
    this.storeservice.updateApplication(this.nationalForm.value).subscribe((data: any) => {
      if (data.res) {
        const dialogRef = this.dialog.open(DialogboxComponent, {
          width: '400px',
          height: '200px',
          data: { title: 'Success', res: data.res, dialogType: 'miscauthorize' }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
          this.foreignCreative = false;
        });
      }
    }, (error: any) => {
      this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
    });
  }

  createForm() {
    const obj = { product: this.product, branchid: this.branchid };
    this.storeservice.checkproductstatus(obj).subscribe(data => {
      if (data ) {
        this.foreignCreative = !this.foreignCreative;
      } else {
        const dialogRef = this.dialog.open(DialogboxComponent, {
          width: '400px',
          height: '250px',
          data: { title: 'Success', dialogType: 'blocked' }
        });
      }
    });
    this.update = false;
    this.getform();
  }

  editForm(event) {
    this.createForm();
    this.storeservice.viewApplication(event.appno).subscribe(data => {
      this.editdata = data;
      if(this.userrole === 'SUPERVISOR') {
        if(this.editdata.status == 'C') { this.action=true} else { this.action=false}
      }
      this.update = true;
      this.appno = event.appno;
      this.nationalForm.patchValue({
        applicantno: this.appno,
        applicantname: this.editdata.appname,
        applicantmobno: this.editdata.appmobno,
        applicationdetail: this.editdata.appdtl1,
        ticketamount: this.editdata.amount,
        productcharges: this.editdata.charges,
        productvat: this.editdata.vat,
        total: this.editdata.total
      });
    });
  }

  search(event: string) {
    // this.storeservice.text = event;
    this.nationaldata=this.searchdata.filter(element=>{
      if(element.appno.includes(event) ||
      element.appname.toLowerCase().includes(event.toLowerCase()) || element.crtdat.includes(event) ||
      element.crtusr.includes(event) || element.status.toLowerCase().includes(event.toLowerCase())) { return element; }
    });
  }

  reset(formDirective) {
    formDirective.resetForm({ticketamount: 0, applicationdetail: 0,
      productcharges: this.productcharges,
      productvat: this.productcharges * 0.05, total: this.productcharges + this.productcharges * 0.05});
  }
}
