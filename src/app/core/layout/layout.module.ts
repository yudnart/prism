import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LayoutDirective } from './layout.directive';
import { MainLayoutModule } from './main-layout';

@NgModule({
  declarations: [LayoutComponent, LayoutDirective],
  imports: [CommonModule, MainLayoutModule, RouterModule],
  exports: [LayoutComponent, LayoutDirective],
})
export class LayoutModule {}
