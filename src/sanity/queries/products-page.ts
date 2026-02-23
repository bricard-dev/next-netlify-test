import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/live';
import type { PRODUCTS_PAGE_QUERY_RESULT } from '@/sanity/sanity.types';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProductsPageData = NonNullable<PRODUCTS_PAGE_QUERY_RESULT>;
export type CategorySection = NonNullable<ProductsPageData['categorySections']>[number];
export type CatalogueProduct = NonNullable<CategorySection['products']>[number];

// ─── Query ───────────────────────────────────────────────────────────────────

export const PRODUCTS_PAGE_QUERY = defineQuery(`*[_type == "productsPage" && _id == "productsPage"][0]{
  surtitle,
  title,
  subtitle,
  "categorySections": categorySections[]->{
    _id,
    name,
    tagline,
    "products": *[_type == "product" && category._ref == ^._id]{
      _id,
      name,
      slug,
      price,
      tagline,
      image{ ..., alt }
    }
  }
}`);

export async function getProductsPageData() {
  const { data } = await sanityFetch({ query: PRODUCTS_PAGE_QUERY });
  return data;
}
