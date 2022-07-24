import { Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StoreService } from '../../store.service';
import { DialogboxComponent } from '../../components/dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-westernunion',
  templateUrl: './westernunion.component.html',
  styleUrls: ['./westernunion.component.scss']
})
export class WesternunionComponent implements OnInit {
  branchid: any;
  transmode: any;
  searchdata:any=[];
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public storeservice: StoreService,
              public appservice: AppService, private toaster: ToastrManager) { }

  userrole: any;
  foreignCreative: any;
  westerForm: any;
  western = ['S.No', 'Application No', 'Applicant Name', 'Created User', 'Date', 'MTCN No.', 'Action'];
  westerndata: any = [];
  wuformdata: any;
  vatcharges;
  commission: any;
  totalamount;
  product: any;
  view = false;
  principalamount: any;
  action=false;
  ngOnInit() {
    this.product = 'WU';
    this.branchid = this.appservice.getbranch();
    const obj = { product: this.product, branchid: this.branchid };
    this.storeservice.productbasedcharges(obj).subscribe(data => {
      this.commission = data;
    });
    this.userrole = this.appservice.getrole();
    this.getapplications();
    if(this.userrole === 'CASHIER') {
      this.action=true;
    } else  { this.action=false}
    this.wuformdata = null;
  }

  getformdata() {
    this.westerForm = this.formBuilder.group({
      mtcnnumber: ['', Validators.required],
      sendername: ['', Validators.required],
      receivername: ['', Validators.required],
      mode: ['', Validators.required],
      sendingcountry: ['', Validators.required],
      sendingcurrency: ['', Validators.required],
      principalamount: ['', Validators.required],
      vatcharges: this.commission * 0.05,
      sendermobile: ['', Validators.required],
      receivermobile: ['', Validators.required],
      transactiondate: ['', Validators.required],
      receivingcountry: ['', Validators.required],
      receivingcurrency: ['', Validators.required],
      commission: this.commission,
      totalamount: [''],
      productid: this.product,
      branchid: this.branchid
    });
  }



  // Getting all created applications
  getapplications() {
    const obj = { product: this.product, branchid: this.branchid };
    this.storeservice.getallapplications(obj).subscribe(data => {
      this.westerndata = data;
      this.searchdata=data;
    });
  }

  westerFields(westerForm) {
    if (westerForm.valid) {
      if(westerForm.value.sendermobile == westerForm.value.receivermobile) {
        westerForm.controls['receivermobile'].setErrors({'error':true})
      } else {
      westerForm.value.principalamount = Number(westerForm.value.principalamount);
      this.storeservice.authorizeWesternUnion(westerForm.value).subscribe((data: any) => {
        if (data.res) {
          const dialogRef = this.dialog.open(DialogboxComponent, {
            width: '400px',
            height: '200px',
            data: { title: 'Success', res: data.res, dialogType: 'authorize' }
          });
          dialogRef.afterClosed().subscribe(result => {
            this.getapplications();
            this.foreignCreative = false;
          });
        }
      }, (error: any) => {
        this.toaster.errorToastr(error.err, '', { position: 'bottom-center',maxShown:1 });
      });
    }
  }
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
    this.view = true;
    this.getformdata();
  }

  back() {
    this.foreignCreative = false;
    this.ngOnInit();
  }

  get calculations() {
    this.vatcharges= Number(this.westerForm.get('commission').value) * 0.05;
    this.totalamount = Number(this.westerForm.get('principalamount').value) + Number(this.westerForm.get('commission').value) +
      Number(this.westerForm.get('vatcharges').value);
    return { totalamount: Number(this.totalamount), principalamount: Number(this.principalamount) };
  }


  editForm(wudata) {
    this.createForm();
    this.storeservice.viewWesternApplication(wudata.appno).subscribe(data => {
      this.wuformdata = data;
      this.view = false;
      if (this.wuformdata.send_receive === 'S') {
        this.transmode = 'Send';
      } else { this.transmode = 'Receive'; }
      this.westerForm.patchValue({
        mtcnnumber: this.wuformdata.appdtl2,
        sendername: this.wuformdata.sender_name,
        receivername: this.wuformdata.receiver_name,
        mode: this.transmode,
        sendingcountry: this.wuformdata.sending_country,
        sendingcurrency: this.wuformdata.send_currency,
        principalamount: this.wuformdata.principal_ammount,
        vatcharges: this.wuformdata.vat,
        sendermobile: this.wuformdata.appmobno,
        receivermobile: this.wuformdata.bmobno,
        transactiondate: this.wuformdata.transactiondate,
        receivingcountry: this.wuformdata.receving_country,
        receivingcurrency: this.wuformdata.receive_currency,
        commission: this.wuformdata.charges,
        totalamount: this.wuformdata.total,
        productid: this.product,
        branchid: Number(this.branchid)
      });
    });
  }

  mtcnsearch(mtcnnumber) {
    if (mtcnnumber === '') {
      this.toaster.errorToastr('Enter  MTCN  Number', '', { position: 'bottom-center',maxShown:1 });
    } else {
      const obj = { mtcnnumber };
      this.westerForm.value.principalamount = Number(this.westerForm.value.principalamount);
      this.storeservice.getwudata(obj).subscribe((data: any) => {
        this.wuformdata = data;
        if (this.wuformdata == null) {
          this.toaster.errorToastr('Invalid  MTCN  Number', '', { position: 'bottom-center',maxShown:1 });
        } else {
          this.principalamount = data.principal_ammount;
          if (data.send_receive === 'S') {
            this.transmode = 'Send';
          } else { this.transmode = 'Receive'; }
          this.westerForm.patchValue({
            sendername: data.sender_name,
            receivername: data.receiver_name,
            mode: this.transmode,
            sendingcountry: data.sending_country,
            sendingcurrency: data.send_currency,
            principalamount: data.principal_ammount,
            // vatcharges: data.vat,
            sendermobile: data.sendermobile,
            receivermobile: data.receivermobile,
            transactiondate: data.transactiondate,
            receivingcountry: data.receving_country,
            receivingcurrency: data.receive_currency,
            productid: this.product,
            branchid: this.branchid
            // commission: data.commission,
            // totalamount: data.total
          });
        }
      });
    }
  }

  search(event) {
    // this.storeservice.text = event;
    this.westerndata=this.searchdata.filter(element=>{
      if(element.appno.includes(event) || element.appname.toLowerCase().includes(event.toLowerCase())||
      element.crtdat.includes(event) || element.crtusr.includes(event) || element.appdtl2.includes(event) ||
      element.status.toLowerCase().includes(event.toLowerCase()))
      { return element}
    })
  }

}
