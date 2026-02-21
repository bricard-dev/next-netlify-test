import { cache } from 'react';
import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/client';
import type { HOME_PAGE_QUERY_RESULT } from '@/sanity/sanity.types';

// ─── Types ───────────────────────────────────────────────────────────────────

export type HomePageData = NonNullable<HOME_PAGE_QUERY_RESULT>;
export type SanityImageWithAlt = NonNullable<HomePageData['heroImage']>;
export type Product = NonNullable<HomePageData['featuredProducts']>[number];
export type ServiceItem = NonNullable<HomePageData['servicesItems']>[number];
export type ReviewItem = NonNullable<HomePageData['reviewsItems']>[number];
export type Cta = NonNullable<HomePageData['heroPrimaryCta']>;

// ─── Query ───────────────────────────────────────────────────────────────────

const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage" && _id == "homePage"][0]{
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
}`);

export const getHomePageData = cache(async () => {
  return client.fetch(HOME_PAGE_QUERY, {}, { next: { revalidate: 60 } });
});
