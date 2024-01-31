/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  HostListener,
  HostBinding,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  selector: '[hoverEffect]',
})
export class HoverEffectDirective {
  @HostBinding('class.hovered') isHovered = false;

  @Output() hoverStart = new EventEmitter();
  @Output() hoverEnd = new EventEmitter();

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
    this.hoverStart.emit();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
    this.hoverEnd.emit();
  }
}
