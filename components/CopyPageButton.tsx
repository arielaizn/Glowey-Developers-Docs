'use client';

import { useState } from 'react';

interface CopyPageButtonProps {
  /** The raw markdown the user gets when they click "Copy page". */
  markdown: string;
}

/**
 * Small "Copy page" pill that lives at the top of every docs page.
 *
 * Why ship this: developers paste docs into LLMs all the time. Without this
 * button they have to either select-all-copy from the rendered page (which
 * picks up codeblock language hints, sidebar text, etc.) or `view-source`.
 * One click is much better.
 *
 * Failure mode: if `navigator.clipboard.writeText` rejects (insecure context,
 * missing permission) we fall back to a temporary textarea + document.execCommand
 * so the button still works on http://localhost previews and older browsers.
 */
export function CopyPageButton({ markdown }: CopyPageButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  async function handleCopy() {
    setError(false);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(markdown);
      } else {
        // Fallback for non-secure contexts.
        const ta = document.createElement('textarea');
        ta.value = markdown;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (!ok) throw new Error('execCommand copy failed');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  const label = error ? 'Failed' : copied ? 'Copied!' : 'Copy page';

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy this page as markdown"
      title="Copy this page as markdown — useful for pasting into an LLM"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 11px',
        fontSize: 12.5,
        fontWeight: 600,
        borderRadius: 9999,
        border: '1px solid var(--color-fd-border)',
        background: copied
          ? 'rgba(0, 212, 255, 0.10)'
          : error
          ? 'rgba(239, 68, 68, 0.10)'
          : 'var(--color-fd-card)',
        color: copied ? '#00D4FF' : error ? 'rgb(239, 68, 68)' : 'var(--color-fd-muted-foreground)',
        cursor: 'pointer',
        transition: 'background 0.15s, color 0.15s, border-color 0.15s',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        if (!copied && !error) {
          e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.35)';
          e.currentTarget.style.color = 'var(--color-fd-foreground)';
        }
      }}
      onMouseLeave={(e) => {
        if (!copied && !error) {
          e.currentTarget.style.borderColor = 'var(--color-fd-border)';
          e.currentTarget.style.color = 'var(--color-fd-muted-foreground)';
        }
      }}
    >
      {copied ? (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3 8l4 4 6-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="5" y="3" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M11 3V2.5A1.5 1.5 0 0 0 9.5 1h-3A1.5 1.5 0 0 0 5 2.5V3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path d="M3 5v8.5A1.5 1.5 0 0 0 4.5 15h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )}
      <span>{label}</span>
    </button>
  );
}
