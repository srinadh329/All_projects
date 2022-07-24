import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl,FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StorageService} from '../../../services/storage.service'
@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent implements OnInit {

  selected: any;
  SearchValue:any;
 @Output() searchInputChange = new EventEmitter();
  valueIn:any;
  searchText = new FormControl();
  constructor(private storageService:StorageService) {
   }

  ngOnInit(): void {
    this.searchText.valueChanges.pipe(debounceTime(2000), distinctUntilChanged()).subscribe((data:any) => {
      if (data || data == '') {
        this.searchInputChange.emit(data);
      }
    })
  }
}
