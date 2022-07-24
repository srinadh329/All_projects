import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";

declare var $: any;
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    $(document).ready(function(){

      $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});
  }




  startbtn() {
    let navigationExtras: NavigationExtras = {
        queryParams: {
            "type": "Signup",
        }
    };
    this.router.navigate(["/"], navigationExtras);
}
}
