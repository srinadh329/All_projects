import { Component, OnInit } from '@angular/core';
import { RewardmgtService } from '../../services/rewardmgt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  data = [{
    date:"12/11/2021",
    invoice:"#000000",
    residentId:"#000000",
    residentName:'Mathews, Dave',
    buildingName:'The Link Minneapolis Low Rise',
    amount:'$300',
    paymentStatus:'UNPAID'
  }, {
    date:"12/11/2021",
    invoice:"#000000",
    residentId:"#000000",
    residentName:'Mathews, Dave',
    buildingName:'The Link Minneapolis Low Rise',
    amount:'$300',
    paymentStatus:'PAID'
  },
  {
    date:"12/11/2021",
    invoice:"#000000",
    residentId:"#000000",
    residentName:'Mathews, Dave',
    buildingName:'The Link Minneapolis Low Rise',
    amount:'$300',
    paymentStatus:'PAID'
  },
  {
    date:"12/11/2021",
    invoice:"#000000",
    residentId:"#000000",
    residentName:'Mathews, Dave',
    buildingName:'The Link Minneapolis Low Rise',
    amount:'$300',
    paymentStatus:'UNPAID'
  },
  {
    date:"12/11/2021",
    invoice:"#000000",
    residentId:"#000000",
    residentName:'Mathews, Dave',
    buildingName:'The Link Minneapolis Low Rise',
    amount:'$300',
    paymentStatus:'UNPAID'
  }]
  constructor(private reward:RewardmgtService, private _router: Router) { }
  collection:any=[];
  ngOnInit(): void {
    this.reward.getRewardList().subscribe((res)=>{
      this.collection = res;
    })
  }
  createReward() {
    this._router.navigateByUrl('/create-reward'); 
  }

  invoicePayment(value : any) {
    this._router.navigate(['/invoices-payment'] , {queryParams :  {invoice : value.invoice}}); 
  }


}
