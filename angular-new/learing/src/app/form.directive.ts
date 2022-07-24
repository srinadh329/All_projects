import { Directive,ElementRef ,HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appForm]'
})
export class FormDirective {

   @Input() data !:string;
  constructor(private el:ElementRef ) { 
    // el.nativeElement.style.backgroundColor = 'red';
  }
  @HostListener('keypress',['$event'])  keyEvent(event: KeyboardEvent) {   
    let pattern = /[0-9]/;
    let input = String.fromCharCode(event.charCode);
    console.log(this.data)
  // let enter 1 event keycode = 10 , pattern is true
    if(event.keyCode != 8 && !pattern.test(input)){
      event.preventDefault();
    }
  }
}
