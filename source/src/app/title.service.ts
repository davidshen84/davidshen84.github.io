import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private _title$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  public getTitle = (): Observable<string> => this._title$.asObservable();


  public setTitle = (s: string) => this._title$.next(s);
}
