import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PipeTransform, Pipe } from '@angular/core';


@Component({
  selector: 'app-customtable',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.scss']
})
export class CustomtableComponent implements OnInit {
  @Input() homeTable: any = [];
  @Output() rowselected = new EventEmitter();
  @Output() rowsdeleted = new EventEmitter();

  columns!: Array<any>
  displayedColumns!: Array<any>
  dataSource: any
  removedKeys: any = ['_id', 'image', 'createdAt', 'updatedAt']

  constructor() {
  }


  ngOnInit(): void {
    this.loadTale();
  }

  edit(id: any) {
    this.rowselected.emit(id)
  }

  loadTale() {
    const columns = this.homeTable
      .reduce((columns: any, row: any) => {
        return [...columns, ...Object.keys(row)]
      }, [])
      .reduce((columns: any, column: any) => {
        return columns.includes(column)
          ? columns
          : [...columns, column]
      }, [])
    // Describe the columns for <mat-table>.
    this.columns = columns.map((column: any) => {
      return {
        columnDef: column,
        header: column,
        cell: (element: any) => `${element[column]}`
      }
    })
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.displayedColumns = this.displayedColumns.filter(x => !this.removedKeys.includes(x));
    this.displayedColumns.push('actions')
    // Set the dataSource for <mat-table>.
    this.dataSource = this.homeTable
  }

  delete(element:any) {
    this.rowsdeleted.emit(element)
  }
  onPageChange(event:any){
console.log(event)
  }
}
