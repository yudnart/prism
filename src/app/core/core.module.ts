import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout';

@NgModule({
  declarations: [],
  imports: [CommonModule, LayoutModule],
  exports: [CommonModule, LayoutModule],
})
export class CoreModule {}
