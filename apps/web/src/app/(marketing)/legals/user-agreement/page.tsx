import type { Metadata } from "next";
import { UserAgreementPage } from "@/components/marketing/legals/user-agreement/UserAgreementPage";
import { getUserAgreementPageMetadata } from "@/lib/marketing-page-metadata";
import { staticPageMetadata } from "@/lib/static-page-metadata";

export const metadata: Metadata = staticPageMetadata(
  getUserAgreementPageMetadata,
);

export default function UserAgreementRoute() {
  return (
    <div className="bg-white text-slate-900">
      <UserAgreementPage />
    </div>
  );
}
