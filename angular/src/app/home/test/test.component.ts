import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  name:any
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('test');
    console.log(id)
    console.log(this.route.snapshot.queryParams)
    this.name = this.route.snapshot.queryParams.key;
    console.log(this.name)
    // console.log(this.route.snapshot.data['products'])
  }
}
