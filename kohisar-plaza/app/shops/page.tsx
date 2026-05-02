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
    "Shop for Rent in Multi Gardens B17 Islamabad | Kohisar Plaza",
  description:
    "Retail and markaz shops across MPCHS Multi Gardens B17 and FMC — direct landlord contact via Kohisar Plaza.",
  path: "/shops",
});

export default function ShopsPage() {
  const list = properties.filter((p) => p.type === "shop");
  const schema = getApartmentComplexJsonLd({
    name: "Shops for rent — Multi Gardens B17",
    description:
      "Commercial frontages in B17 markaz areas and FMC strips inside MPCHS.",
    path: "/shops",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Properties", path: "/properties" },
    { name: "Shops", path: "/shops" },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <JsonLd data={[schema, crumbs]} />
      <Breadcrumb
        items={[
          { name: "Properties", path: "/properties" },
          { name: "Shops", path: "/shops" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        Shop for rent in Multi Gardens B17 & FMC Islamabad
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        From FMC neighbourhood retail to B17 commercial spines — MPCHS
        inventory grows with resident footfall. Ask about utilities, load limits
        and parking before signing.
      </p>
      <div className="mt-10">
        <PropertyGrid list={list} />
      </div>
    </div>
  );
}
