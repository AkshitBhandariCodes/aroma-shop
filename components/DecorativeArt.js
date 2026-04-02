'use client';

import React from 'react';
import './DecorativeArt.css';

/** Original SVG decor — inspired by premium perfume ecommerce layouts (not extracted from third-party PSDs). */
export function LandingBackdrop() {
  return (
    <div className="landing-backdrop" aria-hidden>
      <div className="landing-backdrop__mesh" />
      <div className="landing-backdrop__grain" />
      <div className="landing-backdrop__orb landing-backdrop__orb--1" />
      <div className="landing-backdrop__orb landing-backdrop__orb--2" />
      <div className="landing-backdrop__orb landing-backdrop__orb--3" />
    </div>
  );
}

export function HeroOrnament() {
  return (
    <svg
      className="hero-ornament"
      viewBox="0 0 520 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="heroOrnStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a27e" stopOpacity="0" />
          <stop offset="35%" stopColor="#c9a27e" stopOpacity="0.55" />
          <stop offset="65%" stopColor="#d4af37" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#c9a27e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M10 120C90 40 180 140 260 80c80-60 170 20 250-50"
        stroke="url(#heroOrnStroke)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M40 132c55-28 118-48 220-26s118 38 196 14"
        stroke="rgba(201, 162, 126, 0.22)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="96" cy="74" r="3" fill="rgba(201, 162, 126, 0.35)" />
      <circle cx="268" cy="58" r="2.5" fill="rgba(212, 175, 140, 0.4)" />
      <circle cx="412" cy="94" r="2" fill="rgba(201, 162, 126, 0.3)" />
    </svg>
  );
}

export function SectionFlourish({ className = '' }) {
  return (
    <svg
      className={`section-flourish ${className}`.trim()}
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 12h36M84 12h28"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M52 12c6-8 12-8 18 0-6 8-12 8-18 0Z"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="rgba(201, 162, 126, 0.12)"
      />
    </svg>
  );
}
