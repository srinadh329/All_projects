import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-admin-table-filter',
  templateUrl: './admin-table-filter.component.html',
  styleUrls: ['./admin-table-filter.component.scss']
})
export class AdminTableFilterComponent implements OnInit {

  _isReconciliation: boolean;
  searchText = new FormControl({ value: '', disabled: true });
  m = moment();
  myDate = new Date();
  nextDay = this.myDate.setDate(this.myDate.getDate()+1)
  maxDate = dayjs(this.nextDay);
  buildingList: any;
  selected: { startDate: moment.Moment, endDate: moment.Moment };
  initial = false;
  outPutObject: any = {
    search: '',
    startDate: '',
    endDate: '',
    propertyId: '',
    searchString: ''
  }
  disableSearch = true;

  propertyId = '';
  @Output() selectedFilter: EventEmitter<any> = new EventEmitter();
  @Output() export: EventEmitter<boolean> = new EventEmitter();

  @Input() set isReconciliation(value: boolean) {
    this._isReconciliation = value;
  }

  get isReconciliation() {
    return this._isReconciliation;
  }

  constructor(private admin: AdminService) {
    
  }

  ngOnInit(): void {
    this.getBuidlingList();
    this.searchText.valueChanges.pipe(debounceTime(2000), distinctUntilChanged()).subscribe((data) => {
      if (data || data == '') {
        this.outPutObject.searchString = data;
        this.selectedFilter.emit(this.outPutObject);
      }
    })
  }

  getBuidlingList() {
    this.admin.buildingList.subscribe((data) => {
      if (data) {
        this.buildingList = data;
      }
    })
  }

  onCategoryChange(val: any) {
    if (val || val == '') {
      if (val == '') {
        this.searchText.disable({ onlySelf: true, emitEvent: false });
      }
      else {
        this.searchText.enable({ onlySelf: true, emitEvent: false });
      }
      this.outPutObject.propertyId = val;
      this.selectedFilter.emit(this.outPutObject);
    }
  }

  formattedDate(data: any) {
    if (data) {
      return `${(data.$M + 1)}/${data.$D}/${data.$y}`
    }
    return ''
  }

  change(event: any) {
    console.log(event)
    if (event.startDate != null && event.endDate != null) {
      this.outPutObject.startDate = this.formattedDate(this.selected?.startDate);
      this.outPutObject.endDate = this.formattedDate(this.selected?.endDate);
      this.selectedFilter.emit(this.outPutObject);
    }
  }

  exportPdf() {
    this.export.emit(true);
  }
}
