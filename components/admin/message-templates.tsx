'use client';

import { useState } from 'react';

interface MessageTemplate {
  label: string;
  text: string;
}

interface MessageTemplatesProps {
  messages: MessageTemplate[];
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '0.35rem 0.75rem',
        borderRadius: '5px',
        border: copied
          ? '1px solid rgba(34,197,94,0.4)'
          : '1px solid rgba(255,255,255,0.12)',
        background: copied ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
        color: copied ? '#22c55e' : '#86868c',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        flexShrink: 0,
      }}
    >
      {copied ? 'Copié ✓' : 'Copier'}
    </button>
  );
}

export default function MessageTemplates({ messages }: MessageTemplatesProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {messages.map((msg) => (
        <div
          key={msg.label}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            padding: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem',
              gap: '1rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.65rem',
                color: '#56565c',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {msg.label}
            </span>
            <CopyButton text={msg.text} />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-archivo), sans-serif',
              fontSize: '0.875rem',
              color: '#9a9aa0',
              lineHeight: '1.6',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {msg.text}
          </p>
        </div>
      ))}
    </div>
  );
}
