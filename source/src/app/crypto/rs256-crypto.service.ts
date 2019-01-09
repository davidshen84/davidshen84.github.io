import {Injectable} from '@angular/core';
import {base64UrlEncode, cleanInputPrivateKey, encodeString, fromBase64} from './string.utility';


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

  public readonly algorithm: Algorithm = {
    name: 'RSASSA-PKCS1-v1_5'
  };
  public readonly usage = ['sign'];
  public readonly format = 'pkcs8';
  private readonly _keyImportParams: RsaHashedImportParams = {
    ...this.algorithm,
    hash: 'SHA-256',
  };
  private readonly _rsaPssParams: RsaPssParams = {
    ...this.algorithm,
    saltLength: 256
  };
  private readonly _errorName = 'CryptoService Error';

  constructor() {
  }

  async sign(key: string, data: string): Promise<string> {
    const cryptoKey = await this.importKey(key);

    let dataBuf;
    try {
      dataBuf = encodeString(data);
    } catch (e) {
      return Promise.reject({name: this._errorName, message: e});
    }

    return crypto.subtle.sign(this._rsaPssParams, cryptoKey, dataBuf)
      .then(buf => base64UrlEncode(String.fromCharCode(...Array.from(new Uint8Array(buf)))),
        r => Promise.reject({name: this._errorName, message: r}));
  }

  importKey(key: string): PromiseLike<CryptoKey> {
    key = cleanInputPrivateKey(key);
    let keyBuf;

    try {
      keyBuf = fromBase64(key);
    } catch (e) {
      return Promise.reject({name: this._errorName, message: e});
    }

    return crypto.subtle.importKey(this.format, keyBuf, this._keyImportParams, false, this.usage)
      .then(undefined, r => Promise.reject({name: this._errorName, message: r}));
  }
}
