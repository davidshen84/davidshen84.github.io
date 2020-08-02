import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { merge, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { filter, mergeMap, share } from 'rxjs/operators';
import { RS256CryptoService } from '../crypto/rs256-crypto.service';
import { StringUtilityService } from '../crypto/string.utility';

@Injectable()
export class AuthorizationInterceptorService implements HttpInterceptor {
  /**
   * RSA-SHA256 JWT Header
   */
  private static readonly _jwtHeader = {
    alg: 'RS256',
    typ: 'JWT',
  };
  private readonly _encodedHeader = this._strUtlSvc.EncodeJSON(
    AuthorizationInterceptorService._jwtHeader
  );
  private readonly privateKeyData: string;

  constructor(
    localStorageService: LocalStorageService,
    private cryptoService: RS256CryptoService,
    private _strUtlSvc: StringUtilityService
  ) {
    this.privateKeyData = localStorageService.get('private-key') || '';
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const ts = Math.floor(Date.now() / 1000);
    const halfMin = 30;
    const encodedPayload = this._strUtlSvc.EncodeJSON({
      iss: req.url,
      exp: ts + halfMin,
      nbf: ts - halfMin,
      aud: [req.method, req.urlWithParams],
    });
    const data = `${this._encodedHeader}.${encodedPayload}`;
    const signature$ = fromPromise(
      this.cryptoService
        .sign(this.privateKeyData, data)
        .then(undefined, () => null)
    ).pipe(share());

    return merge(
      signature$.pipe(
        filter((i) => i !== null),
        mergeMap((sig) => {
          const request = req.clone({
            setHeaders: {
              Authorization: `Bearer ${data}.${sig}`,
            },
          });

          return next.handle(request);
        })
      ),
      signature$.pipe(
        filter((i) => i === null),
        mergeMap(() => next.handle(req))
      )
    );
  }
}
