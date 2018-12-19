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

export function encodeString(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}
