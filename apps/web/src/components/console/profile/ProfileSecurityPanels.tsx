"use client";

import { useCallback, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  beginPasskeyRegister,
  createPasskeySecurityProof,
  createSecurityProof,
  deletePasskey,
  disableTwoFactor,
  enableTwoFactor,
  finishPasskeyRegister,
  getPasskeyStatus,
  listOAuthBindings,
  setupTwoFactor,
  unbindOAuth,
  type OAuthBinding,
  type PasskeyStatus,
  type TwoFactorSetup,
  type TwoFactorStatus,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import {
  buildRegistrationResult,
  isPasskeySupported,
  prepareCredentialCreationOptions,
} from "@/lib/backend/passkey-webauthn";
import type { ProfileUiCopy } from "./profile-ui-copy";

type Props = {
  copy: ProfileUiCopy;
  targetLocale: string;
  twoFa: TwoFactorStatus | null;
  onNotice: (msg: string) => void;
  onError: (msg: string) => void;
  onTwoFaChange: () => void;
};

export function ProfileSecurityPanels({
  copy,
  targetLocale,
  twoFa,
  onNotice,
  onError,
  onTwoFaChange,
}: Props) {
  const [setup, setSetup] = useState<TwoFactorSetup | null>(null);
  const [setupStep, setSetupStep] = useState(0);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [disableMode, setDisableMode] = useState(false);

  const [passkey, setPasskey] = useState<PasskeyStatus | null>(null);
  const [passkeyOk, setPasskeyOk] = useState(false);
  const [passkeyCode, setPasskeyCode] = useState("");

  const [bindings, setBindings] = useState<OAuthBinding[] | null>(null);

  const refreshPasskey = useCallback(async () => {
    setPasskey(await getPasskeyStatus());
  }, []);

  const refreshOauth = useCallback(async () => {
    try {
      setBindings(await listOAuthBindings());
    } catch (e) {
      setBindings([]);
      onError(localizeBackendError(targetLocale, e, copy.oauthUnavailable));
    }
  }, [copy.oauthUnavailable, onError, targetLocale]);

  useEffect(() => {
    void isPasskeySupported().then(setPasskeyOk);
    void refreshPasskey();
    void refreshOauth();
  }, [refreshOauth, refreshPasskey]);

  const startSetup = async () => {
    setBusy(true);
    setDisableMode(false);
    try {
      const data = await setupTwoFactor();
      setSetup(data);
      setSetupStep(0);
      setCode("");
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.saveFailed));
    } finally {
      setBusy(false);
    }
  };

  const confirmEnable = async () => {
    if (!code.trim()) return;
    setBusy(true);
    try {
      await enableTwoFactor(code);
      setSetup(null);
      setCode("");
      onNotice(copy.twoFaEnabled);
      onTwoFaChange();
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.saveFailed));
    } finally {
      setBusy(false);
    }
  };

  const confirmDisable = async () => {
    if (!code.trim()) return;
    setBusy(true);
    try {
      await disableTwoFactor(code);
      setDisableMode(false);
      setCode("");
      onNotice(copy.twoFaDisabled);
      onTwoFaChange();
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.saveFailed));
    } finally {
      setBusy(false);
    }
  };

  const maybeProof = async (scope: string): Promise<string | undefined> => {
    if (!twoFa?.enabled) return undefined;
    if (!passkeyCode.trim()) {
      onError(copy.passkeyProofHint);
      throw new Error("proof required");
    }
    return createSecurityProof({
      method: "2fa",
      code: passkeyCode,
      scope,
    });
  };

  const onRegisterPasskey = async () => {
    if (!passkeyOk) {
      onError(copy.passkeyUnsupported);
      return;
    }
    setBusy(true);
    try {
      const proof = await maybeProof("passkey.register");
      const begin = await beginPasskeyRegister(proof);
      const flowToken = begin.flow_token;
      if (!flowToken) throw new Error("missing flow");
      const publicKey = prepareCredentialCreationOptions(
        begin.options ?? begin,
      );
      const credential = (await navigator.credentials.create({
        publicKey,
      })) as PublicKeyCredential | null;
      const payload = buildRegistrationResult(credential);
      if (!payload) {
        onError(copy.passkeyUnavailable);
        return;
      }
      await finishPasskeyRegister({
        flowToken,
        credential: payload,
        proofToken: proof,
      });
      setPasskeyCode("");
      onNotice(copy.passkeyRegistered);
      await refreshPasskey();
    } catch (e) {
      if ((e as Error)?.message === "proof required") return;
      onError(localizeBackendError(targetLocale, e, copy.passkeyUnavailable));
    } finally {
      setBusy(false);
    }
  };

  const onRemovePasskey = async () => {
    setBusy(true);
    try {
      let proof: string | undefined;
      if (twoFa?.enabled) {
        proof = await maybeProof("passkey.delete");
      } else {
        proof = await createPasskeySecurityProof("passkey.delete");
      }
      await deletePasskey(proof);
      setPasskeyCode("");
      onNotice(copy.passkeyRemoved);
      await refreshPasskey();
    } catch (e) {
      if ((e as Error)?.message === "proof required") return;
      onError(localizeBackendError(targetLocale, e, copy.passkeyUnavailable));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <section className="rounded-[8px] border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-800">
          {copy.sectionSecurity}
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          {copy.twoFaLabel}:{" "}
          {twoFa == null
            ? copy.twoFaUnknown
            : twoFa.enabled
              ? copy.twoFaOn
              : copy.twoFaOff}
          {twoFa?.locked ? ` (${copy.twoFaLocked})` : null}
        </p>

        {!twoFa?.enabled && !setup ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => void startSetup()}
            className="mt-4 inline-flex h-10 items-center rounded-[8px] bg-[#4AABF0] px-5 text-[13px] font-semibold text-white hover:bg-[#3A9BD8] disabled:opacity-60"
          >
            {copy.twoFaEnable}
          </button>
        ) : null}

        {twoFa?.enabled && !disableMode ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setDisableMode(true);
              setCode("");
            }}
            className="mt-4 inline-flex h-10 items-center rounded-[8px] border border-slate-300 bg-white px-5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            {copy.twoFaDisable}
          </button>
        ) : null}

        {setup ? (
          <div className="mt-4 space-y-3 rounded-[8px] border border-slate-100 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-800">
              {copy.twoFaSetupTitle}
            </h3>
            {setupStep === 0 ? (
              <>
                <p className="text-xs text-slate-500">{copy.twoFaScanHint}</p>
                <div className="flex justify-center bg-white p-3">
                  <QRCodeSVG value={setup.qr_code_data} size={160} />
                </div>
                <p className="break-all font-mono text-xs text-slate-600">
                  {copy.twoFaSecretLabel}: {setup.secret}
                </p>
                <button
                  type="button"
                  className="text-sm font-semibold text-[#4AABF0]"
                  onClick={() => setSetupStep(1)}
                >
                  {copy.twoFaNext}
                </button>
              </>
            ) : null}
            {setupStep === 1 ? (
              <>
                <p className="text-xs font-semibold text-slate-700">
                  {copy.twoFaBackupTitle}
                </p>
                <ul className="grid grid-cols-2 gap-1 font-mono text-xs text-slate-700">
                  {setup.backup_codes.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="text-sm font-semibold text-[#4AABF0]"
                  onClick={() => setSetupStep(2)}
                >
                  {copy.twoFaNext}
                </button>
              </>
            ) : null}
            {setupStep === 2 ? (
              <>
                <label className="block text-xs text-slate-500">
                  {copy.twoFaCodeLabel}
                </label>
                <input
                  className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={busy || !code.trim()}
                    onClick={() => void confirmEnable()}
                    className="inline-flex h-10 items-center rounded-[8px] bg-[#4AABF0] px-5 text-[13px] font-semibold text-white disabled:opacity-60"
                  >
                    {copy.twoFaConfirmEnable}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSetup(null)}
                    className="text-sm text-slate-500"
                  >
                    {copy.twoFaCancel}
                  </button>
                </div>
              </>
            ) : null}
          </div>
        ) : null}

        {disableMode ? (
          <div className="mt-4 space-y-3 rounded-[8px] border border-slate-100 bg-slate-50 p-4">
            <label className="block text-xs text-slate-500">
              {copy.twoFaCodeLabel}
            </label>
            <input
              className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
            <div className="flex gap-3">
              <button
                type="button"
                disabled={busy || !code.trim()}
                onClick={() => void confirmDisable()}
                className="inline-flex h-10 items-center rounded-[8px] border border-red-200 bg-white px-5 text-[13px] font-semibold text-red-600 disabled:opacity-60"
              >
                {copy.twoFaConfirmDisable}
              </button>
              <button
                type="button"
                onClick={() => setDisableMode(false)}
                className="text-sm text-slate-500"
              >
                {copy.twoFaCancel}
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-[8px] border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-800">
          {copy.sectionPasskey}
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          {passkey?.enabled ? copy.passkeyOn : copy.passkeyOff}
          {!passkeyOk ? ` · ${copy.passkeyUnsupported}` : null}
        </p>
        {twoFa?.enabled ? (
          <>
            <p className="mt-2 text-xs text-slate-400">{copy.passkeyProofHint}</p>
            <input
              className="mt-2 w-full max-w-xs rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
              placeholder={copy.twoFaCodeLabel}
              value={passkeyCode}
              onChange={(e) => setPasskeyCode(e.target.value)}
              inputMode="numeric"
            />
          </>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-3">
          {!passkey?.enabled ? (
            <button
              type="button"
              disabled={busy || !passkeyOk}
              onClick={() => void onRegisterPasskey()}
              className="inline-flex h-10 items-center rounded-[8px] bg-[#4AABF0] px-5 text-[13px] font-semibold text-white disabled:opacity-60"
            >
              {copy.passkeyRegister}
            </button>
          ) : (
            <button
              type="button"
              disabled={busy}
              onClick={() => void onRemovePasskey()}
              className="inline-flex h-10 items-center rounded-[8px] border border-red-200 bg-white px-5 text-[13px] font-semibold text-red-600 disabled:opacity-60"
            >
              {copy.passkeyRemove}
            </button>
          )}
        </div>
      </section>

      <section className="rounded-[8px] border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-800">
          {copy.sectionOauth}
        </h2>
        <p className="mt-2 text-xs text-slate-400">{copy.oauthBindNote}</p>
        {bindings == null ? null : bindings.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">{copy.oauthEmpty}</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {bindings.map((b) => (
              <li
                key={`${b.provider_id}-${b.provider_user_id}`}
                className="flex items-center justify-between gap-3 py-3 text-sm"
              >
                <div className="min-w-0 truncate text-slate-700">
                  {b.provider_name ?? b.provider_slug ?? b.provider_id}
                  {b.provider_user_id ? (
                    <span className="text-slate-400">
                      {" "}
                      · {b.provider_user_id}
                    </span>
                  ) : null}
                </div>
                {b.provider_id != null ? (
                  <button
                    type="button"
                    className="shrink-0 text-xs text-red-600"
                    onClick={() => {
                      void (async () => {
                        try {
                          await unbindOAuth(b.provider_id!);
                          onNotice(copy.oauthUnbound);
                          await refreshOauth();
                        } catch (e) {
                          onError(
                            localizeBackendError(
                              targetLocale,
                              e,
                              copy.oauthUnavailable,
                            ),
                          );
                        }
                      })();
                    }}
                  >
                    {copy.oauthUnbind}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
