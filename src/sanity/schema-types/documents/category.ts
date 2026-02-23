import { defineField, defineType } from 'sanity';
import { Tag } from 'lucide-react';

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Courte phrase qui décrit la catégorie (ex. : « Nos pains au levain et baguettes tradition »).',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' },
  },
});
