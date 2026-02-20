import { defineField, defineType } from 'sanity';

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'surtitle',
      title: 'Surtitle',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'Intro text displayed below the title. Address, hours and phone come from Site Settings.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoMeta',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' };
    },
  },
});
