import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { url } from 'inspector';
import {TestserviceService} from '../testservice.service'
@Component({
  selector: 'app-mycard',
  templateUrl: './mycard.component.html',
  styleUrls: ['./mycard.component.scss']
})
export class MycardComponent implements OnInit {

  constructor(private TestserviceService:TestserviceService) { }

  ngOnInit(): void {
    this.TestserviceService.test()
  }

  test(){
    return 1
  }
  
}
