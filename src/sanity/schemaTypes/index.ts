import { type SchemaTypeDefinition } from 'sanity';

// Documents
import { settings } from './documents/settings';

// Objects
import { dayHoursType } from './objects/dayHours';
import { weeklyHoursType } from './objects/weeklyHours';
import { storeHoursType } from './objects/storeHours';
import { timeValueType } from './objects/timeValue';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  settings,

  // Objects
  timeValueType,
  dayHoursType,
  weeklyHoursType,
  storeHoursType,
];
