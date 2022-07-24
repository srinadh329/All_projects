import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appParagraph]'
})
export class ParagraphDirective {

  constructor(private ef:ElementRef) { 
    console.log(this.ef)
    this.ef.nativeElement.style.backgroundColor = 'yellow';
  }

}
