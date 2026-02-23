import { type SchemaTypeDefinition } from 'sanity';

// Documents
import { settings } from './documents/settings';
import { homePageType } from './documents/home-page';
import { categoryType } from './documents/category';
import { productType } from './documents/product';
import { productsPageType } from './documents/products-page';
import { aboutPageType } from './documents/about-page';
import { contactPageType } from './documents/contact-page';
import { privacyPageType } from './documents/privacy-page';
import { legalNoticePageType } from './documents/legal-notice-page';

// Objects
import { dayHoursType } from './objects/day-hours';
import { weeklyHoursType } from './objects/weekly-hours';
import { storeHoursType } from './objects/store-hours';
import { timeValueType } from './objects/time-value';
import { ctaType } from './objects/cta';
import { seoMetaType } from './objects/seo-meta';
import { serviceItemType } from './objects/service-item';
import { reviewItemType } from './objects/review-item';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  settings,
  homePageType,
  categoryType,
  productType,
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
  serviceItemType,
  reviewItemType,
];
