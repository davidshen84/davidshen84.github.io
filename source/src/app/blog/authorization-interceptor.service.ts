import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-store';
import {merge, Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {filter, flatMap, share} from 'rxjs/operators';
import {RS256CryptoService} from '../crypto/rs256-crypto.service';
import {encodeJSON} from '../crypto/string.utility';

@Injectable()
export class AuthorizationInterceptorService implements HttpInterceptor {

  /**
   * RSA-SHA256 JWT Header
   */
  private static readonly _jwtHeader = {
    'alg': 'RS256',
    'typ': 'JWT'
  };
  private static readonly _encodedHeader =
    encodeJSON(AuthorizationInterceptorService._jwtHeader);
  private readonly privateKeyData: string;

  constructor(localStorageService: LocalStorageService, private cryptoService: RS256CryptoService) {
    this.privateKeyData = localStorageService.get('private-key');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ts = Math.floor(Date.now() / 1000);
    const halfMin = 30;
    const encodedPayload = encodeJSON({
      iss: req.url,
      exp: ts + halfMin,
      nbf: ts - halfMin,
      aud: [req.method, req.urlWithParams]
    });
    const data = `${AuthorizationInterceptorService._encodedHeader}.${encodedPayload}`;
    const signature$ = fromPromise(this.cryptoService.sign(this.privateKeyData, data)
      .then(undefined, () => null))
      .pipe(share());

    return merge(
      signature$.pipe(
        filter(i => i !== null),
        flatMap(sig => {
          const request = req.clone({
            setHeaders: {
              Authorization: `Bearer ${data}.${sig}`
            }
          });

          return next.handle(request);
        })
      ),
      signature$.pipe(
        filter(i => i === null),
        flatMap(() => next.handle(req))
      ));
  }
}
