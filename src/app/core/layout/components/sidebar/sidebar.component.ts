/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, Subscription, debounceTime, filter } from 'rxjs';
import { NavItem, NavigationService } from '@/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  private readonly DEBOUNCE_DELAY = 100;
  private readonly IS_PINNED_DEFAULT = false;
  private readonly MD_BREAKPOINT = 768;
  private readonly _clickSubject = new Subject<MouseEvent>();
  private readonly _resizeSubject = new Subject<UIEvent>();
  private readonly _subscriptions: Subscription[] = [];
  private _isExpanded = false;
  private _isPinned!: boolean;

  @Output() expand = new EventEmitter<boolean>();

  public navItems: NavItem[] = [];

  constructor(
    private readonly _navService: NavigationService,
    private readonly _router: Router,
    private readonly _cdr: ChangeDetectorRef
  ) {
    this.initializeSubscriptions();
  }

  private initializeSubscriptions() {
    this._subscriptions.push(
      ...[
        this._clickSubject
          .asObservable()
          .pipe(debounceTime(this.DEBOUNCE_DELAY))
          .subscribe($event => this.handleClicked($event)),
        this._resizeSubject
          .asObservable()
          .pipe(debounceTime(this.DEBOUNCE_DELAY))
          .subscribe(() => this.handleWindowResized()),
        this._router.events
          .pipe(filter(event => event instanceof NavigationStart))
          .subscribe({
            next: () => {
              this._cdr.markForCheck();
            },
            error: error => {
              console.error('Error subscribing to router events:', error);
            },
          }),
      ]
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  //#region Component lifecycle

  public ngOnInit() {
    this.navItems = this._navService.navItems;
    this.isPinned = this.IS_PINNED_DEFAULT;
  }

  //#endregion

  /**
   * Whether the sidebar is expanded.
   */
  public get isExpanded(): boolean {
    const isNarrowed = window.innerWidth < this.MD_BREAKPOINT;
    return isNarrowed ? this._isExpanded : this.isPinned;
  }
  public set isExpanded(value: boolean) {
    this._isExpanded = value;
    this._cdr.markForCheck();
    this.expand.emit(this._isExpanded);
  }

  /**
   * Pinning the sidebar will keep it expanded
   * when the viewport width > medium breakpoint.
   */
  public get isPinned(): boolean {
    return this._isPinned;
  }
  public set isPinned(value: boolean) {
    this._isPinned = value;
    this.onPinStateToggled();
  }

  public isNavItemActive(navItem: NavItem): boolean {
    return this._navService.isActive(navItem);
  }

  //#region Events

  public onClicked(e: MouseEvent) {
    this._clickSubject.next(e);
  }

  public onKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.togglePinState();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResized(e: UIEvent) {
    this._resizeSubject.next(e);
  }

  //#endregion

  //#region Internals

  private handleClicked($event: MouseEvent) {
    const isNavItemClicked =
      ($event.target as HTMLElement).closest('.nav-item') !== null;
    if (isNavItemClicked) {
      this.toggleExpand(false, false);
    } else {
      this.togglePinState();
    }
  }

  private handleWindowResized() {
    const isNarrowed = window.innerWidth < this.MD_BREAKPOINT;
    this.toggleExpand(!isNarrowed && this.isPinned);
  }

  private onPinStateToggled() {
    this.toggleExpand(
      this.isPinned ? window.innerWidth >= this.MD_BREAKPOINT : false
    );
  }

  private toggleExpand(value: boolean, emit = true) {
    if (emit) {
      this.isExpanded = value;
    } else {
      this._isExpanded = value;
    }
    this._cdr.markForCheck();
  }

  private togglePinState() {
    if (window.innerWidth < this.MD_BREAKPOINT) {
      this.toggleExpand(!this.isExpanded, false);
      this._cdr.markForCheck();
      return;
    }
    this.isPinned = !this.isPinned;
  }

  //#endregion
}
