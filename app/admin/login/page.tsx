import { loginAction } from './actions';

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

/**
 * Admin login page.
 * Simple, minimal form — no password reset link (admin resets via Supabase dashboard).
 * Error from searchParams is displayed for direct URL redirects (e.g. from middleware).
 */
export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#060608',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: '#0c0c0f',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '2.5rem 2rem',
        }}
      >
        {/* Logo / Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.7rem',
              color: '#86868c',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            Interface admin
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-anton), sans-serif',
              fontSize: '2rem',
              color: '#f4f4f3',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            FNIX
          </h1>
        </div>

        {/* Error banner from searchParams */}
        {params.error && (
          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              color: '#ef4444',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-archivo), sans-serif',
            }}
          >
            {params.error}
          </div>
        )}

        {/* Login Form */}
        <form action={loginAction}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.7rem',
                color: '#86868c',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              style={{
                width: '100%',
                background: '#08080a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                color: '#f4f4f3',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-archivo), sans-serif',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.7rem',
                color: '#86868c',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                background: '#08080a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                color: '#f4f4f3',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-archivo), sans-serif',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <LoginButton />
        </form>
      </div>
    </div>
  );
}

/**
 * Separated to allow future progressive enhancement.
 * Currently a plain submit button — no useFormStatus needed (Server Action).
 */
function LoginButton() {
  return (
    <button
      type="submit"
      style={{
        width: '100%',
        background: '#1183E6',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '0.875rem',
        fontSize: '0.9rem',
        fontFamily: 'var(--font-space-mono), monospace',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background 0.15s',
      }}
    >
      Se connecter
    </button>
  );
}
