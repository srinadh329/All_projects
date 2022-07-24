import { Component, OnInit } from '@angular/core';
import {AuthardservicesService } from '../../../core/services/authardservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-homedata',
  templateUrl: './homedata.component.html',
  styleUrls: ['./homedata.component.css']
})
export class HomedataComponent implements OnInit {
  homeData:any[];
  event:any;
  constructor(private homeservice:AuthardservicesService,private formBuilder: FormBuilder,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.homeservice.home().subscribe((response:any)=>{
      console.log(response);
      this.homeData = response.data.items;
    },error =>{
      console.log(error);
    });
  }
  addhomedata(){
    this.router.navigate(['dashboard/home/banner'])
  }
  edit(event){
    console.log(event)
    this.router.navigate(['dashboard/home/banner/'+event])

  }
  
  delete(event){
    console.log(event);
    this.homeservice.deleteBanner(event._id).subscribe((response:any)=>{
      console.log(response);
      var value = this.homeData.findIndex(x=>x._id = event._id);
    if(value!=-1){
      this.homeData.splice(value,1);
      this.router.navigate(['dashboard/home/'])
    }
    },error=>{
      console.log(error);
    })
  }
}
