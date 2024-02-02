/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Input, OnInit } from '@angular/core';
import { Layout, LayoutService } from '../services/layout.service';

@Directive({
  selector: '[layout]',
})
export class LayoutDirective implements OnInit {
  @Input() layout!: Layout;

  constructor(private readonly layoutService: LayoutService) {
    // Intentionally blank
  }

  public ngOnInit() {
    this.layoutService.setLayout(this.layout, this);
  }
}
