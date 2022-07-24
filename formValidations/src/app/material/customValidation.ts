import { AbstractControl, FormGroup } from "@angular/forms";

// export function customValidation =>{
//     public static ageValidation(contorl:AbstractControl)=>{
//         console.log(contorl.value)
//         return contorl.value < 18 ? {'aboveAge':true} : null
//     }

// }


// export function Validation(p:AbstractControl){
//     console.log(p.value)
//     return p.value.password !== p.value.conformpassword ? {'password':true} : null
// }

export class customValidation {

    public  static ageValidation(control: AbstractControl) {
        return control.value && control.value < 18 ? {'aboveAge':true} : null
   }

   public static PasswordValidation(control: FormGroup) {
        if(control.value.spassword !== control.value.sconformpassword) {
            control.controls['sconformpassword'].setErrors({'NotMatched':true})
        }
        return 
   }
   
   public static firstPasswordValidation(control: FormGroup) {
    if(control.value.fpassword !== control.value.fconformpassword) {
        control.controls['fconformpassword'].setErrors({'NotMatched':true})
    }
    return 
}
}