import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {LocalStorageService} from 'ngx-store';
import {merge, Observable, of, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {filter, flatMap} from 'rxjs/operators';
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
  public cryptoKey$: Observable<boolean>;

  constructor(private _localStorageService: LocalStorageService,
              private _cryptoService: RS256CryptoService,
              private _snackBar: MatSnackBar) {
    this.pkInput = this._localStorageService.get(KEY_NAME);
    this.cryptoKey$ = merge(
      of(this.pkInput),
      this.pkChangedSubject
    ).pipe(
      filter(x => !!x),
      flatMap(key => fromPromise(this._cryptoService.importKey(key)
        .then(() => {
            return !!this._localStorageService.set(KEY_NAME, key);
          },
          (r: Error) => {
            this._snackBar.open(r.message, '❌', {duration: 1000});
            return false;
          })))
    );
  }

  ngOnInit() {
  }

}
