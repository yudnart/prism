/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Input, OnInit } from '@angular/core';
import { Layout, LayoutService } from '../services/layout.service';

export const ON_LAYOUT_INIT = 'ON_LAYOUT_INIT';
@Directive({
  selector: '[layout]',
})
export class LayoutDirective implements OnInit {
  @Input() layout!: Layout;

  constructor(private readonly layoutService: LayoutService) {
    /**
     * This is a hack to get around the fact that Angular doesn't have a way to
     * check if a directive exist. The layout component needs a way to
     * determine if a directive exist in order to set the layout.
     */
    window.dispatchEvent(new Event(ON_LAYOUT_INIT));
  }

  public ngOnInit() {
    this.layoutService.setLayout(this.layout);
  }
}
