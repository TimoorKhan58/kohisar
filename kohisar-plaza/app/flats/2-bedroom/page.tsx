import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { JsonLd } from "@/components/schema/JsonLd";
import { getProperties } from "@/lib/properties";
import {
  getApartmentComplexJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/schema-builders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "2 Bedroom Flat for Rent in Multi Gardens B17 Islamabad | Kohisar Plaza",
  description:
    "2 bedroom flat rent Multi Gardens Islamabad — MPCHS B17 & FMC listings with transparent monthly rents.",
  path: "/flats/2-bedroom",
});

// Refresh listings from the database at most every 60s (admin saves refresh instantly).
export const revalidate = 60;

export default async function TwoBedPage() {
  const properties = await getProperties();
  const list = properties.filter(
    (p) => p.type === "flat" && p.bedrooms === 2
  );
  const schema = getApartmentComplexJsonLd({
    name: "2-bedroom flats — Multi Gardens B17",
    description:
      "Two-bedroom flats for families and professionals in MPCHS Multi Gardens.",
    path: "/flats/2-bedroom",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Properties", path: "/properties" },
    { name: "2-bedroom flats", path: "/flats/2-bedroom" },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <JsonLd data={[schema, crumbs]} />
      <Breadcrumb
        items={[
          { name: "Properties", path: "/properties" },
          { name: "2-bedroom flats", path: "/flats/2-bedroom" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        2-bedroom flat for rent in Multi Gardens B17 & MPCHS Islamabad
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        The sweet spot for average rent Multi Gardens B17 searches — spacious
        lounges, often dual baths, and routes toward schools and mosques across
        FMC and wider B17 grids.
      </p>
      <div className="mt-10">
        <PropertyGrid list={list} />
      </div>
    </div>
  );
}
