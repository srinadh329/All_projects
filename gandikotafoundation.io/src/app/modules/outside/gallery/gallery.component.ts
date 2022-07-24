import { Component, OnInit } from '@angular/core';
import {AppService} from 'src/app/core/services/app.service'
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  galleryList:any = [];
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.appService.getHomeGallery({size:false}).subscribe((response:any)=>{
      console.log(response)
      this.galleryList = response.data.items
      console.log(this.galleryList)
    },error =>{
      console.log(error)
    })
  }

}
