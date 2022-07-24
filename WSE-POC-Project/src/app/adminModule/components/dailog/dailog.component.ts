import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class DailogComponent implements OnInit {
  userid: any = '';
  name: any;
  branchForm: any;
  dailogTitle: any;
  eidtbranchForm: any;
  countryForm: any;
  countryProductForm: any;
  editcountryProductForm: any;
  goldForm: any;
  editcountryForm: any;
  editGoldForm: any;
  rateForm: any;
  chargesForm: any;
  updateChargesForm: any;
  rolesForm: any;
  editrolesForm: any;
  editrateForm: any;
  addCurrencyGroup: any;
  addProduct: any;
  editProduct: any;
  branchUserForm: any;
  changepasswordForm: any;
  changeBranchusersettingForm: any;
  CurrencylistForm: any;
  editCurrencylistForm: any;
  addproductForm: any;
  editproductForm: any;
  countrydata: any;
  editCurrencyGroupForm: any;
  groupId: any;
  branchdata: any;
  currencylist: any;
  userroleslist: any;
  productgroups: any;
  productList = [];
  currencyList = [];
  currencies: any = [];
  cntryPrd: any;
  activeRoles: any;
  list: any;
  date = new Date();
  editProductData: any;
  idtypes = [{ name: 'EMIRATES', value: 'EMIRATES' }, { name: 'PASSPORT', value: 'PASSPORT' }];
  cardtype = [{ name: 'EDD', value: 'EDD' }, { name: 'CDD', value: 'CDD' }, { name: 'LITE', value: 'LITE' }, { name: 'ID', value: 'ID' }];
  startDate: any;
  submitted: Boolean = false;
  hide: boolean = true;
  hide1: boolean = true;
  checking: any = {}
  listProduct: any;
  // radio:any;
  constructor(
    public dialogRef: MatDialogRef<DailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder,
    private adminService: AdminService, private toaster: ToastrManager, private route: ActivatedRoute) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Numbers only
   * @param event //
   * @returns To accept number only
   */
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57 || charCode === 46)) {
      console.log(event);
      return false;
    }
    return true;
  }

  ngOnInit() {
    // this.getCurrencyGroup();
    // this.getProuductsGroups();
    // this.radio = this.formBuilder.group({
    //   recstatus: ['A']
    // })
    if (this.data.dialogType === 'addbranch') {
      this.getcountryDrop();
      this.getProuductsGroups();
    } else if (this.data.dialogType === 'editbranch') {
      this.getcountryDrop();
      this.getProuductsGroups();
    }
    if (this.data.dialogType === 'addbranchusers') {
      this.adminService.getActiveRoles().subscribe((data: any) => {
        this.activeRoles = data;
      });
    } else if (this.data.dialogType === 'editbranchusers') {
      this.adminService.getUserrole().subscribe((data: any) => {
        this.userroleslist = data;
      });
    }
    if (this.data.dialogType === 'addcountryproduct') {
      this.getcountryDrop();
      this.getProuductsGroups();
    }
    if (this.data.dialogType === 'addgold') {
      this.getcountryDrop();
      this.getBrachDrop();
    }
    if (this.data.dialogType === 'addrates') {
      this.getCurrencyGroup();
    } else if (this.data.dialogType === 'editrates') {
      this.getCurrencyGroup();
    }
    if (this.data.dialogType === 'addcharges') {
      this.getCurrencyGroup();
      this.getProuductsGroups();
    } else if (this.data.dialogType === 'updatecharges') {
      this.getCurrencyGroup();
      this.getProuductsGroups();
      this.adminService.getproductList(this.data.formdata.prdgrp).subscribe((data: any) => {
        this.productList = data;
      });
    }
    if (this.data.dialogType === 'addproduct') {
      this.getCurrencyGroup();
      this.getProductListDrop();
    } else if (this.data.dialogType === 'editproduct') {
      this.getCurrencyGroup();
      this.getProductListDrop();
    }

    this.adminService.getCountryProduct().subscribe((data: any) => {
      this.cntryPrd = data;
    });


    // *******************branch popup form validation start***********************
    this.branchForm = this.formBuilder.group({
      branchname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.min(1)]],
      branchaddress: ['', Validators.required],
      countrycode: ['', Validators.required],
      branchlimit: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^[0-9]\d{0,12}(\.\d{0,3})?%?$/)]],
      productgroup: ['', Validators.required],
      recstatus: ['A', Validators.required],
    });
    // *******************branch popup form validation end***********************

    // *******************Edit branch popup form validation start***********************
    if (this.data.dialogType === 'editbranch') {
      this.eidtbranchForm = this.formBuilder.group({
        branchid: [this.data.editbrachlist.brnid, Validators.required],
        branchname: [this.data.editbrachlist.brnnam, Validators.required],
        branchaddress: [this.data.editbrachlist.braddr, Validators.required],
        countrycode: [this.data.editbrachlist.brncnt, Validators.required],
        branchlimit: [
          this.data.editbrachlist.brnlmt, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d{0,12}(\.\d{0,3})?%?$/)]
        ],
        productgroup: [this.data.editbrachlist.prdgrp, Validators.required],
        recstatus: [this.data.editbrachlist.status, Validators.required],
      });
    }
    // *******************Edit branch  popup form validation end***********************
    // *******************branch popup form validation start***********************
    this.branchUserForm = this.formBuilder.group({
      branchid: [''],
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.min(1)]],
      userid: ['', Validators.required],
      userpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      userrole: ['', Validators.required],
      recstatus: ['A', Validators.required]
    });
    if (this.data.dialogType === 'editbranchusers') {
      this.changepasswordForm = this.formBuilder.group({
        userrole: ['', Validators.required],
        recstatus: ['', Validators.required],
      });
    }
    // *******************branch popup form validation end***********************
    // *******************branch password   form validation first***********************
    if (this.data.dialogType === 'changeBranchuser') {
      this.changeBranchusersettingForm = this.formBuilder.group({
        userpassword: [this.data.passwordChange.passwrd, Validators.required],
        confirmpassword: ['', Validators.required],
      });
    }
    // *******************branch password   form validation end***********************

    // *******************country popup form validation start***********************
    this.countryForm = this.formBuilder.group({
      countrycode: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.min(1)]],
      countryname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.min(1)]],
      countrycurrency: ['', Validators.required],
      swiftcode: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5), Validators.min(1)]],
      countrylimit: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^[0-9]\d{0,12}(\.\d{0,3})?%?$/)]],
      recstatus: ['A', Validators.required],
    });
    // *******************country popup form validation end***********************

    // *******************edit country popup form validation start***********************
    if (this.data.dialogType === 'editcountry') {
      this.editcountryForm = this.formBuilder.group({
        countrycode: [this.data.formData.cntcod, Validators.required],
        countryname: [this.data.formData.cntnam, Validators.required],
        countrycurrency: [this.data.formData.cntccy, Validators.required],
        swiftcode: [this.data.formData.cnswft, [Validators.required, Validators.maxLength(20), Validators.minLength(5), Validators.min(1)]],
        countrylimit: [
          this.data.formData.cntlmt, [Validators.required, Validators.min(0.01), Validators.pattern(/^[0-9]\d{0,12}(\.\d{0,3})?%?$/)]
        ],
        recstatus: [this.data.formData.status, Validators.required],
      });
    }
    // *******************edit country popup form validation end***********************

    // *******************goldcard popup form validation start***********************
    this.goldForm = this.formBuilder.group({
      cardtype: ['', Validators.required],
      customername: ['', [Validators.required, Validators.maxLength(50), Validators.min(1)]],
      idtype: ['', Validators.required],
      idnumber: ['', [Validators.required, Validators.maxLength(30), Validators.min(1)]],
      countrycode: ['', Validators.required],
      branchcode: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(10)]],
      idexpdate: ['', Validators.required],
      cardstatus: ['A', Validators.required],
    });
    // ******************* goldcard popup form validation end***********************

    // ******************* edit goldcard popup form validation start***********************
    if (this.data.dialogType === 'updategold') {
      this.startDate = this.data.updateGoldCard.gcmgcexpd;
      this.editGoldForm = this.formBuilder.group({
        cardnumber: [this.data.updateGoldCard.gcmnumber],
        cardtype: [this.data.updateGoldCard.gcmcrdtyp, [Validators.required, Validators.maxLength(50), Validators.min(1)]],
        customername: [this.data.updateGoldCard.gcmcname, Validators.required],
        idtype: [this.data.updateGoldCard.gcmidtype, Validators.required],
        idnumber: [this.data.updateGoldCard.gcmidnumb, [Validators.required, Validators.maxLength(30), Validators.min(1)]],
        idexpdate: [this.data.updateGoldCard.gcmgcexpd, Validators.required],
        cardstatus: [this.data.updateGoldCard.gcmgcstat, Validators.required],
      });
    }
    // ******************* edit goldcard popup form validation end***********************

    // ******************* rate popup form validation start***********************

    this.rateForm = this.formBuilder.group({
      currencygroup: ['', Validators.required],
      currencyid: ['', Validators.required],
      exchangerate: ['', [
        Validators.required, Validators.min(0.001), Validators.pattern(/^[0-9]\d{0,6}(\.\d{0,3})?%?$/)]
      ],
      lowerrate: ['', [
        Validators.required, Validators.min(0.001), Validators.pattern(/^[0-9]\d{0,6}(\.\d{0,3})?%?$/)]
      ],
      higherrate: ['', [
        Validators.required, Validators.min(0.001), Validators.pattern(/^[0-9]\d{0,6}(\.\d{0,3})?%?$/)]
      ],
      recstatus: ['A', Validators.required]
    });
    // ******************* rate popup form validation end***********************

    // *******************edit rate popup form validation start***********************
    if (this.data.dialogType === 'editrates') {
      this.getCurrencyList(this.data.formdata.ccygrp);
      this.editrateForm = this.formBuilder.group({
        currencygroup: [this.data.formdata.ccygrp, Validators.required],
        currencyid: [this.data.formdata.ccyid, Validators.required],
        exchangerate: [this.data.formdata.ccyrat, [
          Validators.required, Validators.min(0.001), Validators.pattern(/^[0-9]\d{0,6}(\.\d{0,3})?%?$/)]
        ],
        lowerrate: [this.data.formdata.lowrat, [
          Validators.required, Validators.min(0.001), Validators.pattern(/^[0-9]\d{0,6}(\.\d{0,3})?%?$/)]
        ],
        higherrate: [this.data.formdata.higrat, [
          Validators.required, Validators.min(0.001), Validators.pattern(/^[0-9]\d{0,6}(\.\d{0,3})?%?$/)]
        ],
        recstatus: [this.data.formdata.status, Validators.required]
      });
    }
    // *******************edit rate popup form validation end***********************

    // ******************* Charges form validation end***********************
    if (this.data.dialogType === 'addcharges') {
      this.getCurrency();
      this.chargesForm = this.formBuilder.group({
        productgroup: ['', Validators.required],
        productid: ['', Validators.required],
        chargeamount: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^[0-9]\d{0,2}(\.\d{0,2})?%?$/)]],
        currencygroup: ['', Validators.required],
        currencyid: ['', Validators.required],
        transamount: ['', [Validators.required, Validators.min(0.001), Validators.pattern(/^[0-9]\d{0,11}(\.\d{0,3})?%?$/)]],
        recstatus: ['A', Validators.required],
      });
    }
    // ******************* Charges form validation end***********************

    // ******************* update Charges form validation end***********************
    if (this.data.dialogType === 'updatecharges') {
      this.updateChargesForm = this.formBuilder.group({
        productgroup: [this.data.formdata.prdgrp, Validators.required],
        productid: [this.data.formdata.prdid, Validators.required],
        chargeamount: [
          this.data.formdata.chgamt, [Validators.required, Validators.min(0.01), Validators.pattern(/^[0-9]\d{0,2}(\.\d{0,2})?%?$/)]
        ],
        currencygroup: [this.data.formdata.ccygrp, Validators.required],
        currencyid: [this.data.formdata.ccyid, Validators.required],
        transamount: [
          this.data.formdata.amtifg, [Validators.required, Validators.min(0.001), Validators.pattern(/^[0-9]\d{0,11}(\.\d{0,3})?%?$/)]
        ],
        recstatus: [this.data.formdata.status, Validators.required],
      });
    }
    // ******************* update Charges form validation end***********************

    // ******************* add Role form validation start***********************
    if (this.data.dialogType === 'addroles') {
      this.rolesForm = this.formBuilder.group({
        userrole: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        rolestatus: ['A', Validators.required]
      });
    }
    // ******************* add Role form validation end***********************

    // ******************* update Role form validation start***********************
    if (this.data.dialogType === 'editroles') {
      this.editrolesForm = this.formBuilder.group({
        userrole: [this.data.formdata.roltyp, Validators.required],
        rolestatus: [this.data.formdata.status, Validators.required]
      });
    }
    // ******************* update Role form validation end***********************

    // ******************* add Currency Group  form validation start***********************
    this.addCurrencyGroup = this.formBuilder.group({
      groupcode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3), Validators.min(1)]],
      groupname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.min(1)]],
      recstatus: ['A', Validators.required],
    });
    // ******************* Currency Group  form validation end***********************

    // ******************* edit Currency Group  form validation start***********************
    if (this.data.dialogType === 'editCurrencyGroup1') {
      this.editCurrencyGroupForm = this.formBuilder.group({
        groupcode: [this.data.editGroupData.ccygid, Validators.required],
        groupname: [
          this.data.editGroupData.grpnam, [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.min(1)]
        ],
        recstatus: [this.data.editGroupData.status, Validators.required],
      });
    }
    // *******************edit Currency Group  form validation end***********************

    // ******************* Add Currency   form validation end***********************
    this.CurrencylistForm = this.formBuilder.group({
      // this.data.currecyList.ccygid
      groupcode: [''],
      currencycode: ['', [Validators.required, Validators.maxLength(3), Validators.min(1)]],
      currencylname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.min(1)]],
      recstatus: ['A', Validators.required],
    });
    // ******************* Add Currency   form validation end***********************

    // ******************* edit Currency   form validation end***********************
    if (this.data.dialogType === 'editCurrencylist') {
      this.editCurrencylistForm = this.formBuilder.group({
        groupcode: [this.data.editData.ccygid, Validators.required],
        currencycode: [this.data.editData.ccyid, Validators.required],
        currencylname: [
          this.data.editData.ccylnm, [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.min(1)]
        ],
        recstatus: [this.data.editData.status, Validators.required],
      });
    }
    // ******************* edit Currency   form validation end***********************

    // ******************* product group  form validation end***********************
    this.addProduct = this.formBuilder.group({
      groupcode: ['', [Validators.required, Validators.maxLength(3), Validators.min(1)]],
      groupname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.min(1)]],
      recstatus: ['A', Validators.required],
    });
    // ******************* product group  form validation end***********************

    // ******************* edit product group  form validation end***********************
    if (this.data.dialogType === 'editProductStatus') {
      this.editProduct = this.formBuilder.group({
        groupcode: [this.data.editProductSts.grpcod, Validators.required],
        groupname: [
          this.data.editProductSts.grpnam, [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.min(1)]
        ],
        recstatus: [this.data.editProductSts.status, Validators.required],
      });
    }
    // ******************* edit product group  form validation end***********************

    // ******************* product   form validation end***********************
    this.addproductForm = this.formBuilder.group({
      productid: ['', Validators.required],
      currencygroup: ['', Validators.required],
      recstatus: ['A', Validators.required],
    });
    // ******************* product  form validation end***********************

    // *******************edit product   form validation end***********************
    if (this.data.dialogType === 'editproduct') {
      this.editproductForm = this.formBuilder.group({
        productid: [this.data.editProductLitst.prdid, Validators.required],
        currencygroup: [this.data.editProductLitst.ccygrp, Validators.required],
        recstatus: [this.data.editProductLitst.status, Validators.required],
      });
      this.editProductData = this.data.editProductLitst;
    }

    // *******************edit product  form validation end**********************
    if (this.data.dialogType === 'editbranchusers') {
      console.log(this.data.branchUserList);
      this.changepasswordForm.patchValue({
        userrole: Number(this.data.branchUserList.roleid),
        recstatus: this.data.branchUserList.status,
      });
    }

    this.countryProductForm = this.formBuilder.group({
      countryid: ['', Validators.required],
      productid: ['', Validators.required],
      productgroup: ['', Validators.required],
      recstatus: ['A', Validators.required],
    });

    if (this.data.dialogType === 'editcountryProduct') {
      this.editcountryProductForm = this.formBuilder.group({
        countryid: [this.data.editcntryprod.cntid, Validators.required],
        productgroup: [this.data.editcntryprod.prdgrp, Validators.required],
        productid: [this.data.editcntryprod.prdid, Validators.required],
        recstatus: [this.data.editcntryprod.status, Validators.required],
      });
    }
  }

  getcountryDrop() {
    this.adminService.getcountries().subscribe(data => {
      this.countrydata = data;
    });
  }

  getBrachDrop() {
    this.adminService.getBranchList().subscribe(data => {
      this.branchdata = data;
    });
  }

  getProductListDrop() {
    this.adminService.getListProduct().subscribe(data => {
      this.list = data;
    });
  }

  upperCase(str) {
    this.userid = str.toUpperCase();
  }
  // [this.data.branchUserList.roltyp
  //   [this.data.branchUserList.status

  editRoles() {
    this.editrolesForm.value.actiontype = 'U';
    this.editrolesForm.value.userroleid = Number(this.data.formdata.roleid);
    this.adminService.addRole(this.editrolesForm.value).subscribe((data: any) => {
      this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
      this.dialogRef.close('Ediited');
    },
      (error: any) => {
        if (error.err) {
          this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
        }
      });
  }

  // *******************add branch popup form validation start***********************
  branchGroup() {
    if (this.branchForm.valid) {
      console.log(this.branchForm.value);
      this.adminService.addBranchList(this.branchForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close(data.res);
      }, error => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }

  // *******************edit branch popup form validation start***********************
  editbranch() {
    if (this.eidtbranchForm.valid) {
      this.adminService.updateBranch(this.eidtbranchForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close(data.res);
      }, error => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }

  // ***************************add branhc user details******************* */
  addBranchUser() {
    console.log(this.branchUserForm);
    if (this.branchUserForm.valid) {
      console.log(this.branchUserForm);
      if (this.branchUserForm.value.userpassword === this.branchUserForm.value.confirmpassword) {
        this.branchUserForm.value.actiontype = 'A';
        console.log('2222222222222');
        this.branchUserForm.value.branchid = this.data.BranchDetails.id;
        this.branchUserForm.value.changeuserid = this.data.BranchDetails.loginid;
        this.adminService.addBranchUserMaintainance(this.branchUserForm.value).subscribe((data: any) => {
          this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
          this.dialogRef.close(data.res);
        }, error => {
          this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
        });
      } else if (this.branchUserForm.value.userpassword !== this.branchUserForm.value.confirmpassword) {
        console.log('111111111111');
        this.branchUserForm.controls['confirmpassword'].setErrors({ 'error': true });
      }
    }
  }

  // **************edit brach user list********************** */
  editBranchUser() {
    if(this.changepasswordForm.valid){
    this.changepasswordForm.value.actiontype = 'U';
    this.changepasswordForm.value.userid = this.data.branchUserList.loginid;
    console.log(this.changepasswordForm.value);
    this.adminService.addBranchUserMaintainance(this.changepasswordForm.value).subscribe((data: any) => {
      this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
      this.dialogRef.close(data.res);
    }, error => {
      this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
    });
  }
}
  // *******************branch popup form validation end***********************

  // ********************branch user password settings***************** */
  changeBranchuserpswd() {
    if (this.changeBranchusersettingForm.valid) {
      this.changeBranchusersettingForm.value.userid = this.data.passwordChange.user.loginid;
      if (this.changeBranchusersettingForm.value.userpassword === this.changeBranchusersettingForm.value.confirmpassword) {
        this.changeBranchusersettingForm.value.actiontype = 'CP';
        this.adminService.addBranchUserMaintainance(this.changeBranchusersettingForm.value).subscribe((data: any) => {
          this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
          this.dialogRef.close(data.res);
        }, error => {
          this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
        });
      } else if (this.changeBranchusersettingForm.value.userpassword !== this.changeBranchusersettingForm.value.confirmpassword) {
        this.changeBranchusersettingForm.controls['confirmpassword'].setErrors({ 'error': true });
      }
    }
  }

  addproductSubmit() {
    if (this.addproductForm.valid) {
      const productdata = {
        actiontype: 'A',
        productgroup: this.data.productList.id,
        productsname: this.addproductForm.value.productid.prdsnm,
        productlname: this.addproductForm.value.productid.prdlnm,
        productid: this.addproductForm.value.productid.prdid,
        currencygroup: this.addproductForm.value.currencygroup,
        recstatus: this.addproductForm.value.recstatus
      };
      this.adminService.addProduct(productdata).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close('added');
      }, (error: any) => {
        if (error.err) {
          this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
        }
      });
    }
  }

  selectproduct(event, data) {
    if (event.isUserInput) {
      this.listProduct = data;
      this.editProductData = data;
    }
  }

  editproductSubmit() {
    if(this.editproductForm.valid){
    const editproductdata = {
      actiontype: 'U',
      productgroup: this.data.productData.id,
      productsname: this.editProductData.prdsnm,
      productlname: this.editProductData.prdlnm,
      productid: this.editProductData.prdid,
      currencygroup: this.editproductForm.value.currencygroup,
      recstatus: this.editproductForm.value.recstatus
    };
    // this.editproductForm.value.actiontype = 'U';
    // this.editproductForm.value.productgroup = this.data.editProductLitst.prdgrp;
    this.adminService.addProduct(editproductdata).subscribe((data: any) => {
      this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
      this.dialogRef.close('update');
    }, (error: any) => {
      if (error.err) {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      }
    });
  }
}

  // ==============Adding currency group post method============
  addCurrencyGroup1() {
    console.log(this.addCurrencyGroup);
    if (this.addCurrencyGroup.valid) {
      this.addCurrencyGroup.value.actiontype = 'A';
      this.adminService.currencyGroup(this.addCurrencyGroup.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close(data.res);
      }, error => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }

  // ==================edit currency group ======================
  editCurrencyGroup() {
    if(this.editCurrencyGroupForm.valid){
    this.editCurrencyGroupForm.value.actiontype = 'U';
    this.adminService.currencyGroup(this.editCurrencyGroupForm.value).subscribe((data: any) => {
      if (data.res) {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
      }
      this.dialogRef.close(data.res);
    }, error => {
      this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
    });
  }
}

  // ===============adding currencylist post method==============
  currencylistGroup() {
    console.log(this.CurrencylistForm.value);
    if (this.CurrencylistForm.valid) {
      this.CurrencylistForm.value.actiontype = 'A';
      this.CurrencylistForm.value.groupcode = this.data.groupid;
      console.log(this.CurrencylistForm.value.groupcode);
      console.log(this.data.currecyList.ccygid);
      this.adminService.currencyList(this.CurrencylistForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close(data.res);
      }, error => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }

  compareObjects(o1: any, o2: any) {
    console.log(o1, o2);
    if (o1.toLowerCase() === o2.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }

  compareNumberObjects(o1: any, o2: any) {
    console.log(o1, o2);
    if (Number(o1) === Number(o2)) {
      return true;
    } else {
      return false;
    }
  }

  // ===========edit currency list group=================
  editcurrencylistGroup() {
    if(this.editCurrencylistForm.valid){
    this.editCurrencylistForm.value.actiontype = 'U';
    this.adminService.currencyList(this.editCurrencylistForm.value).subscribe((data: any) => {
      if (data.res) {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
      }
      this.dialogRef.close(data.res);
    }, error => {
      this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
    });
  }
}

  /*   isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    } */

  addRoles() {
    if (this.rolesForm.valid) {
      this.rolesForm.value.actiontype = 'A';
      this.adminService.addRole(this.rolesForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close('added');
      }, (error: any) => {
        if (error.err) {
          this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
        }
      });
    }
  }

  addCharges() {
    this.submitted = true;
    if (this.chargesForm.valid) {
      this.chargesForm.value.actiontype = 'A';
      this.adminService.addNewCharges(this.chargesForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close('added');
      }, (error: any) => {
        if (error.err) {
          this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
        }
      });
    }
  }

  updateCharges() {
    if(this.updateChargesForm.valid){
    this.updateChargesForm.value.actiontype = 'U';
    this.adminService.addNewCharges(this.updateChargesForm.value).subscribe((data: any) => {
      this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
      this.dialogRef.close('editted');
    }, error => {
      this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
    });
  }
}

  // *******************country popup form validation start***********************
  country() {
    if (this.countryForm.valid) {
      this.countryForm.value.actiontype = 'A';
      this.adminService.countrymaintainance(this.countryForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close(data.res);
      }, error => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }
  // *******************country popup form validation end***********************


  // *******************edit country popup form validation start***********************
  editcountry() {
    if (this.editcountryForm.valid) {
      this.editcountryForm.value.actiontype = 'U';
      this.adminService.countrymaintainance(this.editcountryForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close(data.res);
      }, error => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }

  // *******************edit country popup form validation end***********************
  addGroupProduct() {
    if (this.addProduct.valid) {
      this.addProduct.value.actiontype = 'A';
      this.adminService.addProductGroup(this.addProduct.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close('added');
      }, (error: any) => {
        if (error.err) {
          this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
        }
      });
    }
  }

  editGroupProduct() {
    if (this.editProduct.valid) {
      this.editProduct.value.actiontype = 'U';
      this.adminService.addProductGroup(this.editProduct.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close('added');
      }, (error: any) => {
        if (error.err) {
          this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
        }
      });
    }
  }

  // ***********************Add Gold card******************************
  addGoldCard() {
    if (this.goldForm.valid) {
      this.goldForm.value.actiontype = 'A';
      this.adminService.addGoldCardMaintainance(this.goldForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close(data.res);
      }, error => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }

  // ********************Update Gold Card************************** */
  updategold11() {
    if (this.editGoldForm.valid) {
      this.editGoldForm.value.actiontype = 'U';
      // this.editGoldForm.value.cardtype = this.data.updateGoldCard.gcmcrdtyp;
      this.editGoldForm.value.countrycode = this.data.updateGoldCard.gcmcucnty;
      this.editGoldForm.value.branchcode = this.data.updateGoldCard.gcmbranch;
      this.editGoldForm.value.address = this.data.updateGoldCard.gcmcaddr;
      this.editGoldForm.value.phonenumber = this.data.updateGoldCard.gcmphnum;
      this.adminService.addGoldCardMaintainance(this.editGoldForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close(data.res);
      }, error => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }

  rate() {
    if (this.rateForm.valid) {
      this.rateForm.value.actiontype = 'A';
      this.adminService.addRates(this.rateForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close('added');
      }, (error: any) => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }

  editrate() {
    if (this.editrateForm.valid) {
      this.editrateForm.value.actiontype = 'U';
      this.adminService.addRates(this.editrateForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close('editted');
      }, (error: any) => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }

  getProuductsGroups() {
    this.adminService.getProductGroups().subscribe((data: any) => {
      this.productgroups = data;
    });
  }

  productGroupChanges(event) {
    this.adminService.getproductList(event).subscribe((data: any) => {
      this.productList = data;
    });
  }

  getCurrencyGroup() {
    this.adminService.getCcyGroups().subscribe(data => {
      console.log(data);
      this.currencylist = data;
    });
  }

  getCurrencyList(event) {
    console.log(event);
    this.adminService.getCcyList(event).subscribe((data: any) => {
      this.currencyList = data;
      console.log(this.currencyList);
    });
  }

  getCurrencyListFilter(event, c) {
    console.log(event);
    if (event.isUserInput) {
      this.adminService.getCcyList(c.ccygid).subscribe((data: any) => {
        this.currencyList = data;
        console.log(this.currencyList);
      });
    }
  }

  getCurrency() {
    this.adminService.currenciesGetting().subscribe((data: any) => {
      console.log(data);
      this.currencies = data;
    });
  }

  countryProduct() {
    console.log(this.countryProductForm.value);
    if (this.countryProductForm.valid) {
      this.countryProductForm.value.actiontype = 'A';
      this.adminService.countryProducts(this.countryProductForm.value).subscribe((data: any) => {
        console.log(data);
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close('added');
      }, (error: any) => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }

  editcountryProduct() {
    console.log(this.editcountryProductForm.value);
    if (this.editcountryProductForm.valid) {
      this.editcountryProductForm.value.actiontype = 'U';
      this.adminService.countryProducts(this.editcountryProductForm.value).subscribe((data: any) => {
        this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
        this.dialogRef.close('update');
      }, (error: any) => {
        this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
      });
    }
  }
  checkingRates(form) {
    if (form.value.exchangerate && form.value.lowerrate) {
      this.checking.lower = form.value.exchangerate > form.value.lowerrate ? '' : 'Lower rate must be  less than curreny rate ';
    }
    if (form.value.exchangerate && form.value.higherrate) {
      this.checking.higher = form.value.exchangerate < form.value.higherrate ? '' : 'Higher rate must be  greater than curreny rate ';
    }
  }
}
