import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/core/services/app.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-abouts-info',
  templateUrl: './abouts-info.component.html',
  styleUrls: ['./abouts-info.component.scss']
})
export class AboutsInfoComponent implements OnInit {
  aboutInfo:any
  constructor(private apiService:AppService,
    private spinner: NgxSpinnerService) {
     }

  ngOnInit(): void {
    this.getAboutInfo()
  }

  
  getAboutInfo() {
    this.spinner.show()
    this.apiService.getAboutInfo().subscribe((response:any)=>{
      this.spinner.hide()
      if(response.status) {
        this.aboutInfo = response.data[0];
      }
    },error=>{
      this.spinner.hide()
    })
  }
}
