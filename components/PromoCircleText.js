'use client';

import React from 'react';

/** Circular promo line + sparkle — matches reference treatment; original SVG (not raster extraction). */
export default function PromoCircleText({ className = '' }) {
  const pid = `promoCirclePath-${React.useId().replace(/:/g, '')}`;
  return (
    <div className={`promo-circle-text ${className}`.trim()} aria-hidden>
      <svg viewBox="0 0 200 200" className="promo-circle-text__svg">
        <defs>
          <path
            id={pid}
            d="M 100,100 m -72,0 a 72,72 0 1 1 144 0 a 72,72 0 1 1 -144 0"
          />
        </defs>
        <text className="promo-circle-text__label" fontSize="11.2" fontWeight="500" letterSpacing="0.06em">
          <textPath href={`#${pid}`} startOffset="4%">
            New Collection of the year with 20% discountable perfume ·
          </textPath>
        </text>
        <path
          className="promo-circle-text__sparkle"
          d="M100 88l2.2 11.8L114 102l-11.8 2.2L100 116l-2.2-11.8L86 102l11.8-2.2z"
        />
      </svg>
    </div>
  );
}
