import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {LocalStorageService} from 'ngx-store';
import {merge, Observable, of, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {filter, flatMap, map, mapTo, tap} from 'rxjs/operators';
import {RS256CryptoService} from '../crypto/rs256-crypto.service';

const KEY_NAME = 'private-key';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public pkInput: string;
  public pkChangedSubject: Subject<string> = new Subject<string>();
  public cryptoKeyStored$: Observable<boolean>;

  private cryptoKey$ = this.pkChangedSubject.pipe(
    filter(x => x !== ''),
    flatMap(key => fromPromise(this._cryptoService.importKey(key)
      .then(undefined, r => new Error(r.message))))
  );

  public cryptoKeyError$ = this.cryptoKey$.pipe(
    tap(x => {
      if (x instanceof Error) {
        this._snackBar.open(x.message, '❌', {duration: 1000});
      }
    }),
    map(x => x instanceof Error)
  );

  constructor(private _localStorageService: LocalStorageService,
              private _cryptoService: RS256CryptoService,
              private _snackBar: MatSnackBar) {
    this.pkInput = this._localStorageService.get(KEY_NAME);
    this.cryptoKeyStored$ = merge(
      of(this.pkInput !== null),
      this.pkChangedSubject.pipe(
        map(i => this._localStorageService.set(KEY_NAME, i)),
        mapTo(true)
      ));
  }

  ngOnInit() {
  }

}
