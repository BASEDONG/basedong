import { RequireAuth } from "@/lib/backend/RequireAuth";

export default function MeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireAuth>
      <div className="flex h-dvh min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </RequireAuth>
  );
}
