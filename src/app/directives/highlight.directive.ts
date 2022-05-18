import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener("mouseenter") onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = "red";
  }

  constructor(
    private element: ElementRef
  ) {

  }

}
