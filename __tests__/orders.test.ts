import { describe, it, expect, vi, beforeEach } from 'vitest';

// vi.mock is hoisted — use vi.hoisted() for variables referenced in the factory.

const { mockFrom, mockSelect, mockInsert, mockUpdate, mockEq, mockLimit, mockSingle, mockRpc } =
  vi.hoisted(() => ({
    mockFrom: vi.fn(),
    mockSelect: vi.fn(),
    mockInsert: vi.fn(),
    mockUpdate: vi.fn(),
    mockEq: vi.fn(),
    mockLimit: vi.fn(),
    mockSingle: vi.fn(),
    mockRpc: vi.fn(),
  }));

vi.mock('../lib/supabase/server', () => ({
  supabaseServer: {
    from: mockFrom,
    rpc: mockRpc,
  },
}));

import { createOrder } from '../lib/orders';

const validFormData = {
  customer_first_name: 'Marie',
  customer_last_name: 'Dupont',
  customer_email: 'marie@example.com',
  customer_phone: '0612345678',
  shipping_address: '12 rue de la Paix, 75001 Paris',
  quantity: 1 as const,
};

beforeEach(() => {
  vi.clearAllMocks();
});

/**
 * Builds the full Supabase chain mock for a happy-path createOrder call.
 * stockData: the value returned by the first .single() call (stock check)
 * settingsData: the value returned by the second .single() call (admin_settings)
 * seqValue: the value returned by the get_next_order_seq RPC
 */
function setupHappyPath({
  remainingStock = 5,
  isAvailable = true,
  productPrice = 44,
  seqValue = 1,
}: {
  remainingStock?: number;
  isAvailable?: boolean;
  productPrice?: number;
  seqValue?: number;
} = {}) {
  mockSingle
    .mockResolvedValueOnce({
      data: { remaining_stock: remainingStock, is_available: isAvailable },
      error: null,
    })
    .mockResolvedValueOnce({ data: { product_price: productPrice }, error: null });

  mockRpc.mockResolvedValue({ data: seqValue, error: null });
  mockInsert.mockResolvedValue({ error: null });

  mockEq.mockReturnValue({ eq: mockEq, single: mockSingle, limit: mockLimit });
  mockLimit.mockReturnValue({ single: mockSingle });
  mockSelect.mockReturnValue({ eq: mockEq, single: mockSingle, limit: mockLimit });
  mockFrom.mockReturnValue({ select: mockSelect, insert: mockInsert, update: mockUpdate });
}

/**
 * Builds the mock for a stock-blocked scenario where createOrder should reject.
 */
function setupStockBlocked({
  remainingStock = 0,
  isAvailable = false,
}: {
  remainingStock?: number;
  isAvailable?: boolean;
} = {}) {
  mockSingle.mockResolvedValueOnce({
    data: { remaining_stock: remainingStock, is_available: isAvailable },
    error: null,
  });

  mockEq.mockReturnValue({ eq: mockEq, single: mockSingle, limit: mockLimit });
  mockLimit.mockReturnValue({ single: mockSingle });
  mockSelect.mockReturnValue({ eq: mockEq, single: mockSingle, limit: mockLimit });
  mockFrom.mockReturnValue({ select: mockSelect, insert: mockInsert, update: mockUpdate });
}

describe('createOrder — statut initial', () => {
  it('insère toujours payment_status: pending', async () => {
    setupHappyPath({ seqValue: 1 });

    await createOrder(validFormData);

    expect(mockInsert).toHaveBeenCalledOnce();
    const payload = mockInsert.mock.calls[0][0];
    expect(payload.payment_status).toBe('pending');
  });

  it('insère toujours shipping_status: not_prepared', async () => {
    setupHappyPath({ seqValue: 1 });

    await createOrder(validFormData);

    const payload = mockInsert.mock.calls[0][0];
    expect(payload.shipping_status).toBe('not_prepared');
  });
});

describe('createOrder — blocage si stock = 0', () => {
  it('retourne une erreur si remaining_stock est 0', async () => {
    setupStockBlocked({ remainingStock: 0, isAvailable: true });

    const result = await createOrder(validFormData);

    expect(result).toHaveProperty('error');
    expect((result as { error: string }).error).toContain('épuisé');
  });

  it('retourne une erreur si is_available est false', async () => {
    setupStockBlocked({ remainingStock: 3, isAvailable: false });

    const result = await createOrder(validFormData);

    expect(result).toHaveProperty('error');
    expect((result as { error: string }).error).toContain('épuisé');
  });

  it('n\'appelle pas insert si le stock est épuisé', async () => {
    setupStockBlocked({ remainingStock: 0, isAvailable: false });

    await createOrder(validFormData);

    expect(mockInsert).not.toHaveBeenCalled();
  });
});

describe('createOrder — le stock ne diminue pas à la création', () => {
  it('n\'appelle jamais UPDATE sur product_stock lors de la création', async () => {
    setupHappyPath({ seqValue: 2 });

    await createOrder(validFormData);

    // Aucun UPDATE ne doit avoir lieu — le stock reste inchangé à la création
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('le seul RPC appelé est get_next_order_seq — pas de décrémentation directe', async () => {
    setupHappyPath({ seqValue: 3 });

    await createOrder(validFormData);

    expect(mockRpc).toHaveBeenCalledWith('get_next_order_seq');
    // mark_order_paid ne doit pas être appelé lors de la création
    expect(mockRpc).not.toHaveBeenCalledWith('mark_order_paid', expect.anything());
  });
});

describe('createOrder — génération de la référence', () => {
  it('génère la référence FNIX-044-007 si la séquence retourne 7', async () => {
    setupHappyPath({ seqValue: 7 });

    const result = await createOrder(validFormData);

    expect(result).toHaveProperty('reference');
    expect((result as { reference: string }).reference).toBe('FNIX-044-007');
  });

  it('génère la référence FNIX-044-042 si la séquence retourne 42', async () => {
    setupHappyPath({ seqValue: 42 });

    const result = await createOrder(validFormData);

    expect((result as { reference: string }).reference).toBe('FNIX-044-042');
  });
});
