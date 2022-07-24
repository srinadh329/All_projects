import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.scss']
})
export class MainnavComponent implements OnInit {

  constructor(public router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('The id of this route is: ', params);
    });

  }
  // routerlink(data){
  //   this.router.navigate(['/menu/'+data])
  // }

  logout(){
    this.router.navigateByUrl('/');
  }

  
  test(){
    return 1
  }
}
