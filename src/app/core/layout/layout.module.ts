import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@/@shared/icons/icons.module';
import { LayoutComponent } from './layout.component';
import { LayoutDirective } from './directives/layout.directive';
import {
  MobileNavComponent,
  SidebarComponent,
  TenantDropdownComponent,
  UserMenuComponent,
} from './components';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HoverEffectDirective } from './directives/hover-effect.directive';
import { SharedModule } from '@/@shared/shared.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    LayoutComponent,
    LayoutDirective,
    HoverEffectDirective,
    SidebarComponent,
    TenantDropdownComponent,
    UserMenuComponent,
    MobileNavComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, IconsModule],
  exports: [HoverEffectDirective, LayoutComponent, LayoutDirective],
})
export class LayoutModule {}
