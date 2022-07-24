
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationCancel, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';
import { Subject } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  loading: boolean;
  userActivity; // user activity check
  userInactive: Subject<any> = new Subject(); // user inactivity

  constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute,
    private appservice: AppService, private toaster: ToastrManager) {
    this.loading = true;
    let currentuser = localStorage.getItem('auth.user');
    if (currentuser != null) {
      this.setTimeout();
      this.userInactive.subscribe(() => {
        currentuser = localStorage.getItem('auth.user');
        if (currentuser != null) {
          this.toaster.errorToastr('Your session is Expired Login Again to continue', '',{ position: 'bottom-center' ,dismiss:'click'})
          this.appservice.logout();
        }
      });
    }
  }

  setTimeout() { 
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 10000000);
  }


  ngOnInit() {
    this.router.events.pipe(map(() => {
      let child = this.activatedRoute.firstChild;
      while (child) {
        if (child.firstChild) {
          child = child.firstChild;
        } else if (child.snapshot.data && child.snapshot.data.title) {
          return child.snapshot.data.title;
        } else {
          return null;
        }
      }
      return null;
    })).subscribe(title => {
      this.titleService.setTitle(title);
    });

  }
  ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        }
        if (event instanceof NavigationEnd) {
          this.loading = false;
        }
        if (event instanceof NavigationCancel) {
          this.loading = false;
        }
        if (event instanceof NavigationError) {
          this.loading = false;
        }
      });
  }
}
