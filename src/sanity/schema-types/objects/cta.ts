import { defineField, defineType } from 'sanity';
import { CtaInput } from '@/sanity/components/cta-input';

const INTERNAL_LINKS = [
  { title: 'Accueil', value: '/' },
  { title: 'Produits', value: '/produits' },
  { title: 'À propos', value: '/a-propos' },
  { title: 'Contact', value: '/contact' },
];

export const ctaType = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  components: { input: CtaInput },
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Type de lien',
      type: 'string',
      initialValue: 'internal',
      hidden: () => true,
    }),
    defineField({
      name: 'internalPath',
      title: 'Page',
      type: 'string',
      options: { list: INTERNAL_LINKS },
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'internal' && !value) return 'Sélectionnez une page';
          return true;
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL externe',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'external' && !value) return 'Entrez une URL';
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      internalPath: 'internalPath',
      externalUrl: 'externalUrl',
    },
    prepare({ title, linkType, internalPath, externalUrl }) {
      const href = linkType === 'internal' ? internalPath : externalUrl;
      return { title, subtitle: href };
    },
  },
});
