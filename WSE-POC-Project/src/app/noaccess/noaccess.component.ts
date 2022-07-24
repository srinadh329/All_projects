import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-noaccess',
  templateUrl: './noaccess.component.html',
  styleUrls: ['./noaccess.component.scss']
})
export class NoaccessComponent implements OnInit {

  constructor(private appservice: AppService) { }

  ngOnInit() {
  }
back(){
  this.appservice.userNavigate();
}

}
