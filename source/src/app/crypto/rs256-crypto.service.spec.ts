import {TestBed} from '@angular/core/testing';

import {RS256CryptoService} from './rs256-crypto.service';
import * as stringUtil from './string.utility';
import {base64UrlEncode, encodeString} from './string.utility';

describe('RS256CryptoService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RS256CryptoService
    ]
  }));

  it('should be created', () => {
    const service: RS256CryptoService = TestBed.get(RS256CryptoService);
    expect(service).toBeTruthy();
  });

  it('should import key', async () => {
    const service: RS256CryptoService = TestBed.get(RS256CryptoService);
    const keyBuf = new ArrayBuffer(0);
    const fromBase64Spy = spyOn(stringUtil, 'fromBase64').and.returnValue(keyBuf);
    const importKeySpy = spyOn(crypto.subtle, 'importKey').and.returnValue(Promise.resolve({}));
    const importParams = {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256'
    };

    spyOn(crypto.subtle, 'sign').and.returnValue(Promise.resolve(new ArrayBuffer(0)));

    await service.sign('key', 'data');
    expect(fromBase64Spy).toHaveBeenCalledWith('key');
    expect(importKeySpy).toHaveBeenCalledWith('pkcs8', keyBuf, importParams, false, ['sign']);
  });

  it('should not import key - bad base64 string', async () => {
    const service: RS256CryptoService = TestBed.get(RS256CryptoService);
    spyOn(stringUtil, 'fromBase64').and.throwError('bad base64');

    try {
      await service.sign('key', 'data');
    } catch (e) {
      expect(e).not.toBeUndefined();
    }
  });

  it('should not import key - importKey error', async () => {
    const service: RS256CryptoService = TestBed.get(RS256CryptoService);
    const keyBuf = new ArrayBuffer(0);
    spyOn(stringUtil, 'fromBase64').and.returnValue(keyBuf);
    spyOn(crypto.subtle, 'importKey').and.throwError('importKey error');

    try {
      await service.sign('key', 'data');
    } catch (e) {
      expect(e).not.toBeUndefined();
    }
  });

  it('should sign data', async () => {
    const service: RS256CryptoService = TestBed.get(RS256CryptoService);
    const keyBuf = new ArrayBuffer(0);
    const signBuf = new TextEncoder().encode('sign');
    const cryptoKey = {};
    const signSpy = spyOn(crypto.subtle, 'sign').and.returnValue(Promise.resolve(signBuf));

    spyOn(stringUtil, 'fromBase64').and.returnValue(keyBuf);
    spyOn(crypto.subtle, 'importKey').and.returnValue(Promise.resolve(cryptoKey));

    await service.sign('key', 'data');

    const pssParams = {
      name: 'RSASSA-PKCS1-v1_5',
      saltLength: 256
    };

    expect(signSpy).toHaveBeenCalledWith(pssParams, cryptoKey, encodeString('data'));
  });

  it('should return signature', async () => {
    const service: RS256CryptoService = TestBed.get(RS256CryptoService);
    const keyBuf = new ArrayBuffer(0);
    const signBuf = new TextEncoder().encode('sign');
    const cryptoKey = {};

    spyOn(crypto.subtle, 'sign').and.returnValue(Promise.resolve(signBuf));
    spyOn(stringUtil, 'fromBase64').and.returnValue(keyBuf);
    spyOn(crypto.subtle, 'importKey').and.returnValue(Promise.resolve(cryptoKey));

    const sign = await service.sign('key', 'data');

    expect(sign).toEqual(base64UrlEncode('sign'));
  });

  it('should not return signature', async () => {
    const service: RS256CryptoService = TestBed.get(RS256CryptoService);
    const keyBuf = new ArrayBuffer(0);
    const cryptoKey = {};

    spyOn(stringUtil, 'fromBase64').and.returnValue(keyBuf);
    spyOn(crypto.subtle, 'importKey').and.returnValue(Promise.resolve(cryptoKey));
    spyOn(crypto.subtle, 'sign').and.throwError('sign error');

    try {
      await service.sign('key', 'data');
    } catch (e) {
      expect(e).not.toBeUndefined();
    }
  });
});
