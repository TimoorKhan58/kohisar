"use client";

import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase";

type AdminCtx = { supabase: SupabaseClient; session: Session };
const Ctx = createContext<AdminCtx | null>(null);

export function useAdmin(): AdminCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdmin must be used inside AdminShell");
  return v;
}

export function AdminShell({ children }: { children: ReactNode }) {
  const supabase = getBrowserSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (!supabase) {
    return (
      <Panel>
        <h1 className="text-xl font-bold text-primary">Admin not connected yet</h1>
        <p className="mt-2 text-sm text-muted">
          Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in
          Vercel, then redeploy.
        </p>
      </Panel>
    );
  }
  if (loading) return <Panel><p className="text-sm text-muted">Loading…</p></Panel>;
  if (!session) return <LoginForm supabase={supabase} />;

  return (
    <Ctx.Provider value={{ supabase, session }}>
      <div className="border-b border-primary/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/admin" className="font-semibold text-primary">
            Kohisar Plaza · Admin
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-muted sm:inline">{session.user.email}</span>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="rounded-lg border border-primary/20 px-3 py-1.5 text-primary hover:bg-surface"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</div>
    </Ctx.Provider>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto my-16 max-w-md rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

function LoginForm({ supabase }: { supabase: SupabaseClient }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Wrong email or password.");
    setBusy(false);
  }

  return (
    <Panel>
      <h1 className="text-xl font-bold text-primary">Admin login</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-primary/20 px-3 py-2"
        />
        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-primary/20 px-3 py-2"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </Panel>
  );
}
