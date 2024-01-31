import { Component, OnInit } from '@angular/core';
import { NavItem, NavigationService } from '@/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  private _isSidebarExpanded = false;
  public get isSidebarExpanded(): boolean {
    return this._isSidebarExpanded;
  }

  public navItems: NavItem[] = [];

  constructor(private readonly _navService: NavigationService) {
    // Intentionally blank
  }

  //#region Component lifecycle

  public ngOnInit() {
    this.navItems = this._navService.navItems;
  }

  //#endregion

  public onSidebarExpand(isExpanded: boolean) {
    this._isSidebarExpanded = isExpanded;
  }
}
