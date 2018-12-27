import {HttpHandler, HttpRequest} from '@angular/common/http';
import {async, TestBed} from '@angular/core/testing';
import {LocalStorageService} from 'ngx-store';
import {of} from 'rxjs';
import {RS256CryptoService} from '../crypto/rs256-crypto.service';
import {base64UrlDecode} from '../crypto/string.utility';

import {AuthorizationInterceptorService} from './authorization-interceptor.service';
import createSpy = jasmine.createSpy;
import stringMatching = jasmine.stringMatching;

describe('AuthorizationInterceptorService', () => {
  const cryptoServiceMock = {
    sign: () => {
    }
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [
      {provide: AuthorizationInterceptorService, useClass: AuthorizationInterceptorService},
      {
        provide: LocalStorageService, useValue: {
          get: () => 'empty'
        }
      },
      {
        provide: RS256CryptoService, useValue: cryptoServiceMock
      }
    ]
  }));

  it('should be created', () => {
    const service: AuthorizationInterceptorService = TestBed.get(AuthorizationInterceptorService);
    expect(service).toBeTruthy();
  });

  it('should add Authorization header to the request', async(() => {
    const signSpy = spyOn(cryptoServiceMock, 'sign').and.returnValue(Promise.resolve('sign'));
    const service: AuthorizationInterceptorService = TestBed.get(AuthorizationInterceptorService);
    const handleSpy = createSpy('handle').and.returnValue(of(''));
    const reqClone = <HttpRequest<any>>{};
    const req = <HttpRequest<any>>{
      method: 'GET',
      clone: () => {
      }
    };
    const cloneSpy = spyOn(req, 'clone').and.returnValue(reqClone);

    service.intercept(
      req,
      <HttpHandler>{
        handle: handleSpy
      }
    ).subscribe(() => {
      expect(signSpy).toHaveBeenCalled();
      expect(cloneSpy).toHaveBeenCalledWith({
        setHeaders: {
          Authorization: stringMatching(/Bearer .*\.sign/)
        }
      });
      expect(handleSpy).toHaveBeenCalledWith(reqClone);
    });
  }));

  it('should include exp & nbf in the payload', async(() => {
    const signSpy = spyOn(cryptoServiceMock, 'sign').and.returnValue(Promise.resolve('sign'));
    const service: AuthorizationInterceptorService = TestBed.get(AuthorizationInterceptorService);
    const handleSpy = createSpy('handle').and.returnValue(of(''));
    const req = <HttpRequest<any>>{
      method: 'GET',
      clone: () => {
      }
    };

    service.intercept(
      req,
      <HttpHandler>{
        handle: handleSpy
      }
    ).subscribe(() => {
      expect(signSpy).toHaveBeenCalled();
      let [, data] = signSpy.calls.mostRecent().args[1].split('.');
      data = base64UrlDecode(data);
      data = JSON.parse(data);
      expect(data.exp).not.toBeUndefined();
      expect(data.nbf).not.toBeUndefined();
      expect(data.aud).not.toBeUndefined();
    });
  }));

  it('should not add Authorization header to the request when signature is not available', async(() => {
    const signSpy = spyOn(cryptoServiceMock, 'sign').and.returnValue(Promise.reject(''));
    const service: AuthorizationInterceptorService = TestBed.get(AuthorizationInterceptorService);
    const handleSpy = createSpy('handle').and.returnValue(of(''));
    const reqClone = <HttpRequest<any>>{};
    const req = <HttpRequest<any>>{
      method: 'GET',
      clone: () => {
      }
    };
    const cloneSpy = spyOn(req, 'clone').and.returnValue(reqClone);

    service.intercept(
      req,
      <HttpHandler>{
        handle: handleSpy
      }
    ).subscribe(() => {
      expect(signSpy).toHaveBeenCalled();
      expect(cloneSpy).not.toHaveBeenCalled();
      expect(handleSpy).toHaveBeenCalledWith(req);
    });
  }));

});
