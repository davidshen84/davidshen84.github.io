export function fromBase64(s: string): ArrayBuffer {
  const bin = atob(s);
  const buf = new ArrayBuffer(bin.length);
  const bufView = new Uint8Array(buf);

  for (let i = 0; i < bin.length; i++) {
    bufView[i] = bin.charCodeAt(i);
  }

  return buf;
}

export function base64UrlEncode(s: string): string {
  return btoa(s)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
    ;
}

export function base64UrlDecode(s: string): string {
  return atob(`${s}====`.slice(0, s.length + s.length % 4)
    .replace(/-/g, '+')
    .replace(/_/g, '/'));
}

export function encodeString(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

/**
 * Encode a JSON object into a Base64 Url encoded string.
 * @param json The JSON object.
 */
export function encodeJSON(json: object): string {
  const buf = encodeString(JSON.stringify(json));

  return base64UrlEncode(String.fromCharCode(...Array.from(buf)));
}

/**
 * Remove the header and footer section of a RSA private key output.
 * @param {string} k The private key text.
 */
export function cleanInputPrivateKey(k) {
  return k.replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '');
}
