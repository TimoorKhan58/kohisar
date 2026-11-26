"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminShell";
import type { PropertyRow } from "@/lib/properties";
import { formatPKR, refreshPublicSite } from "@/lib/admin";

export default function AdminListPage() {
  const { supabase } = useAdmin();
  const [rows, setRows] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) setError(error.message);
    else setRows((data ?? []) as PropertyRow[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleAvailable(row: PropertyRow) {
    setBusyId(row.id);
    const { error } = await supabase
      .from("properties")
      .update({ available: !row.available })
      .eq("id", row.id);
    if (error) setError(error.message);
    else {
      await refreshPublicSite(supabase);
      await load();
    }
    setBusyId(null);
  }

  const available = rows.filter((r) => r.available).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Listings</h1>
          <p className="mt-1 text-sm text-muted">
            {available} available · {rows.length - available} rented. Rented units are hidden from
            the website.
          </p>
        </div>
        <Link
          href="/admin/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
        >
          + Add listing
        </Link>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error.includes("permission") || error.includes("row-level")
            ? "Your account is not on the admin list in Supabase (public.admins)."
            : error}
        </p>
      )}

      {loading ? (
        <p className="mt-8 text-sm text-muted">Loading listings…</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-primary/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Listing</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Rent / month</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {rows.map((r) => (
                <tr key={r.id} className={r.available ? "" : "bg-surface/60 text-muted"}>
                  <td className="px-4 py-3">
                    {r.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.images[0]} alt="" className="h-12 w-16 rounded object-cover" />
                    ) : (
                      <div className="h-12 w-16 rounded bg-surface" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-primary">
                    {r.title}
                    <div className="text-xs font-normal text-muted">
                      {r.location}
                      {r.block ? ` · ${r.block}` : ""}
                      {r.area_sqft ? ` · ${r.area_sqft} sq ft` : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {r.type === "flat" ? `${r.bedrooms}-bed flat` : r.type}
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatPKR(r.price_monthly)}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={busyId === r.id}
                      onClick={() => toggleAvailable(r)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        r.available
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      title="Click to switch"
                    >
                      {busyId === r.id ? "…" : r.available ? "Available" : "Rented"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/${r.id}`} className="font-semibold text-accent hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
