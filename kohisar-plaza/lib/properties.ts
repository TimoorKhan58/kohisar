import type { Property } from "@/types/property";
import { properties as staticProperties } from "@/data/properties";
import { getServerSupabase } from "@/lib/supabase";

/** Database row shape (snake_case columns in public.properties). */
export interface PropertyRow {
  id: string;
  title: string;
  type: Property["type"];
  bedrooms: number | null;
  price_monthly: number;
  location: Property["location"];
  block: string | null;
  area_sqft: number;
  floor: number | null;
  furnished: boolean;
  available: boolean;
  is_new: boolean;
  is_featured: boolean;
  images: string[] | null;
  features: string[] | null;
  whatsapp_msg: string | null;
  sort_order: number;
  updated_at?: string;
}

export function rowToProperty(r: PropertyRow): Property {
  return {
    id: r.id,
    title: r.title,
    type: r.type,
    bedrooms: (r.bedrooms ?? null) as Property["bedrooms"],
    priceMonthly: r.price_monthly,
    location: r.location,
    society: "MPCHS Multi Gardens",
    block: r.block ?? undefined,
    area: r.area_sqft,
    floor: r.floor ?? undefined,
    furnished: r.furnished,
    available: r.available,
    isNew: r.is_new,
    isFeatured: r.is_featured,
    images: r.images ?? [],
    features: r.features ?? [],
    whatsappMsg: r.whatsapp_msg ?? "",
  };
}

/**
 * Listings shown on the public site (rented units are hidden).
 * Reads Supabase when configured; otherwise, or if the query fails,
 * falls back to data/properties.ts so the site never goes blank.
 */
export async function getProperties(): Promise<Property[]> {
  const supabase = getServerSupabase();
  if (!supabase) return staticProperties.filter((p) => p.available);

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("available", true)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("[properties] Supabase read failed, using static data:", error?.message);
    return staticProperties.filter((p) => p.available);
  }
  return (data as PropertyRow[]).map(rowToProperty);
}
