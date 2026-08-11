/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API = process.env.REACT_APP_API_URL || 'https://kuruwita-optical-production.up.railway.app/api';
const C   = { navy:'#0f1f3d', gold:'#c9a84c', cream:'#f8f5ef', border:'#e0ddd6' };
const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');

const CATS = [
  { name:'Sunglasses',     emoji:'😎', desc:'UV protection for sunny days', color:'#1e3a5f' },
  { name:'Frames',         emoji:'🕶️', desc:'Premium prescription frames',  color:'#2d4a3e' },
  { name:'Reading Glasses',emoji:'👓', desc:'Clear vision for close work',  color:'#4a2d3e' },
  { name:'Accessories',    emoji:'🎒', desc:'Cases, chains & cleaning kits', color:'#3e3a2d' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{
        background:`linear-gradient(135deg, ${C.navy} 0%, #1a2f5a 50%, #0d1928 100%)`,
        minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center',
        padding:'60px 24px', position:'relative', overflow:'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, borderRadius:'50%', background:'rgba(201,168,76,.08)' }}/>
        <div style={{ position:'absolute', bottom:-60, left:-60, width:300, height:300, borderRadius:'50%', background:'rgba(201,168,76,.06)' }}/>

        <div style={{ textAlign:'center', maxWidth:700, position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-block', background:'rgba(201,168,76,.15)', border:'1px solid rgba(201,168,76,.3)',
            borderRadius:20, padding:'6px 18px', fontSize:12, fontWeight:700, color:C.gold,
            letterSpacing:'2px', textTransform:'uppercase', marginBottom:20 }}>
            by Wickramakalutota Opticals · Est. Chilaw
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,6vw,64px)',
            color:'white', fontWeight:700, lineHeight:1.15, marginBottom:20 }}>
            See the World<br/>
            <span style={{ color:C.gold }}>in Perfect Clarity</span>
          </h1>
          <p style={{ fontSize:'clamp(14px,2vw,18px)', color:'rgba(255,255,255,.75)',
            lineHeight:1.7, marginBottom:36, maxWidth:500, margin:'0 auto 36px' }}>
            Premium sunglasses, reading glasses and frames. Delivered to your doorstep or ready for pickup in Chilaw.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ display:'flex', gap:8, maxWidth:480, margin:'0 auto 32px', flexWrap:'wrap' }}>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search sunglasses, frames..."
              style={{ flex:1, minWidth:200, padding:'14px 18px', borderRadius:12, border:'none',
                fontSize:15, fontFamily:'inherit', outline:'none', background:'rgba(255,255,255,.95)' }}/>
            <button type="submit"
              style={{ padding:'14px 24px', background:C.gold, color:C.navy, border:'none',
                borderRadius:12, fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
              Search
            </button>
          </form>

          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/products" style={{ padding:'12px 28px', background:C.gold, color:C.navy,
              borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:15 }}>
              Shop Now →
            </Link>
            <a href="https://wa.me/94322221211" target="_blank" rel="noreferrer"
              style={{ padding:'12px 28px', background:'rgba(255,255,255,.12)', color:'white',
                border:'1px solid rgba(255,255,255,.25)', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:15 }}>
              💬 WhatsApp Order
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section style={{ background:'white', borderBottom:`1px solid ${C.border}`, padding:'16px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'center', gap:'clamp(16px,4vw,60px)', flexWrap:'wrap' }}>
          {[['🚚','Free Delivery','Orders over Rs. 5,000'],['🛡️','Quality Assured','All items verified'],['💬','WhatsApp Support','Instant replies'],['🔄','Easy Returns','7-day return policy']].map(([e,t,s])=>(
            <div key={t} style={{ textAlign:'center', padding:'8px 0' }}>
              <div style={{ fontSize:24, marginBottom:4 }}>{e}</div>
              <div style={{ fontSize:13, fontWeight:700, color:C.navy }}>{t}</div>
              <div style={{ fontSize:11, color:'#6b7280' }}>{s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={{ maxWidth:1200, margin:'60px auto', padding:'0 24px' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.gold, letterSpacing:'2px', textTransform:'uppercase', marginBottom:8 }}>Browse By Type</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, color:C.navy, margin:0 }}>Shop by Category</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
          {CATS.map(cat => (
            <Link key={cat.name} to={`/products?category=${encodeURIComponent(cat.name)}`} style={{ textDecoration:'none' }}>
              <div style={{
                background: cat.color, borderRadius:20, padding:'32px 24px',
                textAlign:'center', transition:'all .25s', cursor:'pointer',
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,.2)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';}}>
                <div style={{ fontSize:52, marginBottom:14 }}>{cat.emoji}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'white', fontWeight:700, marginBottom:6 }}>{cat.name}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,.7)' }}>{cat.desc}</div>
                <div style={{ marginTop:16, fontSize:13, color:C.gold, fontWeight:700 }}>Shop Now →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section style={{ background:C.cream, padding:'60px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32, flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:C.gold, letterSpacing:'2px', textTransform:'uppercase', marginBottom:8 }}>Hand-picked</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, color:C.navy, margin:0 }}>New Arrivals</h2>
            </div>
            <Link to="/products" style={{ padding:'10px 22px', background:C.navy, color:'white', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize:14 }}>
              View All →
            </Link>
          </div>
          {loading
            ? <div style={{ textAlign:'center', padding:'48px', color:'#6b7280', fontSize:14 }}>⏳ Loading products...</div>
            : featured.length === 0
              ? <div style={{ textAlign:'center', padding:'48px', color:'#6b7280' }}>
                  <div style={{ fontSize:48, marginBottom:12 }}>🕶️</div>
                  <div>Products coming soon!</div>
                </div>
              : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:20 }}>
                  {featured.map(p => <ProductCard key={p.id} product={p}/>)}
                </div>
          }
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section style={{ background:C.navy, padding:'60px 24px', textAlign:'center' }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>💬</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, color:'white', marginBottom:12 }}>
            Need Help Choosing?
          </h2>
          <p style={{ color:'rgba(255,255,255,.7)', fontSize:15, lineHeight:1.7, marginBottom:28 }}>
            Our optical experts are ready to help you find the perfect eyewear. Chat with us on WhatsApp for instant advice.
          </p>
          <a href="https://wa.me/94322221211?text=Hello%2C%20I%20need%20help%20choosing%20eyewear%20from%20Kuruwita%20Opticals"
            target="_blank" rel="noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 32px',
              background:'#25D366', color:'white', borderRadius:12, textDecoration:'none',
              fontWeight:700, fontSize:16, boxShadow:'0 8px 24px rgba(37,211,102,.3)' }}>
            💬 Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
