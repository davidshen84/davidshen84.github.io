import {Injectable} from '@angular/core';
import {base64UrlEncode, cleanInputPrivateKey, encodeString, fromBase64} from './string.utility';


/**
 * Provide data signing service using asymmetric encryption algorithms.
 */
interface CryptoService {
  /**
   * Sign the input data using the provide key.
   * @param key {string} A RS256 private key in the PKCS8 format.
   * @param data {string} Data to be signed.
   */
  sign(key: string, data: string): Promise<string>;
}

export class CryptoServiceError implements Error {
  message: string;
  name: string = this.constructor.name;

  constructor(e: any) {
    this.message = e.toString();
  }

}

@Injectable()
export class RS256CryptoService implements CryptoService {

  private readonly algorithm: RsaHashedImportParams = {
    name: 'RSASSA-PKCS1-v1_5',
    hash: {name: 'SHA-256'},
  };

  private readonly usage = ['sign'];

  private readonly format = 'pkcs8';

  constructor() {
  }

  async sign(key: string, data: string): Promise<string> {

    key = cleanInputPrivateKey(key);
    let keyBuf: ArrayBuffer;
    try {
      keyBuf = fromBase64(key);
    } catch (e) {
      throw new CryptoServiceError(e);
    }

    const dataBuf = encodeString(data);

    const cryptoKey = await crypto.subtle.importKey(this.format, keyBuf, this.algorithm, false, this.usage);

    let signatureBuf: ArrayBuffer;
    try {
      signatureBuf = await crypto.subtle.sign(this.algorithm, cryptoKey, dataBuf);
    } catch (e) {
      throw new CryptoServiceError(e);
    }

    return Promise.resolve(base64UrlEncode(
      String.fromCharCode(...Array.from(new Uint8Array(signatureBuf)))));

  }
}
