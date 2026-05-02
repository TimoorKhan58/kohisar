"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import type { Property } from "@/types/property";
import { filterPropertiesList } from "@/lib/filter-properties";

export function PropertiesClient({ all }: { all: Property[] }) {
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    const type = searchParams.get("type") ?? undefined;
    const beds = searchParams.get("beds") ?? undefined;
    const max = searchParams.get("max") ?? undefined;
    const location = searchParams.get("location") ?? undefined;
    return filterPropertiesList(all, { type, beds, max, location });
  }, [searchParams, all]);

  return (
    <>
      <Breadcrumb items={[{ name: "Properties", path: "/properties" }]} />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        Properties for rent in Multi Gardens B17 & FMC
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        Browse MPCHS Multi Gardens listings spanning B17 Islamabad and Faisal
        Margalla City (FMC). Filters use URL query parameters — share links with
        tenants or agents transparently.
      </p>
      <div className="mt-10">
        <PropertyGrid list={filtered} />
      </div>
    </>
  );
}
