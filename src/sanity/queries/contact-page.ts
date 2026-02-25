import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/live';
import type { CONTACT_PAGE_QUERY_RESULT } from '@/sanity/sanity.types';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ContactPageData = NonNullable<CONTACT_PAGE_QUERY_RESULT>;
export type ContactPageSettings = NonNullable<ContactPageData['settings']>;
export type ContactPageWeeklyHours = NonNullable<ContactPageSettings['hours']>;

// ─── Query ───────────────────────────────────────────────────────────────────

export const CONTACT_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "contactPage" && _id == "contactPage"][0]{
    surtitle,
    title,
    subtitle,
    formTitle,
    formSubtitle,
    seo
  },
  "settings": *[_type == "settings" && _id == "settings"][0]{
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
    }
  }
}`);

export async function getContactPageData() {
  const { data } = await sanityFetch({ query: CONTACT_PAGE_QUERY });
  return data;
}
