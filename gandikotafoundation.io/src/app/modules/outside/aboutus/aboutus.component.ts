import { Component, OnInit } from '@angular/core';
import {AppService} from 'src/app/core/services/app.service'

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  about:any;
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.appService.getAboutUs().subscribe((response:any)=>{
      console.log(response)
      this.about = response.data[0]
      console.log(this.about)
    },error =>{
      console.log(error)
    })
  }

}
