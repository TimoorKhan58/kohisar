export interface Property {
  id: string;
  title: string;
  type: "flat" | "shop" | "office" | "studio";
  bedrooms: 1 | 2 | 3 | null;
  priceMonthly: number;
  location: "B17" | "FMC";
  society: "MPCHS Multi Gardens";
  block?: string;
  area: number;
  floor?: number;
  furnished: boolean;
  available: boolean;
  isNew: boolean;
  isFeatured: boolean;
  images: string[];
  features: string[];
  whatsappMsg: string;
}
