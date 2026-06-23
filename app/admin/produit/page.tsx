import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSettings } from '@/lib/settings';
import { getStock } from '@/lib/stock';
import { signOut } from '@/app/admin/commandes/actions';
import ProductSettingsForm from '@/components/admin/product-settings-form';

export default async function AdminProduitPage() {
  const [settings, stock] = await Promise.all([getSettings(), getStock()]);

  // If settings are completely unavailable, redirect to commandes as fallback
  if (!settings) {
    redirect('/admin/commandes');
  }

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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            href="/admin/commandes"
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.75rem',
              color: '#86868c',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            ← Commandes
          </Link>

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
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Page title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-anton), sans-serif',
              fontSize: '1.75rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: '0 0 0.25rem',
              color: '#1183E6',
            }}
          >
            Paramètres du drop
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

        <ProductSettingsForm settings={settings} stock={stock} />
      </main>
    </div>
  );
}
