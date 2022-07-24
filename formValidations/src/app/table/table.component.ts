import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  rowData: any;
  columnDefs:any;
  autoGroupColumnDef:any
  constructor(private authApi:AuthService) {

    this.rowData = this.authApi.getUser()
    console.log(this.rowData)
    this.columnDefs = [
      { field: 'name',sortable: true,filter: true,editable: true },
      { field: 'subj1_marks',sortable: true},
      { field: 'subj2_marks',sortable: true},
      { field: 'subj3_marks',sortable: true},
      { field: 'subj4_marks',sortable: true},
      { field: 'total',sortable: true},
      { field: 'status',sortable: true}
    ]
   

   }

  ngOnInit(): void {
   
  }
  

}
