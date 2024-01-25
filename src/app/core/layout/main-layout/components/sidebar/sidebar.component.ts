/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppStateService } from '@/core/services/app-state.service';
import { NavItem, NavigationService } from '@/core/services/navigation.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBars3Solid,
  heroChartBarSolid,
  heroCubeSolid,
  heroMapSolid,
  heroTagSolid,
  heroUsersSolid,
} from '@ng-icons/heroicons/solid';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, NgIconComponent, RouterModule],
  viewProviders: [
    provideIcons({
      heroBars3Solid,
      heroChartBarSolid,
      heroCubeSolid,
      heroMapSolid,
      heroTagSolid,
      heroUsersSolid,
    }),
  ],
})
export class SidebarComponent implements OnInit {
  private readonly IS_PINNED_DEFAULT = true;
  private readonly MD_BREAKPOINT = 768;
  private readonly HOVER_EXPAND_DELAY = 300;
  private readonly IS_PINNED_KEY = 'isPinned';
  private _hoverTimeout: any;
  private _isExpanded = false;
  private _isHoverExpanded = false;
  private _isPinned = this.IS_PINNED_DEFAULT;

  @Output() expand = new EventEmitter<boolean>();

  public navItems: NavItem[] = [];

  constructor(
    private readonly _appStateService: AppStateService,
    private readonly _navService: NavigationService
  ) {
    // Intentionally blank
  }

  //#region Component lifecycle

  public ngOnInit() {
    this.navItems = this._navService.navItems;
    this._appStateService
      .get(this.IS_PINNED_KEY, this.IS_PINNED_DEFAULT)
      .subscribe(isPinned => {
        this.isPinned = isPinned;
      });
  }

  //#endregion

  /**
   * Whether the sidebar is expanded.
   */
  public get isExpanded(): boolean {
    return this.isHoverExpanded || this._isExpanded;
  }
  public set isExpanded(value: boolean) {
    this._isExpanded = value;
    this.expand.emit(this._isExpanded);
  }

  /**
   * Whether the sidebar is expanded due to hover.
   */
  public get isHoverExpanded(): boolean {
    return this._isHoverExpanded;
  }
  public set isHoverExpanded(value: boolean) {
    this._isHoverExpanded = value;
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

  public togglePinState() {
    if (window.innerWidth < this.MD_BREAKPOINT) {
      return;
    }
    this.isPinned = !this.isPinned;
    this._appStateService.set(this.IS_PINNED_KEY, this.isPinned);
  }

  //#region Events

  public onKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.togglePinState();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    const isNarrowed = window.innerWidth < this.MD_BREAKPOINT;
    this.isExpanded = !isNarrowed && this.isPinned;
  }

  //#region MouseEvents

  public onMouseEnter() {
    if (this.isExpanded) {
      return;
    }
    this._hoverTimeout = setTimeout(() => {
      this.isHoverExpanded = true;
    }, this.HOVER_EXPAND_DELAY);
  }

  public onMouseLeave() {
    clearTimeout(this._hoverTimeout);
    this.isHoverExpanded = false;
  }

  public onMouseMove() {
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = setTimeout(() => {
        this.isHoverExpanded = true;
      }, this.HOVER_EXPAND_DELAY);
    }
  }

  //#endregion

  //#endregion

  //#region Internals

  private onPinStateToggled() {
    this.isExpanded = this.isPinned
      ? window.innerWidth >= this.MD_BREAKPOINT
      : false;
  }

  //#endregion
}
