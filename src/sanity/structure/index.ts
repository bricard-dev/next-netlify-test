import {
  Croissant,
  HatGlasses,
  Home,
  Landmark,
  Mail,
  Scale,
  Settings,
  Store,
  Tag,
} from "lucide-react";
import type { StructureResolver } from "sanity/structure";

// Types de documents singleton à exclure des listes génériques
const SINGLETONS = [
  "settings",
  "homePage",
  "productsPage",
  "aboutPage",
  "contactPage",
  "privacyPage",
  "legalNoticePage",
  "product",
  "category",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website Content")
    .items([
      // Singleton : Site Settings
      S.listItem()
        .id("settings")
        .schemaType("settings")
        .title("Site Settings")
        .icon(Settings)
        .child(
          S.document()
            .schemaType("settings")
            .documentId("settings")
            .title("Site Settings"),
        ),

      S.divider(),

      // Singleton : Home Page
      S.listItem()
        .id("homePage")
        .schemaType("homePage")
        .title("Home Page")
        .icon(Home)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Home Page"),
        ),

      // Singleton : Products Page
      S.listItem()
        .id("productsPage")
        .schemaType("productsPage")
        .title("Products Page")
        .icon(Store)
        .child(
          S.document()
            .schemaType("productsPage")
            .documentId("productsPage")
            .title("Products Page"),
        ),

      // Singleton : About Page
      S.listItem()
        .id("aboutPage")
        .schemaType("aboutPage")
        .title("About Page")
        .icon(Landmark)
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
            .title("About Page"),
        ),

      // Singleton : Contact Page
      S.listItem()
        .id("contactPage")
        .schemaType("contactPage")
        .title("Contact Page")
        .icon(Mail)
        .child(
          S.document()
            .schemaType("contactPage")
            .documentId("contactPage")
            .title("Contact Page"),
        ),

      S.divider(),

      // Singleton : Privacy Policy
      S.listItem()
        .id("privacyPage")
        .schemaType("privacyPage")
        .title("Privacy Policy")
        .icon(HatGlasses)
        .child(
          S.document()
            .schemaType("privacyPage")
            .documentId("privacyPage")
            .title("Privacy Policy"),
        ),

      // Singleton : Legal Notice
      S.listItem()
        .id("legalNoticePage")
        .schemaType("legalNoticePage")
        .title("Legal Notice")
        .icon(Scale)
        .child(
          S.document()
            .schemaType("legalNoticePage")
            .documentId("legalNoticePage")
            .title("Legal Notice"),
        ),

      S.divider(),

      // Catalogue
      S.documentTypeListItem("category").title("Categories").icon(Tag),
      S.documentTypeListItem("product").title("Products").icon(Croissant),
    ]);
