import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatagridDirective } from './components/datagrid/directives/datagrid.directive';
import {
  DataGridCellDirective,
  DataGridColumnDirective,
  DataGridColumnHeaderDirective,
} from './components/datagrid/directives/datagrid.column-def.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    DatagridDirective,
    DataGridColumnHeaderDirective,
    DataGridColumnDirective,
    DataGridCellDirective,
    SafeHtmlPipe,
  ],
  imports: [CommonModule],
  exports: [
    DatagridDirective,
    DataGridColumnHeaderDirective,
    DataGridColumnDirective,
    DataGridCellDirective,
    SafeHtmlPipe,
  ],
})
export class SharedModule {}
