/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');

export default function Cart() {
  const { cart, updateQty, removeFromCart, total, count } = useCart();

  if (!cart.length) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'80vh', fontFamily:"'Jost',sans-serif", textAlign:'center', padding:32 }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, color:'rgba(201,168,76,.15)', marginBottom:24 }}>Your bag is empty</div>
      <div style={{ fontSize:11, color:'rgba(240,235,227,.3)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:36 }}>No items yet</div>
      <Link to="/products" style={{ padding:'13px 40px', background:'#c9a84c', color:'#0a0a0a', textDecoration:'none', fontSize:11, fontWeight:600, letterSpacing:'3px', textTransform:'uppercase' }}>
        Explore Collection
      </Link>
    </div>
  );

  return (
    <div style={{ fontFamily:"'Jost',sans-serif", background:'#0a0a0a', color:'#f0ebe3', paddingTop:72, minHeight:'100vh' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 32px' }}>
        <div style={{ fontSize:9, letterSpacing:'4px', textTransform:'uppercase', color:'#c9a84c', marginBottom:12 }}>Your Selection</div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,5vw,52px)', fontWeight:400, marginBottom:48 }}>Shopping Bag <span style={{ fontSize:'0.5em', color:'rgba(240,235,227,.3)', fontFamily:"'Jost',sans-serif", fontWeight:300 }}>({count})</span></h1>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:48, alignItems:'start' }}>
          {/* Items */}
          <div>
            {cart.map((item, i) => (
              <div key={item.id} style={{ display:'flex', gap:24, padding:'28px 0', borderBottom:'1px solid rgba(255,255,255,.05)', alignItems:'center' }}>
                {/* Image */}
                <div style={{ width:100, height:80, background:'#0f0f0f', border:'1px solid rgba(255,255,255,.05)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                  {item.image_url
                    ? <img src={item.image_url} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'contain', padding:8 }}/>
                    : <span style={{ color:'rgba(201,168,76,.2)', fontSize:24 }}>◆</span>
                  }
                </div>
                {/* Info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, color:'rgba(240,235,227,.85)', marginBottom:4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontWeight:300 }}>{item.name}</div>
                  <div style={{ fontSize:10, color:'rgba(240,235,227,.3)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:16, fontWeight:300 }}>
                    {item.category}{item.frame_color ? ` · ${item.frame_color}` : ''}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                    <div style={{ display:'flex', alignItems:'center', border:'1px solid rgba(255,255,255,.08)' }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)}
                        style={{ width:32, height:32, background:'transparent', border:'none', color:'#c9a84c', cursor:'pointer', fontSize:16 }}>−</button>
                      <span style={{ width:36, textAlign:'center', fontSize:13, color:'#f0ebe3', fontFamily:"'Cormorant Garamond',serif" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}
                        style={{ width:32, height:32, background:'transparent', border:'none', color:'#c9a84c', cursor:'pointer', fontSize:16 }}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}
                      style={{ background:'none', border:'none', color:'rgba(240,235,227,.25)', cursor:'pointer', fontSize:10, letterSpacing:'2px', textTransform:'uppercase', fontFamily:"'Jost',sans-serif", padding:0, transition:'color .2s' }}
                      onMouseEnter={e => e.target.style.color = '#f87171'}
                      onMouseLeave={e => e.target.style.color = 'rgba(240,235,227,.25)'}>
                      Remove
                    </button>
                  </div>
                </div>
                {/* Price */}
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#c9a84c', fontWeight:400 }}>{fmt(parseFloat(item.price) * item.qty)}</div>
                  <div style={{ fontSize:10, color:'rgba(240,235,227,.25)', marginTop:4, letterSpacing:'1px' }}>{fmt(item.price)} each</div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background:'#0d0d0d', border:'1px solid rgba(201,168,76,.12)', padding:32, position:'sticky', top:90 }}>
            <div style={{ fontSize:9, letterSpacing:'3.5px', textTransform:'uppercase', color:'#c9a84c', marginBottom:24 }}>Order Summary</div>
            {cart.map(i => (
              <div key={i.id} style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'rgba(240,235,227,.4)', marginBottom:10, gap:8 }}>
                <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>{i.name} ×{i.qty}</span>
                <span style={{ flexShrink:0 }}>{fmt(parseFloat(i.price)*i.qty)}</span>
              </div>
            ))}
            <div style={{ height:1, background:'rgba(201,168,76,.15)', margin:'20px 0' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:28 }}>
              <span style={{ fontSize:11, color:'rgba(240,235,227,.4)', letterSpacing:'2px', textTransform:'uppercase' }}>Total</span>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, color:'#c9a84c' }}>{fmt(total)}</span>
            </div>
            <Link to="/checkout" style={{ display:'block', padding:'14px', background:'#c9a84c', color:'#0a0a0a', textDecoration:'none', fontSize:11, fontWeight:600, letterSpacing:'3px', textTransform:'uppercase', textAlign:'center', marginBottom:10, transition:'all .25s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#dfc170'}
              onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}>
              Proceed to Checkout
            </Link>
            <a href={`https://wa.me/94322221211?text=${encodeURIComponent('Hello! I want to order:\n\n'+cart.map(i=>`• ${i.name} ×${i.qty} — Rs.${(parseFloat(i.price)*i.qty).toLocaleString()}`).join('\n')+`\n\nTotal: Rs.${total.toLocaleString()}`)}`}
              target="_blank" rel="noreferrer"
              style={{ display:'block', padding:'12px', background:'transparent', border:'1px solid rgba(37,211,102,.25)', color:'#25D366', textDecoration:'none', fontSize:11, fontWeight:400, letterSpacing:'2.5px', textTransform:'uppercase', textAlign:'center', transition:'all .25s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              💬 Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
