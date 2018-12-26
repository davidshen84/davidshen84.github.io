import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'ngx-store';
import {merge, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {filter, flatMap, map, mapTo, share} from 'rxjs/operators';
import {cleanInputPrivateKey, fromBase64} from '../crypto/string.utility';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public pkInput: string;
  public pkChangedSubject: Subject<string> = new Subject<string>();
  public cryptoKeyStored$ = this.pkChangedSubject.pipe(
    map(i => this.localStorageService.set('private-key', i)),
    mapTo(true)
  );
  private cryptoKeyBuf$ = this.pkChangedSubject.pipe(
    map(i => cleanInputPrivateKey(i)),
    map(i => {
      try {
        return fromBase64(i);
      } catch (e) {
        return <Error>e;
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
  public cryptoKeyError$ = merge(this.cryptoKeyBuf$, this.cryptoKey$)
    .pipe(map(x => x instanceof Error));

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
  }

}
