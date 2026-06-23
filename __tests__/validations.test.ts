import { describe, it, expect } from 'vitest';
import { orderSchema } from '../lib/validations/order';

const validOrder = {
  customer_first_name: 'Marie',
  customer_last_name: 'Dupont',
  customer_email: 'marie@example.com',
  customer_phone: '0612345678',
  shipping_address: '12 rue de la Paix, 75001 Paris',
  quantity: 1,
};

describe('orderSchema — données valides', () => {
  it('accepte une commande valide sans note', () => {
    const result = orderSchema.safeParse(validOrder);
    expect(result.success).toBe(true);
  });

  it('accepte une commande valide avec note optionnelle', () => {
    const result = orderSchema.safeParse({ ...validOrder, customer_note: 'Livrer en semaine.' });
    expect(result.success).toBe(true);
  });

  it('accepte un numéro de téléphone au format international +33', () => {
    const result = orderSchema.safeParse({ ...validOrder, customer_phone: '+33612345678' });
    expect(result.success).toBe(true);
  });
});

describe('orderSchema — champs requis manquants', () => {
  it('rejette si le prénom est absent', () => {
    const { customer_first_name: _, ...rest } = validOrder;
    const result = orderSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('rejette si le nom est absent', () => {
    const { customer_last_name: _, ...rest } = validOrder;
    const result = orderSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('rejette si l\'email est absent', () => {
    const { customer_email: _, ...rest } = validOrder;
    const result = orderSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('rejette si le téléphone est absent', () => {
    const { customer_phone: _, ...rest } = validOrder;
    const result = orderSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('rejette si l\'adresse est absente', () => {
    const { shipping_address: _, ...rest } = validOrder;
    const result = orderSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

describe('orderSchema — formats invalides', () => {
  it('rejette un email malformé', () => {
    const result = orderSchema.safeParse({ ...validOrder, customer_email: 'pas-un-email' });
    expect(result.success).toBe(false);
  });

  it('rejette un email sans domaine', () => {
    const result = orderSchema.safeParse({ ...validOrder, customer_email: 'marie@' });
    expect(result.success).toBe(false);
  });

  it('rejette un téléphone avec des lettres', () => {
    const result = orderSchema.safeParse({ ...validOrder, customer_phone: 'abcdefghij' });
    expect(result.success).toBe(false);
  });

  it('rejette un téléphone trop court', () => {
    const result = orderSchema.safeParse({ ...validOrder, customer_phone: '061234' });
    expect(result.success).toBe(false);
  });

  it('rejette un téléphone ne commençant pas par 0 ou +33', () => {
    const result = orderSchema.safeParse({ ...validOrder, customer_phone: '1612345678' });
    expect(result.success).toBe(false);
  });

  it('rejette un prénom trop court (1 caractère)', () => {
    const result = orderSchema.safeParse({ ...validOrder, customer_first_name: 'A' });
    expect(result.success).toBe(false);
  });

  it('rejette un nom trop court (1 caractère)', () => {
    const result = orderSchema.safeParse({ ...validOrder, customer_last_name: 'D' });
    expect(result.success).toBe(false);
  });

  it('rejette une adresse trop courte (moins de 10 caractères)', () => {
    const result = orderSchema.safeParse({ ...validOrder, shipping_address: 'Rue A' });
    expect(result.success).toBe(false);
  });

  it('rejette une note dépassant 500 caractères', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      customer_note: 'a'.repeat(501),
    });
    expect(result.success).toBe(false);
  });

  it('rejette une quantité supérieure à 1 — drop limité, une seule pièce par commande', () => {
    const result = orderSchema.safeParse({ ...validOrder, quantity: 2 });
    expect(result.success).toBe(false);
  });

  it('rejette une quantité à 0', () => {
    const result = orderSchema.safeParse({ ...validOrder, quantity: 0 });
    expect(result.success).toBe(false);
  });
});
