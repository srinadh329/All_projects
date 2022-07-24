import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {

  @Input() totalAmount:any = null;
  constructor() { }

  ngOnInit(): void {
  }

}
