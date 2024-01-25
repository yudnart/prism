import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent {
  private _isSidebarExpanded = false;
  public get isSidebarExpanded(): boolean {
    return this._isSidebarExpanded;
  }

  public onSidebarExpand(isExpanded: boolean) {
    this._isSidebarExpanded = isExpanded;
  }
}
