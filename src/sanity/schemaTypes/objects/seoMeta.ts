import { defineField, defineType } from 'sanity';

export const seoMetaType = defineType({
  name: 'seoMeta',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the page title in search results (recommended: 50–60 characters).',
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Meta description for search engines (recommended: 150–160 characters).',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Sharing Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image used when sharing on social media (recommended: 1200×630px).',
    }),
  ],
});
