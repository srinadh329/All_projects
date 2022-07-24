import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Key } from 'protractor';
import {AgeValidator} from '../material/customvalidation'
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  user: any;
  state = [
      {name:'Andhra Pradesh',cities:['Vijayawada','Visakhapatnam','Vijayanagaram']},
      {name:'Telangana',cities:['Nalgonda','hyderabad','Medak']}
    ]
  cities: string[] | undefined;
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.user = this.formbuilder.group({
      name:['',[Validators.required,
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z ]*$')
      ]
    ],
      age:['',
            [Validators.required,
              AgeValidator,
              Validators.pattern('^[0-9]*$')
            ]
          ],
          state:['',Validators.required],
          city:['',Validators.required]    
       
    })
   
  }
  stateSelecte(data:any){
    console.log(data.value)
    this.cities = this.state.find((e:any)=>e.name == data.value)?.cities
    console.log(this.cities)
  }
  submit(){
    console.log(this.user.value)
  }
 
}
