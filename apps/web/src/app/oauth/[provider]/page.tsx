import { Suspense } from "react";
import { OAuthCallbackClient } from "@/components/console/profile/OAuthCallbackClient";

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
