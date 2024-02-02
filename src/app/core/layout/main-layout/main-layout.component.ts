import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  private _isSidebarExpanded = false;
  public get isSidebarExpanded(): boolean {
    return this._isSidebarExpanded;
  }

  public onSidebarExpand(isExpanded: boolean) {
    this._isSidebarExpanded = isExpanded;
  }
}
