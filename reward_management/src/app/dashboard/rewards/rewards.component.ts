import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RewardmgtService } from 'src/app/services/rewardmgt.service';
import { StorageService } from 'src/app/services/storage.service';
declare var $: any;

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {

  buildingDetails: any;
  buildingList: any;
  promoCodeList:any = [];
  promoCodeListMaster: any = [];
  rewardType = {
    type: '',
    deleteAmount: 0,
    id: null
  };
  query:any={
    start:0,
    count:9,
    searchString:''
  }
  valueIn:any;
  isMoreData:boolean = true
  isApiLoading:boolean= false
  constructor(private reward: RewardmgtService, private _router: Router,
    private storage: StorageService,private spinner:NgxSpinnerService ,private toastr: ToastrService) { }

  collection: any = [];

  ngOnInit(): void {
    this.spinner.show();
    this.getPropertyAddress();
    this.getBuildingName();
    this.getPromoCodeList();
  }


  @HostListener('window:scroll', ['$event'])
  getScrollHeight(event: any) {
    console.log(window.pageYOffset)
    if ((window && window.pageYOffset > 50) && this.isMoreData && !this.isApiLoading) {
      this.query.start = this.query.start + 9;
      this.getPromoCodeList()
    }
  }
  
  createReward() {
    this._router.navigateByUrl('/create-reward');
  }

  getBuildingName() {
    const userData: any = JSON.parse(this.storage.getUserDetails());
    this.buildingDetails = userData.propertyDataList[0];
  }

  getPropertyAddress() {
    this.reward.getBuldingList().subscribe((data: any) => {
      if (data) {
        this.buildingList = data['PropertyAddress'];
        this.reward.buildingList.next(data['PropertyAddress']);
      }
    })
  }

  getPromoCodeList() {
    this.isApiLoading = true
    this.reward.getRecentlyRewards(this.query).subscribe((data: any) => {
    this.isApiLoading = false
      if (data && Array.isArray(data)) {
        this.isMoreData = data.length ? true : false
        data = data.map((x:any)=>{
          if(x.rewardEndDate) {
            const today = new Date();
            const current = new Date(x.rewardEndDate);
            x['is_expired'] = (today > current) ? true : false
          }
          return x;
        });
        this.spinner.hide();
        this.promoCodeList = [...this.promoCodeList, ...data];
        return
      }
      this.isMoreData = false
    },error=>{
      this.spinner.hide();
      this.isMoreData = false
      this.isApiLoading = false
    })
  }

  deletedReward(item: any,) {
    $('#deleteReward').modal('show');
    const deleteBalance = item.rewardAmount || 0;
    const currentBalance = item.rewardBalance || 0
    const status = item.status;
    
    this.rewardType.id = item.id;
    if (status == 0 || deleteBalance < currentBalance ) {
      this.rewardType.type = 'cancel';
      this.rewardType.deleteAmount = deleteBalance;
    } else if (currentBalance == 0) {
      this.rewardType.type = 'zero';
    } else if(deleteBalance > currentBalance) {
      this.rewardType.type = 'partial';
      this.rewardType.deleteAmount = currentBalance;
    }
  }
  
  deleteRewardService(id: any) {
    if (id) {
      this.spinner.show();
      this.reward.deleteReward(id).subscribe((data:any) => {
        if (data) {
           this.spinner.hide();
           this.toastr.success(`Reward $${data?.detletedAmount} deleted successfully`)
           this.promoCodeList = [];
           this.getPromoCodeList();
           $('#deleteReward').modal('hide');
           this.reward.getBuildingAmount(this.storage.getPropertyId());
        }
      })
    }
  }

  searchChangeEvent(data:any){
    console.log(data)
    this.promoCodeList = []
    this.query.searchString = data;
    this.query.start = 0;
    this.getPromoCodeList()
  }
}
