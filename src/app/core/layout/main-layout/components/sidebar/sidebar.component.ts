/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
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
  imports: [CommonModule, NgIconComponent],
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
  @Output() expand = new EventEmitter<boolean>();

  private readonly MD_BREAKPOINT = 768;
  private readonly HOVER_DELAY = 500;

  private _isToggled = false;

  private _isExpanded = false;
  public get isExpanded(): boolean {
    return this._isExpanded;
  }
  public set isExpanded(value: boolean) {
    this._isExpanded = value;
    this.expand.emit(this._isExpanded);
  }

  private _hoverTimeout: any;
  private _isHovered = false;
  public get isHovered(): boolean {
    return this._isHovered;
  }

  ngOnInit() {
    this.isExpanded = window.innerWidth >= this.MD_BREAKPOINT;
  }

  public onKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.toggleExpand();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    if (this._isToggled) {
      return;
    }
    this.isExpanded = window.innerWidth >= this.MD_BREAKPOINT;
  }

  //#region OnHover

  public onMouseMove() {
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = setTimeout(() => {
        this._isHovered = true;
      }, this.HOVER_DELAY);
    }
  }

  public onMouseEnter() {
    if (this.isExpanded) {
      return;
    }
    this._hoverTimeout = setTimeout(() => {
      this._isHovered = true;
    }, this.HOVER_DELAY);
  }

  public onMouseLeave() {
    clearTimeout(this._hoverTimeout);
    this._isHovered = false;
  }

  //#endregion

  public toggleExpand() {
    this.isExpanded = !this._isExpanded;
    this.updateToggleState();
  }

  private updateToggleState() {
    /**
     * When the viewport width > medium breakpoint,
     * the toggled state should match whether the sidebar is expanded.
     */
    if (window.innerWidth < this.MD_BREAKPOINT) {
      this._isToggled = this._isExpanded;
    } else {
      /**
       * When the viewport width <= medium breakpoint,
       * the toggled state should be the opposite of whether the sidebar is expanded.
       */
      this._isToggled = !this._isExpanded;
    }
    if (!this._isToggled) {
      this.isExpanded = window.innerWidth >= this.MD_BREAKPOINT;
    }
  }
}
