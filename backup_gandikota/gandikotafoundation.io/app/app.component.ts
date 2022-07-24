import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gandikotafoundation';
  constructor( private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title){}
 ngOnInit() {
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
  ).subscribe(() => {
    const childRoute = this.getChild(this.activatedRoute);
    childRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title)
    });
  });
  }
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    }
    else {
      return activatedRoute;
    }
  }

}
