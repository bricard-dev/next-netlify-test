import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/live';
import type { SETTINGS_QUERY_RESULT } from '@/sanity/sanity.types';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SiteSettings = NonNullable<SETTINGS_QUERY_RESULT>;
export type WeeklyHours = NonNullable<SiteSettings['hours']>;
export type DayHours = NonNullable<WeeklyHours['monday']>;

// ─── Query ───────────────────────────────────────────────────────────────────

const SETTINGS_QUERY = defineQuery(`*[_type == "settings" && _id == "settings"][0]{
  bakeryName,
  instagramUrl,
  address,
  phone,
  email,
  hours {
    monday { isOpen, open, close },
    tuesday { isOpen, open, close },
    wednesday { isOpen, open, close },
    thursday { isOpen, open, close },
    friday { isOpen, open, close },
    saturday { isOpen, open, close },
    sunday { isOpen, open, close }
  },
  seo {
    title,
    description
  }
}`);

export async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SETTINGS_QUERY });
  return data;
}
