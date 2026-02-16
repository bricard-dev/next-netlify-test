# Sanity Schema Types - Structure

Cette structure suit les meilleures pratiques officielles de Sanity pour l'organisation des fichiers de schémas.

## 📁 Structure des Dossiers

```
schemaTypes/
├── index.ts                    # Export tous les types
├── documents/                  # Types de documents standalone
│   └── settings.ts            # Document singleton pour les settings du site
├── objects/                    # Types réutilisables/embeddables
│   ├── dayHours.ts            # Horaires d'un jour
│   ├── weeklyHours.ts         # Horaires hebdomadaires
│   ├── storeHours.ts          # [Legacy] Ancien format d'horaires
│   └── timeValue.ts           # Sélecteur d'heure
├── components/                 # Composants d'input personnalisés
│   ├── DayHoursInput.tsx      # Input pour dayHours
│   ├── WeeklyHoursInput.tsx   # Input pour weeklyHours
│   ├── StoreHoursInput.tsx    # [Legacy] Input pour storeHours
│   └── TimeValueInput.tsx     # Input pour timeValue
└── shared/                     # Constantes, types, champs partagés
    ├── constants.ts           # Constantes réutilisables
    └── types.ts               # Types TypeScript partagés
```

## 📝 Conventions

### Documents (`documents/`)
- Types de documents **standalone** qui apparaissent dans le menu principal du Studio
- Exemples : articles, pages, auteurs, settings

### Objects (`objects/`)
- Types **réutilisables** et **embeddables** dans d'autres types
- Ne sont pas éditables indépendamment
- Exemples : SEO, links, horaires, adresses

### Components (`components/`)
- Composants React personnalisés pour les inputs du Studio
- Fournissent une UX améliorée par rapport aux inputs par défaut
- Nommés en PascalCase

### Shared (`shared/`)
- **constants.ts** : Constantes partagées entre plusieurs fichiers
- **types.ts** : Types TypeScript réutilisés dans plusieurs composants

## 🔧 Modification des Horaires par Défaut

Pour changer les horaires par défaut appliqués lors de l'ouverture d'un jour :

**Fichier** : `shared/constants.ts`

```typescript
export const DEFAULT_OPENING_TIME = '09:00';  // ← Changer ici
export const DEFAULT_CLOSING_TIME = '18:00';  // ← Changer ici
```

## 📚 Références

- [Sanity Project Structure](https://www.sanity.io/docs/structure-your-content)
- [Sanity Schema Best Practices](https://www.sanity.io/docs/schema-types)
