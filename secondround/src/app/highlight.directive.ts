import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private ef:ElementRef) { 
    this.ef.nativeElement.style.backgroundColor='red';
  }

}
