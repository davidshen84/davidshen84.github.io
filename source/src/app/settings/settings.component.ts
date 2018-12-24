import {Component, OnInit} from '@angular/core';
import {merge, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {filter, flatMap, map, mapTo, share} from 'rxjs/operators';
import {Algorithms} from '../crypto/crypto';
import {cleanInputPrivateKey, fromBase64} from '../crypto/string.utility';
import {LocalStorageService} from 'ngx-store';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private pkInput: string;
  private pkChangedSubject: Subject<string> = new Subject<string>();

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

  private cryptoKey$ = this.cryptoKeyBuf$.pipe(
    filter(x => !(x instanceof Error)),
    flatMap((buf: ArrayBuffer) =>
      fromPromise(crypto.subtle.importKey('pkcs8', buf, Algorithms.RS256, false, ['sign'])
        .then(undefined, r => new Error(r)))),
  );

  private cryptoKeyStored$ = this.pkChangedSubject.pipe(
    map(i => this.localStorageService.set('private-key', i)),
    mapTo(true)
  );

  private cryptoKeyError$ = merge(this.cryptoKeyBuf$, this.cryptoKey$)
    .pipe(map(x => x instanceof Error));


  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
  }

}
