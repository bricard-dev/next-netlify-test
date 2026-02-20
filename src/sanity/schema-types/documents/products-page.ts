import { defineField, defineType } from 'sanity';

export const productsPageType = defineType({
  name: 'productsPage',
  title: 'Products Page',
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
      return { title: 'Products Page' };
    },
  },
});
