/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
export default function About() {
  return (
    <div style={{ fontFamily:"'Jost',sans-serif", background:'#0a0a0a', color:'#f0ebe3', paddingTop:72 }}>
      <div style={{ background:'linear-gradient(135deg,#070707,#0f1a2e)', padding:'100px 32px', textAlign:'center', borderBottom:'1px solid rgba(201,168,76,.08)' }}>
        <div style={{ fontSize:10, letterSpacing:'4px', textTransform:'uppercase', color:'#c9a84c', marginBottom:16 }}>Our Story</div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,6vw,72px)', fontWeight:400, maxWidth:700, margin:'0 auto', lineHeight:1.1 }}>
          Seeing the World<br/><em style={{ color:'#c9a84c' }}>Differently</em>
        </h1>
      </div>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'80px 32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, marginBottom:80, alignItems:'center' }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:'4px', textTransform:'uppercase', color:'#c9a84c', marginBottom:20 }}>Who We Are</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:400, marginBottom:20, lineHeight:1.2 }}>Wickramakalutota Opticals</h2>
            <p style={{ fontSize:13, color:'rgba(240,235,227,.5)', lineHeight:1.9, fontWeight:300, marginBottom:16 }}>
              Rooted in Chilaw, we have been serving the community with premium eyewear and professional optical care. Our passion for quality and precision drives everything we do.
            </p>
            <p style={{ fontSize:13, color:'rgba(240,235,227,.5)', lineHeight:1.9, fontWeight:300 }}>
              Kuruwita Opticals brings our curated collection online — making fine eyewear accessible to everyone across Sri Lanka.
            </p>
          </div>
          <div style={{ border:'1px solid rgba(201,168,76,.12)', padding:48, textAlign:'center', background:'#0d0d0d', position:'relative' }}>
            <div style={{ position:'absolute', top:16, right:16, width:20, height:20, borderTop:'1px solid rgba(201,168,76,.3)', borderRight:'1px solid rgba(201,168,76,.3)' }}/>
            <div style={{ position:'absolute', bottom:16, left:16, width:20, height:20, borderBottom:'1px solid rgba(201,168,76,.3)', borderLeft:'1px solid rgba(201,168,76,.3)' }}/>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:56, color:'rgba(201,168,76,.2)', marginBottom:16 }}>◉</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:'#f0ebe3', marginBottom:8 }}>Wickramakalutota Opticals</div>
            <div style={{ fontSize:11, color:'rgba(240,235,227,.3)', letterSpacing:'2px' }}>Chilaw, Sri Lanka</div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:2, marginBottom:80 }}>
          {[['◆','Location','No.57 Kurunegala Road\nChilaw, Sri Lanka'],['◇','Contact','Tel: 032 222 1211\nWhatsApp Available'],['◈','Hours','Monday – Saturday\n8:30 AM – 6:30 PM'],['◉','Our Promise','100% Authentic\nQuality Guaranteed']].map(([icon,title,desc])=>(
            <div key={title} style={{ padding:'36px 24px', background:'#0d0d0d', border:'1px solid rgba(255,255,255,.05)', textAlign:'center' }}>
              <div style={{ fontSize:24, color:'#c9a84c', marginBottom:16, fontWeight:300 }}>{icon}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:'#f0ebe3', marginBottom:12, fontWeight:400 }}>{title}</div>
              <div style={{ fontSize:12, color:'rgba(240,235,227,.35)', lineHeight:1.8, fontWeight:300, whiteSpace:'pre-line' }}>{desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', padding:'60px', background:'#0d0d0d', border:'1px solid rgba(201,168,76,.1)' }}>
          <div style={{ fontSize:9, letterSpacing:'4px', textTransform:'uppercase', color:'#c9a84c', marginBottom:16 }}>Ready to Find Your Perfect Pair?</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:400, marginBottom:32 }}>Explore Our Collection</h2>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/products" style={{ padding:'13px 40px', background:'#c9a84c', color:'#0a0a0a', textDecoration:'none', fontSize:11, fontWeight:600, letterSpacing:'3px', textTransform:'uppercase' }}>Shop Now</Link>
            <a href="https://wa.me/94322221211" target="_blank" rel="noreferrer" style={{ padding:'13px 40px', border:'1px solid rgba(37,211,102,.3)', color:'#25D366', textDecoration:'none', fontSize:11, letterSpacing:'3px', textTransform:'uppercase' }}>WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}
