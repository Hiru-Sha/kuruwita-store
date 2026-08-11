import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const C = { navy:'#0f1f3d', gold:'#c9a84c', cream:'#f8f5ef' };

export default function Navbar() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [loc]);

  const navLink = (to, label) => (
    <Link to={to} style={{
      color: loc.pathname === to ? C.gold : 'white',
      textDecoration:'none', fontWeight:600, fontSize:14,
      padding:'6px 12px', borderRadius:8,
      background: loc.pathname === to ? 'rgba(201,168,76,.15)' : 'transparent',
      transition:'all .2s',
    }}>{label}</Link>
  );

  return (
    <nav style={{
      position:'sticky', top:0, zIndex:200,
      background: scrolled ? C.navy : C.navy,
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.25)' : 'none',
      transition:'box-shadow .3s',
      fontFamily:"'DM Sans',sans-serif",
    }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 20px', display:'flex', alignItems:'center', height:64, gap:16 }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration:'none', display:'flex', flexDirection:'column', flex:1 }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'white', fontWeight:700, lineHeight:1.1 }}>
            Kuruwita Opticals
          </div>
          <div style={{ fontSize:10, color:C.gold, letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:600 }}>
            by Wickramakalutota
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display:'flex', gap:4, alignItems:'center' }} className="desktop-nav">
          {navLink('/', 'Home')}
          {navLink('/products', 'Shop')}
          {navLink('/about', 'About')}
          {navLink('/track/search', 'Track Order')}
        </div>

        {/* Cart */}
        <Link to="/cart" style={{
          position:'relative', textDecoration:'none',
          background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)',
          borderRadius:10, padding:'8px 14px', display:'flex', alignItems:'center', gap:6,
          color:'white', fontWeight:700, fontSize:14, transition:'all .2s',
        }}>
          🛒 Cart
          {count > 0 && (
            <span style={{
              position:'absolute', top:-8, right:-8,
              background:C.gold, color:C.navy, borderRadius:'50%',
              width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:11, fontWeight:800,
            }}>{count}</span>
          )}
        </Link>

        {/* Hamburger mobile */}
        <button onClick={() => setMenuOpen(m => !m)}
          style={{ display:'none', background:'none', border:'none', color:'white', fontSize:22, cursor:'pointer', padding:4 }}
          className="hamburger">☰</button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background:C.navy, borderTop:'1px solid rgba(255,255,255,.1)', padding:'12px 20px', display:'flex', flexDirection:'column', gap:4 }}>
          {[['/', 'Home'], ['/products', 'Shop'], ['/about', 'About'], ['/track/search', 'Track Order']].map(([to, label]) => (
            <Link key={to} to={to} style={{ color:'white', textDecoration:'none', padding:'10px 12px', borderRadius:8, fontSize:15, fontWeight:600 }}>{label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:640px){.desktop-nav{display:none!important}.hamburger{display:block!important}}
      `}</style>
    </nav>
  );
}
