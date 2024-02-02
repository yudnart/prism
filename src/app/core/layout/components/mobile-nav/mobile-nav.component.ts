import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { NavItem, NavigationService } from '@/core';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent implements OnInit, OnDestroy {
  public navItems: NavItem[] = [];
  private readonly _subscriptions: Subscription[] = [];

  constructor(
    private readonly _navService: NavigationService,
    private readonly _router: Router,
    private readonly _cdr: ChangeDetectorRef
  ) {
    // Intentionally blank
  }

  public ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  //#region Component lifecycle

  public ngOnInit() {
    this.navItems = this._navService.navItems;
    this._subscriptions.push(
      this._router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          // Mark for check whenever the route changes
          this._cdr.markForCheck();
        })
    );
  }

  //#endregion

  public isNavItemActive(navItem: NavItem): boolean {
    return this._navService.isActive(navItem);
  }
}
