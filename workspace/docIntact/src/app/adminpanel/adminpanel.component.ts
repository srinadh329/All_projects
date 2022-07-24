import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { DocumentService } from '../document.service';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';


@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
displayedColumns: string[] = ['name', 'type', 'active','view'];
dataSource: MatTableDataSource<Users>;
@ViewChild(MatPaginator) paginator: MatPaginator;

  Allusers:any=[]
  constructor(private documentService: DocumentService,private userService:UserService,public dialog: MatDialog) { }
  filterData:any;
  filterdata1;
  selected;
  today;
  fromdate;
  todate;
  Usersdata:any
  type
  active
  search

  ngOnInit() 
  {
    this.userService.getRegisteredUsers().subscribe((data:any) => {
      this.Allusers = data
      this.dataSource = new MatTableDataSource(this.Allusers);
      this.dataSource.paginator = this.paginator;
  })
  }

  //User status whether active or block
  userStatusUpdate(user, status) 
  {
    let st=status?'Un Block':'Block'
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'needtoblockaccount' ,blockMsg: 'Are you want to '+st+' the account?'}, disableClose: true, width: '500px', panelClass: "deletemod" });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        user.status = status
        this.userService.userStatusUpdate(user).subscribe(data => {
          this.documentService.openSnackBar("Account is " + st, 'X');
        });
      }
    })
  }

  //filtering
  filterdate(search) 
  {
    this.filterData = {};
    this.filterData.where = {};
    let d = new Date(search.value.fromdate);
    let sevenDaysFromNow = d.setDate(d.getDate() + 0);
    let FromNow = new Date(sevenDaysFromNow)
    let d1 = new Date(search.value.todate);
    let sevenDaysFromNow1 = d1.setDate(d1.getDate() + 1);
    let To = new Date(sevenDaysFromNow1)
    if (search.value.type)
      this.filterData.where.type = search.value.type;
    if (search.value.active)
      this.filterData.where.active = search.value.active;
    if (search.value.fromdate)
      this.filterData.where.created_at = { $gte: FromNow }
    if (search.value.todate)
      this.filterData.where.created_at = { $lt: To }
    if (search.value.fromdate && search.value.todate)
      this.filterData.where.created_at = { $gte: FromNow, $lt: To }
    this.userService.filterusers(this.filterData).subscribe((data:any) => {
      this.Allusers = data;
    });
  }

  //cancel for filter
  cancel(data)
  {
    data.resetForm();
  }

//Sort Name in Ascending Order
sortNameAsc() 
{
    this.Allusers.sort(function (a, b) {
      var nameA = a.name
      var nameB = b.name
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
}

// Sort Name in Descending Order
sortNameDsc() 
{
    this.Allusers.sort(function (a, b) {
      var nameA = a.name
      var nameB = b.name
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
  }

  //Sort Name in Ascending Order
sortEmailAsc() 
{
    this.Allusers.sort(function (a, b) {
      var emailA = a.email
      var emailB = b.email
      if (emailA > emailB) { return 1; }
      if (emailA < emailB) { return -1; }
      return 0;
    })
}

// Sort Name in Descending Order
sortEmailDsc() 
{
    this.Allusers.sort(function (a, b) {
      var emailA = a.email
      var emailB = b.email
      if (emailA < emailB) { return 1; }
      if (emailA > emailB) { return -1; }
      return 0;
    })
  }

// Sort Type in Ascending Order
  sortTypeAsc() 
  {
    this.Allusers.sort(function (a, b) {
      var nameA = a.type
      var nameB = b.type
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }

// Sort Type in Descending Order
  sortTypeDsc() 
  {
    this.Allusers.sort(function (a, b) {
      var nameA = a.type
      var nameB = b.type
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
  }

// Searching All Users
searchBackend(search){
    var data ={search:search.value.search}
    // if(data.search!=""){
    this.userService.Searchuser(data).subscribe(data=>{
      this.Allusers=data 
    })
  // }
}
}
export interface Users {
  name: string;
}