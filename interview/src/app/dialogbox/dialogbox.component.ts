import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TestService} from "../test.service"
@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {
  myform:any;
  signform:any;
  email='venki'
  constructor(public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder,
    private testservice :TestService) { 
      console.log('first load')
    }
    ngOnChanges()	{
      console.log('secong load')
    }
    ngDoCheck()	{
  console.log('fourth load')

}
ngAfterContentInit()	{
  console.log('five load')

}
ngAfterContentChecked(){
  console.log('six load')

}
ngAfterViewInit()	{
  console.log('seven load')

}
ngAfterViewChecked(){
  console.log('eight load')

}
ngOnDestroy(){
  console.log('nine load')

}
  ngOnInit(): void {
    console.log('thired load')

    this.myform = this.formBuilder.group({
      emailid: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.signform = this.formBuilder.group({
      emailid: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.testservice.details().subscribe(response=>{
      console.log(response)
    })
  }
  btnClick(data){
    if(data.valid){
      console.log(data.value)
      this.testservice.signup(data.value).subscribe(response=>{
        console.log(response)
      })

    }else {
      console.log(data.value)
    }
  }
  login(data){
    if(data.valid){
      this.testservice.logindetails(data.value).subscribe(response=>{
        console.log(response)
      })
    }
    else{
      console.log(data.value)
    }
    console.log(data.value)
  }
 
}
