import { Component, OnInit } from '@angular/core';
import { RewardmgtService } from '../../services/rewardmgt.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reward-details',
  templateUrl: './reward-details.component.html',
  styleUrls: ['./reward-details.component.css']
})
export class RewardDetailsComponent implements OnInit {

  transactions:any;
  promoCodeList:any;
  count = 9;
  promoCount = 0;
  lastPromoCount = 9;
  promoList : any;
  searchString:any=''
  constructor(private reward:RewardmgtService, private _router: Router , private spinner:NgxSpinnerService) { }
  collection:any=[];
  ngOnInit(): void {
    // this.reward.getRewardList().subscribe((res)=>{
    //   this.collection = res;
    // })
    this.getPromoCodeList();
  }

  createReward() {
    this._router.navigateByUrl('/create-reward'); 
  }

  getRewardTransaction() {
    this.spinner.show();
    this.reward.getRewardTransaction().subscribe((res) => {
      if (res) {
        this.spinner.hide();
        this.transactions = res;
      }
    })
  }

  getPromoCodeList() {
    this.spinner.show();
    this.reward.getRewards(this.searchString).subscribe((data: any) => {
      if (data) {
        this.spinner.hide();
        // this.updateList(data);
        // this.promoList = this.getLastViewedProductList();
        this.promoCodeList = data;
      }
    })
  }

  getLastViewedProductList() {
    return this.promoCodeList;
  }

  onScroll() {
    console.log("Scrolled")
    if(this.promoCount !== this.lastPromoCount)  {

    }
  }

  updateList(obj:any) {
    let isResult = false;
    if (obj && obj.length) {
      this.promoCodeList.push(...obj);
      isResult = true;
    }

    if (isResult === true) {
      this.promoCount += 9;
    }

  }

  getStatus(val: any) : any {
    if (val && val.length > 0) {
      return val.some((item:any)=> {
        return item.status == 1 
      }) ? 'ACTIVATED' : 'NOT ACTIVATED'
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

  searchChangeEvent(data:any){
    console.log(data)
    this.promoCodeList = []
    this.searchString = data;
    this.getPromoCodeList()
  }
}
