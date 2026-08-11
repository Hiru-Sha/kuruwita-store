/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL || 'https://kuruwita-optical-production.up.railway.app/api';
const STATUS = { new:'Order Received', confirmed:'Confirmed', processing:'Processing', ready:'Ready for Pickup', shipped:'On the Way', delivered:'Delivered', cancelled:'Cancelled' };
export default function Track() {
  const { id } = useParams();
  const [orderNum, setOrderNum] = useState(id === 'search' ? '' : id);
  const [order,   setOrder]    = useState(null);
  const [loading, setLoading]  = useState(id !== 'search');
  const [error,   setError]    = useState('');
  useEffect(() => { if (id && id !== 'search') load(id); }, [id]);
  const load = async num => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API}/store/orders/${num}`);
      if (!res.ok) throw new Error();
      setOrder(await res.json());
    } catch { setError('Order not found. Check your order number.'); setOrder(null); }
    finally { setLoading(false); }
  };
  const INP = { padding:'12px 16px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', color:'#f0ebe3', fontSize:12, fontFamily:"'Jost',sans-serif", outline:'none', flex:1, letterSpacing:'.5px' };
  return (
    <div style={{ fontFamily:"'Jost',sans-serif", background:'#0a0a0a', color:'#f0ebe3', paddingTop:72, minHeight:'100vh' }}>
      <div style={{ maxWidth:560, margin:'0 auto', padding:'60px 32px' }}>
        <div style={{ fontSize:9, letterSpacing:'4px', textTransform:'uppercase', color:'#c9a84c', marginBottom:12 }}>Order Lookup</div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:400, marginBottom:36 }}>Track Your Order</h1>
        <div style={{ display:'flex', gap:0, marginBottom:20 }}>
          <input value={orderNum} onChange={e=>setOrderNum(e.target.value.toUpperCase())} placeholder="e.g. OL-20260811-001" style={INP}
            onKeyDown={e=>e.key==='Enter'&&load(orderNum)}
            onFocus={e=>e.target.style.borderColor='rgba(201,168,76,.4)'}
            onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.08)'}/>
          <button onClick={()=>load(orderNum)} style={{ padding:'12px 24px', background:'#c9a84c', color:'#0a0a0a', border:'none', fontSize:11, fontWeight:600, letterSpacing:'2.5px', textTransform:'uppercase', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>Track</button>
        </div>
        {loading && <div style={{ textAlign:'center', padding:'32px', color:'rgba(201,168,76,.4)', fontSize:10, letterSpacing:'3px', textTransform:'uppercase' }}>Loading...</div>}
        {error   && <div style={{ background:'rgba(248,113,113,.08)', border:'1px solid rgba(248,113,113,.2)', padding:'14px', color:'#f87171', fontSize:12, letterSpacing:'.5px' }}>⚠ {error}</div>}
        {order && (
          <div style={{ background:'#0d0d0d', border:'1px solid rgba(201,168,76,.12)', padding:28, marginTop:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
              <div>
                <div style={{ fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(240,235,227,.3)', marginBottom:8 }}>Order</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, color:'#c9a84c' }}>{order.order_number}</div>
              </div>
              <div style={{ fontSize:10, letterSpacing:'2px', color:'#4ade80', border:'1px solid rgba(74,222,128,.2)', padding:'6px 14px' }}>
                {STATUS[order.order_status] || order.order_status}
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
              {[['Customer',order.customer_name],['Payment',order.payment_method?.toUpperCase()],['Delivery',order.delivery_type],['Total',`Rs. ${parseFloat(order.total_amount).toLocaleString()}`]].map(([k,v])=>(
                <div key={k} style={{ borderBottom:'1px solid rgba(255,255,255,.05)', paddingBottom:12 }}>
                  <div style={{ fontSize:9, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(240,235,227,.3)', marginBottom:4 }}>{k}</div>
                  <div style={{ fontSize:13, color:'rgba(240,235,227,.7)', fontWeight:300 }}>{v}</div>
                </div>
              ))}
            </div>
            <a href="https://wa.me/94322221211" target="_blank" rel="noreferrer"
              style={{ display:'block', padding:'12px', border:'1px solid rgba(37,211,102,.2)', color:'#25D366', textDecoration:'none', fontSize:11, letterSpacing:'2.5px', textTransform:'uppercase', textAlign:'center' }}>
              💬 Contact Us on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
