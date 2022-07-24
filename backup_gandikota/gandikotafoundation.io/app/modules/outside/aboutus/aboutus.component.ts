import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() { }

  info
  srikanth=true;
  poorna=false;
  chinna=false;
  about
  services
  ngOnInit() {
    this.info=true
    setInterval(function(){
      if(this.srikanth && !this.poorna && !this.chinna){
        document.getElementById('hidesrikanth').click(); 
        this.srikanth=false;
        this.poorna=true;
      }else if(!this.srikanth && !this.poorna && this.chinna){
        this.srikanth=true;
        this.chinna=false;
        this.poorna=false;
        document.getElementById('hidechinna').click();

      }else{
        document.getElementById('hidepoorna').click();
        this.poorna=false;
        this.chinna=true;
        this.srikanth=false
      }
      
    },6000)
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
}
