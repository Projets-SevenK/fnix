import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getOrderById } from '@/lib/orders';
import OrderActions from '@/components/admin/order-actions';
import type { PaymentStatus, ShippingStatus } from '@/types/database';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

const badgeBase: React.CSSProperties = {
  display: 'inline-block',
  padding: '0.25rem 0.7rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontFamily: 'var(--font-space-mono), monospace',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  border: '1px solid transparent',
};

function paymentBadge(status: PaymentStatus) {
  const styles: Record<PaymentStatus, React.CSSProperties> = {
    pending: {
      background: 'rgba(251,146,60,0.12)',
      color: '#fb923c',
      border: '1px solid rgba(251,146,60,0.3)',
    },
    paid: {
      background: 'rgba(34,197,94,0.12)',
      color: '#22c55e',
      border: '1px solid rgba(34,197,94,0.3)',
    },
    cancelled: {
      background: 'rgba(239,68,68,0.12)',
      color: '#ef4444',
      border: '1px solid rgba(239,68,68,0.3)',
    },
  };
  const labels: Record<PaymentStatus, string> = {
    pending: 'En attente de paiement',
    paid: 'Payee',
    cancelled: 'Annulee',
  };
  return (
    <span style={{ ...badgeBase, ...styles[status] }}>{labels[status]}</span>
  );
}

function shippingBadge(status: ShippingStatus) {
  const styles: Record<ShippingStatus, React.CSSProperties> = {
    not_prepared: {
      background: 'rgba(255,255,255,0.04)',
      color: '#86868c',
      border: '1px solid transparent',
    },
    prepared: {
      background: 'rgba(251,146,60,0.12)',
      color: '#fb923c',
      border: '1px solid transparent',
    },
    shipped: {
      background: 'rgba(17,131,230,0.12)',
      color: '#1183E6',
      border: '1px solid rgba(17,131,230,0.3)',
    },
  };
  const labels: Record<ShippingStatus, string> = {
    not_prepared: 'Non preparee',
    prepared: 'Preparee',
    shipped: 'Expediee',
  };
  return (
    <span style={{ ...badgeBase, ...styles[status] }}>{labels[status]}</span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: '0.875rem' }}>
      <p
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.65rem',
          color: '#86868c',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: '0 0 0.2rem',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-archivo), sans-serif',
          fontSize: '0.95rem',
          color: '#cfcfd4',
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060608', color: '#f4f4f3' }}>
      {/* Top nav */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          position: 'sticky',
          top: 0,
          background: '#060608',
          zIndex: 10,
        }}
      >
        <Link
          href="/admin/commandes"
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.75rem',
            color: '#86868c',
            textDecoration: 'none',
            letterSpacing: '0.06em',
          }}
        >
          ← Toutes les commandes
        </Link>
      </div>

      <main style={{ maxWidth: '780px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Reference header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.65rem',
              color: '#86868c',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 0.4rem',
            }}
          >
            Commande
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-anton), sans-serif',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: '#1183E6',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {order.reference}
          </h1>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.25rem',
          }}
        >
          {/* Client info block */}
          <section
            style={{
              background: '#0c0c0f',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              padding: '1.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.65rem',
                color: '#86868c',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: '0 0 1.25rem',
              }}
            >
              Informations client
            </h2>
            <InfoRow label="Prenom" value={order.customer_first_name} />
            <InfoRow label="Nom" value={order.customer_last_name} />
            <InfoRow label="Email" value={order.customer_email} />
            <InfoRow label="Telephone" value={order.customer_phone} />
            <InfoRow label="Adresse de livraison" value={order.shipping_address} />
            {order.customer_note && (
              <InfoRow label="Note client" value={order.customer_note} />
            )}
          </section>

          {/* Order info block */}
          <section
            style={{
              background: '#0c0c0f',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              padding: '1.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.65rem',
                color: '#86868c',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: '0 0 1.25rem',
              }}
            >
              Detail commande
            </h2>
            <InfoRow label="Produit" value={order.product_name} />
            <InfoRow label="Taille" value={order.size} />
            <InfoRow label="Quantite" value={String(order.quantity)} />
            <InfoRow
              label="Montant attendu"
              value={`${order.amount_expected} €`}
            />
            <InfoRow
              label="Date de commande"
              value={new Date(order.created_at).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            />
          </section>
        </div>

        {/* Status block */}
        <section
          style={{
            background: '#0c0c0f',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '1.5rem',
            marginBottom: '1.25rem',
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.65rem',
                color: '#86868c',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                margin: '0 0 0.5rem',
              }}
            >
              Statut paiement
            </p>
            {paymentBadge(order.payment_status)}
          </div>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.65rem',
                color: '#86868c',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                margin: '0 0 0.5rem',
              }}
            >
              Statut expedition
            </p>
            {shippingBadge(order.shipping_status)}
          </div>
          {order.tracking_number && (
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.65rem',
                  color: '#86868c',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  margin: '0 0 0.5rem',
                }}
              >
                Numero de suivi
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.85rem',
                  color: '#1183E6',
                  margin: 0,
                }}
              >
                {order.tracking_number}
              </p>
            </div>
          )}
        </section>

        {/* Actions block — client component */}
        <section
          style={{
            background: '#0c0c0f',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '1.5rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.65rem',
              color: '#86868c',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 1.25rem',
            }}
          >
            Actions
          </h2>
          <OrderActions order={order} />
        </section>
      </main>
    </div>
  );
}
