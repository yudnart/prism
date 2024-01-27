import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tenant-dropdown',
  templateUrl: './tenant-dropdown.component.html',
  styleUrls: ['./tenant-dropdown.component.scss'],
})
export class TenantDropdownComponent {
  @Input() tenants: string[] = [];
}
