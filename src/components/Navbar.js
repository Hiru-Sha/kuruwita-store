/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count } = useCart();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [cartBump,  setCartBump]  = useState(false);
  const loc = useLocation();
  const prevCount = React.useRef(count);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [loc]);

  useEffect(() => {
    if (count > prevCount.current) { setCartBump(true); setTimeout(() => setCartBump(false), 400); }
    prevCount.current = count;
  }, [count]);

  const isHome = loc.pathname === '/';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
        height: 72,
        background: scrolled || !isHome ? 'rgba(8,8,8,.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,.12)' : '1px solid transparent',
        transition: 'all .4s ease',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', height: '100%', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: '#f0ebe3', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Kuruwita
            </span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, fontWeight: 300, color: '#c9a84c', letterSpacing: '4px', textTransform: 'uppercase', marginTop: 2 }}>
              by Wickramakalutota · Opticals
            </span>
          </Link>

          <div style={{ flex: 1 }} />

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desk-nav">
            {[['/', 'Home'], ['/products', 'Collection'], ['/about', 'Our Story'], ['/track/search', 'Track Order']].map(([to, label]) => (
              <Link key={to} to={to} style={{
                textDecoration: 'none', fontSize: 12, fontWeight: 400, letterSpacing: '2.5px',
                textTransform: 'uppercase', color: loc.pathname === to ? '#c9a84c' : 'rgba(240,235,227,.7)',
                borderBottom: loc.pathname === to ? '1px solid #c9a84c' : '1px solid transparent',
                paddingBottom: 2, transition: 'all .25s',
              }}
                onMouseEnter={e => { e.target.style.color = '#c9a84c'; }}
                onMouseLeave={e => { e.target.style.color = loc.pathname === to ? '#c9a84c' : 'rgba(240,235,227,.7)'; }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Cart */}
          <Link to="/cart" style={{
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 18px', border: '1px solid rgba(201,168,76,.4)',
            borderRadius: 0, color: '#f0ebe3', fontSize: 11, fontWeight: 400,
            letterSpacing: '2px', textTransform: 'uppercase', transition: 'all .25s',
            transform: cartBump ? 'scale(1.05)' : 'scale(1)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.4)'; e.currentTarget.style.color = '#f0ebe3'; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            Bag {count > 0 && <span style={{ background: '#c9a84c', color: '#0a0a0a', borderRadius: '50%', width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{count}</span>}
          </Link>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(m => !m)} className="hamburger"
            style={{ display: 'none', background: 'none', border: 'none', color: '#f0ebe3', cursor: 'pointer', padding: 4, flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', width: 22, height: 1, background: menuOpen ? '#c9a84c' : '#f0ebe3', transition: 'all .3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }}/>
            <span style={{ display: 'block', width: 22, height: 1, background: '#f0ebe3', opacity: menuOpen ? 0 : 1, transition: 'all .3s' }}/>
            <span style={{ display: 'block', width: 22, height: 1, background: menuOpen ? '#c9a84c' : '#f0ebe3', transition: 'all .3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }}/>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed', top: 72, left: 0, right: 0, zIndex: 299,
        background: 'rgba(8,8,8,.98)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,168,76,.15)',
        padding: menuOpen ? '32px' : '0 32px',
        maxHeight: menuOpen ? 400 : 0, overflow: 'hidden',
        transition: 'all .4s ease',
      }}>
        {[['/', 'Home'], ['/products', 'Collection'], ['/about', 'Our Story'], ['/track/search', 'Track Order']].map(([to, label]) => (
          <Link key={to} to={to} style={{
            display: 'block', textDecoration: 'none', fontSize: 13, fontWeight: 400,
            letterSpacing: '3px', textTransform: 'uppercase',
            color: loc.pathname === to ? '#c9a84c' : 'rgba(240,235,227,.8)',
            padding: '14px 0', borderBottom: '1px solid rgba(201,168,76,.08)',
          }}>
            {label}
          </Link>
        ))}
        <Link to="/cart" style={{ display: 'block', textDecoration: 'none', fontSize: 13, fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', padding: '14px 0' }}>
          Bag ({count})
        </Link>
      </div>

      <style>{`
        @media(max-width:768px){.desk-nav{display:none!important}.hamburger{display:flex!important}}
      `}</style>
    </>
  );
}
