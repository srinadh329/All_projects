import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { RewardmgtService } from 'src/app/services/rewardmgt.service';

@Component({
  selector: 'app-admin-transactions',
  templateUrl: './admin-transactions.component.html',
  styleUrls: ['./admin-transactions.component.scss']
})
export class AdminTransactionsComponent implements OnInit {

  rewardDetails:any = [];
  history:any = [];
  rewardTransactions : any = [];
  totalRewards:any = 0;
  rewardId:any;
  adminData:any = false;

  constructor(private route:ActivatedRoute , private rewardService:RewardmgtService , 
    private spinner:NgxSpinnerService , private admin:AdminService , private router:Router)  { }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      if (val.id) {
        this.rewardId = val.id;
         this.getData(val.id);
      }
    })
    this.route.queryParams.subscribe((data) => {
      if (data.admin) {
        this.adminData = data.admin
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
    this.router.navigate(['/superadmin/dashboard/transactions/refund-items' , this.rewardId , id] , { queryParams : { admin : false }})
  }

}
