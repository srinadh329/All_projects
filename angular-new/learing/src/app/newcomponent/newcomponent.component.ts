import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators,FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-newcomponent',
  templateUrl: './newcomponent.component.html',
  styleUrls: ['./newcomponent.component.scss']
})
export class NewcomponentComponent implements OnInit {
  numberForm:any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.numberForm = this.fb.group({
      title: ['', [Validators.required]]
    });
  }
  
}
