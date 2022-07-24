import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from 'jquery'
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  echarts:any;
  addforeign= [];
  newforeignExchage:any;
  encapsulation: ViewEncapsulation.None
  // createAddress:any;
  constructor(private formBuilder: FormBuilder) { 
    this.newforeignExchage = this.formBuilder.group({
      addforeign: this.formBuilder.array([ this.createForeign() ])
      
    })
  }
  createForeign(): FormGroup {
    return this.formBuilder.group({
      foreigninputOne: '',
      foreigninputTwo: '',
      foreigninputThree: '',
      foreigninputFour: '',
    });
 }
 rowAdded(){
   console.log(this.addforeign)
   this.addforeign = this.newforeignExchage.get('addforeign');
   this.addforeign.push(this.createForeign());
 }
 get foreignControls() {
  return this.newforeignExchage.get('addforeign')['controls'];
}
// rowDelete(i: number) {
//   this.addforeign.removeAt(i);
// }

  ngOnInit(): void {
    this.loadTransactionChart();
  }
  
  saleData = [
    { name: "Week 01", value: 50 },
    { name: "Week 02", value: 70 },
    { name: "Week 03", value: 20 },
    { name: "Week 04", value: 35 },
    { name: "Week 05", value: 35 },
    { name: "Week 06", value: 35 },
    { name: "Week 07", value: 35 }
  ];
  barPadding = 40;
  colorScheme = {
    domain: ['#F7578CF2', '#57CBF7F2', '#F79C57F2', '#57F7D2F2']
  };

  loadTransactionChart() {
    var chart = document.getElementById('chart');
    var myChart = echarts.init(chart);
    // var colorPalette = ['#F7464A','#FDB45C', '#46BFBD',  '#46BFBD','#61a0a8'];
   var  option = {
      // backgroundColor: '#2c343c',

      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
  
      visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
              colorLightness: [1, 0]
          }
      },
      series: [
          {
              name: '',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                  {value: 335, name: 'Exchange Funds', itemStyle: {color: '#F7464A'},},
                  {value: 310, name: 'Funds Added',itemStyle: {color: '#46BFBD'},},
                  {value: 274, name: 'Funds Added',itemStyle: {color: '#46BFBD'},},
                  {value: 235, name: 'Exchange Funds',itemStyle: {color: '#FDB45C'},}
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                  color: '#000'
              },
              labelLine: {
                normal: {
                  show: false
              },
                  lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
              },
              itemStyle: {
                  color: '#F7464A',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
  
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                  return Math.random() * 200;
              }
          }
      ],
  };
    myChart.setOption(option);
  }

  slider(){}

}
