import React from 'react';
import { Link } from 'react-router-dom';
const C = { navy:'#0f1f3d', gold:'#c9a84c' };
export default function Footer() {
  return (
    <footer style={{ background:C.navy, color:'white', fontFamily:"'DM Sans',sans-serif", marginTop:60 }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'48px 24px 24px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:40 }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, marginBottom:4 }}>Kuruwita Opticals</div>
          <div style={{ fontSize:11, color:C.gold, letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:14 }}>by Wickramakalutota</div>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.6)', lineHeight:1.7 }}>
            Quality eyewear for every vision need. Serving Chilaw and surrounding areas since years.
          </p>
        </div>
        <div>
          <div style={{ fontWeight:700, marginBottom:14, color:C.gold }}>Quick Links</div>
          {[['/', 'Home'], ['/products', 'Shop'], ['/cart', 'Cart'], ['/about', 'About Us']].map(([to, l]) => (
            <div key={to}><Link to={to} style={{ color:'rgba(255,255,255,.7)', textDecoration:'none', fontSize:13, lineHeight:2.2 }}>{l}</Link></div>
          ))}
        </div>
        <div>
          <div style={{ fontWeight:700, marginBottom:14, color:C.gold }}>Categories</div>
          {['Sunglasses', 'Frames', 'Reading Glasses', 'Blue Cut Lenses', 'Accessories'].map(c => (
            <div key={c}><Link to={`/products?category=${c}`} style={{ color:'rgba(255,255,255,.7)', textDecoration:'none', fontSize:13, lineHeight:2.2 }}>{c}</Link></div>
          ))}
        </div>
        <div>
          <div style={{ fontWeight:700, marginBottom:14, color:C.gold }}>Contact Us</div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,.7)', lineHeight:2 }}>
            <div>📍 No.57 Kurunegala Road, Chilaw</div>
            <div>📞 032 222 1211</div>
            <div>⏰ Mon–Sat: 8:30am – 6:30pm</div>
            <div style={{ marginTop:12 }}>
              <a href="https://wa.me/94322221211" target="_blank" rel="noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#25D366', color:'white', padding:'8px 16px', borderRadius:8, textDecoration:'none', fontWeight:700, fontSize:13 }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,.1)', padding:'16px 24px', textAlign:'center', fontSize:12, color:'rgba(255,255,255,.4)' }}>
        © {new Date().getFullYear()} Kuruwita Opticals by Wickramakalutota. All rights reserved.
      </div>
    </footer>
  );
}
