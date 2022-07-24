import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NgwWowService } from 'ngx-wow';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gandikota';
  constructor(private router: Router, private spinner: NgxSpinnerService,private wowService: NgwWowService) {
    this.wowService.init();
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.spinner.show()
    }
    if (event instanceof NavigationEnd) {
      this.spinner.hide()
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.spinner.hide()
    }
    if (event instanceof NavigationError) {
      this.spinner.hide()
    }
  }
}
