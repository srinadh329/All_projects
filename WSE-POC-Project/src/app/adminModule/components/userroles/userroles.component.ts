import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.scss']
})
export class UserrolesComponent implements OnInit {
  name:any;
  userrolesheaders = [{h:'Role ID',k:'roleid'},{h:'Role',k:'roltyp'},{h:'Status',k:''}, {h:'Action',k:''}];
  userroleslist = []
  searchData: any;
  constructor(public dialog: MatDialog, private adminservice: AdminService) { }

  ngOnInit() {
    this.getRoles()
  }
  addRoles(): void {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '280px',
      data: { title: 'Add Role', dialogType: 'addroles' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'added') {
        this.getRoles();
      }
    });

  }

  getRoles() {
    this.adminservice.getUserrole().subscribe((data: any) => {
      this.userroleslist = data;
      this.searchData = data;
      console.log(this.searchData)

    })
  }

  editRoles(roles): void {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '280px',
      data: { title: 'Edit Role', dialogType: 'editroles', formdata: roles }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Ediited') {
        this.getRoles();
      }
    });
  }

  search(text) {
    this.userroleslist = this.searchData.filter(e=>{
      if(e.roleid.toString().includes(text) || e.roltyp.includes(text.toUpperCase())){
        return e;
      }
    });
  }
}
