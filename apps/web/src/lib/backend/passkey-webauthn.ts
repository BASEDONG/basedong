/** Minimal WebAuthn helpers for Passkey register (basedong Console). */

function base64UrlToArrayBuffer(value?: string | null): ArrayBuffer {
  if (!value) return new ArrayBuffer(0);
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return buffer;
}

function arrayBufferToBase64Url(buffer?: ArrayBuffer | null): string {
  if (!buffer) return "";
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function isPasskeySupported(): Promise<boolean> {
  if (typeof window === "undefined" || !window.PublicKeyCredential) return false;
  try {
    if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === "function") {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    }
  } catch {
    // fall through
  }
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function prepareCredentialCreationOptions(
  payload: any,
): PublicKeyCredentialCreationOptions {
  const options =
    payload?.publicKey ??
    payload?.PublicKey ??
    payload?.response ??
    payload?.Response ??
    payload;
  if (!options?.challenge || !options?.user) {
    throw new Error("Unable to parse Passkey registration options");
  }
  const publicKey: PublicKeyCredentialCreationOptions = {
    ...options,
    challenge: base64UrlToArrayBuffer(options.challenge),
    user: {
      ...options.user,
      id: base64UrlToArrayBuffer(options.user.id),
    },
  };
  if (Array.isArray(options.excludeCredentials)) {
    publicKey.excludeCredentials = options.excludeCredentials.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => ({
        ...item,
        id: base64UrlToArrayBuffer(item.id),
      }),
    );
  }
  return publicKey;
}

export function buildRegistrationResult(
  credential: PublicKeyCredential | null,
): Record<string, unknown> | null {
  if (!credential) return null;
  const response = credential.response as AuthenticatorAttestationResponse & {
    getTransports?: () => string[];
  };
  const transports =
    typeof response.getTransports === "function"
      ? response.getTransports()
      : undefined;
  return {
    id: credential.id,
    rawId: arrayBufferToBase64Url(credential.rawId),
    type: credential.type,
    response: {
      clientDataJSON: arrayBufferToBase64Url(response.clientDataJSON),
      attestationObject: arrayBufferToBase64Url(response.attestationObject),
      transports,
    },
    clientExtensionResults: credential.getClientExtensionResults?.() ?? {},
  };
}

export function buildAssertionResult(
  credential: PublicKeyCredential | null,
): Record<string, unknown> | null {
  if (!credential) return null;
  const response = credential.response as AuthenticatorAssertionResponse;
  return {
    id: credential.id,
    rawId: arrayBufferToBase64Url(credential.rawId),
    type: credential.type,
    response: {
      authenticatorData: arrayBufferToBase64Url(response.authenticatorData),
      clientDataJSON: arrayBufferToBase64Url(response.clientDataJSON),
      signature: arrayBufferToBase64Url(response.signature),
      userHandle: response.userHandle
        ? arrayBufferToBase64Url(response.userHandle)
        : null,
    },
    clientExtensionResults: credential.getClientExtensionResults?.() ?? {},
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function prepareCredentialRequestOptions(
  payload: any,
): PublicKeyCredentialRequestOptions {
  const options =
    payload?.publicKey ??
    payload?.PublicKey ??
    payload?.response ??
    payload?.Response ??
    payload;
  if (!options?.challenge) {
    throw new Error("Unable to parse Passkey assertion options");
  }
  const publicKey: PublicKeyCredentialRequestOptions = {
    ...options,
    challenge: base64UrlToArrayBuffer(options.challenge),
  };
  if (Array.isArray(options.allowCredentials)) {
    publicKey.allowCredentials = options.allowCredentials.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => ({
        ...item,
        id: base64UrlToArrayBuffer(item.id),
      }),
    );
  }
  return publicKey;
}
