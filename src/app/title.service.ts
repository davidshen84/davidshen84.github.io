import { Injectable, Signal, signal } from '@angular/core';

/**
 * A service to update the app title (not the browser title).
 */
@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private _title = signal<string>('');
  public readonly title: Signal<string> = this._title.asReadonly();

  constructor() {}

  public setTitle = (s: string) => this._title.set(s);
}
