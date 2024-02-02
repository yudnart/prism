import { Component, Input } from '@angular/core';
import { UserContextService } from '@/core/services/user-context.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  @Input() isExpanded = false;

  public get user() {
    return this.__userContext.user;
  }

  public get username() {
    return `${this.user.giveName} ${this.user.surname}`;
  }

  public get jobTitle() {
    return this.user.jobTitle;
  }

  constructor(private readonly __userContext: UserContextService) {
    // Intentionally blank
  }

  // Method to get the initial from the user name
  public getUserInitials(): string {
    const initials = this.user.giveName.charAt(0) + this.user.surname.charAt(0);
    return initials.toUpperCase();
  }

  public onClicked($event: MouseEvent) {
    $event.stopPropagation();
  }
}
