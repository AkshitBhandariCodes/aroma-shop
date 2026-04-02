'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthModal from './AuthModal';
import { LandingBackdrop } from './DecorativeArt';
import { IconBag, IconInstagram, IconSearch, IconUser } from './Icons';
import { useCart } from '@/context/CartContext';

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { itemCount } = useCart();

  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.user) setUser(data.user);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="landing">
      <LandingBackdrop />
      <header className="header">
        <nav className="nav container">
          <div className="nav__left">
            <Link href="/">Home</Link>
            <Link href="/#collection">Collection</Link>
          </div>
          <Link href="/" className="nav__logo">
            Aroma
          </Link>
          <div className="nav__right">
            <Link href="/#shop">Shop</Link>
            <Link href="/#contact">Contact</Link>
            <div className="nav__icons">
              <button type="button" className="icon-btn" aria-label="Search">
                <IconSearch />
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label={user ? `Signed in as ${user.name}` : 'Login or sign up'}
                onClick={() => setAuthOpen(true)}
              >
                <IconUser />
              </button>
              <Link href="/cart" className="icon-btn icon-btn--cart" aria-label="Shopping cart">
                <IconBag />
                {itemCount > 0 && <span className="header__cart-badge">{itemCount}</span>}
              </Link>
            </div>
          </div>
        </nav>
        {user && (
          <div className="header-greet container">
            <span>Hello, {user.name}</span>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer id="contact" className="footer footer--luxe">
        <div className="container footer__intro">
          <p className="footer__lede">
            Aroma — handcrafted campaigns in glass. A quiet standard for those who wear luxury
            without announcement.
          </p>
          <div className="footer__social">
            <span className="footer__social-label">Follow</span>
            <a
              href="https://instagram.com"
              className="footer__ig"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aroma on Instagram"
            >
              <IconInstagram className="footer__ig-icon" />
            </a>
          </div>
        </div>
        <div className="container footer__grid">
          <div className="footer__col">
            <h3>About</h3>
            <ul>
              <li>
                <Link href="/">About Us</Link>
              </li>
              <li>
                <Link href="/">Careers</Link>
              </li>
              <li>
                <Link href="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h3>Support</h3>
            <ul>
              <li>
                <Link href="/">Shipping &amp; Returns</Link>
              </li>
              <li>
                <Link href="/">FAQ</Link>
              </li>
              <li>
                <Link href="/#contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h3>Visit</h3>
            <p className="footer__address">
              Boutique appointments &amp; gifting — Tuesday to Saturday, 10am – 7pm.
            </p>
          </div>
        </div>
        <div className="footer__bottom container">
          <Link href="/" className="footer__logo">
            Aroma
          </Link>
          <p className="footer__copyright">© 2026 Aroma. All Rights Reserved.</p>
        </div>
      </footer>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
