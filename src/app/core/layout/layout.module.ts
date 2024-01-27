import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@/@shared/icons/icons.module';
import { LayoutComponent } from './layout.component';
import { LayoutDirective } from './services/layout.directive';
import {
  HeaderComponent,
  SidebarComponent,
  TenantDropdownComponent,
} from './components';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    LayoutComponent,
    LayoutDirective,
    HeaderComponent,
    SidebarComponent,
    TenantDropdownComponent,
  ],
  imports: [CommonModule, RouterModule, IconsModule],
  exports: [LayoutComponent, LayoutDirective],
})
export class LayoutModule {}
