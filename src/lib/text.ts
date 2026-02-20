/**
 * Normalizes a plain text string from Sanity by replacing non-breaking spaces
 * and other non-standard whitespace characters with regular spaces.
 * Useful when content may have been pasted from external sources (Word, PDF, etc.)
 */
export function normalizeText(text: string): string {
  return text.replace(/[\u00A0\u202F\u2009]/g, ' ');
}
