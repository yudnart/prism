import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { LayoutDirective } from '../directives/layout.directive';
import { NavigationStart, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly _layoutSubject = new BehaviorSubject<Layout>('simple');
  private _hasLayout = false;

  public layout$ = this._layoutSubject.asObservable();
  public get hasLayout() {
    return this._hasLayout;
  }

  constructor(private readonly _router: Router) {
    this.subscribeToNavigationStart();
  }

  public setLayout(layout: Layout, sender: unknown = null) {
    this._layoutSubject.next(layout);
    if (sender instanceof LayoutDirective) {
      this._hasLayout = true;
    }
  }

  private subscribeToNavigationStart() {
    // Only subscribe to NavigationEnd events
    this._router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe({
        next: () => {
          this._hasLayout = false;
        },
        error: error => {
          console.error('Error subscribing to router events:', error);
        },
      });
  }
}

export type Layout = 'simple' | 'main';
