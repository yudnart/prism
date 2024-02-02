/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/directive-selector */
import {
  ContentChildren,
  Directive,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: '[columnHeaderDef]',
})
export class DataGridColumnHeaderDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: '[cellDef]',
})
export class DataGridCellDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: '[columnDef]',
})
export class DataGridColumnDirective {
  @Input() columnDef!: string;
  @ContentChildren(DataGridColumnHeaderDirective)
  columnHeaders!: QueryList<DataGridColumnHeaderDirective>;

  @ContentChildren(DataGridCellDirective)
  cellDefinitions!: QueryList<DataGridCellDirective>;

  public get headerTemplate() {
    return this.columnHeaders.first?.templateRef;
  }

  public get cellTemplate() {
    return this.cellDefinitions.first?.templateRef;
  }
}
