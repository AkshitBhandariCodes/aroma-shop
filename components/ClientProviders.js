'use client';

import { CartProvider } from '@/context/CartContext';
import SiteLayout from './SiteLayout';

export default function ClientProviders({ children }) {
  return (
    <CartProvider>
      <SiteLayout>{children}</SiteLayout>
    </CartProvider>
  );
}
