/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
const C = { navy:'#0f1f3d', gold:'#c9a84c', cream:'#f8f5ef' };
export default function About() {
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ background:`linear-gradient(135deg,${C.navy},#1a3a5c)`, padding:'60px 24px', textAlign:'center' }}>
        <div style={{ fontSize:11, color:C.gold, letterSpacing:'2px', textTransform:'uppercase', marginBottom:12, fontWeight:700 }}>Our Story</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:40, color:'white', marginBottom:12 }}>About Kuruwita Opticals</h1>
        <p style={{ color:'rgba(255,255,255,.7)', fontSize:16, maxWidth:560, margin:'0 auto' }}>by Wickramakalutota Opticals, Chilaw</p>
      </div>
      <div style={{ maxWidth:900, margin:'60px auto', padding:'0 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, marginBottom:60, alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:C.navy, marginBottom:16 }}>Trusted Optical Care in Chilaw</h2>
            <p style={{ color:'#4b5563', lineHeight:1.8, marginBottom:14 }}>Wickramakalutota Opticals has been serving the Chilaw community with premium eyewear and professional optical care. We carry a wide selection of sunglasses, prescription frames, reading glasses, and blue-cut lenses.</p>
            <p style={{ color:'#4b5563', lineHeight:1.8 }}>Our online store — Kuruwita Opticals — brings our full collection to your fingertips with convenient home delivery or shop pickup.</p>
          </div>
          <div style={{ background:C.cream, borderRadius:20, padding:'36px', textAlign:'center' }}>
            <div style={{ fontSize:64, marginBottom:16 }}>👁️</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:C.navy, marginBottom:6 }}>Wickramakalutota Opticals</div>
            <div style={{ color:'#6b7280', fontSize:14 }}>No.57 Kurunegala Road, Chilaw</div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:20, marginBottom:60 }}>
          {[['📍','Location','No.57 Kurunegala Road, Chilaw'],['📞','Phone','032 222 1211'],['⏰','Hours','Mon–Sat: 8:30am – 6:30pm'],['💬','WhatsApp','Available for orders & queries']].map(([e,t,v])=>(
            <div key={t} style={{ background:'white', borderRadius:16, border:`1px solid #e0ddd6`, padding:'24px', textAlign:'center' }}>
              <div style={{ fontSize:36, marginBottom:10 }}>{e}</div>
              <div style={{ fontWeight:700, color:C.navy, marginBottom:6 }}>{t}</div>
              <div style={{ fontSize:13, color:'#6b7280' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background:C.navy, borderRadius:20, padding:'40px', textAlign:'center' }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:26, marginBottom:12 }}>Start Shopping</h2>
          <p style={{ color:'rgba(255,255,255,.7)', marginBottom:24 }}>Browse our full collection of eyewear online</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/products" style={{ padding:'12px 28px', background:C.gold, color:C.navy, borderRadius:12, textDecoration:'none', fontWeight:700 }}>Shop Now →</Link>
            <a href="https://wa.me/94322221211" target="_blank" rel="noreferrer" style={{ padding:'12px 28px', background:'#25D366', color:'white', borderRadius:12, textDecoration:'none', fontWeight:700 }}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}
