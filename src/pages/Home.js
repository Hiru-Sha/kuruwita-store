/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API = process.env.REACT_APP_API_URL || 'https://kuruwita-optical-production.up.railway.app/api';
const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');

const CATS = [
  { name: 'Sunglasses',      label: 'Sunglasses',       sub: 'UV Protection',          img: '😎' },
  { name: 'Frames',          label: 'Prescription',      sub: 'Optical Frames',         img: '🕶️' },
  { name: 'Reading Glasses', label: 'Reading',           sub: 'Precision Lenses',       img: '👓' },
  { name: 'Accessories',     label: 'Accessories',       sub: 'Cases & Care',           img: '✨' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [heroLoaded, setHeroLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    fetch(`${API}/store/featured`)
      .then(r => r.json())
      .then(d => setFeatured(Array.isArray(d) ? d : []))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  const S = {
    section: { maxWidth: 1280, margin: '0 auto', padding: '0 32px' },
    label: { fontSize: 10, fontWeight: 400, letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 16, display: 'block', fontFamily: "'Jost', sans-serif" },
    heading: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: '#f0ebe3', lineHeight: 1.1 },
  };

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: '#0a0a0a', color: '#f0ebe3' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 600, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0a0a 0%, #0f1a2e 40%, #0a1520 100%)' }}/>
        {/* Decorative gold orb */}
        <div style={{ position: 'absolute', right: '-5%', top: '10%', width: '55vw', maxWidth: 700, aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(201,168,76,.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', left: '-10%', bottom: '-10%', width: '40vw', maxWidth: 500, aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(201,168,76,.04) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        {/* Grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,.03) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }}/>

        <div style={{ ...S.section, position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ maxWidth: 680, opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(30px)', transition: 'all 1s ease' }}>
            <span style={{ ...S.label }}>Est. Chilaw, Sri Lanka · Since Years</span>
            <h1 style={{ ...S.heading, fontSize: 'clamp(44px, 7vw, 88px)', marginBottom: 28 }}>
              Crafted for<br/>
              <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Perfect Vision</em>
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(240,235,227,.5)', lineHeight: 1.9, maxWidth: 460, fontWeight: 300, marginBottom: 48 }}>
              Discover our curated collection of premium eyewear — from timeless prescription frames to statement sunglasses. Each piece selected for uncompromising quality.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 0, marginBottom: 40, maxWidth: 440 }}>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search our collection..."
                style={{ flex: 1, padding: '14px 20px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(201,168,76,.25)', borderRight: 'none', color: '#f0ebe3', fontSize: 13, fontFamily: "'Jost', sans-serif", outline: 'none', letterSpacing: '.5px' }}/>
              <button type="submit"
                style={{ padding: '14px 24px', background: '#c9a84c', color: '#0a0a0a', border: 'none', fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif', transition: 'all .2s'" }}>
                Search
              </button>
            </form>

            <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/products" style={{ padding: '13px 36px', background: '#c9a84c', color: '#0a0a0a', textDecoration: 'none', fontSize: 11, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#dfc170'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#c9a84c'; }}>
                Explore Collection
              </Link>
              <a href="https://wa.me/94322221211" target="_blank" rel="noreferrer"
                style={{ padding: '13px 36px', border: '1px solid rgba(240,235,227,.2)', color: 'rgba(240,235,227,.7)', textDecoration: 'none', fontSize: 11, fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,235,227,.2)'; e.currentTarget.style.color = 'rgba(240,235,227,.7)'; }}>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(201,168,76,.5)' }}>Scroll</div>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(#c9a84c50, transparent)', animation: 'pulse 2s infinite' }}/>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ borderTop: '1px solid rgba(201,168,76,.1)', borderBottom: '1px solid rgba(201,168,76,.1)', background: '#050505', padding: '14px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 60, animation: 'marquee 20s linear infinite', width: 'max-content' }}>
          {['Premium Eyewear', 'Luxury Frames', 'UV Protection', 'Blue Cut Lenses', 'Home Delivery', 'Quality Assured', 'Kuruwita Opticals', 'By Wickramakalutota',
            'Premium Eyewear', 'Luxury Frames', 'UV Protection', 'Blue Cut Lenses', 'Home Delivery', 'Quality Assured', 'Kuruwita Opticals', 'By Wickramakalutota'].map((t, i) => (
            <span key={i} style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: i % 2 === 0 ? 'rgba(240,235,227,.3)' : '#c9a84c', whiteSpace: 'nowrap', fontWeight: 300 }}>
              {t} {i % 2 === 0 ? '◆' : '◇'}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section style={{ padding: '100px 0', background: '#0a0a0a' }}>
        <div style={S.section}>
          <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={S.label}>Shop by Category</span>
              <h2 style={{ ...S.heading, fontSize: 'clamp(28px,4vw,48px)' }}>Our Collections</h2>
            </div>
            <Link to="/products" style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', textDecoration: 'none', borderBottom: '1px solid #c9a84c30', paddingBottom: 2 }}>
              View All →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {CATS.map((cat, i) => (
              <Link key={cat.name} to={`/products?category=${encodeURIComponent(cat.name)}`} style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative', height: 320, background: i % 2 === 0 ? '#0f0f0f' : '#0d0d0d', border: '1px solid rgba(255,255,255,.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, overflow: 'hidden', transition: 'all .4s ease', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.25)'; e.currentTarget.style.background = '#141414'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.04)'; e.currentTarget.style.background = i % 2 === 0 ? '#0f0f0f' : '#0d0d0d'; }}>
                  <div style={{ fontSize: 52, marginBottom: 24, filter: 'grayscale(20%)' }}>{cat.img}</div>
                  <div style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 8, fontWeight: 400 }}>{cat.sub}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: '#f0ebe3', fontWeight: 400, textAlign: 'center' }}>{cat.label}</div>
                  <div style={{ position: 'absolute', bottom: 24, fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(201,168,76,.5)', fontWeight: 300 }}>
                    Explore →
                  </div>
                  {/* Corner accent */}
                  <div style={{ position: 'absolute', top: 16, right: 16, width: 20, height: 20, borderTop: '1px solid rgba(201,168,76,.3)', borderRight: '1px solid rgba(201,168,76,.3)' }}/>
                  <div style={{ position: 'absolute', bottom: 16, left: 16, width: 20, height: 20, borderBottom: '1px solid rgba(201,168,76,.3)', borderLeft: '1px solid rgba(201,168,76,.3)' }}/>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ padding: '100px 0', background: '#070707' }}>
        <div style={S.section}>
          <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={S.label}>Handpicked for You</span>
              <h2 style={{ ...S.heading, fontSize: 'clamp(28px,4vw,48px)' }}>New Arrivals</h2>
            </div>
            <Link to="/products" style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', textDecoration: 'none', borderBottom: '1px solid #c9a84c30', paddingBottom: 2 }}>
              Full Collection →
            </Link>
          </div>

          {loading
            ? <div style={{ textAlign: 'center', padding: '80px', color: 'rgba(201,168,76,.4)', fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase' }}>
                Loading Collection...
              </div>
            : featured.length === 0
              ? <div style={{ textAlign: 'center', padding: '80px', color: 'rgba(240,235,227,.2)', fontSize: 13 }}>
                  Products will appear here once added to inventory with images.
                </div>
              : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 2 }}>
                  {featured.map(p => <ProductCard key={p.id} product={p}/>)}
                </div>
          }
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '80px 0', background: '#0a0a0a', borderTop: '1px solid rgba(201,168,76,.08)', borderBottom: '1px solid rgba(201,168,76,.08)' }}>
        <div style={S.section}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>
            {[
              ['◆', 'Curated Selection', 'Every frame handpicked for quality and style'],
              ['◇', 'Island-Wide Delivery', 'Fast delivery across all of Sri Lanka'],
              ['◈', 'WhatsApp Support', 'Expert guidance just a message away'],
              ['◉', 'Authentic Products', '100% genuine eyewear, guaranteed'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ textAlign: 'center', padding: '16px 8px' }}>
                <div style={{ fontSize: 20, color: '#c9a84c', marginBottom: 16, fontWeight: 300 }}>{icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: '#f0ebe3', marginBottom: 10, fontWeight: 400 }}>{title}</div>
                <div style={{ fontSize: 12, color: 'rgba(240,235,227,.35)', lineHeight: 1.7, fontWeight: 300, letterSpacing: '.3px' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '120px 0', background: '#070707', textAlign: 'center' }}>
        <div style={S.section}>
          <span style={S.label}>Get In Touch</span>
          <h2 style={{ ...S.heading, fontSize: 'clamp(32px,5vw,64px)', marginBottom: 20 }}>
            Need Expert Advice?
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(240,235,227,.4)', lineHeight: 1.9, maxWidth: 480, margin: '0 auto 48px', fontWeight: 300 }}>
            Our optical specialists are ready to help you find the perfect eyewear. Reach us instantly on WhatsApp.
          </p>
          <a href="https://wa.me/94322221211?text=Hello!%20I%20need%20help%20finding%20the%20right%20eyewear."
            target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 48px', background: 'transparent', border: '1px solid #c9a84c', color: '#c9a84c', textDecoration: 'none', fontSize: 11, fontWeight: 400, letterSpacing: '3.5px', textTransform: 'uppercase', transition: 'all .3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#0a0a0a'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a84c'; }}>
            <span>💬</span> Chat on WhatsApp
          </a>
        </div>
      </section>

      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }
      `}</style>
    </div>
  );
}
