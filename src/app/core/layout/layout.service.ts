import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private layoutSubject = new BehaviorSubject<Layout>(DEFAULT_LAYOUT);
  layout$ = this.layoutSubject.asObservable();
  public setLayout(layout: Layout) {
    this.layoutSubject.next(layout);
  }
}

export const DEFAULT_LAYOUT = Symbol('DEFAULT_LAYOUT');
export type Layout = 'simple' | typeof DEFAULT_LAYOUT;
