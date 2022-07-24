import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  name:any;
  totalGoldcards: any;
  totalBranches: any;
  branchUserCount: any;
  onlineUserCount:any;
  totalTransations: any;
  productData: any;
  productList = [];
  productTrans = [];
  topGoldcard:any;
  topGodlcarduser=[];
  topGoldcardTran=[];
  branchData:any;
  branchList=[];
  branchTrans=[];
  branchUserData:any;
  branchUserList=[];
  branchuserTrans=[];
  constructor(private AdminService: AdminService) { }

  ngOnInit() {
    this.AdminService.getTotalGoldcardCount().subscribe((data: any) => {
      this.totalGoldcards = data[0].goldcards;
    })
    this.AdminService.getTotalBranches().subscribe((data: any) => {
      this.totalBranches = data[0].branches;
    })
    this.AdminService.getBrancheUserCount().subscribe((data: any) => {
      this.branchUserCount = data[0].branchusers;
    })
    this.AdminService.getTotalTransactions().subscribe((data: any) => {
      this.totalTransations = data[0].totalTransactions;
    })

    this.AdminService.getOnlineUserCount().subscribe((data: any) => {
      this.onlineUserCount = data[0].onlineuserscount;
    })

    this.AdminService.getProductData().subscribe((data: any) => {
      this.productData = data;
      this.productData.forEach(element => {
        this.productList.push(element.prdid);
        this.productTrans.push(element.trans)
      });
      this.getPieChart();
    })
    this.AdminService.getTopGoldcadList().subscribe((data: any) => {
      this.topGoldcard = data;
      this.topGoldcard.forEach(element => {
        this.topGodlcarduser.push(element.cusname);
        this.topGoldcardTran.push(element.transactions)
      });
      this.barchart();
    })
    this.AdminService.getBranchData().subscribe((data: any) => {
      this.branchData = data;
      this.branchData.forEach(element => {
        this.branchList.push(element.brnnam);
        this.branchTrans.push(element.trans)
      });
      this.linechart();
    })
    this.AdminService.getBranchUserData().subscribe((data: any) => {
      this.branchUserData = data;
      this.branchUserData.forEach(element => {
        this.branchUserList.push(element.usrnam);
        this.branchuserTrans.push(element.trans)
      });
      this.userLinechart();
    })

  }

  barchart() {
    var ctx = document.getElementById('barChart')
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.topGodlcarduser,
        datasets: [{
          label: 'Customer Transactions',
          data: this.topGoldcardTran,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });


  }

  getPieChart() {
    var ctx1 = document.getElementById('pieChart');
    var myChart = new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: this.productList,
        datasets: [
          {
            label: 'Products Transactions',
            data: this.productTrans,
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)'
            ]
          }
        ]
      },
      options: {
        title: {
          display: false,
          text: 'Color test'
        },
        legend: {
          position: 'left',
          display: true,
          fullWidth: true,
          labels: {
            fontSize: 11
          }
        },
      }
    });
  }

  linechart() {
    var ctx3 = document.getElementById("mylinechart");
    var myChart = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: this.branchList,
        datasets: [{
          label: "Branch Transactions",
          borderColor: "rgb(255,165,0)",
          data: this.branchTrans
        }
        ],
      },
      options: {
        title: {
          display: true,
          fontColor: '#000000',
          fontStyle: 'bold'
        },
        legend: {
          display: true,
        },

        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    })
  }

  userLinechart() {
    var ctx4 = document.getElementById("myuserlinechart");
    var myChart = new Chart(ctx4, {
      type: 'line',
      data: {
        labels: this.branchUserList,
        datasets: [{
          label: "Branch User Transactions",
          borderColor: "rgb(255,165,0)",
          data: this.branchuserTrans
        }
        ],
      },
      options: {
        title: {
          display: true,
          fontColor: '#000000',
          fontStyle: 'bold'
        },
        legend: {
          display: true,
        },

        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    })
  }

}
