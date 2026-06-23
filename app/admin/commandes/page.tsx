import Link from 'next/link';
import { getOrders } from '@/lib/orders';
import { getStock } from '@/lib/stock';
import { signOut } from './actions';
import type { PaymentStatus, ShippingStatus } from '@/types/database';

function paymentBadgeStyle(status: PaymentStatus): React.CSSProperties {
  switch (status) {
    case 'pending':
      return {
        background: 'rgba(251,146,60,0.12)',
        color: '#fb923c',
        border: '1px solid rgba(251,146,60,0.3)',
      };
    case 'paid':
      return {
        background: 'rgba(34,197,94,0.12)',
        color: '#22c55e',
        border: '1px solid rgba(34,197,94,0.3)',
      };
    case 'cancelled':
      return {
        background: 'rgba(239,68,68,0.12)',
        color: '#ef4444',
        border: '1px solid rgba(239,68,68,0.3)',
      };
  }
}

function paymentLabel(status: PaymentStatus): string {
  switch (status) {
    case 'pending':
      return 'En attente';
    case 'paid':
      return 'Payée';
    case 'cancelled':
      return 'Annulée';
  }
}

function shippingBadgeStyle(status: ShippingStatus): React.CSSProperties {
  switch (status) {
    case 'not_prepared':
      return {
        background: 'rgba(255,255,255,0.04)',
        color: '#86868c',
      };
    case 'prepared':
      return {
        background: 'rgba(251,146,60,0.12)',
        color: '#fb923c',
      };
    case 'shipped':
      return {
        background: 'rgba(17,131,230,0.12)',
        color: '#1183E6',
        border: '1px solid rgba(17,131,230,0.3)',
      };
  }
}

function shippingLabel(status: ShippingStatus): string {
  switch (status) {
    case 'not_prepared':
      return 'Non préparée';
    case 'prepared':
      return 'Préparée';
    case 'shipped':
      return 'Expédiée';
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

const badgeBase: React.CSSProperties = {
  display: 'inline-block',
  padding: '0.2rem 0.6rem',
  borderRadius: '4px',
  fontSize: '0.72rem',
  fontFamily: 'var(--font-space-mono), monospace',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  border: '1px solid transparent',
};

export default async function AdminCommandesPage() {
  const [orders, stock] = await Promise.all([getOrders(), getStock()]);

  const stockPercent =
    stock && stock.initial_stock > 0
      ? Math.round((stock.remaining_stock / stock.initial_stock) * 100)
      : 0;

  const stockColor =
    !stock || stock.remaining_stock === 0
      ? '#ef4444'
      : stock.remaining_stock <= 2
        ? '#fb923c'
        : '#22c55e';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#060608',
        color: '#f4f4f3',
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: '#060608',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-anton), sans-serif',
              fontSize: '1.5rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#f4f4f3',
            }}
          >
            FNIX
          </span>
          <span
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.65rem',
              color: '#86868c',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Admin
          </span>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: '#86868c',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-space-mono), monospace',
              letterSpacing: '0.06em',
              padding: '0.4rem 0.9rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Déconnexion
          </button>
        </form>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Page title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-anton), sans-serif',
              fontSize: '1.75rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: '0 0 0.25rem',
            }}
          >
            Commandes
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.7rem',
              color: '#86868c',
              letterSpacing: '0.08em',
              margin: 0,
            }}
          >
            Drop 044 — T-shirt FNIX
          </p>
        </div>

        {/* Stock block */}
        <div
          style={{
            background: '#0c0c0f',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.65rem',
                color: '#86868c',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: '0 0 0.25rem',
              }}
            >
              Stock restant
            </p>
            <p
              style={{
                fontFamily: 'var(--font-anton), sans-serif',
                fontSize: '1.6rem',
                color: stockColor,
                margin: 0,
                letterSpacing: '0.02em',
              }}
            >
              {stock ? stock.remaining_stock : '—'}{' '}
              <span style={{ fontSize: '1rem', color: '#cfcfd4', fontFamily: 'var(--font-archivo), sans-serif' }}>
                / {stock ? stock.initial_stock : 7} pièces
              </span>
            </p>
          </div>

          <div style={{ flex: 1, minWidth: '120px' }}>
            <div
              style={{
                height: '6px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '99px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${stockPercent}%`,
                  background: stockColor,
                  borderRadius: '99px',
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>

          <div>
            <span
              style={{
                ...badgeBase,
                ...(stock && stock.is_available
                  ? {
                      background: 'rgba(34,197,94,0.12)',
                      color: '#22c55e',
                      border: '1px solid rgba(34,197,94,0.3)',
                    }
                  : {
                      background: 'rgba(239,68,68,0.12)',
                      color: '#ef4444',
                      border: '1px solid rgba(239,68,68,0.3)',
                    }),
              }}
            >
              {stock && stock.is_available ? 'Disponible' : 'Epuise'}
            </span>
          </div>
        </div>

        {/* Orders table */}
        {orders.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#86868c',
              fontFamily: 'var(--font-archivo), sans-serif',
            }}
          >
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
              Aucune commande pour l&apos;instant.
            </p>
            <p
              style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-space-mono), monospace',
                letterSpacing: '0.06em',
              }}
            >
              Les commandes apparaitront ici apres soumission du formulaire.
            </p>
          </div>
        ) : (
          <div
            style={{
              background: '#0c0c0f',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {['Reference', 'Client', 'Paiement', 'Expedition', 'Date', ''].map(
                      (col) => (
                        <th
                          key={col}
                          style={{
                            padding: '0.75rem 1rem',
                            textAlign: 'left',
                            fontFamily: 'var(--font-space-mono), monospace',
                            fontSize: '0.65rem',
                            color: '#86868c',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            fontWeight: 'normal',
                          }}
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom:
                          idx < orders.length - 1
                            ? '1px solid rgba(255,255,255,0.05)'
                            : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.9rem 1rem',
                          fontFamily: 'var(--font-space-mono), monospace',
                          fontSize: '0.8rem',
                          color: '#1183E6',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {order.reference}
                      </td>
                      <td
                        style={{
                          padding: '0.9rem 1rem',
                          fontFamily: 'var(--font-archivo), sans-serif',
                          fontSize: '0.9rem',
                          color: '#cfcfd4',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {order.customer_first_name} {order.customer_last_name}
                      </td>
                      <td style={{ padding: '0.9rem 1rem', whiteSpace: 'nowrap' }}>
                        <span style={{ ...badgeBase, ...paymentBadgeStyle(order.payment_status) }}>
                          {paymentLabel(order.payment_status)}
                        </span>
                      </td>
                      <td style={{ padding: '0.9rem 1rem', whiteSpace: 'nowrap' }}>
                        <span style={{ ...badgeBase, ...shippingBadgeStyle(order.shipping_status) }}>
                          {shippingLabel(order.shipping_status)}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '0.9rem 1rem',
                          fontFamily: 'var(--font-space-mono), monospace',
                          fontSize: '0.75rem',
                          color: '#86868c',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formatDate(order.created_at)}
                      </td>
                      <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                        <Link
                          href={`/admin/commandes/${order.id}`}
                          style={{
                            fontFamily: 'var(--font-space-mono), monospace',
                            fontSize: '0.75rem',
                            color: '#1183E6',
                            textDecoration: 'none',
                            letterSpacing: '0.06em',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Voir →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
