import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-reward-transactions',
  templateUrl: './reward-transactions.component.html',
  styleUrls: ['./reward-transactions.component.css']
})
export class RewardTransactionsComponent implements OnInit {

  transactions:any;
  promoCodeList:any;
  userList:any = [];
  userCount = 0;
  lastUserCount = 0;
  listView:any = [];
  filterBy:any = {
    start:this.lastUserCount,
    count:9
  }

  constructor(private reward:AdminService , private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getRewardTransaction();
  }

  getRewardTransaction() {
    this.spinner.show();
    this.reward.getRewardTransactions(this.filterBy).subscribe((data) => {
      if (data) {
        this.spinner.hide();
        this.updateList(data);
        this.userList = this.getLastViewedUserList();
      }
    })
  }

  getLastViewedUserList() {
    return this.listView;
  }

  updateList(obj:any) {
    let isResult = false;
    if (obj && obj.length) {
      this.listView.push(...obj);
      isResult = true;
    }

    if (isResult === true) {
      this.lastUserCount += 9;
      this.filterBy.start = this.lastUserCount
    }

  }

  redemedReward(val: any): any {
    if (val && val.length > 0) {
      if (val.filter((item: any) => item.status == 1).length > 0) {
        return val.filter((item: any) => item.status == 1).reduce((acc: any, item: any) => {
          return acc + item.rewardAmount;
        }, 0)
      }
      else {
        return 0
      }
    }
    else return 0
  }

  calculateDeletedRewards(val:any) : any {
    if (val && val.length > 0) { 
      if(val.filter((item: any) => item.deleteStatus == 1).length > 0) {
        return val.filter((item: any) => item.deleteStatus == 1).reduce((acc: any, item: any) => {
          return acc + item.rewardAmount;
        }, 0)
      }
      else {
        return 0
      }
    }
    else return 0
  }

  onScroll() {
    if (this.userCount !== this.lastUserCount) {
      this.spinner.show();
      this.reward.getRewardTransactions(this.filterBy).subscribe((data: any) => {
        this.spinner.hide();
        if (data && data.length) {
          this.updateList(data);
        }
      })
      this.userList = this.getLastViewedUserList();
      this.userCount = this.lastUserCount;
    }
  }

  getStatus(val: any) : any {
    if (val && val.length > 0) {
      return val.some((item:any)=> {
        return item.status == 1 
      }) ? 'Activated' : 'Not Activated'
    }
    else {
      return '-'
    }
  }

  resetList() {
    this.userList = [];
    this.userCount = 0;
    this.lastUserCount = 0;
    this.listView = [];
    this.filterBy.start = this.lastUserCount;
  }

  appliedFilter(event : any) {
    if(event) {
      this.resetList();
      this.filterBy = {...this.filterBy , ...event}
      this.getRewardTransaction();
    }
  }
}
