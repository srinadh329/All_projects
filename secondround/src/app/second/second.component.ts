import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  @Input() data:any;
  @Output() parent = new EventEmitter<any>();
  childview='child data pass to parent'
  constructor() { }

  ngOnInit(): void {
    this.parent.emit('childview')
  }

}
