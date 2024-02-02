import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Layout, LayoutService } from './services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly DEFAULT_LAYOUT: Layout = 'main';
  private readonly _subscriptions: Subscription[] = [];
  public layout$ = this._layoutService.layout$;

  constructor(
    private readonly _layoutService: LayoutService,
    private readonly _router: Router,
    private readonly _cdr: ChangeDetectorRef
  ) {
    // Intentionally blank
  }

  public ngOnInit() {
    this._subscriptions.push(
      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (!this._layoutService.hasLayout) {
            this.resetLayout();
          }
          this._cdr.markForCheck();
        }
      })
    );
  }

  public ngAfterViewInit(): void {
    this._subscriptions.push(
      this.layout$.subscribe(() => {
        this._cdr.detectChanges();
      })
    );
  }

  public ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private resetLayout() {
    this._layoutService.setLayout(this.DEFAULT_LAYOUT);
  }
}
