import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  propertyName :any;
  constructor(private _router:Router, private render: Renderer2 , private storage:StorageService) { }

  ngOnInit(): void {
    this.propertyName = this.storage.getPropertyName();
  }
  backToLogin() {
    this._router.navigateByUrl('/login'); 
  }

  toggleClass(event: any){
    const className = 'boxShadow';
    const hasClass = event.target.classList.contains(className);
    if(hasClass) {
      this.render.removeClass(event.target, className);
    } else {
      this.render.addClass(event.target, className);
      this.render.addClass(event.target, className);
    }
  }
}
