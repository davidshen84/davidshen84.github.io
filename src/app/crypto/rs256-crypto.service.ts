import { Injectable, inject } from '@angular/core';
import { StringUtilityService } from './string.utility';

/**
 * Provide data signing service using asymmetric encryption algorithms.
 */
interface CryptoService {
  /**
   * Cryptographic algorithm definition.
   */
  algorithm: Algorithm;

  /**
   * {string} encoded key format.
   */
  format: 'pkcs8' | 'raw' | 'spki';

  /**
   * List the usages of the key.
   */
  usage: string[];

  /**
   * Sign the input data using the provide key.
   * @param key {string} A RS256 private key in the PKCS8 format.
   * @param data {string} Data to be signed.
   */
  sign(key: string, data: string): Promise<string>;

  /**
   * Create a {CryptoKey} instance from a RSA256 private key output.
   * @param key The RSA256 private key text.
   */
  importKey(key: string): PromiseLike<CryptoKey>;
}

@Injectable()
export class RS256CryptoService implements CryptoService {
  private _strUtlSvc = inject(StringUtilityService);

  public readonly algorithm: Algorithm = {
    name: 'RSASSA-PKCS1-v1_5',
  };
  public readonly usage: KeyUsage[] = ['sign'];
  public readonly format = 'pkcs8';
  private readonly _keyImportParams: RsaHashedImportParams = {
    ...this.algorithm,
    hash: 'SHA-256',
  };
  private readonly _rsaPssParams: RsaPssParams = {
    ...this.algorithm,
    saltLength: 256,
  };

  constructor() {}

  /**
   * Remove the header and footer section of a RSA private key output.
   * @param {string} k The private key text.
   *
   * @return {string} private key
   */
  private static cleanInputPrivateKey(k: string): string {
    return k
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\n/g, '');
  }

  async sign(key: string, data: string): Promise<string> {
    const cryptoKey = await this.importKey(key);

    let dataBuf;
    try {
      dataBuf = this._strUtlSvc.EncodeString(data);
    } catch (e: any) {
      return Promise.reject(new Error(e ?? 'unknown error', { cause: e }));
    }

    return crypto.subtle.sign(this._rsaPssParams, cryptoKey, dataBuf).then(
      (buf) =>
        this._strUtlSvc.Base64UrlEncode(
          String.fromCharCode(...Array.from(new Uint8Array(buf))),
        ),
      (r) => Promise.reject(new Error(r)),
    );
  }

  importKey(key: string): PromiseLike<CryptoKey> {
    let keyBuf: ArrayBuffer;

    try {
      key = RS256CryptoService.cleanInputPrivateKey(key);
      keyBuf = this._strUtlSvc.FromBase64(key);
    } catch (e: any) {
      return Promise.reject(new Error(e ?? 'unknown error', { cause: e }));
    }

    return crypto.subtle
      .importKey(this.format, keyBuf, this._keyImportParams, false, this.usage)
      .then(undefined, (r) => Promise.reject(new Error(r)));
  }
}
