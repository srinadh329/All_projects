import { Component, OnInit } from '@angular/core';
import Swiper, { Navigation,Pagination,Autoplay } from 'swiper';
import {AppService} from 'src/app/core/services/app.service'

Swiper.use([Navigation,Pagination,Autoplay]);
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  bannerList:any = [];
  popularList:any = [];
  aboutData:any = [];
  constructor(private appService:AppService) {
   }
  mySwiper: any;
  ngOnInit(): void {
    this.appService.getHomeBanners().subscribe((respnose:any)=>{
      console.log(respnose)
      this.bannerList = respnose.data.items;
      console.log(this.bannerList)
      setTimeout(()=>{
        this.loadSwiper()
      },1000)
    },error =>{
      console.log(error)
    })
    this.appService.getHomeEvents({is_popular:true}).subscribe((response:any)=>{
      console.log(response)
      this.popularList = response.data.items
      console.log(this.popularList)
    },error=>{
      console.log(error)
    })
    this.appService.getAboutUs().subscribe((response:any)=>{
      console.log(response);
      this.aboutData = response.data
    },error =>{
      console.log(error)
    })
  }
  loadSwiper() {
    this.mySwiper= new Swiper('.custom-swiper', { 
    navigation: {
      nextEl: '.custom-next-banner',
      prevEl: '.custom-prev-banner',
    },
    grabCursor: true,
    loop: true,
    preloadImages: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    lazy: true,
    speed: 1000,
    effect: 'slide',
    observer: true,
    observeParents: true
  });
  }
}
