import { TestBed } from '@angular/core/testing';

import { RS256CryptoService } from './rs256-crypto.service';
import { StringUtilityService } from './string.utility';
import { RemarkableModule } from '../remarkable/remarkable.module';

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
      imports: [RemarkableModule],
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

    try {
      await service.sign(key, 'data');
    } catch (e) {
      expect(e).not.toBeUndefined();
    }
  });

  it('should throw error when failed to import the key', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);
    spyOn(strUtlSvc, 'FromBase64').and.returnValue(keyBuf);

    try {
      await service.sign(key, 'data');
    } catch (e: any) {
      expect(e.message).toBe('DataError');
    }
  });

  it('should sign data', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);
    const signBuf = new TextEncoder().encode('sign');
    const signSpy = spyOn(crypto.subtle, 'sign').and.returnValue(
      Promise.resolve(signBuf),
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
      strUtlSvc.EncodeString('data'),
    );
  });

  it('should return signature', async () => {
    const service: RS256CryptoService = TestBed.inject(RS256CryptoService);
    const signBuf = new TextEncoder().encode('sign');

    spyOn(crypto.subtle, 'sign').and.returnValue(Promise.resolve(signBuf));
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

    try {
      await service.sign('key', 'data');
    } catch (e: any) {
      expect(e.message).toContain('TypeError');
    }
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

    try {
      await service.importKey(key);
    } catch (e: any) {
      expect(e.message).toBe('DataError');
    }
  });
});
