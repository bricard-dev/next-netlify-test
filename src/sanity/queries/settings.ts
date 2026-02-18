import { cache } from 'react';
import { client } from '@/sanity/client';

/**
 * Type pour les horaires d'un jour (dayHours)
 */
export type DayHours = {
  isOpen?: boolean;
  open?: string; // Format "HH:mm"
  close?: string; // Format "HH:mm"
};

/**
 * Type pour les horaires hebdomadaires (weeklyHours)
 */
export type WeeklyHours = {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
};

/**
 * Type pour les settings du site (singleton)
 */
export type SiteSettings = {
  bakeryName: string;
  siteDescription?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: WeeklyHours;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
  };
};

// Query pour le singleton settings (ID fixe = 'settings')
const SETTINGS_QUERY = `*[_type == "settings" && _id == "settings"][0]{
  bakeryName,
  siteDescription,
  address,
  phone,
  email,
  hours {
    monday {
      isOpen,
      open,
      close
    },
    tuesday {
      isOpen,
      open,
      close
    },
    wednesday {
      isOpen,
      open,
      close
    },
    thursday {
      isOpen,
      open,
      close
    },
    friday {
      isOpen,
      open,
      close
    },
    saturday {
      isOpen,
      open,
      close
    },
    sunday {
      isOpen,
      open,
      close
    }
  },
  socialLinks
}`;

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  return client.fetch(SETTINGS_QUERY, {}, { next: { revalidate: 60 } });
});
