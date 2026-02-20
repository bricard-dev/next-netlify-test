import { cache } from 'react';
import { client } from '@/sanity/client';
import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from 'sanity';

// ─── Types ───────────────────────────────────────────────────────────────────

export type Cta = {
  label: string;
  href: string;
};

export type SanityImage = SanityImageSource & {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number; height: number; width: number };
};

export type SanityImageWithAlt = SanityImage & {
  alt?: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  tagline?: string;
  price?: string;
  image: SanityImageWithAlt;
  category?: string;
};

export type ServiceItem = {
  _key: string;
  iconName?: string;
  title: string;
  description: string;
};

export type ReviewItem = {
  _key: string;
  name: string;
  source?: string;
  avatar?: SanityImage;
  rating: number;
  text: string;
};

export type HomePageData = {
  // Hero
  heroSurtitle?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImageWithAlt;
  heroPrimaryCta?: Cta;
  heroSecondaryCta?: Cta;

  // Products
  productsSurtitle?: string;
  productsTitle?: string;
  productsSubtitle?: string;
  featuredProducts?: Product[];

  // About
  aboutSurtitle?: string;
  aboutTitle?: string;
  aboutDescription?: PortableTextBlock[];
  aboutCta?: Cta;
  aboutPhoto?: SanityImageWithAlt;

  // Location
  locationSurtitle?: string;
  locationTitle?: string;
  locationDescription?: string;
  locationPhoto?: SanityImageWithAlt;
  locationCta?: Cta;

  // Services
  servicesItems?: ServiceItem[];

  // Reviews
  reviewsSurtitle?: string;
  reviewsTitle?: string;
  reviewsItems?: ReviewItem[];

  // Gallery
  galleryImages?: SanityImageWithAlt[];
};

// ─── Query ───────────────────────────────────────────────────────────────────

const HOME_PAGE_QUERY = `*[_type == "homePage" && _id == "homePage"][0]{
  heroSurtitle,
  heroTitle,
  heroSubtitle,
  heroImage{ ..., alt },
  heroPrimaryCta{ label, "href": select(linkType == "internal" => internalPath, externalUrl) },
  heroSecondaryCta{ label, "href": select(linkType == "internal" => internalPath, externalUrl) },

  productsSurtitle,
  productsTitle,
  productsSubtitle,
  featuredProducts[]->{
    _id,
    name,
    slug,
    tagline,
    price,
    image{ ..., alt },
    category
  },

  aboutSurtitle,
  aboutTitle,
  aboutDescription,
  aboutCta{ label, "href": select(linkType == "internal" => internalPath, externalUrl) },
  aboutPhoto{ ..., alt },

  locationSurtitle,
  locationTitle,
  locationDescription,
  locationPhoto{ ..., alt },
  locationCta{ label, "href": select(linkType == "internal" => internalPath, externalUrl) },

  servicesItems[]{
    _key,
    iconName,
    title,
    description
  },

  reviewsSurtitle,
  reviewsTitle,
  reviewsItems[]{
    _key,
    name,
    source,
    avatar,
    rating,
    text
  },

  galleryImages[]{ ..., alt }
}`;

export const getHomePageData = cache(async (): Promise<HomePageData | null> => {
  return client.fetch(HOME_PAGE_QUERY, {}, { next: { revalidate: 60 } });
});
