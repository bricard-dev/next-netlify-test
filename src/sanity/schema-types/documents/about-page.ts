import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "histoire", title: "Notre Histoire" },
    { name: "recompenses", title: "Récompenses" },
    { name: "valeurs", title: "Nos Valeurs" },
    { name: "equipe", title: "Équipe" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ─── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: "heroSurtitle",
      title: "Hero Surtitle",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      group: "hero",
    }),

    // ─── Notre Histoire ───────────────────────────────────────────────────────
    defineField({
      name: "histoireSurtitle",
      title: "Surtitle",
      type: "string",
      group: "histoire",
    }),
    defineField({
      name: "histoireTitle",
      title: "Titre",
      type: "string",
      group: "histoire",
    }),
    defineField({
      name: "histoireContent",
      title: "Contenu",
      type: "text",
      rows: 6,
      group: "histoire",
    }),
    defineField({
      name: "histoirePhoto",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          description: "Décrit l'image pour les lecteurs d'écran et les moteurs de recherche.",
        }),
      ],
      group: "histoire",
    }),

    // ─── Récompenses ─────────────────────────────────────────────────────────
    defineField({
      name: "recompensesSurtitle",
      title: "Surtitle",
      type: "string",
      group: "recompenses",
    }),
    defineField({
      name: "recompensesTitle",
      title: "Titre",
      type: "string",
      group: "recompenses",
    }),
    defineField({
      name: "awards",
      title: "Récompenses",
      type: "array",
      of: [{ type: "awardItem" }],
      group: "recompenses",
    }),

    // ─── Nos Valeurs ──────────────────────────────────────────────────────────
    defineField({
      name: "valeursSurtitle",
      title: "Surtitle",
      type: "string",
      group: "valeurs",
    }),
    defineField({
      name: "valeursTitle",
      title: "Titre",
      type: "string",
      group: "valeurs",
    }),
    defineField({
      name: "values",
      title: "Valeurs",
      type: "array",
      of: [{ type: "valueItem" }],
      description: "3 valeurs minimum, 4 maximum.",
      validation: (rule) => rule.min(3).max(4),
      group: "valeurs",
    }),

    // ─── Équipe ───────────────────────────────────────────────────────────────
    defineField({
      name: "equipeSurtitle",
      title: "Surtitle",
      type: "string",
      group: "equipe",
    }),
    defineField({
      name: "equipeTitle",
      title: "Titre",
      type: "string",
      group: "equipe",
    }),
    defineField({
      name: "team",
      title: "Membres de l'équipe",
      type: "array",
      of: [{ type: "teamMember" }],
      group: "equipe",
    }),

    // ─── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMeta",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
