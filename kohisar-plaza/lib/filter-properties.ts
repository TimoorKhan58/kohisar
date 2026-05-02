import type { Property } from "@/types/property";

export function filterPropertiesList(
  list: Property[],
  params: {
    type?: string;
    beds?: string;
    max?: string;
    location?: string;
  }
): Property[] {
  let result = list;

  if (params.location === "B17" || params.location === "FMC") {
    result = result.filter((p) => p.location === params.location);
  }

  if (params.type === "furnished") {
    return result.filter((p) => p.furnished);
  }

  if (params.type && params.type !== "all") {
    const t = params.type;
    if (t === "office") {
      result = result.filter((p) => p.type === "office" || p.type === "studio");
    } else {
      result = result.filter((p) => p.type === t);
    }
  }

  if (params.beds && params.beds !== "any") {
    const n = Number(params.beds);
    result = result.filter((p) => p.bedrooms === n);
  }

  if (params.max && params.max !== "any") {
    const cap = Number(params.max);
    result = result.filter((p) => p.priceMonthly <= cap);
  }

  return result;
}
