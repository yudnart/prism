import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  @Input() isExpanded = false;

  // User details can be fetched from a service or input, for example
  public userName = 'Duy Tran';
  public userRole = 'Creative Director';
  public userImage: string | null = null;

  // Method to get the initial from the user name
  public getUserInitials(): string {
    const names = this.userName.split(' ');
    const initials = names.map(name => name.charAt(0)).join('');
    return initials.toUpperCase(); // Ensure the initials are uppercase
  }
}
