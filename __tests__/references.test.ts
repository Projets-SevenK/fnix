import { describe, it, expect } from 'vitest';
import { generateReference } from '../lib/references';

describe('generateReference', () => {
  it('génère FNIX-044-001 pour le numéro 1', () => {
    expect(generateReference(1)).toBe('FNIX-044-001');
  });

  it('génère FNIX-044-012 pour le numéro 12', () => {
    expect(generateReference(12)).toBe('FNIX-044-012');
  });

  it('génère FNIX-044-999 pour le numéro 999', () => {
    expect(generateReference(999)).toBe('FNIX-044-999');
  });

  it('le préfixe est toujours FNIX-044', () => {
    const ref = generateReference(5);
    expect(ref.startsWith('FNIX-044-')).toBe(true);
  });

  it('le numéro est toujours zero-paddé à 3 chiffres', () => {
    expect(generateReference(1)).toMatch(/^FNIX-044-\d{3}$/);
    expect(generateReference(99)).toMatch(/^FNIX-044-\d{3}$/);
    expect(generateReference(999)).toMatch(/^FNIX-044-\d{3}$/);
  });
});
