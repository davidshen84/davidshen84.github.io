import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringUtilityService {
  public FromBase64(s: string): ArrayBuffer {
    const bin = atob(s);
    const buf = new ArrayBuffer(bin.length);
    const bufView = new Uint8Array(buf);

    for (let i = 0; i < bin.length; i++) {
      bufView[i] = bin.charCodeAt(i);
    }

    return buf;
  }

  public Base64UrlEncode(s: string): string {
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  public Base64UrlDecode(s: string): string {
    return atob(
      `${s}====`
        .slice(0, s.length + (s.length % 4))
        .replace(/-/g, '+')
        .replace(/_/g, '/'),
    );
  }

  public EncodeString(s: string): Uint8Array {
    return new TextEncoder().encode(s);
  }

  /**
   * Encode a JSON object into a Base64 Url encoded string.
   * @param {any} json The JSON object.
   *
   * @return {string} encoded JSON string
   */
  public EncodeJSON(json: any): string {
    const buf = this.EncodeString(JSON.stringify(json));

    return this.Base64UrlEncode(String.fromCharCode(...Array.from(buf)));
  }
}
