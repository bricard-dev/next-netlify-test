import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/live';
import type {
  PRODUCT_BY_SLUG_QUERY_RESULT,
  PRODUCT_SLUGS_QUERY_RESULT,
} from '@/sanity/sanity.types';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProductDetailData = NonNullable<PRODUCT_BY_SLUG_QUERY_RESULT>;
export type ProductSlugsData = PRODUCT_SLUGS_QUERY_RESULT;

// ─── Query — Product detail ───────────────────────────────────────────────────

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  price,
  tagline,
  description,
  image{ ..., alt },
  category->{
    _id,
    name,
    tagline
  }
}`);

// ─── Query — All slugs (generateStaticParams) ─────────────────────────────────

export const PRODUCT_SLUGS_QUERY = defineQuery(`*[_type == "product" && defined(slug.current)]{
  "slug": slug.current
}`);

// ─── Fetchers ────────────────────────────────────────────────────────────────

export async function getProductBySlug(slug: string) {
  const { data } = await sanityFetch({ query: PRODUCT_BY_SLUG_QUERY, params: { slug } });
  return data;
}

export async function getProductSlugs() {
  const { data } = await sanityFetch({ query: PRODUCT_SLUGS_QUERY });
  return data;
}
