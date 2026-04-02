'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SectionFlourish } from '../DecorativeArt';
import { resolveImage } from '@/lib/constants';
import * as api from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (id == null) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const p = await api.fetchProduct(id);
        if (cancelled) return;
        if (!p) {
          setError('Product not found');
          setProduct(null);
        } else {
          setProduct(p);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAdd = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addItem(product.id, 1);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <section className="section page-product">
        <div className="container page-product__inner">
          <p className="page-muted">Loading…</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="section page-product">
        <div className="container page-product__inner">
          <p className="page-error" role="alert">
            {error || 'Product not found.'}
          </p>
          <Link href="/" className="btn btn--primary">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-product">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden> / </span>
          <Link href="/#shop">Shop</Link>
          <span aria-hidden> / </span>
          <span>{product.name}</span>
        </nav>

        <div className="page-product__grid">
          <div className="page-product__visual">
            <div className="page-product__img-wrap">
              <img src={resolveImage(product.img)} alt={`${product.name} bottle`} />
            </div>
          </div>
          <div className="page-product__detail">
            <SectionFlourish className="section-flourish--left" />
            <h1 className="page-product__title">{product.name}</h1>
            <p className="page-product__price">${product.price}</p>
            <p className="page-product__volume">{product.volume}</p>
            <p className="page-product__lead">{product.shortDescription}</p>
            <p className="page-product__body">{product.description}</p>
            {product.notes && product.notes.length > 0 && (
              <div className="page-product__notes">
                <h2 className="page-product__notes-title">Key notes</h2>
                <ul>
                  {product.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="page-product__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleAdd}
                disabled={adding}
              >
                {adding ? 'Adding…' : 'Add to bag'}
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => router.push('/cart')}>
                View cart
              </button>
            </div>
            <Link href="/#shop" className="page-product__back">
              ← Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
