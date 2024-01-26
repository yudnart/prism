import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TenantDropdownComponent } from './components/tenant-dropdown/tenant-dropdown.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, TenantDropdownComponent, MainLayoutComponent],
  imports: [CommonModule, RouterModule, SidebarComponent],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
