import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { JsonLd } from "@/components/schema/JsonLd";
import { properties } from "@/data/properties";
import {
  getApartmentComplexJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/schema-builders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "1 Bedroom Flat for Rent in Multi Gardens B17 Islamabad | Kohisar Plaza",
  description:
    "1-bed flat for rent MPCHS B17 Islamabad and FMC — furnished and unfurnished, direct from owner at Kohisar Plaza.",
  path: "/flats/1-bedroom",
});

export default function OneBedPage() {
  const list = properties.filter(
    (p) => p.type === "flat" && p.bedrooms === 1
  );
  const schema = getApartmentComplexJsonLd({
    name: "1-bedroom flats — Multi Gardens B17",
    description:
      "One-bedroom apartments for rent across MPCHS Multi Gardens B17 and FMC.",
    path: "/flats/1-bedroom",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Properties", path: "/properties" },
    { name: "1-bedroom flats", path: "/flats/1-bedroom" },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <JsonLd data={[schema, crumbs]} />
      <Breadcrumb
        items={[
          { name: "Properties", path: "/properties" },
          { name: "1-bedroom flats", path: "/flats/1-bedroom" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        1-bedroom flat for rent in Multi Gardens B17 (MPCHS) Islamabad
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        Ideal for singles and couples commuting via GT Road or M-1. Compare
        B17 blocks with FMC (Faisal Margalla City) pockets inside the same
        Multi Professional Cooperative Housing Society scheme.
      </p>
      <div className="mt-10">
        <PropertyGrid list={list} />
      </div>
    </div>
  );
}
