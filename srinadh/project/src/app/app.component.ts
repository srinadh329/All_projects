import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  job='tommorow i will get'
  ngOnInit(): void {

  }

  test(data){
console.log(data)
  }
}

