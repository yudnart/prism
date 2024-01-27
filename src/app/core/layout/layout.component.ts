import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ON_LAYOUT_INIT } from './services/layout.directive';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit {
  private _layoutInit = false;
  private _routerEventListener: Subscription;
  public layout$ = this._layoutService.layout$;

  constructor(
    private readonly _layoutService: LayoutService,
    private readonly _router: Router,
    private readonly _cdr: ChangeDetectorRef
  ) {
    window.addEventListener(ON_LAYOUT_INIT, () => {
      this._layoutInit = true;
    });
    this._routerEventListener = this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.onNavigate();
      }
      if (event instanceof NavigationEnd) {
        if (!this._layoutInit) {
          this.resetLayout();
        }
        this._cdr.detectChanges();
      }
    });
  }

  public ngAfterViewInit(): void {
    this.layout$.subscribe(() => {
      this._cdr.detectChanges();
    });
  }

  public onDispose() {
    this._routerEventListener.unsubscribe();
  }

  private onNavigate() {
    this._layoutInit = false;
  }

  private resetLayout() {
    this._layoutService.setLayout('main');
  }
}
