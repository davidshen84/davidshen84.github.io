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
}


@Injectable()
export class RS256CryptoService implements CryptoService {

  public readonly algorithm: Algorithm = {
    name: 'RSASSA-PKCS1-v1_5'
  };
  public readonly usage = ['sign'];
  public readonly format = 'pkcs8';
  private readonly keyImportParams: RsaHashedImportParams = {
    ...this.algorithm,
    hash: 'SHA-256',
  };
  private readonly rsaPssParams: RsaPssParams = {
    ...this.algorithm,
    saltLength: 256
  };

  constructor() {
  }

  async sign(key: string, data: string): Promise<string> {
    key = cleanInputPrivateKey(key);
    const keyBuf = fromBase64(key);
    const dataBuf = encodeString(data);
    const cryptoKey = await crypto.subtle.importKey(this.format, keyBuf, this.keyImportParams, false, this.usage);

    return crypto.subtle.sign(this.rsaPssParams, cryptoKey, dataBuf)
      .then(buf => base64UrlEncode(String.fromCharCode(...Array.from(new Uint8Array(buf)))));
  }
}
