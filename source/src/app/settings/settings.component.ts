import {Component, OnInit} from '@angular/core';
import {merge, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {filter, flatMap, map, mapTo, share} from 'rxjs/operators';
import {Algorithms} from '../crypto/crypto';
import {cleanInputPrivateKey, fromBase64} from '../crypto/string.utility';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  pkInput: string;
  pkChangedSubject: Subject<string> = new Subject<string>();

  cryptoKeyBuf$ = this.pkChangedSubject.pipe(
    map(i => cleanInputPrivateKey(i)),
    map(i => {
      try {
        return fromBase64(i);
      } catch (e) {
        return e;
      }
    }),
    share()
  );

  cryptoKey$ = this.cryptoKeyBuf$.pipe(
    filter(o => !(o instanceof DOMException)),
    flatMap((buf: ArrayBuffer) =>
      fromPromise(crypto.subtle.importKey('pkcs8', buf, Algorithms.RS256, false, ['sign'])
        .then(undefined, () => new Error())))
  );

  cryptoKeyStored$ = this.cryptoKey$.pipe(
    filter(i => !(i instanceof Error)),
    mapTo(true)
  );

  cryptoKeyErrored$ = this.cryptoKeyBuf$.pipe(
    filter(i => i instanceof Error),
    mapTo(false)
  );

  cryptoKeyResult$ = merge(this.cryptoKeyStored$, this.cryptoKeyErrored$);

  constructor() {
  }

  ngOnInit() {
  }

}
