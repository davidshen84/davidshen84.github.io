import {HttpHandler, HttpRequest} from '@angular/common/http';
import {async, TestBed} from '@angular/core/testing';
import {LocalStorageService} from 'ngx-store';
import {of} from 'rxjs';
import {RS256CryptoService} from '../crypto/rs256-crypto.service';

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

  it('should sign the request', async(() => {
    const signSpy = spyOn(cryptoServiceMock, 'sign').and.returnValue(Promise.resolve('sign'));
    const service: AuthorizationInterceptorService = TestBed.get(AuthorizationInterceptorService);
    const handleSpy = createSpy('handle').and.returnValue(of(''));

    const reqClone = <HttpRequest<any>>{};


    const reqMock = <HttpRequest<any>>{
      method: 'GET',
      clone: () => {
      }
    };
    const cloneSpy = spyOn(reqMock, 'clone').and.returnValue(reqClone);
    service.intercept(
      reqMock,
      <HttpHandler>{
        handle: handleSpy
      }
    ).subscribe(req => {
      expect(signSpy).toHaveBeenCalled();
      expect(cloneSpy).toHaveBeenCalledWith({
        setHeaders: {
          Authorization: stringMatching(/Bearer .*\.sign/)
        }
      });
      expect(handleSpy).toHaveBeenCalledWith(reqClone);
    });
  }));
});
