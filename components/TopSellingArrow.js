'use client';

import React from 'react';

export default function TopSellingArrow({ className = '' }) {
  return (
    <svg
      className={`top-selling-arrow ${className}`.trim()}
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 118C38 96 78 72 108 44c8-7 12-18 10-28"
        stroke="#1a1a1a"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M98 22l18 6-6 18" stroke="#1a1a1a" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
