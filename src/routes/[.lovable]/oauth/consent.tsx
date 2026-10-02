import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s["authorization_id"] === "string" ? s["authorization_id"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Approve Assistant Access — MC Design Build" },
      { name: "description", content: "Approve an AI assistant's access to MC Design Build tools." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Approve Assistant Access — MC Design Build" },
      { property: "og:description", content: "Approve an AI assistant's access to MC Design Build tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ConsentPage,
});

function ConsentPage() {
  const { authorization_id } = Route.useSearch();
  const navigate = useNavigate();
  const [client, setClient] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      if (!authorization_id) return setError("Missing authorization request.");
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) {
        const back = `/.lovable/oauth/consent?authorization_id=${encodeURIComponent(authorization_id)}`;
        navigate({ to: "/auth", search: { redirect: back } });
        return;
      }
      const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorization_id);
      if (error) return setError(error.message);
      if (data && "redirect_url" in data && data.redirect_url && !("authorization_id" in data)) {
        window.location.href = data.redirect_url;
        return;
      }
      setClient((data as { client?: { name?: string } })?.client?.name ?? "An assistant");
    })();
  }, [authorization_id, navigate]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const fn = approve
      ? supabase.auth.oauth.approveAuthorization
      : supabase.auth.oauth.denyAuthorization;
    const { data, error } = await fn.call(supabase.auth.oauth, authorization_id, {
      skipBrowserRedirect: true,
    });
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    if (data?.redirect_url) window.location.href = data.redirect_url;
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-carbon px-6 text-bone">
      <div className="w-full max-w-md border border-brass/20 p-8">
        <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-brass">
          MC Design Build
        </p>
        <h1 className="mb-6 font-serif text-3xl">Approve access</h1>
        {error ? (
          <p className="text-sm text-bone/70">{error}</p>
        ) : !client ? (
          <p className="text-sm text-bone/60">Loading…</p>
        ) : (
          <>
            <p className="mb-8 text-sm text-bone/70">
              <strong className="text-bone">{client}</strong> wants to use the MC Design Build
              portfolio tools on your behalf.
            </p>
            <div className="flex gap-3">
              <button
                disabled={busy}
                onClick={() => decide(true)}
                className="flex-1 bg-brass px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-carbon disabled:opacity-50"
              >
                Approve
              </button>
              <button
                disabled={busy}
                onClick={() => decide(false)}
                className="flex-1 border border-bone/20 px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bone disabled:opacity-50"
              >
                Deny
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
