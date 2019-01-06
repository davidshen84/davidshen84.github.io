import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'ngx-store';
import {merge, Observable, of, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {filter, flatMap, map, mapTo, share, tap} from 'rxjs/operators';
import {cleanInputPrivateKey, fromBase64} from '../crypto/string.utility';

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

  private cryptoKeyBuf$ = this.pkChangedSubject.pipe(
    map(i => cleanInputPrivateKey(i)),
    map(i => {
      try {
        return fromBase64(i);
      } catch (e) {
        return new Error(e.toString());
      }
    }),
    share()
  );
  private readonly algorithm: RsaHashedImportParams = {
    name: 'RSASSA-PKCS1-v1_5',
    hash: 'SHA-256'
  };
  private cryptoKey$ = this.cryptoKeyBuf$.pipe(
    filter(x => !(x instanceof Error)),
    flatMap((buf: ArrayBuffer) =>
      fromPromise(crypto.subtle.importKey('pkcs8', buf, this.algorithm, false, ['sign'])
        .then(undefined, r => new Error(r)))),
  );
  public cryptoKeyError$ = merge(this.cryptoKeyBuf$, this.cryptoKey$).pipe(
    tap(x => {
      if (x instanceof Error) {
        // TODO: Toast the error.
        console.error(x);
      }
    }),
    map(x => x instanceof Error));

  constructor(private localStorageService: LocalStorageService) {
    this.pkInput = this.localStorageService.get(KEY_NAME);
    this.cryptoKeyStored$ = merge(
      of(this.pkInput).pipe(map(x => x !== null)),
      this.pkChangedSubject.pipe(
        map(i => this.localStorageService.set(KEY_NAME, i)),
        mapTo(true)
      ));
  }

  ngOnInit() {
  }

}
