/* eslint-disable */
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
const C = { navy:'#0f1f3d', gold:'#c9a84c', success:'#16a34a' };
export default function Success() {
  const [params] = useSearchParams();
  const orderNum = params.get('order');
  const waNotify = params.get('wa');
  useEffect(() => {
    // Auto-open WhatsApp notification for shop owner
    if (waNotify) {
      setTimeout(() => { window.open(decodeURIComponent(waNotify), '_blank'); }, 1500);
    }
  }, []);
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", maxWidth:560, margin:'60px auto', padding:'0 24px', textAlign:'center' }}>
      <div style={{ background:'white', borderRadius:24, padding:'48px 36px', boxShadow:'0 8px 40px rgba(0,0,0,.08)' }}>
        <div style={{ width:80, height:80, borderRadius:'50%', background:'#dcfce7', display:'flex', alignItems:'center', justifyContent:'center', fontSize:40, margin:'0 auto 20px' }}>✅</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:C.navy, marginBottom:8 }}>Order Placed!</h1>
        <p style={{ color:'#6b7280', marginBottom:4 }}>Thank you for shopping with us.</p>
        {orderNum && (
          <div style={{ background:'#f8f5ef', borderRadius:12, padding:'14px', margin:'20px 0', fontSize:14 }}>
            <div style={{ color:'#6b7280', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', marginBottom:4 }}>Order Number</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:C.navy, fontWeight:700 }}>{orderNum}</div>
            <div style={{ fontSize:11, color:'#6b7280', marginTop:4 }}>Save this to track your order</div>
          </div>
        )}
        <p style={{ color:'#6b7280', fontSize:13, lineHeight:1.7, marginBottom:24 }}>
          Our team will contact you shortly to confirm your order. You can also reach us on WhatsApp.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <a href="https://wa.me/94322221211" target="_blank" rel="noreferrer"
            style={{ padding:'13px', background:'#25D366', color:'white', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14 }}>
            💬 Contact Us on WhatsApp
          </a>
          {orderNum && (
            <Link to={`/track/${orderNum}`}
              style={{ padding:'13px', background:'#eff6ff', color:'#1e40af', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14 }}>
              🔍 Track My Order
            </Link>
          )}
          <Link to="/products"
            style={{ padding:'13px', background:'#f3f4f6', color:'#374151', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14 }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
