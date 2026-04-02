/** Static images: place files in `public/images/` (same filenames as API product `img` fields). */
export const IMG = {
  heroLeft: '/images/hero-ref-left.jpg',
  heroRight: '/images/hero-ref-right.jpg',
  top1: '/images/top-strip-1.jpg',
  top2: '/images/top-strip-2.jpg',
  top3: '/images/top-strip-3.jpg',
  promoA: '/images/promo-ref-back.jpg',
  promoB: '/images/promo-ref-front.jpg',
  benefits: '/images/benefits-ref.jpg',
};

export const SOCIAL = [
  { src: '/images/social-grid-1.jpg', alt: 'Lifestyle fragrance flatlay' },
  { src: '/images/social-grid-2.jpg', alt: 'Perfume bottle with roses' },
  { src: '/images/social-grid-3.jpg', alt: 'Hands presenting a scent' },
  { src: '/images/social-grid-4.jpg', alt: 'Vanity moment with perfume' },
  { src: '/images/social-grid-5.jpg', alt: 'Editorial perfume still life' },
  { src: '/images/social-grid-6.jpg', alt: 'Soft light on fragrance' },
];

/**
 * Resolve API/JSON image fields: "grid-ref-1.jpg" or legacy "/images/grid-ref-1.jpg".
 */
export function resolveImage(ref) {
  if (!ref) return '';
  const name = ref.includes('/') ? ref.split('/').pop() : ref;
  return `/images/${name}`;
}

export const heroIconUrl = '/images/hero-icon.svg';
