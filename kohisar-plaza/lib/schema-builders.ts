import { getPhoneDisplay, getSiteUrl, getWhatsAppDigits } from "@/lib/seo";

const phoneDisplay = getPhoneDisplay();

export function getOrganizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kohisar Plaza",
    alternateName: [
      "MPCHS Rentals",
      "Multi Gardens B17 Rentals",
      "Kohisar Plaza B17",
      "Multi Gardens Islamabad Property",
    ],
    url,
    description:
      "Premium rentals in MPCHS Multi Gardens B17 and FMC Islamabad — flats, shops and offices direct from owner.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kohisar Plaza, MPCHS Multi Gardens",
      addressLocality: "B17, Islamabad",
      addressCountry: "PK",
    },
    telephone: phoneDisplay,
    areaServed: ["B17 Islamabad", "FMC Islamabad", "Multi Gardens", "MPCHS"],
  };
}

export function getRealEstateAgentJsonLd() {
  const url = getSiteUrl();
  const wa = getWhatsAppDigits();
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Kohisar Plaza",
    alternateName: [
      "Kohisar Plaza Multi Gardens",
      "MPCHS Kohisar Plaza",
      "Kohisar Plaza B17 Islamabad",
    ],
    description:
      "Rental flats, shops and offices in MPCHS Multi Gardens B17 and FMC Islamabad. Direct from owner.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kohisar Plaza, MPCHS Multi Gardens",
      addressLocality: "B17, Islamabad",
      addressCountry: "PK",
    },
    telephone: phoneDisplay,
    url,
    openingHours: "Mo-Sa 09:00-21:00",
    areaServed: ["B17 Islamabad", "FMC Islamabad", "Multi Gardens", "MPCHS"],
    sameAs: [`https://wa.me/${wa}`],
  };
}

export function getFAQPageJsonLd(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };
}

export function getArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: "Kohisar Plaza",
    },
    publisher: {
      "@type": "Organization",
      name: "Kohisar Plaza",
      logo: {
        "@type": "ImageObject",
        url: `${base}/images/logo-mark.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}${path}`,
    },
  };
}

export function getApartmentComplexJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name,
    description,
    url: `${base}${path}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kohisar Plaza, MPCHS Multi Gardens",
      addressLocality: "B17, Islamabad",
      addressCountry: "PK",
    },
  };
}

export function getDatasetJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    url: `${base}${path}`,
    license: `${base}`,
    creator: {
      "@type": "Organization",
      name: "Kohisar Plaza",
    },
  };
}
