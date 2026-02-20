import { defineField, defineType } from 'sanity';
import { WeeklyHoursInput } from '../components/weekly-hours-input';

export const weeklyHoursType = defineType({
  name: 'weeklyHours',
  title: 'Weekly Hours',
  type: 'object',
  components: {
    input: WeeklyHoursInput,
  },
  fields: [
    defineField({
      name: 'monday',
      title: 'Monday',
      type: 'dayHours',
    }),
    defineField({
      name: 'tuesday',
      title: 'Tuesday',
      type: 'dayHours',
    }),
    defineField({
      name: 'wednesday',
      title: 'Wednesday',
      type: 'dayHours',
    }),
    defineField({
      name: 'thursday',
      title: 'Thursday',
      type: 'dayHours',
    }),
    defineField({
      name: 'friday',
      title: 'Friday',
      type: 'dayHours',
    }),
    defineField({
      name: 'saturday',
      title: 'Saturday',
      type: 'dayHours',
    }),
    defineField({
      name: 'sunday',
      title: 'Sunday',
      type: 'dayHours',
    }),
  ],
});
