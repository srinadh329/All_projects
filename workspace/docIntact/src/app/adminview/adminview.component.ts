import { Component, OnInit, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DocumentService } from '../document.service';
import { Observable, Subject } from 'rxjs'
import { AdminService } from '../admin.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { NUM_CENTER } from '@angular/cdk/keycodes';
declare var $: any;
@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {
  fileViewTimeChart: any;
  chartOptions: any;
  fileViewCharts: any;
  fileViewDeviceChart: any;
  pieChart:any
  ////////////////////////////////////////////////////////
  bsConfig;
  maxDate: Date;
  datepicker: boolean = false;
  profiledata: Object;
  email: any;
  tyd;
  ////////////////////////////////////////////////////
  allDocumentsList: any;
  recentFileList: any;
  documentsList: any ;
  documentsIdList: any;
  docListCount: any;
  devicesCount: any;
  dateSelected: any;
  start: any;
  end: any;
  ////////////////////////////////////////////////////
  documentsIdDevicesList: any;
  documentsListDevices: any;
  startDate: any;
  endDate: any;
  dateSelected1: any;
  ////////////////////////////////////////////////////////////
  fileData: any
  pendingList = []
  InprogressList = []
  completedList: any;
  documents = []
  documentData = []
  documentsListTiming = []
  documentsIdTimingList = [];
  filterData
  tdyResult = []
  diff
  tdyResultData = []
  result
  miniutes = []
  title
  showDate
  showDate2
  showDate4
  isloading: boolean = true
  myplaceHolder:String=''
  myplaceHolder3:String=''
  myplaceHolder2:String=''
  Dateplaceholder1:String=''
  Dateplaceholder2:String=''
  Dateplaceholder3:String=''
  Dateplaceholder4:String=''

  count1=0
  count2=0
  count3=0
  showtoday:boolean=true;
  showyest:boolean=false;
  showtoday1:boolean=true
  showyest1:boolean=false
  showtoday2:boolean=true
  showyest2:boolean=false
  showtoday3:boolean=true
  showyest3:boolean=false
  fileViewdate
  Devicedate
  mapviewdate
  fileviewdate
  clearintervaldata
  ///////////////////////////////////////////////////////////////////
  constructor(private documentService: DocumentService, private adminservice: AdminService,private http:HttpClient) {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
  }

  ngOnInit() {
   
    if(!!(window as any).MSInputMethodContext && !!(document as any).documentMode) 
    { 
$(".ietop").css("margin-top","100px");
    
     }
    this.Dateplaceholder1="Select Date Range"
    this.Dateplaceholder2="Select Date Range"
    this.Dateplaceholder3="Select Date Range"
    this.Dateplaceholder4="Select Date Range"

    var data :any =JSON.stringify(localStorage.getItem('mylocation'))
    this.getProfile();
    
    this.dateSelected = 'Today';
    
 
    this.dateSelected1 = 'Today';
    this.myplaceHolder2=null
    this.myplaceHolder3=null
   
    this.getAllDocuments();
    this.getRecentFiles();
   
    setTimeout(() => {
     
    }, 1000);
    this.chartOptions = {
      title: {
        display: true,
        fontColor: '#000000',
        fontStyle: 'bold',
        text: 'Custom Chart Title'
      },
      legend: {
        display: false,
        labels: {
          fontColor: 'rgb(255, 99, 132)'
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: function(tooltipItem){
             return this._data.labels[tooltipItem[0].index];
          }
        }
      },
     hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          barPercentage: 0.3,
          display: true,
          ticks: {
            minRotation :0,
            maxRotation:0,
            autoSkip:false,
            callback: function(label, index, labels) {
             console.log(labels)
              if (label.length>8) { 
                var data='...'
                 if(labels.length >8){
                   
                 return label.slice(0, 3).concat(data)
                 }
                 else 
                  // return label.match(/.{3,12}/g);
                  return label.slice(0, 4).concat(data)
               }else{
                var data='..'
                if(labels.length <8 ) {
                 return label;
               }
               else return label.slice(0, 2).concat(data)
             
              }                
            }
          },
        
          
        },

        ],
        yAxes: [{
          display: true,
          ticks: {
            callback: function(value, index, values) {
              if (Math.floor(value) === value) {
                  return value;
              }
          },
            beginAtZero: true
          },
          beginAtZero: true
        }]
      }
    }
    if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)))
    {
     this.clearintervaldata=setInterval(() => {
        this.ccb(); 
        }, 100);
    }
  }
  ngOnDestroy() {
    clearInterval(this.clearintervaldata);

  }
  // clear data while copy 
  clearData(){
    window["clipboardData"].setData('text','')
  }
   ccb(){
  if(window["clipboardData"]){
   window["clipboardData"].clearData();
  }
  }
  getProfile() {
    this.adminservice.getProfile().subscribe(data => {
      this.isloading = false
      this.profiledata = data;
      this.email = this.profiledata
      // this.isloading = true 
    });
  }

  getRecentFiles() {
    this.documentService.getSearch('documents/recentfiles').subscribe(data => {
       this.isloading = false
      this.recentFileList = data;
      console.log(this.recentFileList)
      ////////////////////////////////file view//////////////////////////////////////////////////////////////
      this.documentsList = [];
      this.documentsIdList = [];
      this.documentsListDevices = [];
      this.documentsIdDevicesList = [];
      this.documents = [];
      this.recentFileList.forEach(file => {
        this.documentsList.push(file.name);
        console.log( this.documentsList)
        this.documentsIdList.push(file._id);
        this.documentsListTiming.push(file.name);
        this.documentsIdTimingList.push(file._id);
        this.documentsListDevices.push(file.name);
        this.documentsIdDevicesList.push(file._id);
        if (this.recentFileList.indexOf(file) == (this.recentFileList.length - 1)) {
          this.fileview();
          this.FilelistTiming('today');
          this.todayDatamap('today');
          this.fileViewDevices()
        }
      });
    })
  }

  // today yesterday datepicker code
  todayDatamap = async function (title) {
    return new Promise(async (resolve, reject) => {
      this.filterData = {};
      this.filterData.where = {};
      var v = moment()
      let now
      if (title == "today") {
        this.Dateplaceholder3="Select Date Range"
        this.mapviewdate=null
        this.tyd = 'today'
        now = v.format('YYYY-MM-DD');
        this.filterData.where.createdAt = { $gte: now + 'T00:00:00.000Z' }
        this.todaydate = this.filterData.where.createdAt.$gte
        this.adminservice.gettdates.emit(this.todaydate);
      }

    
   else if(title=="yesterday")
   {
     this.mapviewdate=null
     this.Dateplaceholder3="Select Date Range"
     this.tyd="yesterday"
    now = v.subtract(1, 'days').format('YYYY-MM-DD');
    this.filterData.where.createdAt = { $gte: now + 'T00:00:00.000Z' }
    this.yesterdaydate=this.filterData.where.createdAt.$gte;
    this.adminservice.getdates.emit(this.yesterdaydate);
   }else if(title == 'Custom Date')
   {
     this.tyd = 'Custom Date'
   }

      // this.documentService.search(this.filterData).subscribe(async( data: any) => {
      //   this.tdyResult = data
      //    this.documentData.forEach(element1 => {
      //     element1.logs=this.tdyResult.filter(option => option.message == "Viewed" && option.documentid._id==element1._id);
      //     if( element1.logs.length>0)
      //     element1.logs.forEach(element => {
      //       this.diff = this.getDataDiff(new Date(element.createdAt), new Date(element.updatedAt));     
      //       }) 
      // })
      //   resolve();
      // });
    })
  }

  selectDatemap(info, event){
    if (event && info == 'Custom Date') {
      var mapdate = []
      this.Dateplaceholder3=null
      this.showtoday2=false
      this.showyest2=false
     var s =  moment(event[0]).format('YYYY-MM-DD');
     var e= moment(event[1]).add(1, 'days').format('YYYY-MM-DD');
       mapdate.push(s,e)
      console.log(mapdate)
      this.adminservice.getdatespick.emit(mapdate);
    }
  }

  getAllDocuments() {
    this.documentService.getSearch('documents').subscribe(data => {
      // this.isloading = false
      this.fileData = data;
      if(this.fileData.length==0)
      {
        this.myplaceHolder2='Select File'
        this.myplaceHolder3='Select File'
        this.myplaceHolder='Select File'
      }
      console.log(this.fileData)
      this.pendingList = this.fileData.filter(file => file.status == "Waiting for Sign" || file.status == "Review" || file.status == "Partially completed" || file.status == "Completed");
      this.InprogressList = this.fileData.filter(file => file.status == "Partially completed");
      this.completedList = this.fileData.filter(file => file.status == "Completed");
      setTimeout(()=>{
        this.piechart()
      },100)  
      // this.isloading = true;
    })
  }

  //////////////////////////////////////// File view chart//////////////////////////////////////////////

  selectedDate(info, event) {
    console.log(event)
    this.dateSelected = info;
    if (event && info == 'Custom Date') {
      this.Dateplaceholder1=null
      this.showtoday=false
      this.showyest=false
      this.start =  moment(event[0]).format('YYYY-MM-DD');
      this.end = moment(event[1]).add(1, 'days').format('YYYY-MM-DD');
    }
    else 
    {
      this.fileViewdate=null
      this.Dateplaceholder1="Select Date Range"
    }
    this.fileview();
  }

  // selecting the list of documents from the html
  Filelist(event) {
    console.log(event.source.value)
    if(!event.source._selected){
      
      this.count1--;

    }
   else if(event.source._selected){
      this.count1++

    }

    if(this.count1==0)
    {    
      this.myplaceHolder3 = 'Select File';
    }
    else if(this.count1 >0)
    {    
      this.myplaceHolder3 = null;
    }
    if (event.isUserInput) {
      var check = this.documentsIdList.some(x => x == event.source.value);
      var docname = this.fileData.find(x => x.name == event.source.value);
      if (event.source.selected && !check && docname) this.documentsIdList.push(docname._id);
      else if (!check && !event.source.selected && docname) { this.documentsIdList.splice(this.documentsIdList.indexOf(docname._id), 1); }
      if (this.documentsIdList.length) this.fileview();
      else this.hideFileViewChart();
    }
  }

  // display in html
  fileview() {
    var res: any = {};
    res.where = {};
    var v = moment();
    var start, end;
    // Today
    if (this.dateSelected == 'Today') {
      let now = v.format('YYYY-MM-DD');
      res.where.createdAt = { $gte: now + 'T00:00:00.000Z' };
    }
    // Yesterday
    if (this.dateSelected == 'Yesterday') {
      start = v.format('MMM-DD-YYYY');
      end = v.subtract(1, 'days').format('YYYY-MM-DD');
      res.where.createdAt = { $gte: new Date(end), $lt: new Date(start) };
    }
    if (this.dateSelected == 'Custom Date' && this.start && this.end) {
      res.where.createdAt = { $gte: new Date(this.start), $lt: new Date(this.end) };
    }
    res.where.message = 'Viewed';
    res.where.documentid = { $in: this.documentsIdList };
    // if documents are selected
    if (this.documentsIdList.length) {
      
      var data = this.today(res);
      data.subscribe(result => {
        this.docListCount = [];
        this.docListCount = this.uniqueDocCount(this.documentsIdList, result)
        this.uniqueDeviceCount(this.documentsIdList, result)
        if (this.docListCount)   setTimeout(()=>{ this.fileViewChart();},0) 
      })
    }
  }

  // return unique count for each documents
  uniqueDocCount(documentList, result) {
    var arr = [];
    documentList.forEach(element => { ///fetching the html array
      var data = this.fileData?this.fileData.find(x => x.name == element):undefined;  ///finding the element in all documents
      if(data!=undefined) var index = documentList.find(x => x == data._id);    ///fetching the index of html array
      arr.push(result.filter(x => x.documentid._id == element).length)
    });
    console.log(arr)
    return arr;
  }

  // result
  today(res): Observable<any> {
    console.log(res)
    if (!res.where) res.where = {};
    var filterdata = new Subject<any>();
    this.documentService.search('documentlogs/filesFilter/', res).subscribe((data: any) => {
      filterdata.next(data)
    })
    return filterdata.asObservable();
  }

  fileViewChart() {
 console.log(this.documentsList)
    var v=[]
    var resultfile = []
    this.documentsList = this.documentsList.filter(file =>   file=file.split('.pdf' ) )
    this.documentsList.forEach((element,index) => {
      
       v=element.split('.pdf' || '.doc' || '.docx')
       resultfile.push( v[0])

    });
console.log(resultfile)
    if (this.fileViewCharts != undefined || this.fileViewCharts != null) {
      this.fileViewCharts.destroy();
    }
    var ctx = document.getElementById('fileView-chart');
    if (ctx) {
      ctx.style.display = "";
      this.fileViewCharts = new Chart(ctx, {
        type: 'bar',
        labelDisplay: "AUTO",
                theme: "fusion",
        data: {
          labels: resultfile,
          datasets: [{
            label: "Viewed Count",
            backgroundColor: '#fd6e36',
            data: this.docListCount,
          }],
        },
        options: this.chartOptions

      });
    }
  }

  hideFileViewChart() {
    var ctx = document.getElementById('fileView-chart');
    if (ctx) ctx.style.display = "none";
  }
  ////////////////////////////////////////////////////file view device chart///////////////////////////////////////////////////////////////////////

  selectDate(info, event) {
    this.dateSelected1 = info;
    if (event && info == 'Custom Date') {
      this.Dateplaceholder4=null
      this.showtoday3=false
      this.showyest3=false;
      this.startDate =  moment(event[0]).format('YYYY-MM-DD');
      this.endDate = moment(event[1]).add(1, 'days').format('YYYY-MM-DD');
      this.fileViewDevices();
    }
    else 
    {this.fileviewdate=null 
      this.Dateplaceholder4="Select Date Range"
    }
    
    if (!(info == 'Custom Date')) this.fileViewDevices();
  }
 
  // selecting the list of documents from the html
  fileListDevices(event) {
    if(!event.source._selected){
     this.count3--;

    }
   else if(event.source._selected){
      this.count3++
      this.myplaceHolder = 'Select File';
    }
    if(this.count3==0)
    {   
      this.myplaceHolder = 'Select File';
    }
    else if(this.count3 >0)
    {   
      this.myplaceHolder = null;
    }
    if (event.isUserInput) {
      var check = this.documentsIdDevicesList.some(x => x == event.source.value);
      var docname = this.fileData.find(x => x.name == event.source.value);
      if (event.source.selected && !check && docname) this.documentsIdDevicesList.push(docname._id);
      else if (!check && !event.source.selected && docname) { this.documentsIdDevicesList.splice(this.documentsIdDevicesList.indexOf(docname._id), 1); console.log("else if") }
      if (this.documentsIdDevicesList.length) this.fileViewDevices();
      else this.hideFileViewDeviceChart();
    }
  }

  // display in html
  fileViewDevices() {
    var res: any = {};
    res.where = {};
    var v = moment();
    var start, end;
    // Today
    console.log(this.dateSelected1)
    if (this.dateSelected1 == 'Today') {
      let now = v.format('YYYY-MM-DD');
      res.where.createdAt = { $gte: now + 'T00:00:00.000Z' };
    }
    // Yesterday
    if (this.dateSelected1 == 'Yesterday') {
      start = v.format('MMM-DD-YYYY');
      end = v.subtract(1, 'days').format('YYYY-MM-DD');
      res.where.createdAt = { $gte: new Date(end), $lt: new Date(start) };
    }
    // Custom Date
    if (this.dateSelected1 == 'Custom Date' && this.startDate && this.endDate) {
      res.where.createdAt = { $gte: new Date(this.startDate), $lt: new Date(this.endDate) };
    }
    res.where.message = 'Viewed';
    res.where.documentid = { $in: this.documentsIdDevicesList };
    // if documents are selected
    if (this.documentsIdDevicesList.length) {
      var data = this.today(res);
      data.subscribe(res => {
        this.devicesCount = [];
        this.devicesCount = this.uniqueDeviceCount(this.documentsIdDevicesList, res);
        if (this.devicesCount) this.fileViewDevicesChart();
      })
    }
  }

  uniqueDeviceCount(list, result) {
    console.log("ok")
    var browerCount = [], andriodCount = [], iosCount = []
    this.documentsListDevices.forEach(element => {
      browerCount.push(result.filter(x => x.documentid.name == element && x.deviceName!='Android' && x.deviceName!='iOS').length);   /// inserting the values for browser
      andriodCount.push(result.filter(x => x.documentid.name == element && x.deviceName=='Android').length);   /// inserting the values for andriod    
      iosCount.push(result.filter(x => x.documentid.name == element && x.deviceName=='iOS').length);   /// inserting the values for ios
    });
    return { browerCount, andriodCount, iosCount };
  }

  fileViewDevicesChart() {
    console.log(this.fileViewDeviceChart)
    var v=[]
    var resultfile = []
    this.documentsListDevices = this.documentsListDevices.filter(file =>   file=file.split('.pdf' ) )
    this.documentsListDevices.forEach((element,index) => {
      
       v=element.split('.pdf' || '.doc' || '.docx')
       resultfile.push( v[0])

    });
    if (this.fileViewDeviceChart != undefined || this.fileViewDeviceChart != null) {
      this.fileViewDeviceChart.destroy();
    }
    var ctx = document.getElementById('fileViewDevice-chart');
    if (ctx) {
      ctx.style.display = "";
      this.fileViewDeviceChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: resultfile,
          labelDisplay: "AUTO",
          datasets: [{
            label: "Browser",
            backgroundColor: '#FF8373',
            data: this.devicesCount.browerCount,
          }, {
            label: "Andriod",
            backgroundColor: '#A3A1FB',
            data: this.devicesCount.andriodCount,
          }, {
            label: "Ios",
            backgroundColor: '#56D9FE',
            data: this.devicesCount.iosCount,
          }],
       
      },

        options :{
          tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function(tooltipItem){
                 return this._data.labels[tooltipItem[0].index];
              }
          }
      
            
          },
         hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {

            xAxes: [{
              
              display: true,
              ticks: {
                minRotation :0,
                maxRotation:0,
                autoSkip:false,
               
                callback: function(label, index, labels) {
                  
                  if (label.length>8) {
                    var data='...'
                     if(resultfile.length >8){
                       
                     return label.slice(0, 3).concat(data)
                     }
                     else 
                      // return label.match(/.{3,12}/g);
                     return label.slice(0, 3).concat(data)

                   }else{
                     var data='..'
                     if(resultfile.length <8 ) {
                      return label;
                    }
                    else return label.slice(0, 2).concat(data)
                  }              
                }
              },
            
              
            },
    
            ],
            yAxes: [{
              display: true,
              ticks: {
                callback: function(value, index, values) {
                  if (Math.floor(value) === value) {
                      return value;
                  }
              },
                beginAtZero: true,
                
              },
              beginAtZero: true
            }]
          }
        }
      });
    }
  }

  hideFileViewDeviceChart() {
    var ctx = document.getElementById('fileViewDevice-chart');
    if (ctx) ctx.style.display = "none";
  }

  /////////////////////////////////////////////////////Fileview timing///////////////////////////////////////////////////////////////////////

  fileViewTimings(event) {
    if(!event.source._selected){

      this.count2--;

    }
   else if(event.source._selected){
      this.count2++

    }
    if(this.count2==0)
    {
      this.myplaceHolder2 = 'Select File';
    }
    else if(this.count1 >0)
    {  
      this.myplaceHolder2 = null;
    }
    if (event.isUserInput) {
      var check = this.documentsIdTimingList.some(x => x == event.source.value);
      var docname = this.fileData.find(x => x.name == event.source.value);
      if (event.source.selected && !check && docname) this.documentsIdTimingList.push(docname._id);
      else if (!check && !event.source.selected && docname) { this.documentsIdTimingList.splice(this.documentsIdTimingList.indexOf(docname._id), 1); console.log("else if") }
      if(this.documentsIdTimingList.length) this.FilelistTiming('today');
      else this.hideFileViewTimingChart();
    }
  }

  hideFileViewTimingChart()
  {
    var ctx = document.getElementById('fileViewingTime-chart');
    if (ctx) ctx.style.display = "none";
  }

  FilelistTiming(title) {
    var res: any = {};
    res.where = {};
    var v = moment()
    if (title == "yesterday") {
      this.title = title
      let now = v.subtract(0, 'days').format('YYYY-MM-DD');
      let yesterday = v.subtract(1, 'days').format('YYYY-MM-DD');

      res.where.createdAt = { $gte: yesterday + 'T00:00:00.000Z', $lt: now + 'T00:00:00.000Z' };
      this.Dateplaceholder1="Select Date Range"
      this.Devicedate=null
    }
    else if (title == "today") {
      this.Dateplaceholder2="Select Date Range"
      this.Devicedate=null
      this.title = title
      let now = v.subtract(0, 'days').format('YYYY-MM-DD');
      res.where.createdAt = { $gte: now + 'T00:00:00.000Z' };
    }
    else {
      this.Dateplaceholder2=null
      this.showtoday1=false
      this.showyest1=false
      this.title = "Date"
      let now = moment(title[1]).add(1, 'days').format('YYYY-MM-DD');
      let yesterday = moment(title[0]).format('YYYY-MM-DD');
      res.where.createdAt = { $gte: yesterday + 'T00:00:00.000Z', $lt: now + 'T00:00:00.000Z' };
    }
    console.log( res.where)
    res.where.message = 'Viewed';
    res.where.documentid = { $in: this.documentsIdTimingList };
    var data = this.todayData(res);
    data.subscribe(todayData => {
      // this.documentService.search('documentlogs/filesFilter/', res).subscribe((data: any) => {})
      // this.docListCount = this.todayData(todayData)
      if (todayData) this.fileViewingTimeChart();
    })
  }

  fileViewingTimeChart = async function () {
    var v=[]
    var resultfile = []
    this.documentsListTiming = this.documentsListTiming.filter(file =>   file=file.split('.pdf' ) )
    this.documentsListTiming.forEach((element,index) => {
      
       v=element.split('.pdf' || '.doc' || '.docx')
       resultfile.push( v[0])

    });
    if (this.fileViewTimeChart != undefined || this.fileViewTimeChart != null) {
      this.fileViewTimeChart.destroy();
    }
    var ctx = document.getElementById('fileViewingTime-chart');
    if (ctx) {
      ctx.style.display = "";
      this.fileViewTimeChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: resultfile,
          datasets: [{
            label: "Seconds",
            backgroundColor: "#356890",
            borderColor: "#356890",
            data: this.miniutes,
            fill: false
          }],
        },
        options: this.chartOptions
      });
    }
  }

  date() {
    this.datepicker = true;
  }

  todayData(res): Observable<any> {
    var diff = new Subject<any>()
    this.documentService.search('documentlogs/filesFilter/', res).subscribe((data: any) => {
      this.miniutes = []
      this.tdyResult = data
      this.recentFileList.forEach(element1 => {
        var sum = 0
        var s
        element1.logs = this.tdyResult.filter(option => option.message == "Viewed" && option.documentid._id == element1._id);
        if (element1.logs.length > 0)
          element1.logs.forEach(element => {
            if (element1._id == element.documentid._id) {
              var endDate = moment(element.updatedAt);
              this.result = endDate.diff(element.createdAt, 'seconds');
              s = endDate.diff(element.createdAt, 'seconds')
              sum = s + sum
            }
            diff.next(this.miniutes)
          })
        this.miniutes.push(sum)
        if (this.miniutes) this.fileViewingTimeChart()
      });
    })
    return diff.asObservable();
  }

  piechart()
  {
    if (this.pieChart != undefined || this.pieChart != null) {
      this.pieChart.destroy();
    }
    var ctx = document.getElementById('pie-chart');
    if (ctx) {
      // ctx.style.display = "";
      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["Shared","Partially completed", "Completed"],
            datasets: [{
            backgroundColor: ["#ED6F9D", "#F7C86B","#3cba9f"],
            background: ['','','linear-gradient(to right, rgb(102, 124, 230), rgb(115, 83, 173)'],
            data: [this.pendingList.length,this.InprogressList.length,this.completedList.length]
          }],
       	   },
        options:{}
      });
    }
  }
}
