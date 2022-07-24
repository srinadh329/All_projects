import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/services/app.service';
import { DailogboxComponent } from 'src/app/shared/dailogbox/dailogbox.component';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {
  galleyList: any = [];
  _totalPage:any=0;
  constructor(private appService: AppService,
    private router:Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGalleryList();
  }

  getGalleryList() {
    this.spinner.show()
    this.appService.getGalleryList().subscribe((response: any) => {
    this.spinner.hide()
      if (response.status) {
        this.galleyList = response.data.items || [];
        this._totalPage = response.data.total;
      }
    },error=>{
    this.spinner.hide()
    })
  }



  edit(event: any) {
  this.router.navigate(['admin/gallery/edit/'+event._id])
  }


  delete(event: any) {
    let dialogRef = this.dialog.open(DailogboxComponent, {
      height: '270px',
      width: '450px',
      panelClass: "deletepopup",
      data: { title: 'Delete Gallery' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
       this.deletegallery(event._id)
      }
    })
  }
  deletegallery(id:string) {
    this.spinner.show()
    this.appService.deleteGalleryById(id).subscribe((respone:any)=>{
    this.spinner.hide()
      if(respone.status) {
      // show success toast
      }
    })
  }
}
