import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private layoutSubject = new BehaviorSubject<Layout>('simple');
  layout$ = this.layoutSubject.asObservable();
  public setLayout(layout: Layout) {
    this.layoutSubject.next(layout);
  }
}

export type Layout = 'simple' | 'main';
