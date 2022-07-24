import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  studentDetails: any;
  valueIn:any;
  searchTable: any;
  selectedValues: any;
  dynamicForm:FormGroup;
  searchInput:FormControl;
  radioForm:any;
  // newData:any;
  toppingList: any[] = [{
    value:'non_residence_parking_building',
    key:`No non-resident parking on the buildings property`,
    checked:false
  },
  {
    value:'low_parking_celing_within_garage',
    key:`Low parking ceiling within garage`,
    checked:false

  },
  {
    value:'noise_restriction',
    key:`Noise Restrictions`,
    checked:false
  },
  {
    value:'narrow_hallway',
    key:`Narrow Hallway`,
    checked:false
  },
  {
    value:'building_occupied_with_tenats',
    key:`Building occupied with tenants`,
    checked:false
  }]
  date:any[]= [
 {sgid: 229, delivery_date: "2022-03-07", cart_id: 129, user_id: 98, cart_delivery_time_id: null},
 {sgid: 230, delivery_date: "2022-03-08", cart_id: 129, user_id: 98, cart_delivery_time_id: null},
{sgid: 231, delivery_date: "2022-03-09", cart_id: 129, user_id: 98, cart_delivery_time_id: null}]
time:any[]= [
 {sgid: 2, delivery_time: "9 AM"},
{sgid: 3, delivery_time: "10 AM"},
{sgid: 4, delivery_time: "11 AM"},
{sgid: 5, delivery_time: "12 PM"},
{sgid: 6, delivery_time: "1 PM"},
 {sgid: 7, delivery_time: "2 PM"},
{sgid: 8, delivery_time: "3 PM"}]
date_and_time = [];
date_id:any;
time_id:any;
radioSelected:any;
itemsList=[
  {
      name:'Item 1',
      value:'ALL',
   },
   {
       name:'Item 2',
       value:'Almost New',
    },
    {
        name:'Item 3',
        value:'Value Deal',
     },
];

  constructor(private route:Router,private apiservice:ApiService,
    private formbuilder:FormBuilder,) { 
      this.dynamicForm = this.formbuilder.group({
        // name:['',Validators.required],
        // last:['',Validators.required],
        newData: this.formbuilder.array([
          
        ])
      })
      this.searchInput = new FormControl('test')
      this.radioForm = this.formbuilder.group({
        all:['',Validators.required],
        almostnew:['',Validators.required],
        valueDeal:['',Validators.required]
      })
    }

  ngOnInit(): void {
    
    this.studentDetails = this.apiservice.getUser()
    console.log(this.studentDetails)
    this.searchTable = this.studentDetails
    
    this.dynamicAdd();
  }
  dynamicData(){
    if(this.dynamicForm.valid){
      console.log(this.dynamicForm.value)
    }
  }

  // user create function
    createUser(){
      this.route.navigate(['create'])
    }
  // user create function

  // update function
  update(data:any){
    // console.log(data.id)
    this.route.navigate(['create/'+data.id])
  }

  // update function
  delete(data:any){
    let indexValue = this.studentDetails.findIndex((x:any)=>x.id == data.id)
    console.log(indexValue)
    if(indexValue !=-1){
      this.studentDetails.splice(indexValue,1)
    }
  }
  // update function

  // search function
  searchData(data:any){
    console.log(data)
    console.log(this.searchInput)
    this.studentDetails = this.searchTable.filter((e:any)=>{
      if(String(e.id).includes(data) || e.first.includes(data)
      ||e.last.includes(data)|| String(e.age).includes(data)
      ||e.name.includes(data)|| String(e.subj1_marks).includes(data)
      ||String(e.subj2_marks).includes(data)||String(e.subj3_marks).includes(data)
      ||String(e.subj4_marks).includes(data)||String(e.total).includes(data)
      ||e.status.includes(data)){
        return e
      }
    })
  }
  // search function

  // mat drop down sorting
  selectedValue(data:any){
    console.log(data.value)
    this.selectedValues = data.value
    this.studentDetails.sort((a:any,b:any)=>{
     return this.selectedValues =='high' ? b.total - a.total : a.total - b.total 
    })
  }
  // mat drop down sorting

// table column search
asyn(data:any){
  let value = data
  console.log(value)
  this.studentDetails.sort((a:any,b:any)=>{
    return typeof a[value] ==='number' ? b[value] - a[value] : b[value].localeCompare(a[value]) 
  })
}
desyn(data:any){
  let value = data
  console.log(value)
  this.studentDetails.sort((a:any,b:any)=>{
    return typeof a[value] ==='number' ? a[value] - b[value] : a[value].localeCompare(b[value])
  })
}
// table column search

// dynamic forms
dynamicAdd(){
  this.newData.push(this.formbuilder.group({
    fname:[''],
    lname:[]
  }))
}
dynamicRemove(index:number){
  console.log(index)
  this.newData.removeAt(index)
}
get newData(){
  return this.dynamicForm.get('newData') as FormArray;
}
// getnewData(){
//   return this.dynamicForm.get('newData').controls;
// }
// dynamic forms
radioChange(data:any){
  console.log(data.value);
  console.log(data.checked)
  let index = this.toppingList.forEach((ele)=>{
    console.log(ele.value,ele.checked)
  })
}
// selectDateAndTime(date:any,time:any) {
//   let isExists = this.date_and_time.find((x:any)=> x.date_id == date.sgid)
//    if(isExists) {
//     isExists.time_id = time.sgid
//    } else {
//     this.date_and_time.push({
//     "date_id":date.sgid,
//     "time_id":time.sgid
//       })
//    }
//    console.log(this.date_and_time)
//   }

onItemChange(data:any){
  console.log(data.value)
  let selectedRadioValue = this.itemsList.find(x=>x.value===data.value);
  if(selectedRadioValue?.value === 'ALL'){
    console.log('all')
  }
  else if(selectedRadioValue?.value === 'Almost New'){
    console.log("Almost New")
  }
  else if(selectedRadioValue?.value === 'Value Deal'){
    console.log("Value Deal")
  }
  console.log(selectedRadioValue?.value)
}

}
