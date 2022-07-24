import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../app.service';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-storetable',
  templateUrl: './storetable.component.html',
  styleUrls: ['./storetable.component.scss']
})
export class StoretableComponent implements OnInit {
  @Input() Header: any;
  @Input() arabialist: any;
  @Input() productreportdata: any;
  @Input() userreportdata: any;
  @Input() dailyreportList: any;
  @Input() foreignlist: any;
  @Input() instantlist: any;
  @Input() telegraphlist: any;
  @Input() dubailist: any;
  @Input() remittancelist: any;
  @Input() westernlist: any;
  @Input() instantcashlist: any;
  @Input() nationallist: any;
  @Input() finelist: any;
  @Output() showforeignform = new EventEmitter<string>();
  @Output() instantdraft = new EventEmitter<string>();
  @Output() telegraphlistedit = new EventEmitter<string>();
  @Output() dubailistedit = new EventEmitter<string>();
  @Output() westernlistedit = new EventEmitter<string>();
  @Output() instantcashlistedit = new EventEmitter<string>();
  @Output() arabialistedit = new EventEmitter<string>();
  @Output() nationallistedit = new EventEmitter<string>();
  @Output() remittanceview = new EventEmitter<string>();

  scrollHeight: any;
  p = 1;
  userrole: any;
  order: string;
  reverse = false;
  ordertype = 'desc';
  branchid: any;
  constructor(private appService: AppService, public storeservice: StoreService) { }

  ngOnInit() {
    this.userrole = this.appService.getrole();
    this.branchid = this.appService.getbranch();
  }

  foreignform(form) {
    this.showforeignform.emit(form);
  }
  instantform(form) {
    this.instantdraft.emit(form);
  }
  telegraphform(form) {
    this.telegraphlistedit.emit(form);
  }
  dubaiform(form) {
    this.dubailistedit.emit(form);
  }
  westernform(form) {
    this.westernlistedit.emit(form);
  }
  instantcashform(form) {
    this.instantcashlistedit.emit(form);
  }
  arabiaform(form) {
    this.arabialistedit.emit(form);
  }
  nationalform(form) {
    this.nationallistedit.emit(form);
  }
  remittanceform(form) {
    this.remittanceview.emit(form);
  }

  setOrder(item, ordertype) {
    this.ordertype = ordertype;
    if (item === 'App.No' || item === 'Application No') {
      this.order = 'appno';
    } else if (item === 'Status') {
      this.order = 'status';
    } else if (item === 'Date') {
      this.order = 'crtdat';
    } else if (item === 'Created User') {
      this.order = 'crtusr';
    } else if (item === 'Product') {
      this.order = 'prdid';
    } else if (item === 'Benificiary Name') {
      this.order = 'bnfname';
    } else if (item === 'Applicant Name') {
      this.order = 'appname';
    } else if (item === 'MTCN No.') {
      this.order = 'appdtl2';
    }

    if (this.remittancelist !== undefined) {
      const obj = {
        branchid: this.branchid,
        productid: 'rem',
        order: this.order,
        ordertype: this.ordertype
      };
      this.storeservice.sortremittance(obj).subscribe(data => {
        this.remittancelist = data;
      });
    }

    if (this.remittancelist !== undefined) {
      const obj = {
        branchid: this.branchid,
        productid: 'rem',
        order: this.order,
        ordertype: this.ordertype
      };
      this.storeservice.sortremittance(obj).subscribe(data => {
        this.remittancelist = data;
      });
    }
    if (this.foreignlist !== undefined) {
      const obj = {
        branchid: this.branchid,
        productid: 'FX',
        order: this.order,
        ordertype: this.ordertype
      };
      this.storeservice.sortremittance(obj).subscribe(data => {
        this.foreignlist = data;
      });
    }
    if (this.westernlist !== undefined) {
      const obj = {
        branchid: this.branchid,
        productid: 'WU',
        order: this.order,
        ordertype: this.ordertype
      };
      this.storeservice.sortremittance(obj).subscribe(data => {
        this.westernlist = data;
      });
    }
    if (this.nationallist !== undefined) {
      const obj = {
        branchid: this.branchid,
        productid: 'NB',
        order: this.order,
        ordertype: this.ordertype
      };
      this.storeservice.sortremittance(obj).subscribe(data => {
        this.nationallist = data;
      });
    }
    if (this.dubailist !== undefined) {
      const obj = {
        branchid: this.branchid,
        productid: 'DP',
        order: this.order,
        ordertype: this.ordertype
      };
      this.storeservice.sortremittance(obj).subscribe(data => {
        this.dubailist = data;
      });
    }
    if (this.arabialist !== undefined) {
      const obj = {
        branchid: this.branchid,
        productid: 'AA',
        order: this.order,
        ordertype: this.ordertype
      };
      this.storeservice.sortremittance(obj).subscribe(data => {
        this.arabialist = data;
      });
    }
    if (this.dailyreportList !== undefined) {
      if (item === 'Transaction No'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.trnno > two.trnno ? -1 : 1));
      }
      if (item === 'Transaction No' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.trnno < two.trnno ? -1 : 1));
      }
      if (item === 'Applicant Name'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.appname > two.appname ? -1 : 1));
      }
      if (item === 'Applicant Name' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.appname < two.appname ? -1 : 1));
      }
      if (item === 'Product'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.prdid > two.prdid ? -1 : 1));
      }
      if (item === 'Product' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.prdid < two.prdid ? -1 : 1));
      }
      if (item === 'Transaction  Amount'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.total > two.total ? -1 : 1));
      }
      if (item === 'Transaction  Amount' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.total < two.total ? -1 : 1));
      }
    }
    if (this.productreportdata !== undefined) {
      if (item === 'Transaction No'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.trnno > two.trnno ? -1 : 1));
      }
      if (item === 'Transaction No' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.trnno < two.trnno ? -1 : 1));
      }
      if (item === 'Applicant Name'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.appname > two.appname ? -1 : 1));
      }
      if (item === 'Applicant Name' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.appname < two.appname ? -1 : 1));
      }
      if (item === 'crtdat'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.crtdat > two.crtdat ? -1 : 1));
      }
      if (item === 'crtdat' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.crtdat < two.crtdat ? -1 : 1));
      }
      if (item === 'Transaction  Amount'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.total > two.total ? -1 : 1));
      }
      if (item === 'Transaction  Amount' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.total < two.total ? -1 : 1));
      }
    }
    if (this.userreportdata !== undefined) {
      if (item === 'Transaction No'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.trnno > two.trnno ? -1 : 1));
      }
      if (item === 'Transaction No' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.trnno < two.trnno ? -1 : 1));
      }
      if (item === 'Product'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.prdid > two.prdid ? -1 : 1));
      }
      if (item === 'Product' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.prdid < two.prdid ? -1 : 1));
      }
      if (item === 'crtdat'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.crtdat > two.crtdat ? -1 : 1));
      }
      if (item === 'crtdat' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.crtdat < two.crtdat ? -1 : 1));
      }
      if (item === 'Transaction  Amount'  && ordertype === 'asc') {
        this.productreportdata.sort((one, two) => (one.total > two.total ? -1 : 1));
      }
      if (item === 'Transaction  Amount' && ordertype === 'desc' ) {
        this.productreportdata.sort((one, two) => (one.total < two.total ? -1 : 1));
      }
    }
  }
}
