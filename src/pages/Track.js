/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL || 'https://kuruwita-optical-production.up.railway.app/api';
const C   = { navy:'#0f1f3d', gold:'#c9a84c', cream:'#f8f5ef' };
const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');
const STATUS = { new:'📦 Order Received', confirmed:'✅ Confirmed', processing:'🔄 Processing', ready:'🎉 Ready for Pickup', shipped:'🚚 On the Way', delivered:'✓ Delivered', cancelled:'❌ Cancelled' };
export default function Track() {
  const { id }  = useParams();
  const navigate = useNavigate();
  const [orderNum, setOrderNum] = useState(id === 'search' ? '' : id);
  const [order,   setOrder]    = useState(null);
  const [loading, setLoading]  = useState(id !== 'search');
  const [error,   setError]    = useState('');
  useEffect(() => { if (id && id !== 'search') load(id); }, [id]);
  const load = async (num) => {
    setLoading(true); setError('');
    try {
      const res  = await fetch(`${API}/store/orders/${num}`);
      const data = await res.json();
      if (!res.ok) throw new Error('Order not found');
      setOrder(data);
    } catch(e) { setError('Order not found. Check your order number and try again.'); setOrder(null); }
    finally { setLoading(false); }
  };
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", maxWidth:560, margin:'48px auto', padding:'0 24px' }}>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:C.navy, marginBottom:24 }}>Track Your Order</h1>
      <div style={{ background:'white', borderRadius:16, border:`1px solid #e0ddd6`, padding:'22px', marginBottom:16 }}>
        <div style={{ display:'flex', gap:10 }}>
          <input value={orderNum} onChange={e=>setOrderNum(e.target.value.toUpperCase())} placeholder="e.g. OL-20260811-001"
            style={{ flex:1, padding:'11px 14px', border:'1.5px solid #e0ddd6', borderRadius:10, fontSize:14, fontFamily:'inherit', outline:'none' }}
            onKeyDown={e=>e.key==='Enter'&&load(orderNum)}/>
          <button onClick={()=>load(orderNum)} style={{ padding:'11px 20px', background:C.navy, color:'white', border:'none', borderRadius:10, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
            Track
          </button>
        </div>
      </div>
      {loading && <div style={{ textAlign:'center', padding:'32px', color:'#6b7280' }}>⏳ Loading...</div>}
      {error   && <div style={{ background:'#fef2f2', borderRadius:12, padding:'14px', color:'#dc2626', fontSize:14 }}>⚠️ {error}</div>}
      {order   && (
        <div style={{ background:'white', borderRadius:16, border:`1px solid #e0ddd6`, padding:'24px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'1px' }}>Order Number</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:C.navy, fontWeight:700 }}>{order.order_number}</div>
            </div>
            <div style={{ background:C.cream, padding:'8px 14px', borderRadius:20, fontSize:13, fontWeight:700, color:C.navy }}>
              {STATUS[order.order_status] || order.order_status}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
            {[['Customer',order.customer_name],['Phone',order.customer_phone],['Payment',order.payment_method?.toUpperCase()],['Delivery',order.delivery_type],['Payment Status',order.payment_status?.toUpperCase()],['Total',fmt(order.total_amount)]].map(([k,v])=>(
              <div key={k} style={{ background:C.cream, borderRadius:10, padding:'12px' }}>
                <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', color:'#6b7280', marginBottom:3 }}>{k}</div>
                <div style={{ fontSize:14, fontWeight:600, color:C.navy }}>{v}</div>
              </div>
            ))}
          </div>
          <a href="https://wa.me/94322221211" target="_blank" rel="noreferrer"
            style={{ display:'block', padding:'12px', background:'#25D366', color:'white', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14, textAlign:'center' }}>
            💬 Contact Us on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
