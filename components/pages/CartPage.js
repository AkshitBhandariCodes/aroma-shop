'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionFlourish } from '../DecorativeArt';
import { resolveImage } from '@/lib/constants';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, loading, setQuantity, removeItem, clear } = useCart();
  const [busy, setBusy] = useState(null);

  const updateQty = async (productId, next) => {
    setBusy(productId);
    try {
      await setQuantity(productId, next);
    } finally {
      setBusy(null);
    }
  };

  const remove = async (productId) => {
    setBusy(productId);
    try {
      await removeItem(productId);
    } finally {
      setBusy(null);
    }
  };

  const empty = !loading && cart.items.length === 0;

  return (
    <section className="section page-cart">
      <div className="container">
        <SectionFlourish />
        <h1 className="section__title section__title--center page-cart__title">Your bag</h1>
        <p className="page-cart__subtitle">Review your selection before checkout.</p>

        {loading && <p className="page-muted">Loading cart…</p>}

        {empty && (
          <div className="page-cart__empty">
            <p>Your bag is empty.</p>
            <Link href="/#shop" className="btn btn--primary">
              Browse perfumes
            </Link>
          </div>
        )}

        {!empty && (
          <>
            <ul className="page-cart__lines">
              {cart.items.map((line) => {
                const p = line.product;
                const pid = line.productId;
                return (
                  <li key={pid} className="page-cart__line">
                    <Link href={`/product/${pid}`} className="page-cart__thumb">
                      <img src={resolveImage(p.img)} alt="" />
                    </Link>
                    <div className="page-cart__line-body">
                      <div className="page-cart__line-top">
                        <Link href={`/product/${pid}`} className="page-cart__line-name">
                          {p.name}
                        </Link>
                        <span className="page-cart__line-total">${line.lineTotal}</span>
                      </div>
                      <p className="page-cart__line-meta">${p.price} each</p>
                      <div className="page-cart__line-controls">
                        <label className="visually-hidden" htmlFor={`qty-${pid}`}>
                          Quantity for {p.name}
                        </label>
                        <div className="qty-stepper">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            disabled={busy === pid || line.quantity <= 1}
                            onClick={() => updateQty(pid, line.quantity - 1)}
                          >
                            −
                          </button>
                          <input
                            id={`qty-${pid}`}
                            readOnly
                            value={line.quantity}
                            size={2}
                            aria-hidden
                          />
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            disabled={busy === pid || line.quantity >= 99}
                            onClick={() => updateQty(pid, line.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="page-cart__remove"
                          disabled={busy === pid}
                          onClick={() => remove(pid)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="page-cart__summary">
              <div className="page-cart__subtotal">
                <span>Subtotal</span>
                <span>${cart.subtotal}</span>
              </div>
              <p className="page-cart__tax-note">Taxes and shipping calculated at checkout.</p>
              <div className="page-cart__checkout">
                <button type="button" className="btn btn--primary btn--wide" disabled>
                  Checkout (demo)
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => clear()}>
                  Clear bag
                </button>
              </div>
            </div>
          </>
        )}

        <Link href="/" className="page-cart__back-home">
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
