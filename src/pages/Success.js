/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');
const OWNER_WA = '94764163282'; // Owner WhatsApp number

export default function Success() {
  const [params]   = useSearchParams();
  const location   = useLocation();
  const orderNum   = params.get('order');
  const orderData  = location.state?.order;
  const [waOpened, setWaOpened] = useState(false);

  useEffect(() => {
    // Auto-send WhatsApp notification to owner after 1.5s
    if (orderData && !waOpened) {
      const timer = setTimeout(() => {
        const items = orderData.items || [];
        const itemsList = Array.isArray(items)
          ? items.map(i => `• ${i.name} ×${i.qty||1} — Rs.${((i.price||0)*(i.qty||1)).toLocaleString()}`).join('\n')
          : '';
        const msg = encodeURIComponent(
          `🛒 *New Online Order!*\n\n` +
          `📋 Order: *${orderData.order_number || orderNum}*\n` +
          `👤 Customer: ${orderData.customer_name || '—'}\n` +
          `📞 Phone: ${orderData.customer_phone || '—'}\n` +
          (orderData.customer_address ? `📍 Address: ${orderData.customer_address}\n` : '') +
          `\n🛍️ Items:\n${itemsList}\n` +
          `\n💰 Total: *Rs.${parseFloat(orderData.total_amount||0).toLocaleString()}*\n` +
          `💳 Payment: ${orderData.payment_method || 'COD'}\n` +
          `🚚 Delivery: ${orderData.delivery_type || 'Pickup'}` +
          (orderData.notes ? `\n📝 Notes: ${orderData.notes}` : '')
        );
        window.open(`https://wa.me/${OWNER_WA}?text=${msg}`, '_blank');
        setWaOpened(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [orderData]);

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#0a0a0a', fontFamily:"'Jost',sans-serif", padding:32 }}>
      <div style={{ maxWidth:500, width:'100%', textAlign:'center' }}>
        {/* Animated check */}
        <div style={{ width:72, height:72, border:'1px solid rgba(201,168,76,.4)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 32px', fontSize:28, animation:'pulse 2s ease infinite' }}>✓</div>
        <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,.3)}50%{box-shadow:0 0 0 12px rgba(201,168,76,0)}}`}</style>

        <div style={{ fontSize:9, letterSpacing:'4px', textTransform:'uppercase', color:'#c9a84c', marginBottom:16 }}>Order Confirmed</div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:400, color:'#f0ebe3', marginBottom:12 }}>Thank You</h1>
        <p style={{ fontSize:13, color:'rgba(240,235,227,.5)', lineHeight:1.8, marginBottom:32, fontWeight:300 }}>
          Your order has been received. We'll contact you on WhatsApp to confirm the details and arrange collection or delivery.
        </p>

        {/* Order number */}
        {orderNum && (
          <div style={{ background:'rgba(201,168,76,.06)', border:'1px solid rgba(201,168,76,.15)', padding:'20px 28px', marginBottom:16 }}>
            <div style={{ fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(240,235,227,.3)', marginBottom:10 }}>Your Order Reference</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, color:'#c9a84c', letterSpacing:'3px' }}>{orderNum}</div>
            <div style={{ fontSize:10, color:'rgba(240,235,227,.3)', marginTop:8, letterSpacing:'1.5px' }}>Save this number to track your order</div>
          </div>
        )}

        {/* WA notification status */}
        <div style={{ background:'rgba(37,211,102,.06)', border:'1px solid rgba(37,211,102,.15)', padding:'12px 20px', marginBottom:28, fontSize:12, color:'rgba(37,211,102,.8)', letterSpacing:'.5px' }}>
          {waOpened
            ? '✓ WhatsApp notification sent to our team'
            : '⏳ Sending WhatsApp notification to our team...'}
        </div>

        {/* Order summary if available */}
        {orderData?.items && Array.isArray(orderData.items) && orderData.items.length > 0 && (
          <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.06)', padding:'16px 20px', marginBottom:28, textAlign:'left' }}>
            <div style={{ fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(240,235,227,.3)', marginBottom:12 }}>Order Summary</div>
            {orderData.items.map((item,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'rgba(240,235,227,.6)', marginBottom:6 }}>
                <span>{item.name} <span style={{color:'rgba(240,235,227,.3)'}}>×{item.qty||1}</span></span>
                <span>Rs. {((item.price||0)*(item.qty||1)).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ borderTop:'1px solid rgba(255,255,255,.06)', marginTop:10, paddingTop:10, display:'flex', justifyContent:'space-between', fontSize:13, fontWeight:600, color:'#c9a84c' }}>
              <span>Total</span>
              <span>Rs. {parseFloat(orderData.total_amount||0).toLocaleString()}</span>
            </div>
          </div>
        )}

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {orderNum && (
            <Link to={`/track/${orderNum}`}
              style={{ padding:'13px', background:'transparent', border:'1px solid rgba(201,168,76,.3)', color:'#c9a84c', textDecoration:'none', fontSize:11, letterSpacing:'2.5px', textTransform:'uppercase' }}>
              📦 Track My Order
            </Link>
          )}
          <a href={`https://wa.me/${OWNER_WA}?text=${encodeURIComponent(`Hi! I just placed order ${orderNum||''}. Please confirm my order.`)}`}
            target="_blank" rel="noreferrer"
            style={{ padding:'13px', background:'transparent', border:'1px solid rgba(37,211,102,.25)', color:'#25D366', textDecoration:'none', fontSize:11, letterSpacing:'2.5px', textTransform:'uppercase' }}>
            💬 Confirm via WhatsApp
          </a>
          <Link to="/products"
            style={{ padding:'13px', background:'#c9a84c', color:'#0a0a0a', textDecoration:'none', fontSize:11, fontWeight:600, letterSpacing:'2.5px', textTransform:'uppercase' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}