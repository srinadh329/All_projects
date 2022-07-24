import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/services/app.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { DailogboxComponent } from 'src/app/shared/dailogbox/dailogbox.component';
@Component({
  selector: 'app-testimonials-listing',
  templateUrl: './testimonials-listing.component.html',
  styleUrls: ['./testimonials-listing.component.scss']
})
export class TestimonialsListingComponent implements OnInit {
  testimonialsList: any = [];
  _totalPage: any = 0;
  constructor(private appService: AppService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTestimonials();
  }

  getTestimonials() {
    this.spinner.show()
    this.appService.getTestimonials().subscribe((response: any) => {
      this.spinner.hide()
      if (response.status) {
        this.testimonialsList = response.data.items || [];
        this._totalPage = response.data.total;
      }
    }, error => {
      this.spinner.hide()
    })
  }



  edit(event: any) {
    this.router.navigate(['admin/testimonials/edit/' + event._id])
  }


  delete(event: any) {
    let dialogRef = this.dialog.open(DailogboxComponent, {
      height: '270px',
      width: '450px',
      panelClass: "deletepopup",
      data: { title: 'Delete Testimonial' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteTestimonial(event._id)
      }
    })
  }


  deleteTestimonial(id: string) {
    this.spinner.show()
    this.appService.deleteTestimonialById(id).subscribe((respone: any) => {
      this.spinner.hide()
      if (respone.status) {
        // show success toast
      }
    })
  }
}
