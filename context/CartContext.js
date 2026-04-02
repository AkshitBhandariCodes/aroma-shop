'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '@/lib/api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await api.fetchCart();
      if (data) setCart(data);
    } catch (e) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await api.fetchCart();
        if (!cancelled && data) setCart(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addItem = useCallback(async (productId, quantity = 1) => {
    const data = await api.postCartItem(productId, quantity);
    if (data) setCart(data);
    return data;
  }, []);

  const setQuantity = useCallback(async (productId, quantity) => {
    const data = await api.patchCartItem(productId, quantity);
    if (data) setCart(data);
    return data;
  }, []);

  const removeItem = useCallback(async (productId) => {
    const data = await api.deleteCartItem(productId);
    if (data) setCart(data);
    return data;
  }, []);

  const clear = useCallback(async () => {
    const data = await api.clearCart();
    if (data) setCart(data);
    return data;
  }, []);

  const itemCount = useMemo(
    () => cart.items.reduce((n, line) => n + line.quantity, 0),
    [cart.items]
  );

  const value = useMemo(
    () => ({
      cart,
      loading,
      error,
      itemCount,
      refresh,
      addItem,
      setQuantity,
      removeItem,
      clear,
    }),
    [cart, loading, error, itemCount, refresh, addItem, setQuantity, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
