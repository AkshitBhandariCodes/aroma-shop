'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SectionFlourish } from '../DecorativeArt';
import PromoCircleText from '../PromoCircleText';
import TopSellingArrow from '../TopSellingArrow';
import { IMG, SOCIAL, TABS, resolveImage } from '@/lib/constants';
import { Diamond } from '../Icons';
import * as api from '@/lib/api';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [pageDot, setPageDot] = useState(0);
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await api.fetchProducts();
        if (!cancelled && list) setProducts(list);
      } catch (e) {
        if (!cancelled) setProductsError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return products;
    return products.filter((p) => p.tab === activeTab);
  }, [activeTab, products]);

  return (
    <>
      <section id="home" className="hero hero--editorial">
        <div className="hero__glow hero__glow--1" aria-hidden />
        <div className="hero__glow hero__glow--2" aria-hidden />
        <div className="hero__glow hero__glow--3" aria-hidden />
        <div className="hero__visuals">
          <div className="hero-bottle hero-bottle--left">
            <img
              src={IMG.heroLeft}
              alt="Signature amber glass fragrance bottle with botanical styling"
            />
          </div>
          <div className="hero-bottle hero-bottle--right">
            <div className="hero-bottle__badge" aria-hidden>
              <span>Our Unique Product 100% Organic</span>
              <span className="hero-bottle__play" />
            </div>
            <img src={IMG.heroRight} alt="Luxury perfume on natural stone in oval frame" />
          </div>
        </div>

        <div className="hero__content container">
          <h1 className="hero__title">Best Perfume Collection for You</h1>
          <p className="hero__subtitle hero__subtitle--lead">
            Discover the Best Perfume Collection: Find Your Signature Scent Today
          </p>
          <Link href="/#shop" className="btn btn--primary hero__cta">
            Buy Now
          </Link>
          <p className="hero__script">essence unleashed</p>
          <p className="hero__tagline">Unleash Your Essence with the Every Spritz.</p>
          <Link href="/#collection" className="hero__learn-more">
            Learn More <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>

      <div className="brand-bar">
        <div className="brand-bar__inner container">
          <span>Fragrance Defined</span>
          <Diamond />
          <span>Secret Of Elegance</span>
          <Diamond />
          <span>Perfume Essence</span>
          <Diamond />
          <span>Aroma Exploration</span>
          <Diamond />
          <span>Signature Scent</span>
        </div>
      </div>

      <section id="collection" className="section top-selling">
        <div className="container top-selling__inner">
          <SectionFlourish />
          <h2 className="section__title">
            Top Selling Perfumes.
            <span className="section__title-sub">
              The Most Popular and Best Scents of the Year Collection.
            </span>
          </h2>
          <div className="top-selling__grid-wrap">
            <TopSellingArrow className="top-selling__arrow" />
            <div className="top-selling__grid">
              <article className="scent-card">
                <div className="scent-card__oval">
                  <img src={IMG.top1} alt="Elie Saab Le Parfum in oval frame" />
                </div>
                <h3>Elie Saab</h3>
                <p>Honey-gold facets, daylight amber, and couture clarity.</p>
              </article>
              <article className="scent-card">
                <div className="scent-card__oval">
                  <img src={IMG.top2} alt="Maison Margiela Replica in oval frame" />
                </div>
                <h3>Replica</h3>
                <p>Sun-drenched notes, soft fruit, and linen-warm memory.</p>
              </article>
              <article className="scent-card">
                <div className="scent-card__oval">
                  <img src={IMG.top3} alt="Aerin Amber Musk in oval frame" />
                </div>
                <h3>Aerin</h3>
                <p>Amber musk, polished stone cap, and quiet glamour.</p>
              </article>
            </div>
          </div>
          <p className="top-selling__footnote">
            Each bottle is composed in small batches — a curated trio that defines the year in scent:
            romantic florals, grounded woods, and luminous freshness.
          </p>
        </div>
      </section>

      <section className="section promo">
        <div className="container promo__grid">
          <div className="promo__visual">
            <PromoCircleText />
            <p className="promo__script-accent">Best another one of the year</p>
            <div className="promo-oval promo-oval--back">
              <img src={IMG.promoA} alt="Fragrance still life with blossoms in arch frame" />
            </div>
            <div className="promo-oval promo-oval--front">
              <img src={IMG.promoB} alt="Signature scent in overlapping arch frame" />
            </div>
          </div>
          <div className="promo__copy">
            <h2>Explore from 20% Discountable Perfume</h2>
            <p>
              Discover layers of glow — limited silhouettes, gift-ready ribbons, and notes that linger
              from morning light to midnight bloom.
            </p>
            <Link href="/#shop" className="btn btn--primary">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <section id="shop" className="section shop">
        <div className="container">
          <SectionFlourish />
          <h2 className="section__title section__title--center">Grab Your Signature Scent Today!</h2>
          {productsError && (
            <p className="page-error" role="alert">
              {productsError}
            </p>
          )}
          <div className="tabs" role="tablist" aria-label="Filter perfumes">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={activeTab === t.key}
                className={`tabs__btn${activeTab === t.key ? ' is-active' : ''}`}
                onClick={() => {
                  setActiveTab(t.key);
                  setPageDot(0);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="product-card product-card--link">
                <div className="product-card__img">
                  <img src={resolveImage(p.img)} alt={p.name} />
                </div>
                <div className="product-card__meta">
                  <span className="product-card__name">{p.name}</span>
                  <span className="product-card__price">${p.price}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="pagination-dots" aria-hidden>
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                className={pageDot === i ? 'is-active' : ''}
                onClick={() => setPageDot(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section benefits benefits--blush">
        <div className="container benefits__grid">
          <div className="benefits__copy">
            <SectionFlourish className="section-flourish--left" />
            <h2 className="section__title">
              Strategically Unlock the Benefits: Transform Your Experience with Aroma.
            </h2>
            <ul className="benefits__list">
              <li>
                <strong>Refined oils</strong> — distilled slowly for clarity, never sharpness.
              </li>
              <li>
                <strong>Lasting aura</strong> — a trail that feels personal, never overpowering.
              </li>
              <li>
                <strong>Artful presentation</strong> — weight, glass, and gold details you keep on
                display.
              </li>
              <li>
                <strong>Considered pairing</strong> — layer or wear alone; each composition is
                harmonious.
              </li>
            </ul>
          </div>
          <div className="benefits__visual">
            <div className="benefits__frame">
              <img src={IMG.benefits} alt="Editorial fragrance composition in rounded frame" />
            </div>
          </div>
        </div>
      </section>

      <section className="section community">
        <div className="container">
          <SectionFlourish />
          <h2 className="section__title section__title--center">
            Join Our Community: Connect with Us on Social Media!
          </h2>
          <div className="social-grid">
            {SOCIAL.map((item, i) => (
              <div key={i} className="social-grid__cell">
                <img src={item.src} alt={item.alt} loading="lazy" />
              </div>
            ))}
          </div>
          <a
            className="btn btn--primary btn--wide"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Follow on Instagram
          </a>
        </div>
      </section>

      <section className="section newsletter">
        <div className="container newsletter__inner">
          <div className="newsletter__copy">
            <h2>Stay Updated: Subscribe for Exclusive Content</h2>
            <p>Private launches, styling notes, and members-only fragrance drops — twice a month.</p>
          </div>
          <form
            className="newsletter__form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="visually-hidden" htmlFor="email-news">
              Email
            </label>
            <input id="email-news" type="email" placeholder="Enter your email" />
            <button type="submit" className="btn btn--primary">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
