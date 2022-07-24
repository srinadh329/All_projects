import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  addPayment = true;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  payAll() {
   this.router.navigate(['/invoices-payment'] , { queryParams: { payAll: true }})
  }
}
