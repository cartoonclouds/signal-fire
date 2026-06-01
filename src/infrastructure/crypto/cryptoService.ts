export interface EncryptedPayload {
  ciphertext: string;
  signature: string;
}

export class CryptoService {
  async encryptForRecipients(payload: unknown, _recipientPublicKeys: string[]): Promise<EncryptedPayload> {
    // TODO: replace with real E2E encryption.
    return {
      ciphertext: Buffer.from(JSON.stringify(payload), 'utf8').toString('base64'),
      signature: 'dev-signature'
    };
  }

  async decrypt<T>(ciphertext: string): Promise<T> {
    return JSON.parse(Buffer.from(ciphertext, 'base64').toString('utf8')) as T;
  }
}
