import { client } from './client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

/**
 * Image URL builder pour Sanity
 * Permet de générer des URLs d'images optimisées
 */
const builder = createImageUrlBuilder(client);

/**
 * Génère une URL optimisée pour une image Sanity
 * @param source - Source de l'image Sanity
 * @returns Builder pour personnaliser l'URL
 *
 * @example
 * ```tsx
 * <img src={urlFor(image).width(800).height(600).url()} alt="..." />
 * ```
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
