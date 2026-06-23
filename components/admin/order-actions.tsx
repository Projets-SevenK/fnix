'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setOrderPaid, cancelOrder, setTrackingNumber, setOrderShipped } from '@/app/admin/actions';
import type { Order } from '@/types/database';

interface OrderActionsProps {
  order: Order;
}

const btnBase: React.CSSProperties = {
  padding: '0.6rem 1.25rem',
  borderRadius: '6px',
  fontSize: '0.8rem',
  fontFamily: 'var(--font-space-mono), monospace',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  fontWeight: 'bold',
  border: 'none',
  transition: 'opacity 0.15s, background 0.15s',
};

const btnPrimary: React.CSSProperties = {
  ...btnBase,
  background: '#1183E6',
  color: '#fff',
};

const btnDanger: React.CSSProperties = {
  ...btnBase,
  background: 'rgba(239,68,68,0.12)',
  color: '#ef4444',
  border: '1px solid rgba(239,68,68,0.3)',
};

const btnSecondary: React.CSSProperties = {
  ...btnBase,
  background: 'rgba(17,131,230,0.12)',
  color: '#1183E6',
  border: '1px solid rgba(17,131,230,0.3)',
};

export default function OrderActions({ order }: OrderActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState(order.tracking_number ?? '');
  const [trackingSaved, setTrackingSaved] = useState(false);

  async function handleMarkPaid() {
    setLoading(true);
    setError(null);
    const result = await setOrderPaid(order.id);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? 'Une erreur est survenue lors de la validation du paiement.');
      return;
    }
    router.refresh();
  }

  async function handleCancel() {
    const confirmed = window.confirm(
      'Confirmer l\'annulation de cette commande ?'
    );
    if (!confirmed) return;

    setLoading(true);
    setError(null);
    const result = await cancelOrder(order.id);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? 'Une erreur est survenue lors de l\'annulation.');
      return;
    }
    router.refresh();
  }

  async function handleSaveTracking() {
    const tracking = trackingInput.trim();
    if (!tracking) {
      setError('Le numéro de suivi ne peut pas être vide.');
      return;
    }
    setLoading(true);
    setError(null);
    const result = await setTrackingNumber(order.id, tracking);
    setLoading(false);
    if (!result.success) {
      setError('Une erreur est survenue lors de l\'enregistrement du suivi.');
      return;
    }
    setTrackingSaved(true);
    setTimeout(() => setTrackingSaved(false), 3000);
    router.refresh();
  }

  async function handleMarkShipped() {
    setLoading(true);
    setError(null);
    const result = await setOrderShipped(order.id);
    setLoading(false);
    if (!result.success) {
      setError('Une erreur est survenue lors du passage en expédiée.');
      return;
    }
    router.refresh();
  }

  const disabledStyle: React.CSSProperties = loading
    ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }
    : {};

  // --- Pending state ---
  if (order.payment_status === 'pending') {
    return (
      <div>
        {error && (
          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              color: '#ef4444',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-archivo), sans-serif',
            }}
          >
            {error}
          </div>
        )}
        <p
          style={{
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: '0.85rem',
            color: '#86868c',
            marginBottom: '1rem',
            marginTop: 0,
          }}
        >
          En attente de vérification du paiement Wero. Confirme la réception avant de valider.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            style={{ ...btnPrimary, ...disabledStyle }}
            onClick={handleMarkPaid}
            disabled={loading}
          >
            {loading ? 'Validation...' : 'Marquer comme payée'}
          </button>
          <button
            style={{ ...btnDanger, ...disabledStyle }}
            onClick={handleCancel}
            disabled={loading}
          >
            Annuler la commande
          </button>
        </div>
      </div>
    );
  }

  // --- Cancelled state ---
  if (order.payment_status === 'cancelled') {
    return (
      <div
        style={{
          display: 'inline-block',
          padding: '0.25rem 0.7rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-space-mono), monospace',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          background: 'rgba(239,68,68,0.12)',
          color: '#ef4444',
          border: '1px solid rgba(239,68,68,0.3)',
        }}
      >
        Commande annulee — aucune action disponible
      </div>
    );
  }

  // --- Paid + shipped state ---
  if (order.payment_status === 'paid' && order.shipping_status === 'shipped') {
    return (
      <div>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.7rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-space-mono), monospace',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: 'rgba(17,131,230,0.12)',
            color: '#1183E6',
            border: '1px solid rgba(17,131,230,0.3)',
            marginBottom: order.tracking_number ? '0.75rem' : 0,
          } as React.CSSProperties}
        >
          Expediee
        </div>
        {order.tracking_number && (
          <p
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.85rem',
              color: '#cfcfd4',
              marginTop: '0.75rem',
              marginBottom: 0,
            }}
          >
            Suivi La Poste :{' '}
            <span style={{ color: '#1183E6' }}>{order.tracking_number}</span>
          </p>
        )}
      </div>
    );
  }

  // --- Paid + not yet shipped state ---
  if (order.payment_status === 'paid') {
    return (
      <div>
        {error && (
          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              color: '#ef4444',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-archivo), sans-serif',
            }}
          >
            {error}
          </div>
        )}

        {/* Tracking input */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label
            htmlFor="tracking"
            style={{
              display: 'block',
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.65rem',
              color: '#86868c',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            Numero de suivi La Poste
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              id="tracking"
              type="text"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              placeholder="Ex : 6X 123 456 789 FR"
              style={{
                flex: '1 1 200px',
                background: '#08080a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '0.6rem 0.875rem',
                color: '#f4f4f3',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-space-mono), monospace',
              }}
            />
            <button
              style={{ ...btnSecondary, ...disabledStyle }}
              onClick={handleSaveTracking}
              disabled={loading}
            >
              {trackingSaved ? 'Enregistre !' : 'Enregistrer'}
            </button>
          </div>
        </div>

        {/* Mark as shipped */}
        <button
          style={{ ...btnPrimary, ...disabledStyle }}
          onClick={handleMarkShipped}
          disabled={loading}
        >
          {loading ? 'En cours...' : 'Marquer comme expediee'}
        </button>
      </div>
    );
  }

  return null;
}
