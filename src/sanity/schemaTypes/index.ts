import { type SchemaTypeDefinition } from 'sanity';

// Documents
import { settings } from './documents/settings';
import { productsPageType } from './documents/productsPage';
import { aboutPageType } from './documents/aboutPage';
import { contactPageType } from './documents/contactPage';
import { privacyPageType } from './documents/privacyPage';
import { legalNoticePageType } from './documents/legalNoticePage';

// Objects
import { dayHoursType } from './objects/dayHours';
import { weeklyHoursType } from './objects/weeklyHours';
import { storeHoursType } from './objects/storeHours';
import { timeValueType } from './objects/timeValue';
import { ctaType } from './objects/cta';
import { seoMetaType } from './objects/seoMeta';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  settings,
  productsPageType,
  aboutPageType,
  contactPageType,
  privacyPageType,
  legalNoticePageType,

  // Objects
  timeValueType,
  dayHoursType,
  weeklyHoursType,
  storeHoursType,
  ctaType,
  seoMetaType,
];
