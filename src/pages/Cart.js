/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const C   = { navy:'#0f1f3d', gold:'#c9a84c', cream:'#f8f5ef', border:'#e0ddd6', danger:'#dc2626' };
const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');

export default function Cart() {
  const { cart, updateQty, removeFromCart, total, count } = useCart();

  if (!cart.length) return (
    <div style={{ textAlign:'center', padding:'80px 24px', fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ fontSize:72, marginBottom:16 }}>🛒</div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:C.navy, marginBottom:10 }}>Your cart is empty</h2>
      <p style={{ color:'#6b7280', marginBottom:24 }}>Add some eyewear to get started!</p>
      <Link to="/products" style={{ padding:'12px 28px', background:C.gold, color:C.navy, borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:15 }}>
        Shop Now →
      </Link>
    </div>
  );

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", maxWidth:1000, margin:'0 auto', padding:'32px 24px' }}>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, color:C.navy, marginBottom:6 }}>Your Cart</h1>
      <p style={{ color:'#6b7280', marginBottom:28 }}>{count} item{count !== 1 ? 's' : ''}</p>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:24, alignItems:'start' }}>
        {/* Items */}
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {cart.map(item => (
            <div key={item.id} style={{ background:'white', borderRadius:16, border:`1px solid ${C.border}`, padding:'16px', display:'flex', gap:16, alignItems:'center' }}>
              {/* Image */}
              <div style={{ width:80, height:80, borderRadius:12, background:C.cream, flexShrink:0, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {item.image_url
                  ? <img src={item.image_url} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'contain', padding:4 }}/>
                  : <span style={{ fontSize:32 }}>🕶️</span>
                }
              </div>
              {/* Info */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:15, fontWeight:700, color:C.navy, marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.name}</div>
                <div style={{ fontSize:12, color:'#6b7280', marginBottom:10 }}>{item.category}{item.frame_color ? ` · ${item.frame_color}` : ''}</div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ display:'flex', alignItems:'center', border:`1px solid ${C.border}`, borderRadius:8, overflow:'hidden' }}>
                    <button onClick={()=>updateQty(item.id, item.qty - 1)}
                      style={{ width:32, height:32, background:'white', border:'none', cursor:'pointer', fontSize:16, color:C.navy }}>−</button>
                    <span style={{ width:36, textAlign:'center', fontSize:14, fontWeight:700, color:C.navy }}>{item.qty}</span>
                    <button onClick={()=>updateQty(item.id, item.qty + 1)}
                      style={{ width:32, height:32, background:'white', border:'none', cursor:'pointer', fontSize:16, color:C.navy }}>+</button>
                  </div>
                  <button onClick={()=>removeFromCart(item.id)}
                    style={{ background:'none', border:'none', color:C.danger, cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'inherit' }}>Remove</button>
                </div>
              </div>
              {/* Price */}
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:C.navy }}>{fmt(parseFloat(item.price) * item.qty)}</div>
                <div style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{fmt(item.price)} each</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background:'white', borderRadius:16, border:`1px solid ${C.border}`, padding:'24px', position:'sticky', top:80 }}>
          <div style={{ fontWeight:700, fontSize:16, color:C.navy, marginBottom:20 }}>Order Summary</div>
          {cart.map(item => (
            <div key={item.id} style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#6b7280', marginBottom:8 }}>
              <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1, marginRight:8 }}>{item.name} ×{item.qty}</span>
              <span style={{ flexShrink:0 }}>{fmt(parseFloat(item.price) * item.qty)}</span>
            </div>
          ))}
          <div style={{ borderTop:`1px solid ${C.border}`, marginTop:16, paddingTop:16, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
            <span style={{ fontWeight:700, color:C.navy }}>Total</span>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:C.navy }}>{fmt(total)}</span>
          </div>
          <div style={{ fontSize:12, color:'#6b7280', marginBottom:20 }}>Free delivery on orders over Rs. 5,000</div>
          <Link to="/checkout" style={{ display:'block', padding:'14px', background:C.gold, color:C.navy, borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:15, textAlign:'center', marginBottom:10 }}>
            Proceed to Checkout →
          </Link>
          <a href={`https://wa.me/94322221211?text=${encodeURIComponent('Hello! I want to order:\n\n' + cart.map(i=>`• ${i.name} ×${i.qty} — Rs.${(parseFloat(i.price)*i.qty).toLocaleString()}`).join('\n') + `\n\nTotal: Rs.${total.toLocaleString()}`)}`}
            target="_blank" rel="noreferrer"
            style={{ display:'block', padding:'12px', background:'#25D366', color:'white', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14, textAlign:'center' }}>
            💬 Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
