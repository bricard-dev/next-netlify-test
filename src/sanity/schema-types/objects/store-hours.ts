import { defineField, defineType } from 'sanity';
import { StoreHoursInput } from '../components/store-hours-input';

export const storeHoursType = defineType({
  name: 'storeHours',
  title: 'Store Hours',
  type: 'object',
  components: {
    input: StoreHoursInput,
  },
  fields: [
    defineField({
      name: 'day',
      title: 'Day of Week',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
        ],
      },
    }),
    defineField({
      name: 'isOpen',
      title: 'Is Open',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'open',
      title: 'Opening Time',
      type: 'timeValue',
    }),
    defineField({
      name: 'close',
      title: 'Closing Time',
      type: 'timeValue',
    }),
  ],
});
