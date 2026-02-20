import { defineField, defineType } from 'sanity';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'story', title: 'Story' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ─── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroSurtitle',
      title: 'Hero Surtitle',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),

    // ─── Story ────────────────────────────────────────────────────────────────
    defineField({
      name: 'storySurtitle',
      title: 'Story Surtitle',
      type: 'string',
      group: 'story',
    }),
    defineField({
      name: 'storyTitle',
      title: 'Story Title',
      type: 'string',
      group: 'story',
    }),
    defineField({
      name: 'storyContent',
      title: 'Story Content',
      type: 'text',
      rows: 6,
      group: 'story',
    }),
    defineField({
      name: 'storyPhotos',
      title: 'Story Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      group: 'story',
    }),
    defineField({
      name: 'storyCta',
      title: 'Story CTA',
      type: 'cta',
      group: 'story',
    }),

    // ─── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoMeta',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' };
    },
  },
});
