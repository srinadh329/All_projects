import { Component, OnInit,AfterViewInit } from '@angular/core';
import Swiper, { Navigation,Pagination } from 'swiper';
Swiper.use([Navigation,Pagination]);
import {AppService} from 'src/app/core/services/app.service'
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements AfterViewInit {
  testimonialList:any = [];
  constructor(private appService:AppService) { }
  mySwiper: any;
  ngOnInit(): void {
    this.appService.getHomeTestimonials().subscribe((response:any)=>{
      console.log(response)
      this.testimonialList = response.data.items
      console.log(this.testimonialList);
    },error =>{
      console.log(error)
    })

  }
  ngAfterViewInit() {
    this.mySwiper= new Swiper('.swiper-testimonials', {
      slidesPerView: 3,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.custom-next-banner',
        prevEl: '.custom-prev-banner',
      },
      loop:true,
      autoplay:true
  });
  }
  
}
