import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { Property } from "@/types/property";
import { getWhatsAppPropertyLink } from "@/lib/seo";

function badgeLabel(p: Property) {
  if (p.isNew) return "New";
  if (!p.available) return "Taken";
  return p.furnished ? "Furnished" : "Unfurnished";
}

export function PropertyCard({ property }: { property: Property }) {
  const img = property.images[0] ?? "/images/logo-mark.svg";
  const wa = getWhatsAppPropertyLink(property.title, property.priceMonthly);

  const typeLabel =
    property.type === "flat"
      ? `${property.bedrooms}-bed flat`
      : property.type === "studio"
        ? "Studio"
        : property.type === "shop"
          ? "Shop"
          : "Office";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-surface">
        <Image
          src={img}
          alt={property.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white">
          {badgeLabel(property)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          {typeLabel} · {property.society}
        </p>
        <h3 className="mt-2 line-clamp-2 text-base font-bold text-primary leading-snug">
          {property.title}
        </h3>
        <p className="mt-2 text-sm text-muted">
            Rs.
          <span className="font-semibold text-body">
            {property.priceMonthly.toLocaleString("en-PK")}
          </span>
          /mo ·{" "}
          <span className="rounded-md bg-surface px-1.5 py-0.5 text-xs font-medium text-primary">
            {property.location === "B17"
              ? "Multi Gardens B17"
              : "FMC · Multi Gardens"}
          </span>
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-3 py-2 text-sm font-semibold text-white min-w-[8rem] hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <Link
            href="/properties"
            className="inline-flex items-center justify-center rounded-full border border-primary/20 px-3 py-2 text-sm font-medium text-primary hover:bg-surface"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
