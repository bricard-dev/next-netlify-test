import { cache } from 'react';
import { client } from '@/sanity/client';

export type DayHours = {
  isOpen?: boolean;
  open?: string; // Format "HH:mm"
  close?: string; // Format "HH:mm"
};

export type WeeklyHours = {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
};

export type SiteSettings = {
  bakeryName: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: WeeklyHours;
  seo?: {
    title?: string;
    description?: string;
  };
};

const SETTINGS_QUERY = `*[_type == "settings" && _id == "settings"][0]{
  bakeryName,
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
}`;

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  return client.fetch(SETTINGS_QUERY, {}, { next: { revalidate: 60 } });
});
