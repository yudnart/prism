import { Injectable } from '@angular/core';
import { ActivatedRoute, IsActiveMatchOptions, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private _navItems: NavItem[] = [];

  public get navItems() {
    if (!this._navItems) {
      this._navItems = this.getTopLevelRoutes();
    }
    return this._navItems;
  }

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    this._navItems = this.getTopLevelRoutes();
  }

  public isActive(navItem: NavItem): boolean {
    if (navItem.path === '') {
      // Special handling for root route
      return this._router.url === '/' || this._router.url === '';
    } else {
      const routeUrl = this._router.createUrlTree([navItem.path]);
      const options: IsActiveMatchOptions = {
        paths: 'exact',
        queryParams: 'ignored',
        matrixParams: 'ignored',
        fragment: 'ignored',
      };
      return this._router.isActive(routeUrl, options);
    }
  }

  private getTopLevelRoutes() {
    return this._router.config
      .filter(route => route.data)
      .map(
        route =>
          ({
            id: route.data?.['id'],
            parentId: route.data?.['parentId'],
            title: route.data?.['title'],
            icon: route.data?.['icon'],
            path: route.path,
          }) as NavItem
      );
  }
}

export interface NavItem {
  id: string;
  parentId?: string;
  path: string;
  title: string;
  icon: string;
}
