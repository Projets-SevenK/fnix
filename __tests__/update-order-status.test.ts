import { describe, it, expect, vi, beforeEach } from 'vitest';

// vi.mock is hoisted — use vi.hoisted() for variables referenced in the factory.

const { mockRpc, mockUpdate, mockEq, mockFrom } = vi.hoisted(() => ({
  mockRpc: vi.fn(),
  mockUpdate: vi.fn(),
  mockEq: vi.fn(),
  mockFrom: vi.fn(),
}));

vi.mock('../lib/supabase/server', () => ({
  supabaseServer: {
    from: mockFrom,
    rpc: mockRpc,
  },
}));

import { updateOrderStatus } from '../lib/orders';

beforeEach(() => {
  vi.clearAllMocks();
  mockEq.mockResolvedValue({ error: null });
  mockUpdate.mockReturnValue({ eq: mockEq });
  mockFrom.mockReturnValue({ update: mockUpdate });
});

describe('updateOrderStatus — passage en paid', () => {
  it('appelle le RPC mark_order_paid (et non un UPDATE direct) quand le statut est paid', async () => {
    mockRpc.mockResolvedValue({ error: null });

    await updateOrderStatus('order-uuid-123', 'paid');

    expect(mockRpc).toHaveBeenCalledOnce();
    expect(mockRpc).toHaveBeenCalledWith('mark_order_paid', { p_order_id: 'order-uuid-123' });
  });

  it('ne fait pas de UPDATE direct sur la table orders quand le statut est paid', async () => {
    mockRpc.mockResolvedValue({ error: null });

    await updateOrderStatus('order-uuid-123', 'paid');

    // Le RPC PostgreSQL gère atomiquement le changement de statut ET la décrémentation.
    // Aucun UPDATE direct ne doit avoir lieu.
    expect(mockFrom).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('retourne success: true si le RPC réussit', async () => {
    mockRpc.mockResolvedValue({ error: null });

    const result = await updateOrderStatus('order-uuid-123', 'paid');

    expect(result).toEqual({ success: true });
  });

  it('retourne success: false avec le message d\'erreur si le RPC échoue', async () => {
    mockRpc.mockResolvedValue({ error: { message: 'stock insuffisant' } });

    const result = await updateOrderStatus('order-uuid-123', 'paid');

    expect(result.success).toBe(false);
    expect(result.error).toBe('stock insuffisant');
  });
});

describe('updateOrderStatus — non double-décrémentation', () => {
  it('délègue au RPC PostgreSQL qui contient la garde contre la double décrémentation', async () => {
    // Règle métier : mark_order_paid (PostgreSQL) ne décrémente le stock
    // que si l'ordre est en statut 'pending'. Si l'ordre est déjà 'paid',
    // la DB ne décrémente pas une seconde fois.
    //
    // Côté TypeScript, updateOrderStatus appelle toujours mark_order_paid pour
    // le statut 'paid' — jamais un UPDATE direct. La garde est dans la DB.
    mockRpc.mockResolvedValue({ error: null });

    await updateOrderStatus('order-already-paid', 'paid');
    await updateOrderStatus('order-already-paid', 'paid');

    // Le RPC est bien appelé à chaque fois (c'est la DB qui décide de décrémenter ou non)
    expect(mockRpc).toHaveBeenCalledTimes(2);
    expect(mockRpc).toHaveBeenCalledWith('mark_order_paid', { p_order_id: 'order-already-paid' });

    // Aucun UPDATE direct ne contourne le RPC
    expect(mockUpdate).not.toHaveBeenCalled();
  });
});

describe('updateOrderStatus — statut cancelled', () => {
  it('fait un UPDATE direct sur orders sans appeler le RPC', async () => {
    await updateOrderStatus('order-uuid-123', 'cancelled');

    expect(mockRpc).not.toHaveBeenCalled();
    expect(mockFrom).toHaveBeenCalledWith('orders');
    expect(mockUpdate).toHaveBeenCalledOnce();
  });

  it('le UPDATE contient payment_status: cancelled', async () => {
    await updateOrderStatus('order-uuid-123', 'cancelled');

    const updatePayload = mockUpdate.mock.calls[0][0];
    expect(updatePayload.payment_status).toBe('cancelled');
  });

  it('retourne success: true si le UPDATE réussit', async () => {
    const result = await updateOrderStatus('order-uuid-123', 'cancelled');

    expect(result).toEqual({ success: true });
  });

  it('retourne success: false si le UPDATE échoue', async () => {
    mockEq.mockResolvedValue({ error: { message: 'connexion perdue' } });

    const result = await updateOrderStatus('order-uuid-123', 'cancelled');

    expect(result.success).toBe(false);
  });
});
