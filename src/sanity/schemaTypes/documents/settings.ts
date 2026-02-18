import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'hours', title: 'Hours' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ─── General ──────────────────────────────────────────────────────────────
    defineField({
      name: 'bakeryName',
      title: 'Bakery Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'general',
    }),

    // ─── Contact ──────────────────────────────────────────────────────────────
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),

    // ─── Hours ────────────────────────────────────────────────────────────────
    defineField({
      name: 'hours',
      title: 'Store Hours',
      type: 'weeklyHours',
      group: 'hours',
    }),

    // ─── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'seoMeta',
      description: 'Fallback SEO metadata used when pages do not define their own.',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
