import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TenantDropdownComponent } from './components/tenant-dropdown/tenant-dropdown.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MobileNavComponent,
    TenantDropdownComponent,
    MainLayoutComponent,
  ],
  imports: [CommonModule, SidebarComponent],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
