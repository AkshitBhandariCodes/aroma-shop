'use client';

import React, { useState } from 'react';
import './AuthModal.css';
import PhoneRegionSelect, { PHONE_REGIONS } from './PhoneRegionSelect';

const initialForm = { email: '', password: '', name: '', phoneRegion: 'US', phoneLocal: '' };

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  if (!isOpen) return null;

  const resetFeedback = () => setMessage({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    resetFeedback();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetFeedback();

    if (mode === 'signup') {
      const phoneLocal = String(form.phoneLocal || '').trim();
      if (!phoneLocal) {
        setMessage({ type: 'error', text: 'Phone number is required.' });
        return;
      }
    }
    
    const buildPhone = (regionValue, localRaw) => {
      const region = PHONE_REGIONS.find((r) => r.value === regionValue);
      const dialCode = region?.dialCode || '';
      const localTrim = String(localRaw || '').trim();
      if (!localTrim) return '';

      // If user already provided a full +E.164-like number, keep it as-is.
      if (localTrim.startsWith('+')) return localTrim;

      if (!dialCode) return localTrim;

      const digits = localTrim.replace(/[^\d]/g, '');
      return digits ? `${dialCode}${digits}` : '';
    };

    const phoneValue =
      mode === 'signup' ? buildPhone(form.phoneRegion, form.phoneLocal) : '';
    if (mode === 'signup' && !phoneValue) {
      setMessage({ type: 'error', text: 'Please enter a valid phone number.' });
      return;
    }

    const endpoint = mode === 'login' ? '/api/login' : '/api/register';
    const body =
      mode === 'login'
        ? { email: form.email, password: form.password }
        : { email: form.email, password: form.password, name: form.name, phone: phoneValue };

    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage({ type: 'error', text: data.message || 'Something went wrong.' });
        return;
      }

      setMessage({ type: 'success', text: data.message || 'Success.' });
      onAuthSuccess?.(data.user);
      setForm(initialForm);
      setTimeout(() => {
        onClose?.();
        setMessage({ type: '', text: '' });
      }, 400);
    } catch {
      setMessage({ type: 'error', text: 'Network error. Check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setForm(initialForm);
    resetFeedback();
  };

  return (
    <div className="auth-overlay" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button type="button" className="auth-overlay__dismiss" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="auth-modal">
        <div className="auth-modal__tabs">
          <button
            type="button"
            className={mode === 'login' ? 'is-active' : ''}
            onClick={() => switchMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'is-active' : ''}
            onClick={() => switchMode('signup')}
          >
            Sign up
          </button>
        </div>

        <h2 id="auth-title" className="auth-modal__title">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="auth-modal__subtitle">
          {mode === 'login'
            ? 'Sign in to sync your Aroma preferences.'
            : 'Join Aroma for exclusive notes and early access.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <label className="auth-field">
              <span>Full name</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jordan Lee"
                value={form.name}
                onChange={handleChange}
              />
            </label>
          )}
          {mode === 'signup' && (
            <label className="auth-field">
              <span>Phone number</span>
              <div className="auth-phone-row">
                <div className="auth-phone-region">
                  <PhoneRegionSelect
                    value={form.phoneRegion}
                    required
                    onChange={(next) => {
                      setForm((f) => ({ ...f, phoneRegion: next }));
                      resetFeedback();
                    }}
                  />
                </div>
                <input
                  className="auth-phone-local"
                  name="phoneLocal"
                  type="tel"
                  autoComplete="tel"
                  placeholder="555 123 4567"
                  value={form.phoneLocal}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
          )}
          <label className="auth-field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </label>

          {message.text && (
            <p className={`auth-message auth-message--${message.type}`} role="status">
              {message.text}
            </p>
          )}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
