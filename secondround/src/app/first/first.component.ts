import { Component, OnInit, Output,Input,EventEmitter } from '@angular/core';
import * as rxjs from "rxjs"
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  // @Input() parent:any;
  subscription:any
  // @Output() child = new EventEmitter<string>();
  view="parent data pass to child"
  list=['one','two','three','four','five'];
  jsonlist=[
    {'name':'siva'},
    {'name':'srinadh'},
    {'name':'sivasrinadh'},
    {'name':'srinadhsiva'},
  ]
  data=[
    {'name':'siva'},
    {'name':'srinadh'},
    {'name':'sivasrinadh'},
    {'name':'srinadhsiva'},
  ]
  iddata=[
    {id:1, 'name':'first'},
    {id:2, 'name':'second'},
    {id:3, 'name':'third'},
    {id:4, 'name':'fourth'},

  ]
  childdata: any;
  constructor() { }

  ngOnInit(): void {
    this.list.push('congitive');
    this.data.push({'name':'cognitive'});
//     const observable = rxjs.Observable.create(observer => {
//       console.log('Text inside an observable');
//       observer.next('Hello world!');
//       observer.complete();
//     });
// setTimeout(() => {
//   observable.subscribe((message)=> console.log(message));

// }, 5000);
 const observable = rxjs.Observable.create(response=>{
   console.log('text inside an observable');
   response.next('hello world');
   response.complete();
 })
 setTimeout(()=>{
   observable.subscribe((message)=>console.log(message));
 });
 const promise = new Promise((resolve, reject) => {
  console.log('Text inside promise');
  resolve('Hello world!');
});
setTimeout(()=>{
  promise.then((message)=>console.log(message));
});

console.log('Before calling then method on Promise');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
}
  remove(){
    this.data.splice(0,1);
   
  }

  test(data){
    console.log(data)
    this.childdata=data
  }
  delete(data){
    var index= this.iddata.findIndex(x=>x.id==data.id)
    if(index!=-1){
      this.iddata.splice(index,1);
    }
  }
}
