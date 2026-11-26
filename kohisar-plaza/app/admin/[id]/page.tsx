"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAdmin } from "@/components/admin/AdminShell";
import type { PropertyRow } from "@/lib/properties";
import { deletePropertyImage, refreshPublicSite, uploadPropertyImage } from "@/lib/admin";

type Form = Omit<PropertyRow, "updated_at">;

const EMPTY: Omit<Form, "id"> = {
  title: "",
  type: "flat",
  bedrooms: 1,
  price_monthly: 0,
  location: "B17",
  block: "",
  area_sqft: 0,
  floor: null,
  furnished: false,
  available: true,
  is_new: true,
  is_featured: false,
  images: [],
  features: [],
  whatsapp_msg: "",
  sort_order: 0,
};

export default function AdminEditPage() {
  const { supabase } = useAdmin();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";
  // A new listing gets its id up front so photos can be uploaded into its folder before saving.
  const id = useMemo(() => (isNew ? crypto.randomUUID() : params.id), [isNew, params.id]);

  const [form, setForm] = useState<Form | null>(isNew ? { id, ...EMPTY } : null);
  const [featuresText, setFeaturesText] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (isNew) return;
    supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setMessage({ kind: "err", text: "Listing not found." });
          return;
        }
        const row = data as PropertyRow;
        setForm({ ...row, images: row.images ?? [], features: row.features ?? [] });
        setFeaturesText((row.features ?? []).join("\n"));
      });
  }, [supabase, id, isNew]);

  if (!form) {
    return <p className="text-sm text-muted">{message?.text ?? "Loading…"}</p>;
  }

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => (f ? { ...f, [key]: value } : f));

  async function onUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length || !form) return;
    setUploading(true);
    setMessage(null);
    try {
      const urls: string[] = [];
      for (const file of files) urls.push(await uploadPropertyImage(supabase, form.id, file));
      setForm((f) => (f ? { ...f, images: [...(f.images ?? []), ...urls] } : f));
      setMessage({ kind: "ok", text: `${urls.length} photo(s) uploaded. Click Save to publish.` });
    } catch (err) {
      setMessage({ kind: "err", text: (err as Error).message });
    }
    setUploading(false);
  }

  function moveImage(i: number, dir: -1 | 1) {
    const imgs = [...(form!.images ?? [])];
    const j = i + dir;
    if (j < 0 || j >= imgs.length) return;
    [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
    set("images", imgs);
  }

  // Only removes it from this listing; the file stays in Storage so an unsaved edit can't break the live page.
  function removeImage(i: number) {
    const imgs = [...(form!.images ?? [])];
    imgs.splice(i, 1);
    set("images", imgs);
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    setBusy(true);
    setMessage(null);
    const payload: Form = {
      ...form,
      title: form.title.trim(),
      block: form.block?.trim() || null,
      bedrooms: form.type === "flat" ? form.bedrooms ?? 1 : null,
      features: featuresText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const { error } = await supabase.from("properties").upsert(payload);
    if (error) {
      setMessage({ kind: "err", text: error.message });
      setBusy(false);
      return;
    }
    await refreshPublicSite(supabase);
    setBusy(false);
    if (isNew) router.replace(`/admin/${form.id}`);
    setMessage({ kind: "ok", text: "Saved. The website is updated." });
  }

  async function onDelete() {
    if (!form || !window.confirm(`Delete "${form.title}" permanently? Tip: mark it Rented instead to hide it.`)) return;
    setBusy(true);
    const { error } = await supabase.from("properties").delete().eq("id", form.id);
    if (error) {
      setMessage({ kind: "err", text: error.message });
      setBusy(false);
      return;
    }
    for (const url of form.images ?? []) await deletePropertyImage(supabase, url);
    await refreshPublicSite(supabase);
    router.replace("/admin");
  }

  return (
    <form onSubmit={onSave} className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="text-sm text-accent hover:underline">
            ← All listings
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-primary">
            {isNew ? "Add listing" : "Edit listing"}
          </h1>
        </div>
        <div className="flex gap-3">
          {!isNew && (
            <button
              type="button"
              onClick={onDelete}
              disabled={busy}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            disabled={busy || uploading}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {message && (
        <p
          className={`rounded-lg p-3 text-sm ${
            message.kind === "ok" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}

      <Section title="Basics">
        <Field label="Title" full>
          <input
            required
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className={input}
            placeholder="2-Bed Flat in Multi Gardens B17"
          />
        </Field>
        <Field label="Type">
          <select
            value={form.type}
            onChange={(e) => set("type", e.target.value as Form["type"])}
            className={input}
          >
            <option value="flat">Flat</option>
            <option value="studio">Studio</option>
            <option value="shop">Shop</option>
            <option value="office">Office</option>
          </select>
        </Field>
        {form.type === "flat" && (
          <Field label="Bedrooms">
            <select
              value={form.bedrooms ?? 1}
              onChange={(e) => set("bedrooms", Number(e.target.value))}
              className={input}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </Field>
        )}
        <Field label="Rent per month (Rs.)">
          <input
            type="number"
            min={0}
            step={500}
            required
            value={form.price_monthly}
            onChange={(e) => set("price_monthly", Number(e.target.value))}
            className={input}
          />
        </Field>
        <Field label="Location">
          <select
            value={form.location}
            onChange={(e) => set("location", e.target.value as Form["location"])}
            className={input}
          >
            <option value="B17">B17 (MPCHS)</option>
            <option value="FMC">FMC</option>
          </select>
        </Field>
        <Field label="Block">
          <input
            value={form.block ?? ""}
            onChange={(e) => set("block", e.target.value)}
            className={input}
            placeholder="Block C"
          />
        </Field>
        <Field label="Size (sq ft)">
          <input
            type="number"
            min={0}
            value={form.area_sqft}
            onChange={(e) => set("area_sqft", Number(e.target.value))}
            className={input}
          />
        </Field>
        <Field label="Floor">
          <input
            type="number"
            min={0}
            value={form.floor ?? ""}
            onChange={(e) => set("floor", e.target.value === "" ? null : Number(e.target.value))}
            className={input}
            placeholder="0 = ground"
          />
        </Field>
        <Field label="Display order">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value))}
            className={input}
          />
        </Field>
      </Section>

      <Section title="Status">
        <Check label="Available (shown on website)" checked={form.available} onChange={(v) => set("available", v)} />
        <Check label="Furnished" checked={form.furnished} onChange={(v) => set("furnished", v)} />
        <Check label='"New" badge' checked={form.is_new} onChange={(v) => set("is_new", v)} />
        <Check label="Featured on homepage" checked={form.is_featured} onChange={(v) => set("is_featured", v)} />
      </Section>

      <Section title="Features (one per line)">
        <Field label="" full>
          <textarea
            rows={4}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            className={input}
            placeholder={"Lift\nSeparate electricity meter\nCar parking"}
          />
        </Field>
      </Section>

      <Section title="Photos">
        <div className="md:col-span-2">
          <p className="text-sm text-muted">
            The first photo is the cover. Photos are resized automatically before upload.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {(form.images ?? []).map((src, i) => (
              <div key={src} className="overflow-hidden rounded-lg border border-primary/10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
                <div className="flex items-center justify-between px-2 py-1 text-xs">
                  <span className="text-muted">{i === 0 ? "Cover" : `#${i + 1}`}</span>
                  <span className="flex gap-2">
                    <button type="button" onClick={() => moveImage(i, -1)} aria-label="Move left">←</button>
                    <button type="button" onClick={() => moveImage(i, 1)} aria-label="Move right">→</button>
                    <button type="button" onClick={() => removeImage(i)} className="text-red-600">
                      Remove
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <label className="mt-4 inline-block cursor-pointer rounded-lg border border-dashed border-primary/30 px-4 py-3 text-sm font-medium text-primary hover:bg-surface">
            {uploading ? "Uploading…" : "+ Upload photos"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              hidden
              disabled={uploading}
              onChange={onUpload}
            />
          </label>
        </div>
      </Section>
    </form>
  );
}

const input =
  "w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-primary/10 bg-white p-5">
      <h2 className="mb-4 font-semibold text-primary">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: ReactNode }) {
  return (
    <label className={`block text-sm ${full ? "md:col-span-2" : ""}`}>
      {label && <span className="mb-1 block font-medium text-body">{label}</span>}
      {children}
    </label>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
      {label}
    </label>
  );
}
