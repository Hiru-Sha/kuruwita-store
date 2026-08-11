/* eslint-disable */
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');
export default function Success() {
  const [params] = useSearchParams();
  const orderNum = params.get('order');
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#0a0a0a', fontFamily:"'Jost',sans-serif", padding:32 }}>
      <div style={{ maxWidth:480, width:'100%', textAlign:'center' }}>
        <div style={{ width:64, height:64, border:'1px solid rgba(201,168,76,.4)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 32px', fontSize:24 }}>✓</div>
        <div style={{ fontSize:9, letterSpacing:'4px', textTransform:'uppercase', color:'#c9a84c', marginBottom:16 }}>Order Confirmed</div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:400, color:'#f0ebe3', marginBottom:16 }}>Thank You</h1>
        <p style={{ fontSize:13, color:'rgba(240,235,227,.4)', lineHeight:1.8, marginBottom:36, fontWeight:300 }}>
          Your order has been received. Our team will contact you shortly to confirm the details.
        </p>
        {orderNum && (
          <div style={{ background:'rgba(201,168,76,.06)', border:'1px solid rgba(201,168,76,.15)', padding:'20px 28px', marginBottom:36 }}>
            <div style={{ fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(240,235,227,.3)', marginBottom:10 }}>Order Reference</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:'#c9a84c', letterSpacing:'2px' }}>{orderNum}</div>
            <div style={{ fontSize:10, color:'rgba(240,235,227,.3)', marginTop:8, letterSpacing:'1.5px' }}>Save this number to track your order</div>
          </div>
        )}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <a href="https://wa.me/94322221211" target="_blank" rel="noreferrer"
            style={{ padding:'13px', background:'transparent', border:'1px solid rgba(37,211,102,.25)', color:'#25D366', textDecoration:'none', fontSize:11, letterSpacing:'2.5px', textTransform:'uppercase', transition:'all .25s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(37,211,102,.08)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            💬 Chat on WhatsApp
          </a>
          {orderNum && <Link to={`/track/${orderNum}`} style={{ padding:'13px', background:'transparent', border:'1px solid rgba(201,168,76,.2)', color:'rgba(240,235,227,.5)', textDecoration:'none', fontSize:11, letterSpacing:'2.5px', textTransform:'uppercase' }}>Track Order</Link>}
          <Link to="/products" style={{ padding:'13px', background:'#c9a84c', color:'#0a0a0a', textDecoration:'none', fontSize:11, fontWeight:600, letterSpacing:'2.5px', textTransform:'uppercase' }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
