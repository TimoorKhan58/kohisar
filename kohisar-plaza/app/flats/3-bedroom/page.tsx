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
    "3 Bedroom Flat for Rent in Multi Gardens B17 Islamabad | Kohisar Plaza",
  description:
    "Family-sized 3-bed flats in MPCHS Multi Gardens B17 — Margalla breezes, society amenities and direct owner options.",
  path: "/flats/3-bedroom",
});

export default function ThreeBedPage() {
  const list = properties.filter(
    (p) => p.type === "flat" && p.bedrooms === 3
  );
  const schema = getApartmentComplexJsonLd({
    name: "3-bedroom flats — Multi Gardens B17",
    description:
      "Large format apartments for rent across MPCHS B17 Multi Gardens.",
    path: "/flats/3-bedroom",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Properties", path: "/properties" },
    { name: "3-bedroom flats", path: "/flats/3-bedroom" },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <JsonLd data={[schema, crumbs]} />
      <Breadcrumb
        items={[
          { name: "Properties", path: "/properties" },
          { name: "3-bedroom flats", path: "/flats/3-bedroom" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        3-bedroom flat for rent in Multi Gardens B17 Islamabad
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        Targeted at families asking is Multi Gardens B17 good for families —
        these homes pair MPCHS planning with quieter FMC fringes or central B17
        convenience, subject to block choice.
      </p>
      <div className="mt-10">
        <PropertyGrid list={list} />
      </div>
    </div>
  );
}
