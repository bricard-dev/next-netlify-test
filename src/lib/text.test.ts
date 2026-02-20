import { describe, expect, it } from 'vitest';
import { normalizeText } from './text';

describe('normalizeText', () => {
  it('leaves normal text unchanged', () => {
    expect(normalizeText('Bonjour tout le monde')).toBe('Bonjour tout le monde');
  });

  it('replaces non-breaking spaces (\\u00A0) with regular spaces', () => {
    expect(normalizeText('Bonjour\u00A0tout\u00A0le\u00A0monde')).toBe('Bonjour tout le monde');
  });

  it('replaces narrow no-break spaces (\\u202F) with regular spaces', () => {
    expect(normalizeText('4\u202F000\u202F€')).toBe('4 000 €');
  });

  it('replaces thin spaces (\\u2009) with regular spaces', () => {
    expect(normalizeText('hello\u2009world')).toBe('hello world');
  });

  it('handles mixed special whitespace characters', () => {
    expect(normalizeText('a\u00A0b\u202Fc\u2009d')).toBe('a b c d');
  });

  it('handles empty string', () => {
    expect(normalizeText('')).toBe('');
  });
});
