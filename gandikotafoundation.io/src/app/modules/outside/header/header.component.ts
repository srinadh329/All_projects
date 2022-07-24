import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentRoute: any;
  constructor(private router: Router) {
    console.log(router.url);
    this.currentRoute = router.url.substr(1);
    console.log(this.currentRoute);
   }

  ngOnInit(): void {
  }

}
