import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {catchError, flatMap, map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

function fromBase64(str) {
  const bin = atob(str);
  const buf = new ArrayBuffer(bin.length);
  const bufView = new Uint8Array(buf);

  for (let i = 0; i < bin.length; i++) {
    bufView[i] = bin.charCodeAt(i);
  }

  return buf;
}

function base64urlEncode(s: string): string {
  return btoa(s)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
    ;
}

@Component({
  selector: 'app-crypto-rs256',
  templateUrl: './crypto-rs256.component.html',
  styleUrls: ['./crypto-rs256.component.scss']
})
export class CryptoRS256Component implements OnInit {

  private static algorithm = {
    name: 'RSASSA-PKCS1-v1_5',
    hash: {name: 'SHA-256'},
  };

  // Define header
  public header = JSON.stringify({
    'alg': 'RS256',
    'typ': 'JWT'
  }, null, 2);
  public headerSubject = new BehaviorSubject<string>(this.header);
  public encodedHeader$ = this.headerSubject.pipe(
    map(s => new TextEncoder().encode(s)),
    map(a => String.fromCharCode(...Array.from(a))),
    map(base64urlEncode)
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
    map(s => new TextEncoder().encode(s)),
    map(a => String.fromCharCode(...Array.from(a))),
    map(base64urlEncode)
  );

  // Define private key
  public base64PrivateKey: string;
  private privateKeySubject = new Subject<string>();
  private privateKey$: Observable<CryptoKey> = this.privateKeySubject.pipe(
    map(k => k.replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\n/g, '')
    ),
    map(fromBase64),
    catchError((_, source$) => source$),
    flatMap(buf =>
      fromPromise(crypto.subtle.importKey('pkcs8', buf, CryptoRS256Component.algorithm, false, ['sign']))),
  );

  // Define signature
  public sig$: Observable<string> = combineLatest(this.encodedHeader$, this.encodedPayload$, this.privateKey$).pipe(
    flatMap(([h, p, k]) =>
      fromPromise(crypto.subtle.sign(CryptoRS256Component.algorithm, k, new TextEncoder().encode(`${h}.${p}`)))),
    map(sig => String.fromCharCode(...Array.from(new Uint8Array(sig)))),
    map(base64urlEncode),
  );

  // Define JWT
  public jwt$: Observable<string> = combineLatest(this.encodedHeader$, this.encodedPayload$, this.sig$).pipe(
    map(([h, p, s]) => `${h}.${p}.${s}`)
  );

  constructor() {
  }

  ngOnInit() {
  }

  headerChanged = (header: string) => this.headerSubject.next(header);

  payloadChanged = (payload: string) => this.payloadSubject.next(payload);

  keyChanged = (inputKey: string) => this.privateKeySubject.next(inputKey);

}
