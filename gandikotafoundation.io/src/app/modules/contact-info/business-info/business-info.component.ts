import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/core/services/app.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss']
})
export class BusinessInfoComponent implements OnInit {
  contactInfo: any
  constructor(
    private apiService: AppService, private router: Router,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit(): void {
    this.getContactInfo()
  }



  getContactInfo() {
    this.spinner.show();
    this.apiService.getContactInfo().subscribe((response: any) => {
      this.spinner.hide();
      if (response.status) {
        this.contactInfo = response.data[0];
      }
    }, error => {
      this.spinner.hide();
    })
  }
}
