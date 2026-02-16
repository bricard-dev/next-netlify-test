import type { StructureResolver } from 'sanity/structure';
import { CogIcon } from '@sanity/icons';

// Types de documents singleton à exclure des listes génériques
const SINGLETONS = ['settings'];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      // Singleton : Site Settings
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings') // ID fixe = singleton
            .title('Site Settings')
        ),

      S.divider(),

      // Tous les autres types de documents (filtrés pour exclure les singletons)
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string)
      ),
    ]);
