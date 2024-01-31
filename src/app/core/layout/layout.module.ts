import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@/@shared/icons/icons.module';
import { LayoutComponent } from './layout.component';
import { LayoutDirective } from './directives/layout.directive';
import {
  HeaderComponent,
  PageHeaderComponent,
  SidebarComponent,
  TenantDropdownComponent,
  UserMenuComponent,
} from './components';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HoverEffectDirective } from './directives/hover-effect.directive';

@NgModule({
  declarations: [
    MainLayoutComponent,
    LayoutComponent,
    LayoutDirective,
    HeaderComponent,
    HoverEffectDirective,
    SidebarComponent,
    TenantDropdownComponent,
    UserMenuComponent,
    PageHeaderComponent,
  ],
  imports: [CommonModule, RouterModule, IconsModule],
  exports: [HoverEffectDirective, LayoutComponent, LayoutDirective],
})
export class LayoutModule {}
