/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(201,168,76,.15)', fontFamily: "'Jost', sans-serif", marginTop: 0 }}>
      {/* Top gold line */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 60 }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: '#f0ebe3', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 6 }}>
              Kuruwita
            </div>
            <div style={{ fontSize: 9, fontWeight: 300, color: '#c9a84c', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 20 }}>
              by Wickramakalutota · Opticals
            </div>
            <p style={{ fontSize: 13, color: 'rgba(240,235,227,.45)', lineHeight: 1.9, maxWidth: 280, fontWeight: 300 }}>
              Premium eyewear curated for those who see the world differently. Serving Chilaw and Sri Lanka with distinction.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
              <a href="https://wa.me/94322221211" target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: '1px solid rgba(201,168,76,.35)', color: '#c9a84c', textDecoration: 'none', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 400, transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c20'; e.currentTarget.style.borderColor = '#c9a84c'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.35)'; }}>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 24 }}>Collections</div>
            {['Sunglasses', 'Prescription Frames', 'Reading Glasses', 'Blue Cut Lenses', 'Accessories'].map(c => (
              <div key={c} style={{ marginBottom: 12 }}>
                <Link to={`/products?category=${c}`} style={{ fontSize: 12, color: 'rgba(240,235,227,.5)', textDecoration: 'none', letterSpacing: '1px', fontWeight: 300, transition: 'color .2s' }}
                  onMouseEnter={e => { e.target.style.color = '#f0ebe3'; }}
                  onMouseLeave={e => { e.target.style.color = 'rgba(240,235,227,.5)'; }}>
                  {c}
                </Link>
              </div>
            ))}
          </div>

          {/* Info */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 24 }}>Information</div>
            {[['/', 'Home'], ['/about', 'Our Story'], ['/track/search', 'Track Order'], ['/cart', 'Shopping Bag']].map(([to, l]) => (
              <div key={to} style={{ marginBottom: 12 }}>
                <Link to={to} style={{ fontSize: 12, color: 'rgba(240,235,227,.5)', textDecoration: 'none', letterSpacing: '1px', fontWeight: 300, transition: 'color .2s' }}
                  onMouseEnter={e => { e.target.style.color = '#f0ebe3'; }}
                  onMouseLeave={e => { e.target.style.color = 'rgba(240,235,227,.5)'; }}>
                  {l}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 24 }}>Visit Us</div>
            <div style={{ fontSize: 12, color: 'rgba(240,235,227,.5)', lineHeight: 2.2, fontWeight: 300 }}>
              <div>No.57 Kurunegala Road</div>
              <div>Chilaw, Sri Lanka</div>
              <div style={{ marginTop: 12, color: '#c9a84c80' }}>Tel: 032 222 1211</div>
              <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(240,235,227,.3)' }}>
                Mon – Saturday<br/>
                8:30 AM – 6:30 PM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.05)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 11, color: 'rgba(240,235,227,.2)', letterSpacing: '1.5px', fontWeight: 300 }}>
            © {new Date().getFullYear()} Kuruwita Opticals by Wickramakalutota. All rights reserved.
          </div>
          <div style={{ fontSize: 11, color: 'rgba(240,235,227,.2)', letterSpacing: '1.5px' }}>
            Crafted with care · Chilaw, Sri Lanka
          </div>
        </div>
      </div>
    </footer>
  );
}
