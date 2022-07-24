import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../store.service';
import { DialogboxComponent } from '../../components/dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-dubaipolice',
  templateUrl: './dubaipolice.component.html',
  styleUrls: ['./dubaipolice.component.scss']
})
export class DubaipoliceComponent implements OnInit {
  searchdata:any=[];
  foreignCreative: any;
  dubailicenceForm: any;
  licenseForm:any;
  byplateForm: any;
  fineForm: any;
  finetable: any;
  dubai = ['S.No', 'Application No', 'Applicant Name', 'Date', 'Action'];
  dubaidata: any;
  fineHeader = ['S.No', 'Fine Number', 'Fine Date', 'Amount', 'Violation']
  fineData: any;
  finedetails: any;
  fineamount: number;
  branchid: any;
  product: any;
  view: boolean;
  userrole:any;
  action=false;
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,private appService: AppService,
     public storeservice: StoreService,private toaster: ToastrManager) { }

  ngOnInit() {
    this.product = 'DP';
    this.branchid = this.appService.getbranch();
    this.userrole = this.appService.getrole();
    if (this.userrole === 'CASHIER') {
      this.action = true;
    } else {
      this.action = false;
    }

    this.licenseForm = this.formBuilder.group({
      licensenumber: ['', Validators.required],
      licensesource: ['', Validators.required],
      finesource: [''],
    })

    this.byplateForm = this.formBuilder.group({
      platenumber: ['', Validators.required],
      platesource: ['', Validators.required],
      finesource: ['', Validators.required]
    })

    this.dubailicenceForm = this.formBuilder.group({
      trafficfilenumber: ['', Validators.required]
    });

    this.fineForm = this.formBuilder.group({
      nooffees: ['', Validators.required],
      fineamount: ['', Validators.required],
      knowledgefee: ['', Validators.required],
      total: ['', Validators.required],
      Penalty: ['', Validators.required],
      applicantmobile: ['', Validators.required],
      applicantname: ['', Validators.required],
      productvat: 0.50
    });
    this.getapplications();


  }
  fineFields(fineForm) {
    if (fineForm.valid) {
      fineForm.value.branchid = Number(this.branchid);
      fineForm.value.productid = this.product;
      fineForm.value.fineid = this.fineData[0].id
      fineForm.value.principalamount = Number(fineForm.value.fineamount) + Number(fineForm.value.Penalty);
      this.storeservice.dubaipolicepay(fineForm.value).subscribe((data: any) => {
        this.ngOnInit();
        if (data.res) {
          const dialogRef = this.dialog.open(DialogboxComponent, {
            width: '400px',
            height: '200px',
            data: { title: 'Success', res: data.res, dialogType: 'authorize' }
          });
          dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
            this.finedetails = false
            this.foreignCreative = false;
          });
        }
      }, (error: any) => {
        this.toaster.errorToastr(error.err, '', { position: 'bottom-center',maxShown:1 })
      })
    }
  }

  getapplications() {
    const obj = { product: this.product, branchid: this.branchid }
    this.storeservice.getallapplications(obj).subscribe(data => {
      this.dubaidata = data;
      this.searchdata = data;
    });
  }

  dubailicenceFields(dubailicenceForm,searchtype) {
    dubailicenceForm.value.searchtype=searchtype
if (dubailicenceForm.valid){
    this.storeservice.dubaipoliceDetails(dubailicenceForm.value).subscribe(data => {
      this.fineData = data
      if (this.fineData.length === 0) {
        this.finedetails = false
        this.foreignCreative = true;
        const dialogRef = this.dialog.open(DialogboxComponent, {
          width: '400px',
          height: '200px',
          data: { title: 'Info', res: 'data.res', dialogType: 'nofine' }
        });

      }
      else {
        this.finedetails = true
        this.foreignCreative = false;

        this.fineForm.patchValue({
          nooffees: 1,
          fineamount: this.fineData[0].fineamount,
          knowledgefee: this.fineData[0].knowledgefee,
          Penalty: this.fineData[0].penaltyfine,
          total: this.fineData[0].total,
        });

      }
    })

  }
  }

  back() {
    this.finedetails =false
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
    this.view = true;
  }
  editForm(event) {
    this.finedetails = true
    this.foreignCreative = false;

    this.storeservice.viewdpApplication(event.appno).subscribe(data => {
      this.fineData = data
      this.view = false;

      this.fineForm.patchValue({
        nooffees: 1,
        applicantname:this.fineData[0].appname,
        applicantmobile:this.fineData[0].appmobno,
        fineamount: this.fineData[0].fineamount,
        knowledgefee: this.fineData[0].knowledgefee,
        Penalty: this.fineData[0].penaltyfine,
        total: this.fineData[0].total,
      });
    });
  }

  search(event) {
    this.dubaidata=this.searchdata.filter(element=>{
      if(element.appno.includes(event) ||
      element.appname.toLowerCase().includes(event.toLowerCase()) || element.crtdat.includes(event))
      { return element}
    })
  }
}
