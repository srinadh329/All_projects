import { Component, OnInit } from '@angular/core';
import { AuthardservicesService } from '../../../core/services/authardservices.service';
import { Router} from '@angular/router'
@Component({
  selector: 'app-homebannerevent',
  templateUrl: './homebannerevent.component.html',
  styleUrls: ['./homebannerevent.component.css']
})
export class HomebannereventComponent implements OnInit {

  constructor(private homeservice:AuthardservicesService,private router:Router) { }
  popularevent:any[];
  ngOnInit(): void {
    this.homeservice.homeevent().subscribe((response:any) =>{
      this.popularevent = response.data.items
      console.log(this.popularevent);
    },error =>{
      console.log(error);
    })
  }
  eventadd(){
    this.router.navigate(['dashboard/home/homebannereventdata']);
    // this.router.navigate(['dashboard/home/bannereventdata'])
  }
  edit(event){
    console.log(event)
    // this.router.navigate(['dashboard/home/bannereventdata/'+event])
    this.router.navigate(['dashboard/home/bannereventdata/'+event])
  }
}
