import { Suspense } from "react";
import { OAuthCallbackClient } from "@/components/console/profile/OAuthCallbackClient";

/** Built-in OAuth callback paths required for `output: "export"`. */
export function generateStaticParams() {
  return [
    { provider: "github" },
    { provider: "discord" },
    { provider: "linuxdo" },
    { provider: "oidc" },
    { provider: "telegram" },
  ];
}

export default function OAuthProviderCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center text-sm text-slate-600">
          …
        </main>
      }
    >
      <OAuthCallbackClient />
    </Suspense>
  );
}
