import { Component, OnInit,AfterViewInit } from '@angular/core';
import Swiper, { Navigation,Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
Swiper.use([Navigation,Pagination]);
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit  {
  constructor() { }
  mySwiper: Swiper;
  
  ngOnInit() {
    let anothernode=document.createElement('script');
    anothernode.type = 'text/javascript';
    anothernode.src = "assets/js/owl.carousel.min.js";
   document.getElementsByTagName('body')[0].appendChild(anothernode);
this.loadscript();
  }
loadscript(){
  let anothernode=document.createElement('script');
  anothernode.type = 'text/javascript';
  anothernode.src = "assets/js/slider.js";
 document.getElementsByTagName('body')[0].appendChild(anothernode);
  let node = document.createElement('script');
  node.type = 'text/javascript';
      node.src = "assets/js/testimonial-slider.js";
      document.getElementsByTagName('body')[0].appendChild(node);

}
ngAfterViewInit() {
  this.mySwiper= new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
    },  
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
}
}