import {async, TestBed} from '@angular/core/testing';

import {AuthorizationInterceptorService} from './authorization-interceptor.service';
import {LocalStorageService} from 'ngx-store';
import {HttpHandler, HttpRequest} from '@angular/common/http';
import * as stringUtil from '../crypto/string.utility';
import {Observable} from 'rxjs';

describe('AuthorizationInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [
      {provide: AuthorizationInterceptorService, useClass: AuthorizationInterceptorService},
      {
        provide: LocalStorageService, useValue: {
          get: () => 'empty'
        }
      }
    ]
  }));

  it('should be created', () => {
    const service: AuthorizationInterceptorService = TestBed.get(AuthorizationInterceptorService);
    expect(service).toBeTruthy();
  });

  xit('should sign the request', async(() => {
    const fromBase64Spy = spyOn(stringUtil, 'fromBase64').and.returnValue(new ArrayBuffer(0));
    const service: AuthorizationInterceptorService = TestBed.get(AuthorizationInterceptorService);
    const importKeySpy = spyOn(crypto.subtle, 'importKey');

    const handleSpy = jasmine.createSpy('handle').and.returnValue(new Observable());


    service.intercept(
      <HttpRequest<any>>{
        method: 'GET',
        clone: () => {
          return <HttpRequest<any>>{};
        }
      },
      <HttpHandler>{
        handle: handleSpy
      }
    ).subscribe(x => {
      expect(fromBase64Spy).toHaveBeenCalled();
      expect(importKeySpy).toHaveBeenCalled();
      expect(handleSpy).toHaveBeenCalled();
    });
  }));
});
