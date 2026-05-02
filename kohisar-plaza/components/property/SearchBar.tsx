"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

const types = [
  { value: "all", label: "All types" },
  { value: "flat", label: "Flat" },
  { value: "shop", label: "Shop" },
  { value: "office", label: "Office / studio" },
];

const beds = [
  { value: "any", label: "Beds" },
  { value: "1", label: "1 bed" },
  { value: "2", label: "2 bed" },
  { value: "3", label: "3 bed" },
];

const budgets = [
  { value: "any", label: "Budget" },
  { value: "25000", label: "Up to 25k" },
  { value: "40000", label: "Up to 40k" },
  { value: "60000", label: "Up to 60k" },
  { value: "100000", label: "60k+" },
];

export function SearchBar() {
  const router = useRouter();
  const [ptype, setPtype] = useState("all");
  const [bed, setBed] = useState("any");
  const [budget, setBudget] = useState("any");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    if (ptype !== "all") q.set("type", ptype);
    if (bed !== "any") q.set("beds", bed);
    if (budget !== "any") q.set("max", budget);
    const qs = q.toString();
    router.push(qs ? `/properties?${qs}` : "/properties");
  }

  return (
    <form
      onSubmit={onSearch}
      className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur md:flex-row md:items-end"
    >
      <label className="flex-1 text-sm font-medium text-white/90">
        Property type
        <select
          value={ptype}
          onChange={(e) => setPtype(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 bg-primary/80 px-3 py-2.5 text-white outline-none focus:border-accent"
        >
          {types.map((t) => (
            <option key={t.value} value={t.value} className="text-body">
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex-1 text-sm font-medium text-white/90">
        Bedrooms
        <select
          value={bed}
          onChange={(e) => setBed(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 bg-primary/80 px-3 py-2.5 text-white outline-none focus:border-accent"
        >
          {beds.map((t) => (
            <option key={t.value} value={t.value} className="text-body">
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex-1 text-sm font-medium text-white/90">
        Budget range
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 bg-primary/80 px-3 py-2.5 text-white outline-none focus:border-accent"
        >
          {budgets.map((t) => (
            <option key={t.value} value={t.value} className="text-body">
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white hover:brightness-110 md:mb-0"
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}
