export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  readingMinutes: number;
  category: string;
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "multi-gardens-b17-vs-fmc-islamabad",
    title:
      "Multi Gardens B17 vs FMC Islamabad: Which is Better for Renting in 2025?",
    description:
      "Compare rent, transport, schools and daily life across MPCHS Multi Gardens B17 and Faisal Margalla City (FMC).",
    datePublished: "2025-01-15",
    readingMinutes: 8,
    category: "Area comparison",
  },
  {
    slug: "average-rent-multi-gardens-b17-islamabad",
    title:
      "Average Rent in Multi Gardens B17 Islamabad 2025 — Monthly Price Tracker",
    description:
      "Updated ranges for studios, flats, shops and offices across MPCHS B17 and FMC Islamabad.",
    datePublished: "2025-02-01",
    readingMinutes: 6,
    category: "Rent tracker",
  },
  {
    slug: "how-to-rent-in-mpchs-islamabad",
    title: "How to Rent in MPCHS Islamabad — Step-by-Step Renter’s Guide",
    description:
      "Documents, viewings, deposits and agreements for Multi Gardens B17 tenants.",
    datePublished: "2025-02-10",
    readingMinutes: 10,
    category: "Guide",
  },
  {
    slug: "is-multi-gardens-b17-good-for-families",
    title:
      "Is Multi Gardens B17 Islamabad Good for Families? Honest 2025 Review",
    description:
      "Safety, schools, parks and MPCHS society lifestyle — an on-the-ground renter perspective.",
    datePublished: "2025-03-01",
    readingMinutes: 9,
    category: "Lifestyle",
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
