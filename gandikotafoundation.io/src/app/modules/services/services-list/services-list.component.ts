import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/services/app.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { DailogboxComponent } from 'src/app/shared/dailogbox/dailogbox.component';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  servicesList: any = [];
  _totalPage: any = 0;
  constructor(private appService: AppService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.spinner.show()
    this.appService.getServices().subscribe((response: any) => {
      this.spinner.hide()
      if (response.status) {
        this.servicesList = response.data.items || [];
        this._totalPage = response.data.total

      }
    }, error => {
      this.spinner.hide()
    })
  }



  edit(event: any) {
    console.log(event)
    this.router.navigate(['admin/services/create/'+event._id])
  }

  delete(event: any) {
    let dialogRef = this.dialog.open(DailogboxComponent, {
      height: '270px',
      width: '450px',
      panelClass: "deletepopup",
      data: { title: 'Delete Service' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
       this.deleteService(event._id)
      }
    })
  }


  deleteService(id:string) {
    this.spinner.show()
    this.appService.deleteServiceById(id).subscribe((respone:any)=>{
    this.spinner.hide()
      if(respone.status) {
      // show success toast
      }
    })
  }
}
