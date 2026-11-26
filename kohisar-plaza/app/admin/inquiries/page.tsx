"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "@/components/admin/AdminShell";

interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  property_type: string;
  message: string;
  page: string | null;
  status: "new" | "handled";
}

/** Pakistani numbers: 03xx… → 923xx…, keep digits only for wa.me links. */
function waNumber(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.startsWith("0")) return `92${d.slice(1)}`;
  return d;
}

const typeLabel: Record<string, string> = {
  flat: "Flat",
  shop: "Shop",
  office: "Office / studio",
  other: "Other",
};

export default function AdminInquiriesPage() {
  const { supabase } = useAdmin();
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"new" | "all">("new");

  const load = useCallback(async () => {
    let q = supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(200);
    if (filter === "new") q = q.eq("status", "new");
    const { data, error } = await q;
    if (error) setError(error.message);
    else setRows((data ?? []) as Inquiry[]);
    setLoading(false);
  }, [supabase, filter]);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(row: Inquiry, status: Inquiry["status"]) {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", row.id);
    if (error) setError(error.message);
    else load();
  }

  async function remove(row: Inquiry) {
    if (!window.confirm(`Delete the inquiry from ${row.name}? This cannot be undone.`)) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", row.id);
    if (error) setError(error.message);
    else load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Inquiries</h1>
          <p className="mt-1 text-sm text-muted">Messages sent through the website contact form.</p>
        </div>
        <div className="flex rounded-lg border border-primary/20 p-1 text-sm">
          {(["new", "all"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1 ${filter === f ? "bg-primary text-white" : "text-primary"}`}
            >
              {f === "new" ? "New" : "All"}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-muted">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 text-sm text-muted">
          {filter === "new" ? "No new inquiries." : "No inquiries yet."}
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {rows.map((r) => {
            const wa = `https://wa.me/${waNumber(r.phone)}?text=${encodeURIComponent(
              `Assalam o Alaikum ${r.name}, this is Kohisar Plaza replying to your inquiry about a ${(
                typeLabel[r.property_type] ?? "property"
              ).toLowerCase()}.`
            )}`;
            return (
              <li
                key={r.id}
                className={`rounded-2xl border bg-white p-5 ${
                  r.status === "new" ? "border-accent/50" : "border-primary/10 opacity-75"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-primary">
                      {r.name}
                      {r.status === "new" && (
                        <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent">New</span>
                      )}
                    </p>
                    <p className="text-sm text-muted">
                      {r.phone} · {typeLabel[r.property_type] ?? r.property_type} ·{" "}
                      {new Date(r.created_at).toLocaleString("en-PK", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-green-600 px-3 py-1.5 font-semibold text-white hover:bg-green-700"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}
                      className="rounded-lg border border-primary/20 px-3 py-1.5 font-semibold text-primary"
                    >
                      Call
                    </a>
                    {r.status === "new" ? (
                      <button
                        type="button"
                        onClick={() => setStatus(r, "handled")}
                        className="rounded-lg border border-primary/20 px-3 py-1.5 text-primary"
                      >
                        Mark handled
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setStatus(r, "new")}
                        className="rounded-lg border border-primary/20 px-3 py-1.5 text-primary"
                      >
                        Mark new
                      </button>
                    )}
                    <button type="button" onClick={() => remove(r)} className="px-2 py-1.5 text-red-600">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-body">{r.message}</p>
                {r.page && <p className="mt-2 text-xs text-muted">Sent from {r.page}</p>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
