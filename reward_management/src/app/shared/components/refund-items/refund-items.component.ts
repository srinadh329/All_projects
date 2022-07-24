import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-refund-items',
  templateUrl: './refund-items.component.html',
  styleUrls: ['./refund-items.component.css']
})
export class RefundItemsComponent implements OnInit {

  isproductshow: any = false;
  productId: any;
  rewardId: any;
  admin: any;
  orderId: any;
  orderItems: any;
  orderData: any;
  rewardAmount: any;
  rewardRefund: any;
  refundToCard:any;

  constructor(private route: ActivatedRoute, private _router: Router,
    private adminService: AdminService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      if (data.id && data.orderId) {
        this.rewardId = data.id;
        this.orderId = data.orderId;
        this.getOrderList();
      }
    })
    this.route.queryParams.subscribe((data) => {
      if (data.admin) {
        this.admin = data.admin;
      }
    })
  }

  productdisplayCart(i: number) {
    this.isproductshow = !this.isproductshow;
    this.productId = i;
  }

  goBack() {
    if (this.admin == "true") {
      this._router.navigate(['/reward-details/transactions', this.rewardId])
    }
    else {
      this._router.navigate(['/superadmin/dashboard/transactions', this.rewardId])
    }
  }

  getOrderList() {
    this.spinner.show();
    this.adminService.getOrderItems(this.orderId).subscribe((data: any) => {
      if (data && data.orderItems) {
        this.orderData = data;
        this.orderItems = data.orderItems;
        this.rewardAmount = this.calculateRefundAmount(this.orderItems);
        this.rewardRefund = this.getActualRefundAmount();
        // this.refundToCard = Math.abs(this.rewardAmount - this.orderData?.totalRewardAmount);
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
    })
  }

  getActualRefundAmount() {
    if (this.orderData.totalRewardAmount < this.rewardAmount) return this.orderData.totalRewardAmount; else return this.rewardAmount

  }

  calculateRefundAmount(orderItems: any) {
    let packageItems: any = [];
    let totalOrderItems: any = [];
    let totalPrice: any = 0;

    orderItems.forEach((element: any) => {
      if (element && element.packageProducts && element.packageProducts.length) {
        element.packageProducts.forEach((item: any) => {
          if (item) {
            item.itemQuantity = element.itemQuantity;
            packageItems?.push(item)
          }
        })
      }
      // else {
      //   totalOrderItems?.push(element)
      // };
    })
    const price = packageItems.filter((data: any) => {
      if (data) {
        return (data && data?.returnStatus == "INITIATED" || data?.returnStatus == "IN-PROGRESS" || data?.returnStatus == "RETURN_COMPLETED")
      }
    }).reduce((acc: any, item: any) => {
      return acc + Math.round(item.price * item.itemQuantity);
    }, 0);
    price ? totalPrice += price : totalPrice = totalPrice;

    // const itemPrice = totalOrderItems.filter((data: any) => {
    //   if (data) {
    //     return (data && data?.returnStatus == "INITIATED" || data?.returnStatus == "IN-PROGRESS" || data?.returnStatus == "COMPLETED")
    //   }
    // }).reduce((acc: any, item: any) => {
    //   return acc + Math.round(item.itemOriginalPrice)
    // }, 0);
    // itemPrice ? totalPrice += itemPrice : totalPrice = totalPrice;

    return totalPrice;
  }

  refundComplete() {
    this.spinner.show();
    this.adminService.refund(this.rewardId, this.orderId).subscribe((data: any) => {
      if (data) {
        this.getOrderList();
        this.spinner.hide();
      }
    }, (err: any) => {
      this.spinner.hide();
    })
  }

}
