import { Suspense } from "react";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { JsonLd } from "@/components/schema/JsonLd";
import { properties } from "@/data/properties";
import {
  getApartmentComplexJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/schema-builders";
import { buildMetadata } from "@/lib/seo";
import { PropertiesClient } from "./PropertiesClient";

export const metadata = buildMetadata({
  title:
    "All Properties for Rent in Multi Gardens B17 Islamabad | Kohisar Plaza",
  description:
    "Filter flats, shops and offices across MPCHS Multi Gardens B17 and FMC. Direct owner rentals at Kohisar Plaza — WhatsApp for viewings.",
  path: "/properties",
});

export default function PropertiesPage() {
  const apt = getApartmentComplexJsonLd({
    name: "Kohisar Plaza Rentals — Multi Gardens B17",
    description:
      "Inventory of flats, shops and offices for rent in MPCHS Multi Gardens B17 and FMC Islamabad.",
    path: "/properties",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Properties", path: "/properties" },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <JsonLd data={[apt, crumbs]} />
      <Suspense
        fallback={
          <>
            <p className="text-sm text-muted">Loading listings…</p>
            <div className="mt-10">
              <PropertyGrid list={properties} />
            </div>
          </>
        }
      >
        <PropertiesClient all={properties} />
      </Suspense>
    </div>
  );
}
