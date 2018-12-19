/**
 * Declare crypto algorithm parameters.
 */
export class Algorithms {

  /**
   * RS256, RSA
   */
  public static RS256: RsaHashedImportParams = {
    name: 'RSASSA-PKCS1-v1_5',
    hash: {name: 'SHA-256'},
  };
}
