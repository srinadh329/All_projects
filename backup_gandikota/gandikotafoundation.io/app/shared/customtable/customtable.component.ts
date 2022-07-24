import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { PipeTransform, Pipe } from '@angular/core';

@Component({
  selector: 'app-customtable',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css']
})

export class CustomtableComponent implements OnInit {
  @Input() homeTable:any;
  @Output() rowselected = new EventEmitter();
  @Input() popularcontent:any;
  @Output() rowdeleted = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log("hhhg")
  }
  edit(id){
    this.rowselected.emit(id)
  }
  delete(value){
    this.rowdeleted.emit(value);
  }
}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  removedKeys=['_id','image','createdAt','updatedAt']
  transform(value, args:string[]) : any {
    console.log(Object.keys(value))
    return Object.keys(value).filter(x=> !this.removedKeys.includes(x));
  }
 
}
