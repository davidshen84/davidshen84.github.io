import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {merge, Observable, of} from 'rxjs';
import {LocalStorageService} from 'ngx-store';
import {filter, flatMap, map, mapTo, share} from 'rxjs/operators';
import {base64UrlEncode, cleanInputPrivateKey, encodeString, fromBase64} from '../crypto/string.utility';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Algorithms} from '../crypto/crypto';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthorizationInterceptorService implements HttpInterceptor {
  private privateKeyData: string;

  private cryptoKey$: Observable<CryptoKey>;
  private readonly encodedHeader: string;

  constructor(private localStorageService: LocalStorageService) {
    this.privateKeyData = localStorageService.get('private-key');
    const cryptoKeyBuf$ = of(this.privateKeyData).pipe(
      map(i => cleanInputPrivateKey(i)),
      map(i => {
        try {
          return fromBase64(i);
        } catch (e) {
          return new Error(e);
        }
      }),
      share()
    );
    this.cryptoKey$ = merge(
      cryptoKeyBuf$.pipe(
        filter(i => !(i instanceof Error)),
        flatMap((buf: ArrayBuffer) =>
          fromPromise<CryptoKey>(crypto.subtle.importKey('pkcs8', buf, Algorithms.RS256, false, ['sign'])
            .then(undefined, () => null)))
      ),
      cryptoKeyBuf$.pipe(
        filter(i => i instanceof Error),
        mapTo<Error, CryptoKey>(null)
      )).pipe(share());

    const header = JSON.stringify({
      'alg': 'RS256',
      'typ': 'JWT'
    });
    const headerBuf = encodeString(header);
    this.encodedHeader = base64UrlEncode(String.fromCharCode(...Array.from(headerBuf)));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const payload = JSON.stringify({
      method: req.method
    });
    const payloadBuf = encodeString(payload);
    const encodedPayload = base64UrlEncode(String.fromCharCode(...Array.from(payloadBuf)));

    return merge(
      this.cryptoKey$.pipe(
        filter(i => i !== null),
        // Sign the message
        flatMap(k =>
          fromPromise(crypto.subtle.sign(Algorithms.RS256, k, encodeString(`${this.encodedHeader}.${encodedPayload}`)))),
        map(buf => String.fromCharCode(...Array.from(new Uint8Array(buf)))),
        map(base64UrlEncode),
        flatMap(sig => {
          const request = req.clone({
            setHeaders: {
              Authorization: `Bearer ${this.encodedHeader}.${encodedPayload}.${sig}`
            }
          });

          return next.handle(request);
        })
      ),
      this.cryptoKey$.pipe(
        filter(i => i === null),
        flatMap(() => {
          const request = req.clone({
            setHeaders: {
              Authorization: `Bearer token ${req.method}, ${req.url}`
            }
          });
          return next.handle(request);
        })
      ));
  }
}
