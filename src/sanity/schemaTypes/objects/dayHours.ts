import { defineField, defineType } from 'sanity';
import { DayHoursInput } from '../components/DayHoursInput';

export const dayHoursType = defineType({
  name: 'dayHours',
  title: 'Day Hours',
  type: 'object',
  components: {
    input: DayHoursInput,
  },
  validation: (Rule) =>
    Rule.custom((value) => {
      if (value?.isOpen && (!value.open || !value.close)) {
        return "Les heures d'ouverture et de fermeture sont requises pour les jours ouverts";
      }
      return true;
    }),
  fields: [
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
      hidden: ({ parent }) => !(parent as { isOpen?: boolean })?.isOpen,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isOpen?: boolean };
          if (parent?.isOpen) {
            return value ? true : "L'heure d'ouverture est requise";
          }
          return true;
        }).required(),
    }),
    defineField({
      name: 'close',
      title: 'Closing Time',
      type: 'timeValue',
      hidden: ({ parent }) => !(parent as { isOpen?: boolean })?.isOpen,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isOpen?: boolean };
          if (parent?.isOpen) {
            return value ? true : "L'heure de fermeture est requise";
          }
          return true;
        }).required(),
    }),
  ],
});
