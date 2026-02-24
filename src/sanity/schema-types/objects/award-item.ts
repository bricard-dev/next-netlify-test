import { defineField, defineType } from 'sanity';

export const awardItemType = defineType({
  name: 'awardItem',
  title: 'Award Item',
  type: 'object',
  fields: [
    defineField({
      name: 'year',
      title: 'Année',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'competition',
      title: 'Compétition',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titre du prix',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'competition', description: 'year' },
    prepare({ title, subtitle, description }) {
      return { title, subtitle: `${description} — ${subtitle}` };
    },
  },
});
