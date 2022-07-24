import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appForm]'
})
export class FormDirective {

  constructor() { }

  @HostListener ('keypress' , ['$event']) form(event:KeyboardEvent){
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
