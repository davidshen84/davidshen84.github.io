import { TestBed } from '@angular/core/testing';

import { RS256CryptoService } from './rs256-crypto.service';
import { StringUtilityService } from './string.utility';

describe('RS256CryptoService', () => {
  const key = 'key';
  const keyBuf = new StringUtilityService().FromBase64(key);
  const importParams = {
    name: 'RSASSA-PKCS1-v1_5',
    hash: 'SHA-256',
  };
  const cryptoKeyMock = <CryptoKey>{};

  let strUtlSvc: StringUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RS256CryptoService, StringUtilityService],
    });

    strUtlSvc = TestBed.inject(StringUtilityService);
  });

  it('should be created', () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);
    expect(service).toBeTruthy();
  });

  it('should import key', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);
    const fromBase64Spy = spyOn(strUtlSvc, 'FromBase64').and.returnValue(
      keyBuf,
    );
    const importKeySpy = spyOn(crypto.subtle, 'importKey').and.returnValue(
      Promise.resolve(cryptoKeyMock),
    );

    spyOn(crypto.subtle, 'sign').and.returnValue(Promise.resolve(keyBuf));

    await service.sign('key', 'data');
    expect(fromBase64Spy).toHaveBeenCalledWith('key');
    expect(importKeySpy).toHaveBeenCalledWith(
      'pkcs8',
      keyBuf,
      importParams,
      false,
      ['sign'],
    );
  });

  it('should throw error when data is not a valid base64 string', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);
    spyOn(strUtlSvc, 'FromBase64').and.throwError('bad base64');

    await expectAsync(service.sign(key, 'data')).toBeRejected();
  });

  it('should throw error when failed to import the key', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);
    spyOn(strUtlSvc, 'FromBase64').and.returnValue(keyBuf);

    await expectAsync(service.sign(key, 'data')).toBeRejectedWithError(
      'DataError',
    );
  });

  it('should sign data', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);
    const signBuf = new TextEncoder().encode('sign');
    const signSpy = spyOn(crypto.subtle, 'sign').and.returnValue(
      Promise.resolve(signBuf.buffer),
    );
    const pssParams = {
      name: 'RSASSA-PKCS1-v1_5',
      saltLength: 256,
    };

    spyOn(strUtlSvc, 'FromBase64').and.returnValue(keyBuf);
    spyOn(crypto.subtle, 'importKey').and.returnValue(
      Promise.resolve(cryptoKeyMock),
    );

    await service.sign('key', 'data');
    expect(signSpy).toHaveBeenCalledWith(
      pssParams,
      cryptoKeyMock,
      new Uint8Array(strUtlSvc.EncodeString('data')),
    );
  });

  it('should return signature', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);
    const signBuf = new TextEncoder().encode('sign');

    spyOn(crypto.subtle, 'sign').and.returnValue(
      Promise.resolve(signBuf.buffer),
    );
    spyOn(strUtlSvc, 'FromBase64').and.returnValue(keyBuf);
    spyOn(crypto.subtle, 'importKey').and.returnValue(
      Promise.resolve(cryptoKeyMock),
    );

    const sign = await service.sign('key', 'data');

    expect(sign).toEqual(strUtlSvc.Base64UrlEncode('sign'));
  });

  it('should throw error when the key is invalid', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);

    spyOn(strUtlSvc, 'FromBase64').and.returnValue(keyBuf);
    spyOn(crypto.subtle, 'importKey').and.returnValue(
      Promise.resolve(cryptoKeyMock),
    );

    await expectAsync(service.sign('key', 'data')).toBeRejectedWithError(
      /TypeError/,
    );
  });

  it('should return crypto key', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);
    const importKeySpy = spyOn(crypto.subtle, 'importKey').and.returnValue(
      Promise.resolve(cryptoKeyMock),
    );

    const cryptoKey = await service.importKey(key);
    expect(importKeySpy).toHaveBeenCalledWith(
      'pkcs8',
      keyBuf,
      importParams,
      false,
      ['sign'],
    );
    expect(cryptoKey).not.toBeUndefined();
  });

  it('should throw error when key data is invalid', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);

    await expectAsync(service.importKey(key)).toBeRejectedWithError(
      'DataError',
    );
  });
});
