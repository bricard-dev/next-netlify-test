import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/live';
import type { ABOUT_PAGE_QUERY_RESULT } from '@/sanity/sanity.types';

// ─── Types ───────────────────────────────────────────────────────────────────

export type AboutPageData = NonNullable<ABOUT_PAGE_QUERY_RESULT>;
export type AwardItem = NonNullable<AboutPageData['awards']>[number];
export type ValueItem = NonNullable<AboutPageData['values']>[number];
export type TeamMember = NonNullable<AboutPageData['team']>[number];

// ─── Query ───────────────────────────────────────────────────────────────────

export const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage" && _id == "aboutPage"][0]{
  heroSurtitle,
  heroTitle,
  heroSubtitle,

  histoireSurtitle,
  histoireTitle,
  histoireContent,
  histoirePhoto{ ..., alt },

  recompensesSurtitle,
  recompensesTitle,
  awards[]{
    _key,
    year,
    competition,
    title
  },

  valeursSurtitle,
  valeursTitle,
  values[]{
    _key,
    iconName,
    title,
    description
  },

  equipeSurtitle,
  equipeTitle,
  team[]{
    _key,
    name,
    role,
    photo{ ..., alt }
  }
}`);

export async function getAboutPageData() {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
  return data;
}
