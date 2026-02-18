import { HatGlasses, Landmark, Mail, Scale, Settings, Tag } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

// Types de documents singleton à exclure des listes génériques
const SINGLETONS = [
  "settings",
  "productsPage",
  "aboutPage",
  "contactPage",
  "privacyPage",
  "legalNoticePage",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website Content")
    .items([
      // Singleton : Site Settings
      S.listItem()
        .title("Site Settings")
        .icon(Settings)
        .child(
          S.document()
            .schemaType("settings")
            .documentId("settings")
            .title("Site Settings"),
        ),

      S.divider(),

      // Singleton : Products Page
      S.listItem()
        .title("Products Page")
        .icon(Tag)
        .child(
          S.document()
            .schemaType("productsPage")
            .documentId("productsPage")
            .title("Products Page"),
        ),

      // Singleton : About Page
      S.listItem()
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
        .title("Legal Notice")
        .icon(Scale)
        .child(
          S.document()
            .schemaType("legalNoticePage")
            .documentId("legalNoticePage")
            .title("Legal Notice"),
        ),

      S.divider(),

      // Tous les autres types de documents (filtrés pour exclure les singletons)
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string),
      ),
    ]);
