import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
content:any;
  constructor(private router:Router,) { }

  ngOnInit(): void {
  }

  test(){
    this.router.navigate(['/home/123'],{queryParams:{'venkatesh':'test','date':"12-1-2022"}})
  }

}
