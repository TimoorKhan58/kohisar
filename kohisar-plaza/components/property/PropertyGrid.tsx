import type { Property } from "@/types/property";
import { PropertyCard } from "./PropertyCard";

export function PropertyGrid({ list }: { list: Property[] }) {
  if (!list.length) {
    return (
      <p className="rounded-xl border border-dashed border-primary/20 bg-white p-8 text-center text-muted">
        No listings match your filters. WhatsApp Kohisar Plaza for off-market
        Multi Gardens B17 and FMC rentals.
      </p>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
