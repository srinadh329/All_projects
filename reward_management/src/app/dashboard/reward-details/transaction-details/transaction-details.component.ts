import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { RewardmgtService } from 'src/app/services/rewardmgt.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  rewardDetails:any = [];
  history:any = [];
  rewardTransactions : any = [];
  totalRewards:any = 0;
  rewardId:any;

  constructor(private route:ActivatedRoute , private rewardService:RewardmgtService,
    private admin:AdminService, private spinner:NgxSpinnerService , private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      if (val.id) {
        this.rewardId = val.id;
        this.getData(val.id);
      }
    })
  }

  getData(val: any) {
    if (val) {
      this.spinner.show();
      this.rewardService.getRewardTransactionBasedOnId(val).subscribe((data:any) => {
        if (data) {
         this.rewardDetails = data;
         this.history = this.rewardDetails.rewardHistory;
         this.rewardTransactions = this.rewardDetails.rewardTransactions;
         this.getTotal(this.history);
         this.spinner.hide();
        }
      })
    }
  }

  getTotal(arr : any) {
    if(arr && arr.length > 0) {
      let affirm = 0;
      arr.forEach((item:any) => {
       affirm = affirm + item?.rewardAmount;
       return affirm;
     })
     this.totalRewards = affirm; 
    }
    else {
      this.totalRewards = 0;
    }
  }


  refund(orderId: any) {
    this.spinner.show();
    this.admin.refund(this.rewardId, orderId).subscribe((data) => {
      if (data) {
        this.getData(this.rewardId);
        this.spinner.hide();
      }
    } , err => {
      this.spinner.hide();
    })
  }

  goToRefund(id:any) {
    this.router.navigate(['/reward-details/transactions/refund' , this.rewardId , id] , { queryParams : { admin : true }})
  }
}
