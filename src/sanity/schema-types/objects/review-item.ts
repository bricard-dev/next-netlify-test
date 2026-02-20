import { defineField, defineType } from 'sanity';

export const reviewItemType = defineType({
  name: 'reviewItem',
  title: 'Review Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Provenance de l\'avis (ex. : « Avis Google », « TripAdvisor »).',
      placeholder: 'Avis Google',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).custom((value) => {
        if (value === undefined) return true;
        return Number.isInteger(value * 10)
          ? true
          : 'La note doit avoir au maximum 1 chiffre après la virgule (ex. : 4.3)';
      }),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'text' },
  },
});
