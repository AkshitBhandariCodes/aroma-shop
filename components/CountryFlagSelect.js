'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getFlagAsset } from '@/lib/flagAssets';

const OPTIONS = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Norway', label: 'Norway' },
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Australia', label: 'Australia' },
  { value: 'India', label: 'India' },
  { value: 'Japan', label: 'Japan' },
  { value: 'China', label: 'China' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'South Africa', label: 'South Africa' },
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Other', label: 'Other' },
];

function FlagImg({ country }) {
  const { src, alt } = getFlagAsset({ country });
  return <img className="auth-country-flag" src={src} width="22" height="14" alt={alt} />;
}

export default function CountryFlagSelect({ value, onChange, required = false }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const selected = useMemo(() => OPTIONS.find((o) => o.value === value) || null, [value]);

  useEffect(() => {
    if (!open) return;

    const onDocMouseDown = (e) => {
      const root = rootRef.current;
      if (!root) return;
      if (e.target && root.contains(e.target)) return;
      setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="auth-country" ref={rootRef}>
      {/* Hidden input so the form always has a "country" value name */}
      <input type="hidden" name="country" value={value || ''} required={required} />
      <button
        type="button"
        className="auth-country-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        {selected ? (
          <>
            <FlagImg country={selected.value} />
            <span className="auth-country-trigger__label">{selected.label}</span>
          </>
        ) : (
          <span className="auth-country-trigger__placeholder">Select a country</span>
        )}
        <span className="auth-country-trigger__caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className="auth-country-list" role="listbox" aria-label="Choose country">
          {OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={o.value === value}
              className={`auth-country-item ${o.value === value ? 'is-selected' : ''}`}
              onClick={() => {
                onChange?.(o.value);
                setOpen(false);
              }}
            >
              <FlagImg country={o.value} />
              <span className="auth-country-item__label">{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

