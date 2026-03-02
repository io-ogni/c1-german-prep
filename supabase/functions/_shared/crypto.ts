/**
 * Encryption/decryption helpers for API keys.
 *
 * Uses AES-GCM with a 256-bit key derived from the ENCRYPTION_SECRET env var.
 * The encrypted payload is stored as base64: iv(12 bytes) + ciphertext + tag.
 */

const ALGORITHM = "AES-GCM";
const IV_LENGTH = 12;

async function deriveKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      // Static salt is fine here — one key per user, secret is high-entropy
      salt: encoder.encode("c1-deutsch-app-api-key-encryption"),
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: ALGORITHM, length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encrypt(plaintext: string, secret: string): Promise<string> {
  const key = await deriveKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encoder = new TextEncoder();

  const cipherBuffer = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encoder.encode(plaintext),
  );

  // Combine iv + ciphertext into a single Uint8Array, then base64-encode
  const combined = new Uint8Array(IV_LENGTH + cipherBuffer.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(cipherBuffer), IV_LENGTH);

  return btoa(String.fromCharCode(...combined));
}

export async function decrypt(encoded: string, secret: string): Promise<string> {
  const key = await deriveKey(secret);

  const raw = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
  const iv = raw.slice(0, IV_LENGTH);
  const ciphertext = raw.slice(IV_LENGTH);

  const plainBuffer = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    key,
    ciphertext,
  );

  return new TextDecoder().decode(plainBuffer);
}
