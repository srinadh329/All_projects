import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';
import { StoreService } from '../../store.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  branchid: any;
  totaltrans: any;
  remtrans: any;
  todaytrans: any;
  products: any;
  storeproducts = [];
  graphdata: any = [];
  graphvalues = [];
  coloR = [];
  myChart: Chart;
  PieChart: Chart;
  selected = 'Week';
  constructor(public storeservice: StoreService, private changing: ChangeDetectorRef, private appService: AppService) { }

  ngOnInit() {
    this.branchid = this.appService.getbranch();
    this.getbranchstatus();
    this.getbranchanlatics();
  }

  getbranchstatus() {
    this.storeservice.dashboardstats(this.branchid).subscribe(data => {
      this.totaltrans = data[0].trans;
      this.remtrans = data[1].trans;
      this.todaytrans = data[2].trans;
    });
  }

  getbranchanlatics() {
    this.storeproducts = [];
    this.graphvalues = [];
    const obj = { branchid: Number(this.branchid), type: this.selected };
    this.storeservice.dashboardgraphs(obj).subscribe(data => {
      this.graphdata = data;
      this.graphdata.forEach((element: { trans: any; prdname: any; }) => {
        this.storeproducts.push(element.prdname);
        this.graphvalues.push(element.trans);
      });
      this.getPieChart();
      this.barchart();
    });
  }

  //  Pie Chart
  getPieChart() {
    if (this.PieChart != null || this.PieChart !== undefined) {
      this.PieChart.destroy();
    }
    const ctx1 = document.getElementById('pieChart');
    this.PieChart = new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: this.storeproducts,
        datasets: [
          {
            label: 'test',
            data: this.graphvalues,
            backgroundColor: ["#0074D9", "#AAAAAA", "#3D9970", "#FF851B", "#85144b", "#B10DC9", "#FFDC00", "#F012BE"],
            // 2ECC40
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

  barchart() {
    if (this.myChart != null || this.myChart !== undefined) {
      this.myChart.destroy();
    }
    const ctx = document.getElementById('barChart');
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.storeproducts,
        datasets: [{
          label: 'No of Transactions',
          data: this.graphvalues,
          backgroundColor: ["#0074D9", "#AAAAAA", "#3D9970", "#FF851B", "#85144b", "#B10DC9", "#FFDC00", "#F012BE"],
          borderColor: ["#0074D9", "#AAAAAA", "#3D9970", "#FF851B", "#85144b", "#B10DC9", "#FFDC00", "#F012BE"],
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
}
