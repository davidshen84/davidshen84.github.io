import { HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { RS256CryptoService } from '../crypto/rs256-crypto.service';
import { StringUtilityService } from '../crypto/string.utility';

import { AuthorizationInterceptorService } from './authorization-interceptor.service';
import { LocalStorageService } from 'ngx-webstorage';
import createSpy = jasmine.createSpy;

describe('AuthorizationInterceptorService', () => {
  let strUtlSvc: StringUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthorizationInterceptorService,
        RS256CryptoService,
        StringUtilityService,
        {
          provide: LocalStorageService,
          useValue: {
            retrieve: () => 'empty',
          },
        },
      ],
    });

    strUtlSvc = TestBed.inject(StringUtilityService);
  });

  it('should be created', () => {
    const service: AuthorizationInterceptorService = TestBed.inject(
      AuthorizationInterceptorService,
    );
    expect(service).toBeTruthy();
  });

  it('should add Authorization header to the request', waitForAsync(() => {
    const cryptoService: RS256CryptoService =
      TestBed.inject(RS256CryptoService);
    const signSpy = spyOn(cryptoService, 'sign').and.returnValue(
      Promise.resolve('sign'),
    );
    const service: AuthorizationInterceptorService = TestBed.inject(
      AuthorizationInterceptorService,
    );
    const handleSpy = createSpy('handle').and.returnValue(of(''));
    const reqClone = <HttpRequest<any>>{};
    const req = <HttpRequest<any>>{
      method: 'GET',
      clone: () => {},
    };
    const cloneSpy = spyOn(req, 'clone').and.returnValue(reqClone);

    service
      .intercept(req, <HttpHandler>{
        handle: handleSpy,
      })
      .subscribe(() => {
        expect(signSpy).toHaveBeenCalled();
        expect(
          cloneSpy.calls.mostRecent().args[0].setHeaders!.Authorization,
        ).toMatch(/Bearer .*\.sign/);
        expect(handleSpy).toHaveBeenCalledWith(reqClone);
      });
  }));

  it('should include exp & nbf in the payload', waitForAsync(() => {
    const cryptoService: RS256CryptoService =
      TestBed.inject(RS256CryptoService);
    const signSpy = spyOn(cryptoService, 'sign').and.returnValue(
      Promise.resolve('sign'),
    );
    const service: AuthorizationInterceptorService = TestBed.inject(
      AuthorizationInterceptorService,
    );
    const handleSpy = createSpy('handle').and.returnValue(of(''));
    const req = <HttpRequest<any>>{
      method: 'GET',
      clone: () => {},
    };

    service
      .intercept(req, <HttpHandler>{
        handle: handleSpy,
      })
      .subscribe(() => {
        expect(signSpy).toHaveBeenCalled();
        let [, data] = signSpy.calls.mostRecent().args[1].split('.');
        data = strUtlSvc.Base64UrlDecode(data);
        const dataObj: any = JSON.parse(data);
        expect(dataObj.exp).not.toBeUndefined();
        expect(dataObj.nbf).not.toBeUndefined();
        expect(dataObj.aud).not.toBeUndefined();
      });
  }));

  it('should not add Authorization header to the request when signature is not available', waitForAsync(() => {
    const cryptoService: RS256CryptoService =
      TestBed.inject(RS256CryptoService);
    const signSpy = spyOn(cryptoService, 'sign').and.returnValue(
      Promise.reject(new Error()),
    );
    const service: AuthorizationInterceptorService = TestBed.inject(
      AuthorizationInterceptorService,
    );
    const handleSpy = createSpy('handle').and.returnValue(of(''));
    const reqClone = <HttpRequest<any>>{};
    const req = <HttpRequest<any>>{
      method: 'GET',
      clone: () => {},
    };
    const cloneSpy = spyOn(req, 'clone').and.returnValue(reqClone);

    service
      .intercept(req, <HttpHandler>{
        handle: handleSpy,
      })
      .subscribe(() => {
        expect(signSpy).toHaveBeenCalled();
        expect(cloneSpy).not.toHaveBeenCalled();
        expect(handleSpy).toHaveBeenCalledWith(req);
      });
  }));
});
