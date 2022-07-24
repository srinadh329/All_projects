import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../store.service';
import { DialogboxComponent } from '../../components/dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-arabia',
  templateUrl: './arabia.component.html',
  styleUrls: ['./arabia.component.scss']
})
export class ArabiaComponent implements OnInit {
  foreignCreative = false;
  arabiaForm: FormGroup;
  total: any; // total
  productvat:any;
  productcharges: any; // charges
  ticketamount: any; // ticket amount
  arabia = ['S.No', 'Application No', 'Applicant Name', 'Created User', 'Date', 'Status', 'Action'];
  arabiadata: any = [];
  product: any;
  viewdata: any = [];
  appno: any;
  update = false;
  userrole: any;
  action = false;
  branchid: any;
  searchdata:any=[];
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private toaster: ToastrManager,
              public appservice: AppService, public storeservice: StoreService) {
  }
  ngOnInit() {
    this.product = 'AA';
    this.branchid = this.appservice.getbranch();
    const obj = { product: this.product, branchid: this.branchid };
    this.storeservice.productbasedcharges(obj).subscribe(data => {
            this.productcharges = data;
    });
    this.userrole = this.appservice.getrole();
    if (this.userrole !== 'SUPERVISOR') {
      this.action = false;
      this.getapplications();
    } else {
      this.action = true;
      this.getapplications();
    }

    this.getformvalues();
  }

  getformvalues() {
    this.arabiaForm = this.formBuilder.group({
      applicantname: ['', Validators.required],
      applicantmobno: ['', Validators.required],
      applicationdetail: ['', Validators.required],
      ticketamount: [''],
      productvat: this.productcharges * 0.05,
      productcharges: this.productcharges,
      total: ['']
    });
  }

  // created applications data getting in table
  getapplications() {
    const obj = { product: this.product, branchid: this.branchid };
    this.storeservice.getallapplications(obj).subscribe(data => {
      this.arabiadata = data;
      this.searchdata=data;
    });
  }

  // getpendingapplications() {
  //   const obj = { product: this.product, branchid: this.branchid };
  //   this.storeservice.getpendingapps(obj).subscribe(data => {
  //     this.arabiadata = data;
  //     this.searchdata=data;
  //   });
  // }

  get calculations() {
    // this.ticketamount = 0;
    this.total = Number(this.arabiaForm.get('ticketamount').value) + Number(this.arabiaForm.get('productcharges').value)
      + Number(this.arabiaForm.get('productvat').value);
    return { total: this.total, ticketamount: Number(this.ticketamount) };
  }

  onAirArabiaSubmit(airarabiaForm) { // airarabia application create
    if (airarabiaForm.valid) {
      this.update = false;
      airarabiaForm.value.branchid = this.branchid;
      airarabiaForm.value.productid = this.product;
      airarabiaForm.value.ticketamount = Number(airarabiaForm.value.ticketamount);
      this.storeservice.misapplicationcreate(airarabiaForm.value).subscribe((data: any) => {
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
        this.toaster.errorToastr(error.err, '', { position: 'bottom-center',maxShown:1})
      })
    }
  }

  back() {
    this.appno = '';
    this.foreignCreative = false;
    this.ngOnInit();
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
    this.getformvalues();
  }

  editForm(event) {
    this.createForm();
    this.storeservice.viewApplication(event.appno).subscribe(data => {
      this.viewdata = data;
      console.log(this.viewdata.status)
      if(this.userrole === 'SUPERVISOR') {
        if(this.viewdata.status == 'C') { this.action=true} else { this.action=false}
      }
      this.update = true;
      this.appno = event.appno;
      this.arabiaForm.patchValue({
        applicantname: this.viewdata.appname,
        applicantmobno: this.viewdata.appmobno,
        applicationdetail: this.viewdata.appdtl2,
        ticketamount: Math.round(this.viewdata.amount),
        productcharges: this.viewdata.charges,
        productvat: this.viewdata.vat,
        total: this.viewdata.total
      });
    });
  }

  updateForm(type: any) {
    this.arabiaForm.value.authstatus = type;
    this.arabiaForm.value.applicationno = Number(this.appno);
    this.arabiaForm.value.productid = this.product;
    this.storeservice.updateApplication(this.arabiaForm.value).subscribe((data: any) => {
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
      this.toaster.errorToastr(error.err, '', { position: 'bottom-center',maxShown:1 });
    });
  }

  search(event: string) {
    // this.storeservice.text = event;
    this.arabiadata=this.searchdata.filter(element=>{
      if(element.appno.includes(event) ||
      element.appname.toLowerCase().includes(event.toLowerCase()) || element.crtdat.includes(event) ||
      element.crtusr.includes(event) || element.status.toLowerCase().includes(event.toLowerCase()))
      { return element}
    })
  }

  reset(formDirective) {
    formDirective.resetForm({productvat: (this.productcharges)* 0.05, productcharges: this.productcharges,
      total: this.productcharges + Number(this.productcharges) * 0.05
    });
  }
}
