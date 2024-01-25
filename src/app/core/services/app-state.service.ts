import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private states = new Map<string, BehaviorSubject<unknown>>();

  public get<T>(key: string, defaultValue: T): Observable<T> {
    return this.getInternal<T>(key, defaultValue).asObservable();
  }

  public set<T>(key: string, state: T): void {
    this.getInternal<T>(key, state).next(state);
  }

  private getInternal<T>(key: string, defaultValue: T): BehaviorSubject<T> {
    if (!this.states.has(key)) {
      const subject = new BehaviorSubject<T>(defaultValue);
      this.states.set(key, subject as BehaviorSubject<unknown>);
    }
    return this.states.get(key) as BehaviorSubject<T>;
  }
}
