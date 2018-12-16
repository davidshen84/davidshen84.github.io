# How to sign JWT using RS256

*This document shows how to sign a JWT using RS256 cryptographic algorithm in a modern web browser.*

First, create a RS256 private key using the `openssl` command line utility.

    openssl genrsa -out private.key.pem 2048
    Generating RSA private key, 2048 bit long modulus
    .........................................................................+++++
    ..........................+++++
    e is 65537 (0x10001)
    
Then export it in the `PCKS8` format.

    openssl pkcs8 -in private.key.pem -inform pem -topk8 -nocrypt -out private.key.pk8

Then, load the `private.key.pk8` in the browser, and create a `CryptoKey` object from it.

```typescript
const pk8_base64 = '...private key...in base64...';
const pk8_arrayBuffer = fromBase64(pk8_base64);
```

