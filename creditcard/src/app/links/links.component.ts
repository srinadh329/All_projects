import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  link='';
  hrefs = [];
  // attributes='';
  constructor(private elementRef: ElementRef) { 
  
  }

  ngOnInit(): void {
    
  }
 
  ngAfterViewInit(){
    var link= document.getElementsByTagName('a');
    console.log(link);
  }
}
