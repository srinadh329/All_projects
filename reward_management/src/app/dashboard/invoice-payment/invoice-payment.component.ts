import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment.component.html',
  styleUrls: ['./invoice-payment.component.css']
})
export class InvoicePaymentComponent implements OnInit {

  checkedInvoices:any = [];
  isPayAllInvoices:boolean = false;
  currentInvoice : any;

  get checkedInvoicesLength() {
    return  this.checkedInvoices.length;
  }

  invoices = [{
    'invoiceNo': 'L250065',
    'date': 'Wednesday, July 7th 2021',
    'residentId': '#54732964',
    'residentName': 'Dre Chrisiano',
    'buildingName': 'Infinite Chicago',
    'amount': '$300',
    'invoiceReference': '#78324987',
  },
  {
    'invoiceNo': 'L250066',
    'date': 'Wednesday, July 7th 2021',
    'residentId': '#54732964',
    'residentName': 'Dre Chrisiano',
    'buildingName': 'Infinite Chicago',
    'amount': '$300',
    'invoiceReference': '#78324987',
  }]

  constructor(private route: ActivatedRoute, private router:Router) {
    this.route.queryParams.subscribe((params) => {
      if (params.payAll) {
        this.isPayAllInvoices = true;
      }
      else if (params.invoice) {
        this.currentInvoice = params.invoice
      }
    })
  }

  ngOnInit(): void {
  }


  payAllSelected(event: any) {
    if (event.target.checked) {
      this.invoices.map((item: any) => {
        if (item) {
          this.checkedInvoices.push(item);
        }
      })
    }
    else {
      this.checkedInvoices = [];
    }
  }

  selectInvoice(event: any, invoice: any) {
    if (event.target.checked) {
      this.checkedInvoices.push(invoice);
    }
    else {
      const index = this.checkedInvoices.findIndex((item: any) => { return item.invoiceNo == invoice.invoiceNo });
      this.checkedInvoices.splice(index, 1);
    }
  }

  findElementExists(obj: any) {
    const index = this.checkedInvoices.findIndex((item: any) => { return item.invoiceNo == obj.invoiceNo });
    const isExist = index != -1 ? true : false;
    return isExist;
  }

  backToInvoice() {
    this.router.navigate(['/invoices'])
  }
}
