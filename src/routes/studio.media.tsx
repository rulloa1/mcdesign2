import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { mediaSlots, type MediaSlot } from "@/data/media-slots";
import { resetSiteMedia, siteMediaQuery, uploadSiteMedia } from "@/lib/site-media";

export const Route = createFileRoute("/studio/media")({
  head: () => ({
    meta: [
      { title: "Media Studio — Swap Site Images | MC Design Build" },
      { name: "description", content: "Upload and replace hero and project images across the MC Design Build site." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Media Studio — MC Design Build" },
      { property: "og:description", content: "Upload and replace hero and project images across the site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MediaStudio,
});

const groups = ["Hero & About", "Signature Sequences", "Project Covers"];

function MediaStudio() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
      setChecked(true);
      if (!data.session) navigate({ to: "/auth" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const { data: isAdmin } = useQuery({
    queryKey: ["is-admin", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId!)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
  });

  const { data: overrides } = useQuery(siteMediaQuery);

  if (!checked) return <main className="min-h-[100dvh] bg-carbon" />;

  return (
    <main className="min-h-[100dvh] bg-carbon px-6 py-16 text-bone md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-brass">Media Studio</p>
            <h1 className="font-serif text-4xl md:text-5xl">Swap Site Imagery</h1>
            <p className="mt-4 max-w-xl text-sm text-bone/60">
              Upload a new image for any slot below. Changes go live immediately — no rebuild required.
            </p>
          </div>
          <div className="flex gap-4 font-mono text-[0.65rem] uppercase tracking-[0.2em]">
            <Link to="/" className="text-bone/50 hover:text-brass">
              View Site
            </Link>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
              className="text-bone/50 hover:text-brass"
            >
              Sign Out
            </button>
          </div>
        </div>

        {isAdmin === false && (
          <p className="mb-10 border border-brass/30 p-5 text-sm text-brass/90">
            This account does not have studio access. Ask the site owner to grant admin access.
          </p>
        )}

        {groups.map((group) => (
          <section key={group} className="mb-16">
            <h2 className="mb-6 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-bone/40">{group}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mediaSlots
                .filter((s) => s.group === group)
                .map((slot) => (
                  <SlotCard
                    key={slot.slot}
                    slot={slot}
                    current={overrides?.[slot.slot]}
                    canEdit={!!isAdmin}
                    onDone={() => queryClient.invalidateQueries({ queryKey: ["site-media"] })}
                  />
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function SlotCard({
  slot,
  current,
  canEdit,
  onDone,
}: {
  slot: MediaSlot;
  current: string | undefined;
  canEdit: boolean;
  onDone: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      await uploadSiteMedia(slot.slot, file);
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-bone/10 p-4" style={{ background: "rgb(201 169 97 / 0.03)" }}>
      <div className="relative mb-4 h-44 overflow-hidden bg-bone/5">
        <img src={current ?? slot.fallback} alt={slot.label} loading="lazy" className="h-full w-full object-cover" />
        {current && (
          <span className="absolute top-2 left-2 bg-brass px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-carbon">
            Custom
          </span>
        )}
      </div>

      <h3 className="mb-1 font-serif text-lg leading-snug">{slot.label}</h3>
      <p className="mb-4 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-bone/35">{slot.slot}</p>

      <div className="flex flex-wrap items-center gap-3">
        <label
          className={`cursor-pointer border border-brass/40 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] transition-colors duration-500 hover:bg-brass hover:text-carbon ${
            !canEdit || busy ? "pointer-events-none opacity-40" : ""
          }`}
        >
          {busy ? "Uploading…" : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={!canEdit || busy}
            onChange={(e) => {
              void handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>

        {current && canEdit && (
          <button
            type="button"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await resetSiteMedia(slot.slot);
                onDone();
              } catch (err) {
                setError(err instanceof Error ? err.message : "Reset failed.");
              } finally {
                setBusy(false);
              }
            }}
            className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/45 hover:text-brass"
          >
            Reset
          </button>
        )}
      </div>

      {error && <p className="mt-3 text-xs text-brass">{error}</p>}
    </div>
  );
}
