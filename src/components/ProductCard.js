import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const C = { navy:'#0f1f3d', gold:'#c9a84c', cream:'#f8f5ef', border:'#e0ddd6', success:'#16a34a' };
const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = cart.find(i => i.id === product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration:'none' }}>
      <div style={{
        background:'white', borderRadius:16, overflow:'hidden',
        border:`1.5px solid ${C.border}`, transition:'all .25s',
        cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,.12)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>

        {/* Image */}
        <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden', background:C.cream }}>
          {product.image_url
            ? <img src={product.image_url} alt={product.name}
                style={{ width:'100%', height:'100%', objectFit:'contain', padding:8 }}/>
            : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:48 }}>
                {product.category === 'Sunglasses' ? '😎' : product.category === 'Reading Glasses' ? '👓' : '🕶️'}
              </div>
          }
          {/* Category badge */}
          <div style={{ position:'absolute', top:10, left:10, background:C.navy, color:C.gold,
            padding:'3px 10px', borderRadius:20, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'1px' }}>
            {product.category}
          </div>
          {/* Low stock */}
          {product.stock <= 2 && (
            <div style={{ position:'absolute', top:10, right:10, background:'#dc2626', color:'white',
              padding:'3px 10px', borderRadius:20, fontSize:10, fontWeight:700 }}>
              Only {product.stock} left!
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding:'14px 16px 16px' }}>
          <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:3,
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {product.name}
          </div>
          <div style={{ fontSize:12, color:'#6b7280', marginBottom:10 }}>
            {[product.brand, product.frame_color, product.frame_material].filter(Boolean).join(' · ')}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:C.navy }}>
              {fmt(product.price)}
            </div>
            <button onClick={handleAdd}
              style={{
                padding:'8px 14px', border:'none', borderRadius:9, fontSize:12, fontWeight:700,
                cursor:'pointer', fontFamily:'inherit', transition:'all .2s',
                background: added ? C.success : inCart ? '#eff6ff' : C.gold,
                color: added ? 'white' : inCart ? '#1e40af' : C.navy,
              }}>
              {added ? '✓ Added!' : inCart ? '✓ In Cart' : '+ Add'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
