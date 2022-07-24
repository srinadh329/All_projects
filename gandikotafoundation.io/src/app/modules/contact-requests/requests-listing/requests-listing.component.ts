import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/services/app.service';
import { DailogboxComponent } from 'src/app/shared/dailogbox/dailogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-requests-listing',
  templateUrl: './requests-listing.component.html',
  styleUrls: ['./requests-listing.component.scss']
})
export class RequestsListingComponent implements OnInit {
  contactRequestList: any = [];
  _totalPage: any = 0;
  constructor(private appService: AppService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getContactRequestsList();
  }

  getContactRequestsList() {
    this.spinner.show()
    this.appService.getContactRequestsList().subscribe((response: any) => {
      this.spinner.hide()
      if (response.status) {
        this.contactRequestList = response.data.items || [];
        this._totalPage = response.data.total;
      }
    }, error => {
      this.spinner.hide()
    })
  }

  viewRequest(id: any) {
    this.router.navigate(['/admin/contact-requests/view/' + id])
  }

  edit(event: any) {
   this.router.navigate(['admin/contact-requests/view/'+event._id])
  }

  delete(event: any) {
    let dialogRef = this.dialog.open(DailogboxComponent, {
      height: '270px',
      width: '450px',
      panelClass: "deletepopup",
      data: { title: 'Delete Contact Request' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteContactRequest(event._id)
      }
    })
  }

  deleteContactRequest(id: string) {
    this.spinner.show()
    this.appService.deleteContactRequestById(id).subscribe((response: any) => {
      this.spinner.hide()
      if (response.status) {
        // show success toast
      }
    })
  }
}
