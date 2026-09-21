import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Studio Sign In — MC Design Build" },
      { name: "description", content: "Private sign-in for the MC Design Build media studio." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Studio Sign In — MC Design Build" },
      { property: "og:description", content: "Private sign-in for the MC Design Build media studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/studio/media" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/studio/media` },
        });
        if (error) throw error;
        setMessage("Account created. If email confirmation is on, confirm it and then sign in.");
        setMode("signin");
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-carbon px-6 text-bone">
      <div className="w-full max-w-md border border-brass/20 p-8" style={{ background: "rgb(201 169 97 / 0.03)" }}>
        <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-brass">MC Design Build</p>
        <h1 className="mb-8 font-serif text-3xl">Media Studio</h1>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/50">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-bone/15 bg-transparent px-4 py-3 text-sm text-bone outline-none focus:border-brass"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/50">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-bone/15 bg-transparent px-4 py-3 text-sm text-bone outline-none focus:border-brass"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full border border-brass/50 py-3 text-xs uppercase tracking-[0.22em] transition-colors duration-500 hover:bg-brass hover:text-carbon disabled:opacity-50"
          >
            {busy ? "Working…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {message && <p className="mt-5 text-sm text-brass/90">{message}</p>}

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/50 hover:text-brass"
        >
          {mode === "signin" ? "Need an account?" : "Have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
