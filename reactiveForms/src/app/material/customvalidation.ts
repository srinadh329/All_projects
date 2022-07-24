import { AbstractControl } from "@angular/forms";

 
 export function AgeValidator(control: AbstractControl){
    if (control.value < 18) {
        console.log(control.value)
      return { 'age': true };
    }
    return null;
  }
  export function passwordConfirming(c:AbstractControl){
    console.log(c.get('password')?.value) 
    if(c.get('password')?.value !== c.get('conformpassword')?.value){
      return { 'password': true };
    }
    return null

  }