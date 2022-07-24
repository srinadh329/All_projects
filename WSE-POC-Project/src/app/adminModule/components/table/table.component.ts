import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  constructor(private adminService: AdminService) { }
  p: any;
  name: any;
  dummy = true;

  ascending = true;
  descending = true;
  @Input() tableHeaders: any;
  @Input() allbranches: any;
  @Input() countrylist: any;
  @Input() countryproductlist: any;
  @Input() currencydata: any;
  @Input() productdata: any;
  @Input() goldcarddata: any;
  @Input() ratesdata: any;
  @Input() chargesdata: any;
  @Input() userroles: any;
  @Input() onlineusersdata: any;
  @Input() reportList: any;
  @Input() reportsProductList: any;
  @Input() defaultscrollheight: any;
  @Output() editBranchdata = new EventEmitter<string>();
  @Output() editCountrydata = new EventEmitter<string>();
  @Output() editCountryProductdata = new EventEmitter<string>();
  @Output() editGolddata = new EventEmitter<string>();
  @Output() editChargesdata = new EventEmitter<string>();
  @Output() editRatesdata = new EventEmitter<string>();
  @Output() editRolesdadta = new EventEmitter<string>();
  @Output() editProductGroupdata = new EventEmitter<string>();
  @Output() branchNavigate = new EventEmitter<string>();
  @Input() allbranchusers: any;
  @Input() branchwisedata: any;
  @Input() branchwisetransactionreportdata: any;
  @Output() currencyGroupNavigate = new EventEmitter<string>();
  @Input() allcurrencygroup: any;
  @Output() productNavigate = new EventEmitter<string>();
  @Input() allproductgroup: any;
  @Input() userwiselist: any;
  @Input() branchwiseuserdata: any;
  @Output() editbranchuserdata = new EventEmitter<string>();
  @Output() editcurrencydata = new EventEmitter<string>();
  @Output() editproductdata = new EventEmitter<string>();
  @Output() editcurrencygroupdata = new EventEmitter<string>();
  scrollHeight: any;
  resizeTimeout: any;
  Branchid;

  @HostListener('window:resize') onWindowResize($event: Event) { // debounce resize, wait for resize to finish before doing stuff
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      // this.scrollHeight = window.innerHeight - 330;
    }).bind(this), 500);
  }

  //   @HostListener('window:resize', ['$event'])
  //   onResize(event) {
  //     setTimeout(() => {
  //       console.log(this.scrollHeight)
  //     console.log(window.innerWidth)
  //     this.scrollHeight = window.innerHeight - 330;
  //     }, 500);


  // }


  ngOnInit() {
    // console.log(this.reportsProductList, "jjjjjjjjjjjjjjjjjjj")
    // this.scrollHeight = window.innerHeight - 330;
  }

  editBranch(branch) {
    this.editBranchdata.emit(branch);
  }
  editCountry(country) {
    this.editCountrydata.emit(country);
  }
  editCountryProduct(country) {
    this.editCountryProductdata.emit(country);
  }
  editGoldcard(gold) {
    this.editGolddata.emit(gold);
  }
  editCharges(currency) {
    this.editChargesdata.emit(currency);
  }
  editRate(rates) {
    this.editRatesdata.emit(rates);
  }
  editRoles(roles) {
    this.editRolesdadta.emit(roles);
  }
  editProductGroup(productGroupStatus) {
    this.editProductGroupdata.emit(productGroupStatus);
  }
  navigteToBranch(branch) {
    this.Branchid = branch.brnid;
    this.branchNavigate.emit(branch);
  }
  CurrencyGroup(currency) {
    console.log('tttt', currency);
    this.currencyGroupNavigate.emit(currency);
  }
  navigateToProductGp(product) {
    this.productNavigate.emit(product);
  }
  editBranchusers(listbranch) {
    this.editbranchuserdata.emit(listbranch);
  }

  editCurrency(currencylist) {
    console.log(currencylist);
    this.editcurrencydata.emit(currencylist);
  }
  editproduct(productlist) {
    this.editproductdata.emit(productlist);
  }
  editCurrencyGroup(ccgroup) {
    this.editcurrencygroupdata.emit(ccgroup);
  }
  branchusersetting(data) {
    const settingdata: any = {
      type: 'settings',
      user: data
    };
    this.editbranchuserdata.emit(settingdata);
  }
  // To sort assending
  sortasc(key) {
    console.log(key);
    let arraydata: any = [];
    if (this.allbranches) {
      arraydata = this.allbranches;
    } else if (this.allbranchusers) {
      arraydata = this.allbranchusers;
    } else if (this.countrylist) {
      arraydata = this.countrylist;
    } else if (this.countryproductlist) {
      arraydata = this.countryproductlist;
    } else if (this.currencydata) {
      arraydata = this.currencydata;
    } else if (this.allcurrencygroup) {
      arraydata = this.allcurrencygroup;
    } else if (this.goldcarddata) {
      arraydata = this.goldcarddata;
    } else if (this.ratesdata) {
      arraydata = this.ratesdata;
    } else if (this.chargesdata) {
      arraydata = this.chargesdata;
    } else if (this.userroles) {
      arraydata = this.userroles;
    } else if (this.productdata) {
      arraydata = this.productdata;
    } else if (this.allproductgroup) {
      arraydata = this.allproductgroup;
    } else if (this.userwiselist) {
      arraydata = this.userwiselist;
    } else if (this.reportList) {
      arraydata = this.reportList;
    } else if (this.branchwisetransactionreportdata) {
      arraydata = this.branchwisetransactionreportdata;
    } else if (this.reportsProductList) {
      arraydata = this.reportsProductList;
    } else if (this.branchwiseuserdata) { arraydata = this.branchwiseuserdata; }
    this.descending = false;
    this.ascending = true;
    if (arraydata.length > 0) {
      arraydata.sort((a, b) => {
        if (!isNaN(a[key])) {
          if (Number(a[key]) < Number(b[key])) {
            return 1;
          }
          if (Number(a[key]) > Number(b[key])) {
            return -1;
          }
        } else if (isNaN(a[key])) {
          if (a[key] < b[key]) {
            return 1;
          }
          if (a[key] > b[key]) {
            return -1;
          }
        }
      });
    }
  }

  // To sort dessending
  sortdsc(key) {
    let arraydata: any = [];
    if (this.allbranches) {
      arraydata = this.allbranches;
    } else if (this.allbranchusers) {
      arraydata = this.allbranchusers;
    } else if (this.countrylist) {
      arraydata = this.countrylist;
    } else if (this.countryproductlist) {
      arraydata = this.countryproductlist;
    } else if (this.currencydata) {
      arraydata = this.currencydata;
    } else if (this.allcurrencygroup) {
      arraydata = this.allcurrencygroup;
    } else if (this.goldcarddata) {
      arraydata = this.goldcarddata;
    } else if (this.ratesdata) {
      arraydata = this.ratesdata;
    } else if (this.chargesdata) {
      arraydata = this.chargesdata;
    } else if (this.userroles) {
      arraydata = this.userroles;
    } else if (this.productdata) {
      arraydata = this.productdata;
    } else if (this.allproductgroup) {
      arraydata = this.allproductgroup;
    } else if (this.userwiselist) {
      arraydata = this.userwiselist;
    } else if (this.reportList) {
      arraydata = this.reportList;
    } else if (this.branchwisetransactionreportdata) {
      arraydata = this.branchwisetransactionreportdata;
    } else if (this.reportsProductList) {
      arraydata = this.reportsProductList;
    } else if (this.branchwiseuserdata) { arraydata = this.branchwiseuserdata; }
    this.ascending = false;
    this.descending = true;
    if (arraydata.length > 0) {
      arraydata.sort((a, b) => {
        if (!isNaN(a[key])) {
          if (Number(a[key]) > Number(b[key])) {
            return 1;
          }
          if (Number(a[key]) < Number(b[key])) {
            return -1;
          }
        } else if (isNaN(a[key])) {
          if (a[key] > b[key]) {
            return 1;
          }
          if (a[key] < b[key]) {
            return -1;
          }
        }
      });
    }
  }
}
