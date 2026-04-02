'use client';

import React from 'react';

export function IconSearch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm9 2-4.35-4.35"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconUser() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBag() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h15l-1.5 12.5a2 2 0 0 1-2 1.5H9.5a2 2 0 0 1-2-1.5L6 7Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M9 7V5a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconInstagram({ className = '' }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.25" cy="6.75" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function Diamond() {
  return (
    <svg className="diamond-icon" width="10" height="10" viewBox="0 0 10 10" aria-hidden>
      <path
        d="M5 .5 9.2 5 5 9.5.8 5Z"
        fill="#d4b896"
        stroke="#c9a27e"
        strokeOpacity="0.5"
        strokeWidth="0.35"
      />
    </svg>
  );
}
