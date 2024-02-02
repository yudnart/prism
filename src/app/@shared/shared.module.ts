import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatagridDirective } from './components/datagrid/directives/datagrid.directive';
import {
  DataGridCellDirective,
  DataGridColumnDirective,
  DataGridColumnHeaderDirective,
} from './components/datagrid/directives/datagrid.column-def.directive';

@NgModule({
  declarations: [
    DatagridDirective,
    DataGridColumnHeaderDirective,
    DataGridColumnDirective,
    DataGridCellDirective,
  ],
  imports: [CommonModule],
  exports: [
    DatagridDirective,
    DataGridColumnHeaderDirective,
    DataGridColumnDirective,
    DataGridCellDirective,
  ],
})
export class SharedModule {}
