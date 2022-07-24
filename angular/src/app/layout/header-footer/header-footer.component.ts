import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {
  student_details:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.student_details = [
      {'id':1,name: 'jhon',age: 12,},
      {'id':2, name: 'rita', age: 32,},
      {'id':3,'foo':'bar'},
      {'id':4,'foo':'bar'},
    ]
  }
  search(event:any){
    let data = event.target.value;
    console.log(data)
    if(data != ""){
      this.router.navigate(['/home/123'],{queryParams:{key:data}})
    }
    
  }
}
