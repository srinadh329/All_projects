import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-onlineusers',
  templateUrl: './onlineusers.component.html',
  styleUrls: ['./onlineusers.component.scss']
})
export class OnlineusersComponent implements OnInit {
  name:any;
  constructor(private AdminService:AdminService) { }
  onlineusersheaders=['User ID','Email ID','Emirates ID','GC Number',];
 onlineuserslist=[
   {id:'user01',email:"ui@gmail.com",emiratesid:'123456',gcnumber:'57375775777'}
 ]
  ngOnInit() {
  }
  search(event) {
    this.AdminService.text = event;
  }
}
