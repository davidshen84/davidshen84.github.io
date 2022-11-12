# How to sign JWT using RS256

*This document shows how to sign a JWT using RS256 cryptographic algorithm in a modern web browser.*

## Create a RS256 private key using *openssl* utility

First, create a RS256 private key using the `openssl` command line utility.

```bash
openssl genrsa -out private.key.pem 2048
```
    
Then export it in the `PCKS8` format.

```bash
openssl pkcs8 -in private.key.pem -inform pem -topk8 -nocrypt -out private.key.pk8
```

## Export the public key from the private key

```bash
openssl rsa -in private.key.pk8 -pubout -out public.key.pk8
```

Then, load the `private.key.pk8` in the browser, and create a `CryptoKey` object from it.

```typescript
declare function fromBase64(s:string): ArrayBuffer;
declare var RS256: RsaHashedImportParams;

const pk8_base64 = '...private key...in base64...';
const buf = fromBase64(pk8_base64);
const privateKeyPromise = crypto.subtle.importKey('pkcs8', buf, RS256, false, ['sign']);
```

