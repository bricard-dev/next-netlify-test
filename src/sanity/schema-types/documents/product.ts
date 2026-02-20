import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short description shown on the product card.',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. "3,50 €"',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: "Décrit le produit pour les lecteurs d'écran (ex. : « Baguette tradition dorée »). Si vide, le nom du produit sera utilisé.",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Pains', value: 'Pains' },
          { title: 'Viennoiseries', value: 'Viennoiseries' },
          { title: 'Pâtisseries', value: 'Pâtisseries' },
          { title: 'Traiteur', value: 'Traiteur' },
        ],
        layout: 'dropdown',
      },
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
  },
});
