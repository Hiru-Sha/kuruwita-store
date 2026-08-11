/* eslint-disable */
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'https://kuruwita-optical-production.up.railway.app/api';
const C   = { navy:'#0f1f3d', gold:'#c9a84c', cream:'#f8f5ef', border:'#e0ddd6', danger:'#dc2626' };
const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');
const INP = { padding:'11px 14px', border:`1.5px solid #e0ddd6`, borderRadius:10, fontSize:14, fontFamily:'inherit', outline:'none', background:'white', color:'#0f1f3d', width:'100%', boxSizing:'border-box' };

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', phone:'', email:'', address:'', delivery:'pickup', payment:'cod', notes:'' });
  const [placing, setPlacing] = useState(false);
  const [error, setError]   = useState('');
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const deliveryFee = form.delivery === 'delivery' && total < 5000 ? 350 : 0;
  const grandTotal  = total + deliveryFee;

  const placeOrder = async () => {
    if (!form.name.trim()) return setError('Please enter your name');
    if (!form.phone.trim()) return setError('Please enter your phone number');
    if (!cart.length) return setError('Cart is empty');
    setError(''); setPlacing(true);
    try {
      const res = await fetch(`${API}/store/orders`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          customer_name:    form.name,
          customer_phone:   form.phone,
          customer_email:   form.email || null,
          customer_address: form.address || null,
          items: cart.map(i=>({ id:i.id, name:i.name, qty:i.qty, price:i.price, category:i.category })),
          total_amount:   grandTotal,
          payment_method: form.payment,
          delivery_type:  form.delivery,
          notes: form.notes || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      clearCart();
      navigate(`/success?order=${data.order_number}&wa=${encodeURIComponent(data.wa_notify||'')}`, { state:{ order: data } });
    } catch(e) { setError(e.message); }
    finally { setPlacing(false); }
  };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", maxWidth:900, margin:'0 auto', padding:'32px 24px' }}>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, color:C.navy, marginBottom:28 }}>Checkout</h1>
      {error && <div style={{ background:'#fef2f2', border:'1px solid #fca5a5', borderRadius:10, padding:'12px 16px', color:C.danger, fontSize:14, marginBottom:20 }}>⚠️ {error}</div>}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:24, alignItems:'start' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Contact */}
          <div style={{ background:'white', borderRadius:16, border:`1px solid ${C.border}`, padding:'22px' }}>
            <div style={{ fontWeight:700, color:C.navy, marginBottom:16, fontSize:15 }}>👤 Contact Information</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div><label style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', display:'block', marginBottom:5 }}>Full Name *</label>
                <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your name" style={INP}/></div>
              <div><label style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', display:'block', marginBottom:5 }}>Phone *</label>
                <input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="07X XXX XXXX" type="tel" style={INP}/></div>
              <div style={{ gridColumn:'1/-1' }}><label style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', display:'block', marginBottom:5 }}>Email (optional)</label>
                <input value={form.email} onChange={e=>set('email',e.target.value)} placeholder="email@example.com" type="email" style={INP}/></div>
            </div>
          </div>

          {/* Delivery */}
          <div style={{ background:'white', borderRadius:16, border:`1px solid ${C.border}`, padding:'22px' }}>
            <div style={{ fontWeight:700, color:C.navy, marginBottom:16, fontSize:15 }}>🚚 Delivery Method</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
              {[['pickup','🏪 Pickup from Shop','Free'],['delivery','🚚 Home Delivery','Rs. 350 (free over Rs.5,000)']].map(([v,l,sub])=>(
                <button key={v} onClick={()=>set('delivery',v)}
                  style={{ padding:'14px 16px', border:`2px solid ${form.delivery===v?C.navy:C.border}`,
                    borderRadius:12, background:form.delivery===v?C.navy:'white', cursor:'pointer', fontFamily:'inherit', textAlign:'left',
                    color:form.delivery===v?'white':'#0f1f3d', transition:'all .15s' }}>
                  <div style={{ fontWeight:700, fontSize:14 }}>{l}</div>
                  <div style={{ fontSize:11, opacity:.7, marginTop:3 }}>{sub}</div>
                </button>
              ))}
            </div>
            {form.delivery === 'delivery' && (
              <textarea value={form.address} onChange={e=>set('address',e.target.value)}
                placeholder="Enter your delivery address..." rows={3}
                style={{ ...INP, resize:'vertical', lineHeight:1.6 }}/>
            )}
            {form.delivery === 'pickup' && (
              <div style={{ background:C.cream, borderRadius:10, padding:'12px 14px', fontSize:13, color:'#6b7280' }}>
                📍 No.57 Kurunegala Road, Chilaw · Open Mon–Sat, 8:30am–6:30pm
              </div>
            )}
          </div>

          {/* Payment */}
          <div style={{ background:'white', borderRadius:16, border:`1px solid ${C.border}`, padding:'22px' }}>
            <div style={{ fontWeight:700, color:C.navy, marginBottom:16, fontSize:15 }}>💳 Payment Method</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[['cod','💵 Cash on Pickup / Delivery','Pay when you receive'],['bank','🏦 Bank Transfer','Pay to our bank account'],['card','💳 Card Payment','Online card payment (PayHere)']].map(([v,l,sub])=>(
                <button key={v} onClick={()=>set('payment',v)}
                  style={{ padding:'14px 16px', border:`2px solid ${form.payment===v?C.gold:C.border}`,
                    borderRadius:12, background:form.payment===v?'#fef9f0':'white', cursor:'pointer', fontFamily:'inherit', textAlign:'left', transition:'all .15s' }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{l}</div>
                  <div style={{ fontSize:12, color:'#6b7280', marginTop:2 }}>{sub}</div>
                </button>
              ))}
            </div>
            {form.payment === 'bank' && (
              <div style={{ background:C.cream, borderRadius:10, padding:'14px', marginTop:14, fontSize:13, lineHeight:2 }}>
                <div style={{ fontWeight:700, color:C.navy, marginBottom:4 }}>Bank Transfer Details</div>
                <div>Bank: <b>Pan Asia Bank</b></div>
                <div>Account Name: <b>Wickramakalutota Opticals</b></div>
                <div>Branch: <b>Chilaw</b></div>
                <div style={{ fontSize:11, color:'#6b7280', marginTop:6 }}>Send receipt to WhatsApp after transfer</div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div style={{ background:'white', borderRadius:16, border:`1px solid ${C.border}`, padding:'22px' }}>
            <div style={{ fontWeight:700, color:C.navy, marginBottom:12, fontSize:15 }}>📝 Notes (optional)</div>
            <textarea value={form.notes} onChange={e=>set('notes',e.target.value)}
              placeholder="Any special requests or instructions..." rows={3}
              style={{ ...INP, resize:'vertical', lineHeight:1.6 }}/>
          </div>
        </div>

        {/* Order summary */}
        <div style={{ position:'sticky', top:80 }}>
          <div style={{ background:'white', borderRadius:16, border:`1px solid ${C.border}`, padding:'22px' }}>
            <div style={{ fontWeight:700, color:C.navy, marginBottom:16, fontSize:15 }}>🛒 Order Summary</div>
            {cart.map(i=>(
              <div key={i.id} style={{ display:'flex', gap:10, alignItems:'center', marginBottom:10 }}>
                <div style={{ width:40, height:40, borderRadius:8, background:C.cream, flexShrink:0, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {i.image_url ? <img src={i.image_url} alt="" style={{ width:'100%', height:'100%', objectFit:'contain' }}/> : '🕶️'}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.navy, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{i.name}</div>
                  <div style={{ fontSize:11, color:'#6b7280' }}>×{i.qty}</div>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:C.navy, flexShrink:0 }}>{fmt(parseFloat(i.price)*i.qty)}</div>
              </div>
            ))}
            <div style={{ borderTop:`1px solid ${C.border}`, marginTop:14, paddingTop:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#6b7280', marginBottom:6 }}>
                <span>Subtotal</span><span>{fmt(total)}</span>
              </div>
              {deliveryFee > 0 && (
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#6b7280', marginBottom:6 }}>
                  <span>Delivery</span><span>{fmt(deliveryFee)}</span>
                </div>
              )}
              <div style={{ display:'flex', justifyContent:'space-between', fontWeight:700, color:C.navy, fontSize:16, marginTop:8 }}>
                <span>Total</span>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20 }}>{fmt(grandTotal)}</span>
              </div>
            </div>
            <button onClick={placeOrder} disabled={placing || !cart.length}
              style={{ width:'100%', marginTop:20, padding:'14px', background:placing?'#6b7280':C.gold, color:C.navy,
                border:'none', borderRadius:12, fontSize:15, fontWeight:700, cursor:placing?'not-allowed':'pointer',
                fontFamily:'inherit', boxShadow:'0 4px 16px rgba(201,168,76,.3)', transition:'all .2s' }}>
              {placing ? '⏳ Placing Order...' : '✅ Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
