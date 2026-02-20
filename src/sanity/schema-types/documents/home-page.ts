import { defineArrayMember, defineField, defineType } from 'sanity';
import { GalleryInstagramNotice } from '@/sanity/components/gallery-instagram-notice';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'products', title: 'Products Highlight' },
    { name: 'about', title: 'About' },
    { name: 'location', title: 'Location' },
    { name: 'services', title: 'Services' },
    { name: 'reviews', title: 'Reviews' },
    { name: 'gallery', title: 'Gallery' },
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
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: "Texte alternatif pour les lecteurs d'écran. Si vide, le titre principal de la page sera utilisé.",
        }),
      ],
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Hero Primary CTA',
      type: 'cta',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Hero Secondary CTA',
      type: 'cta',
      group: 'hero',
    }),

    // ─── Products ─────────────────────────────────────────────────────────────
    defineField({
      name: 'productsSurtitle',
      title: 'Products Surtitle',
      type: 'string',
      group: 'products',
    }),
    defineField({
      name: 'productsTitle',
      title: 'Products Title',
      type: 'string',
      group: 'products',
    }),
    defineField({
      name: 'productsSubtitle',
      title: 'Products Subtitle',
      type: 'text',
      rows: 2,
      group: 'products',
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: (rule) => rule.max(4),
      group: 'products',
    }),

    // ─── About ────────────────────────────────────────────────────────────────
    defineField({
      name: 'aboutSurtitle',
      title: 'About Surtitle',
      type: 'string',
      group: 'about',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Title',
      type: 'text',
      rows: 3,
      description: 'Appuyez sur Entrée pour créer un saut de ligne dans le titre.',
      group: 'about',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        }),
      ],
      group: 'about',
    }),
    defineField({
      name: 'aboutCta',
      title: 'About CTA',
      type: 'cta',
      group: 'about',
    }),
    defineField({
      name: 'aboutPhoto',
      title: 'About Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: "Décrit la photo pour les lecteurs d'écran (ex. : « Marie pétrit la pâte dans l'atelier »). Si vide, le titre de la section sera utilisé.",
          validation: (rule) => rule.warning('Recommandé pour l\'accessibilité'),
        }),
      ],
      group: 'about',
    }),

    // ─── Location ─────────────────────────────────────────────────────────────
    defineField({
      name: 'locationSurtitle',
      title: 'Location Surtitle',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'locationTitle',
      title: 'Location Title',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'locationDescription',
      title: 'Location Description',
      type: 'text',
      rows: 3,
      group: 'location',
    }),
    defineField({
      name: 'locationPhoto',
      title: 'Location Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: "Décrit la photo pour les lecteurs d'écran (ex. : « Façade de notre boulangerie rue de la Paix »).",
        }),
      ],
      group: 'location',
    }),
    defineField({
      name: 'locationCta',
      title: 'Location CTA',
      type: 'cta',
      group: 'location',
    }),

    // ─── Services ─────────────────────────────────────────────────────────────
    defineField({
      name: 'servicesItems',
      title: 'Services',
      type: 'array',
      of: [{ type: 'serviceItem' }],
      validation: (rule) => rule.max(3),
      group: 'services',
    }),

    // ─── Reviews ──────────────────────────────────────────────────────────────
    defineField({
      name: 'reviewsSurtitle',
      title: 'Reviews Surtitle',
      type: 'string',
      group: 'reviews',
    }),
    defineField({
      name: 'reviewsTitle',
      title: 'Reviews Title',
      type: 'string',
      group: 'reviews',
    }),
    defineField({
      name: 'reviewsItems',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'reviewItem' }],
      validation: (rule) => rule.max(3).error('Maximum 3 avis autorisés'),
      group: 'reviews',
    }),

    // ─── Gallery ──────────────────────────────────────────────────────────────
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      components: { input: GalleryInstagramNotice },
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: "Décrit brièvement le contenu de la photo (ex. : « Croissants fraîchement sortis du four »). Essentiel pour l'accessibilité.",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().length(6).error('La galerie doit contenir exactement 6 photos'),
      group: 'gallery',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
});
