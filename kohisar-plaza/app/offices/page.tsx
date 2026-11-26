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
    "Office & Studio for Rent in Multi Gardens B17 Islamabad | Kohisar Plaza",
  description:
    "Office for rent Multi Gardens B17 and FMC studios — MPCHS addresses ideal for startups and satellite teams.",
  path: "/offices",
});

// Refresh listings from the database at most every 60s (admin saves refresh instantly).
export const revalidate = 60;

export default async function OfficesPage() {
  const properties = await getProperties();
  const list = properties.filter(
    (p) => p.type === "office" || p.type === "studio"
  );
  const schema = getApartmentComplexJsonLd({
    name: "Offices & studios — Multi Gardens B17",
    description:
      "Workspace rentals within MPCHS Multi Gardens B17 and FMC Islamabad.",
    path: "/offices",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Properties", path: "/properties" },
    { name: "Offices", path: "/offices" },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <JsonLd data={[schema, crumbs]} />
      <Breadcrumb
        items={[
          { name: "Properties", path: "/properties" },
          { name: "Offices & studios", path: "/offices" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        Office & studio for rent in Multi Gardens B17 Islamabad
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        Compact MPCHS B17 studio flat rent offerings sit alongside proper office
        shells — verify internet backbone options with each tower or commercial
        podium.
      </p>
      <div className="mt-10">
        <PropertyGrid list={list} />
      </div>
    </div>
  );
}
