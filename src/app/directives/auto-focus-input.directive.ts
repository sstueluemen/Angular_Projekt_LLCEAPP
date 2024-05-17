import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[llceaeAutoFocusInput]'
})
export class AutoFocusInputDirective implements AfterContentInit {
@Input() public appAutoFocus: boolean = false

  constructor(
    private elem: ElementRef) { }

  public ngAfterContentInit() {
    setTimeout(() => {
      this.elem.nativeElement.focus();
    }, 500)
  }
}
