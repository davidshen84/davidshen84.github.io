import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


/**
 * A service to update the app title (not the browser title).
 */
@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private _title$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  public getTitle = (): Observable<string> => this._title$.asObservable();

  public setTitle = (s: string) => this._title$.next(s);
}
