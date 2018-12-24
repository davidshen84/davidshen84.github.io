import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, merge, Observable, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {filter, flatMap, map, mapTo, share} from 'rxjs/operators';
import {Algorithms} from '../crypto';
import {base64UrlEncode, cleanInputPrivateKey, encodeString, fromBase64} from '../string.utility';


@Component({
  selector: 'app-crypto-rs256',
  templateUrl: './crypto-rs256.component.html',
  styleUrls: ['./crypto-rs256.component.scss']
})
export class CryptoRS256Component implements OnInit {

  // Define header
  public header = JSON.stringify({
    'alg': 'RS256',
    'typ': 'JWT'
  }, null, 2);
  public headerSubject = new BehaviorSubject<string>(this.header);
  public encodedHeader$ = this.headerSubject.pipe(
    map(s => encodeString(s)),
    map(a => String.fromCharCode(...Array.from(a))),
    map(base64UrlEncode)
  );
  // Define payload
  public payload = JSON.stringify({
    'sub': '1234567890',
    'name': 'John Doe',
    'admin': true,
    'iat': 1516239022
  }, null, 2);
  public payloadSubject = new BehaviorSubject<string>(this.payload);
  public encodedPayload$ = this.payloadSubject.pipe(
    map(s => encodeString(s)),
    map(a => String.fromCharCode(...Array.from(a))),
    map(base64UrlEncode)
  );

  // Define private key
  public base64Input: string;
  public privateKeyInputSubject = new Subject<string>();
  private privateKeyBuf$: Observable<ArrayBuffer> = this.privateKeyInputSubject.pipe(
    map(k => cleanInputPrivateKey(k)),
    map(k => {
      try {
        return fromBase64(k);
      } catch (e) {
        return null;
      }
    }),
    share()
  );
  private privateCryptoKey$: Observable<CryptoKey> = merge(
    this.privateKeyBuf$.pipe(
      filter(k => k !== null),
      flatMap(buf =>
        fromPromise(crypto.subtle.importKey('pkcs8', buf, Algorithms.RS256, false, ['sign'])
          .then(undefined, () => null)))
    ),
    this.privateKeyBuf$.pipe(
      filter(k => !k),
      mapTo(null)
    )
  ).pipe(share());

  // Define signature
  private signatureBuf$: Observable<ArrayBuffer> = merge(
    combineLatest(this.encodedHeader$, this.encodedPayload$, this.privateCryptoKey$).pipe(
      filter(([_, __, k]) => k !== null),
      flatMap(([h, p, k]) =>
        fromPromise(crypto.subtle.sign(Algorithms.RS256, k, encodeString(`${h}.${p}`))
          .then(undefined, () => null)))
    ),
    this.privateCryptoKey$.pipe(
      filter(k => !k),
      mapTo(null)
    )
  ).pipe(share());

  public signature$: Observable<string> = merge(
    this.signatureBuf$.pipe(
      filter(b => b && b.byteLength > 0),
      map(sig => String.fromCharCode(...Array.from(new Uint8Array(sig)))),
      map(base64UrlEncode)
    ),
    this.signatureBuf$.pipe(
      filter(b => !b),
      mapTo('')
    )
  ).pipe(share());

  // Define JWT
  public jwt$: Observable<string> = merge(
    combineLatest(this.encodedHeader$, this.encodedPayload$, this.signature$).pipe(
      filter(([_, __, s]) => s && s !== ''),
      map(([h, p, s]) => `${h}.${p}.${s}`)
    ),
    this.signature$.pipe(
      filter(s => !s),
      mapTo('')
    )
  );

  constructor() {
  }

  ngOnInit() {
  }

}
