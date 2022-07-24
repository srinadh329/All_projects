import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DailogboxComponent } from 'src/app/shared/dailogbox/dailogbox.component';
@Component({
  selector: 'app-admin-home-banner',
  templateUrl: './admin-home-banner.component.html',
  styleUrls: ['./admin-home-banner.component.scss']
})
export class AdminHomeBannerComponent implements OnInit {
  homebannerdata:any;
  id:any;
  constructor(private adminhomebannerservice:AuthService,
    private router:Router, 
    private route:ActivatedRoute,
    public dialog: MatDialog) { }
  _totalPage:any=0;
  query:any
  ngOnInit(): void {
    this.adminhomebannerservice.homebannerget().subscribe((response:any)=>{
      console.log(response);
      this.homebannerdata = response.data.items;
      this._totalPage = response.data.total;
    },error =>{
      console.log(error);
    })
  }
  createbanner(){
    this.router.navigate(['dashboard/home/banner'])
  }
  edit(event:any){
    console.log(event)
    this.router.navigate(['admin/home/create/'+event._id])
  }
  delete(event:any){
    let dialogRef = this.dialog.open(DailogboxComponent, {
      height: '270px',
      width: '450px',
      panelClass: "deletepopup",
      data: { title: 'Delete Service' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
       this.deleteData(event._id)
      }
    })
  }
  deleteData(id:string) {
    this.adminhomebannerservice.deleteBannerById(id).subscribe((response:any)=>{
      if(response.status){
        var index = this.homebannerdata.findIndex((x:any)=>x._id==id);
        if(index !=-1) {
          this.homebannerdata.splice(index,1)
        } 
      }
    })
  }

  onSearchChange(event:any) {

  }
}
