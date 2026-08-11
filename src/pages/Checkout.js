/* eslint-disable */
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'https://kuruwita-optical-production.up.railway.app/api';
const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', phone:'', email:'', address:'', delivery:'pickup', payment:'cod', notes:'' });
  const [placing, setPlacing] = useState(false);
  const [error,   setError]   = useState('');
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const deliveryFee = form.delivery === 'delivery' && total < 5000 ? 350 : 0;
  const grandTotal  = total + deliveryFee;

  const INP = { padding:'12px 16px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', color:'#f0ebe3', fontSize:13, fontFamily:"'Jost',sans-serif", outline:'none', width:'100%', transition:'border .2s', letterSpacing:'.5px' };
  const focus = e => e.target.style.borderColor = 'rgba(201,168,76,.4)';
  const blur  = e => e.target.style.borderColor = 'rgba(255,255,255,.08)';

  const placeOrder = async () => {
    if (!form.name.trim())  return setError('Please enter your name');
    if (!form.phone.trim()) return setError('Please enter your phone number');
    if (!cart.length)       return setError('Your bag is empty');
    setError(''); setPlacing(true);
    try {
      const res = await fetch(`${API}/store/orders`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          customer_name:    form.name,
          customer_phone:   form.phone,
          customer_email:   form.email || null,
          customer_address: form.address || null,
          items: cart.map(i=>({ id:i.id, name:i.name, qty:i.qty, price:i.price, category:i.category })),
          total_amount: grandTotal, payment_method: form.payment,
          delivery_type: form.delivery, notes: form.notes || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      clearCart();
      navigate(`/success?order=${data.order_number}`, { state: { order: data } });
    } catch(e) { setError(e.message); }
    finally { setPlacing(false); }
  };

  const SectionTitle = ({ children }) => (
    <div style={{ fontSize:9, letterSpacing:'3.5px', textTransform:'uppercase', color:'#c9a84c', marginBottom:20 }}>{children}</div>
  );

  return (
    <div style={{ fontFamily:"'Jost',sans-serif", background:'#0a0a0a', color:'#f0ebe3', paddingTop:72, minHeight:'100vh' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 32px' }}>
        <div style={{ fontSize:9, letterSpacing:'4px', textTransform:'uppercase', color:'#c9a84c', marginBottom:12 }}>Final Step</div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,5vw,52px)', fontWeight:400, marginBottom:48 }}>Checkout</h1>

        {error && <div style={{ background:'rgba(248,113,113,.1)', border:'1px solid rgba(248,113,113,.25)', padding:'14px 20px', color:'#f87171', fontSize:13, marginBottom:24, letterSpacing:'.5px' }}>⚠ {error}</div>}

        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:48, alignItems:'start' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:32 }}>

            {/* Contact */}
            <div>
              <SectionTitle>Contact Information</SectionTitle>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><div style={{ fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(240,235,227,.3)', marginBottom:8 }}>Full Name *</div>
                  <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your full name" style={INP} onFocus={focus} onBlur={blur}/></div>
                <div><div style={{ fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(240,235,227,.3)', marginBottom:8 }}>Phone *</div>
                  <input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="07X XXX XXXX" type="tel" style={INP} onFocus={focus} onBlur={blur}/></div>
                <div style={{ gridColumn:'1/-1' }}><div style={{ fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(240,235,227,.3)', marginBottom:8 }}>Email (optional)</div>
                  <input value={form.email} onChange={e=>set('email',e.target.value)} placeholder="email@example.com" type="email" style={INP} onFocus={focus} onBlur={blur}/></div>
              </div>
            </div>

            {/* Delivery */}
            <div>
              <SectionTitle>Delivery Method</SectionTitle>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginBottom:16 }}>
                {[['pickup','Pickup from Store','Free · No.57 Kurunegala Rd, Chilaw'],['delivery','Home Delivery','Rs. 350 (free over Rs. 5,000)']].map(([v,l,sub])=>(
                  <button key={v} onClick={()=>set('delivery',v)}
                    style={{ padding:'20px', border:`1px solid ${form.delivery===v?'rgba(201,168,76,.4)':'rgba(255,255,255,.06)'}`,
                      background:form.delivery===v?'rgba(201,168,76,.08)':'#0d0d0d', cursor:'pointer', fontFamily:"'Jost',sans-serif", textAlign:'left', transition:'all .2s' }}>
                    <div style={{ fontSize:13, fontWeight:400, color:form.delivery===v?'#c9a84c':'rgba(240,235,227,.7)', marginBottom:6 }}>{l}</div>
                    <div style={{ fontSize:11, color:'rgba(240,235,227,.3)', fontWeight:300 }}>{sub}</div>
                  </button>
                ))}
              </div>
              {form.delivery === 'delivery' && (
                <textarea value={form.address} onChange={e=>set('address',e.target.value)}
                  placeholder="Delivery address..." rows={3}
                  style={{ ...INP, resize:'vertical', lineHeight:1.7 }} onFocus={focus} onBlur={blur}/>
              )}
            </div>

            {/* Payment */}
            <div>
              <SectionTitle>Payment Method</SectionTitle>
              <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                {[['cod','Cash on Pickup / Delivery','Pay when you receive your order'],['bank','Bank Transfer','Transfer to our account and send receipt via WhatsApp'],['card','Card Payment','Secure online payment (PayHere)']].map(([v,l,sub])=>(
                  <button key={v} onClick={()=>set('payment',v)}
                    style={{ padding:'18px 20px', border:`1px solid ${form.payment===v?'rgba(201,168,76,.4)':'rgba(255,255,255,.06)'}`,
                      background:form.payment===v?'rgba(201,168,76,.08)':'#0d0d0d', cursor:'pointer', fontFamily:"'Jost',sans-serif", textAlign:'left', transition:'all .2s' }}>
                    <div style={{ fontSize:13, color:form.payment===v?'#c9a84c':'rgba(240,235,227,.7)', marginBottom:4, fontWeight:400 }}>{l}</div>
                    <div style={{ fontSize:11, color:'rgba(240,235,227,.3)', fontWeight:300 }}>{sub}</div>
                  </button>
                ))}
              </div>
              {form.payment === 'bank' && (
                <div style={{ marginTop:12, padding:'20px', background:'rgba(201,168,76,.05)', border:'1px solid rgba(201,168,76,.15)', fontSize:12, lineHeight:2, color:'rgba(240,235,227,.5)', fontWeight:300 }}>
                  <div style={{ color:'#c9a84c', fontSize:10, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:10 }}>Bank Details</div>
                  Bank: Pan Asia Bank · Branch: Chilaw<br/>
                  Account: Wickramakalutota Opticals<br/>
                  <span style={{ fontSize:10, color:'rgba(240,235,227,.3)' }}>Send transfer receipt to WhatsApp after payment</span>
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <SectionTitle>Special Instructions</SectionTitle>
              <textarea value={form.notes} onChange={e=>set('notes',e.target.value)}
                placeholder="Any special requests..." rows={3}
                style={{ ...INP, resize:'vertical', lineHeight:1.7 }} onFocus={focus} onBlur={blur}/>
            </div>
          </div>

          {/* Summary */}
          <div style={{ position:'sticky', top:90, background:'#0d0d0d', border:'1px solid rgba(201,168,76,.12)', padding:28 }}>
            <div style={{ fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'#c9a84c', marginBottom:20 }}>Your Order</div>
            {cart.map(i=>(
              <div key={i.id} style={{ display:'flex', gap:12, marginBottom:14, alignItems:'center' }}>
                <div style={{ width:40, height:40, background:'#111', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, overflow:'hidden' }}>
                  {i.image_url ? <img src={i.image_url} alt="" style={{ width:'100%', height:'100%', objectFit:'contain' }}/> : '◆'}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, color:'rgba(240,235,227,.7)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontWeight:300 }}>{i.name}</div>
                  <div style={{ fontSize:10, color:'rgba(240,235,227,.3)' }}>×{i.qty}</div>
                </div>
                <div style={{ fontSize:12, color:'#c9a84c', flexShrink:0 }}>{fmt(parseFloat(i.price)*i.qty)}</div>
              </div>
            ))}
            <div style={{ height:1, background:'rgba(201,168,76,.12)', margin:'20px 0' }}/>
            {deliveryFee > 0 && (
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'rgba(240,235,227,.4)', marginBottom:8 }}>
                <span>Delivery</span><span>{fmt(deliveryFee)}</span>
              </div>
            )}
            {deliveryFee === 0 && form.delivery === 'delivery' && (
              <div style={{ fontSize:10, color:'#4ade80', letterSpacing:'1.5px', textAlign:'center', marginBottom:12 }}>◆ Free Delivery Applied</div>
            )}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:24 }}>
              <span style={{ fontSize:10, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(240,235,227,.4)' }}>Total</span>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, color:'#c9a84c' }}>{fmt(grandTotal)}</span>
            </div>
            <button onClick={placeOrder} disabled={placing || !cart.length}
              style={{ width:'100%', padding:'14px', background:placing?'rgba(201,168,76,.3)':'#c9a84c', color:'#0a0a0a', border:'none', fontSize:11, fontWeight:600, letterSpacing:'3.5px', textTransform:'uppercase', cursor:placing?'not-allowed':'pointer', fontFamily:"'Jost',sans-serif", transition:'all .2s' }}>
              {placing ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
