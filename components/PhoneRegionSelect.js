'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getFlagAsset } from '@/lib/flagAssets';

export const PHONE_REGIONS = [
  { value: 'US', label: 'US', dialCode: '+1', flagFile: 'us.svg' },
  { value: 'CA', label: 'CA', dialCode: '+1', flagFile: 'ca.svg' },
  { value: 'GB', label: 'GB', dialCode: '+44', flagFile: 'gb.svg' },
  { value: 'DE', label: 'DE', dialCode: '+49', flagFile: 'de.svg' },
  { value: 'FR', label: 'FR', dialCode: '+33', flagFile: 'fr.svg' },
  { value: 'ES', label: 'ES', dialCode: '+34', flagFile: 'es.svg' },
  { value: 'IT', label: 'IT', dialCode: '+39', flagFile: 'it.svg' },
  { value: 'NL', label: 'NL', dialCode: '+31', flagFile: 'nl.svg' },
  { value: 'SE', label: 'SE', dialCode: '+46', flagFile: 'se.svg' },
  { value: 'NO', label: 'NO', dialCode: '+47', flagFile: 'no.svg' },
  { value: 'DK', label: 'DK', dialCode: '+45', flagFile: 'dk.svg' },
  { value: 'AU', label: 'AU', dialCode: '+61', flagFile: 'au.svg' },
  { value: 'IN', label: 'IN', dialCode: '+91', flagFile: 'in.svg' },
  { value: 'JP', label: 'JP', dialCode: '+81', flagFile: 'jp.svg' },
  { value: 'CN', label: 'CN', dialCode: '+86', flagFile: 'cn.svg' },
  { value: 'BR', label: 'BR', dialCode: '+55', flagFile: 'br.svg' },
  { value: 'MX', label: 'MX', dialCode: '+52', flagFile: 'mx.svg' },
  { value: 'ZA', label: 'ZA', dialCode: '+27', flagFile: 'za.svg' },
  { value: 'NG', label: 'NG', dialCode: '+234', flagFile: 'ng.svg' },
  { value: 'KE', label: 'KE', dialCode: '+254', flagFile: 'ke.svg' },
  { value: 'OTHER', label: 'Other', dialCode: '', flagFile: 'other.svg' },
];

function FlagImg({ flagFile, alt }) {
  const { src, alt: resolvedAlt } = getFlagAsset({ flagFile, alt });
  return <img className="auth-country-flag" src={src} width="22" height="14" alt={resolvedAlt} />;
}

export default function PhoneRegionSelect({ value, onChange, required = false }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const selected = useMemo(() => PHONE_REGIONS.find((o) => o.value === value) || null, [value]);

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
    <div className="auth-country" ref={rootRef} data-required={required ? 'true' : 'false'}>
      <button
        type="button"
        className="auth-country-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        {selected ? (
          <>
            <FlagImg flagFile={selected.flagFile} alt={`${selected.label} flag`} />
            <span className="auth-country-trigger__label">
              {selected.label}
              {selected.dialCode ? ` (${selected.dialCode})` : ''}
            </span>
          </>
        ) : (
          <span className="auth-country-trigger__placeholder">Select a region</span>
        )}
        <span className="auth-country-trigger__caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className="auth-country-list" role="listbox" aria-label="Choose phone region">
          {PHONE_REGIONS.map((o) => (
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
              <FlagImg flagFile={o.flagFile} alt={`${o.label} flag`} />
              <span className="auth-country-item__label">
                {o.label}
                {o.dialCode ? ` (${o.dialCode})` : ''}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

