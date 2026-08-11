/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const API = process.env.REACT_APP_API_URL || 'https://kuruwita-optical-production.up.railway.app/api';
const C   = { navy:'#0f1f3d', gold:'#c9a84c', cream:'#f8f5ef', border:'#e0ddd6', success:'#16a34a' };
const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');

export default function Product() {
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty,     setQty]     = useState(1);
  const [added,   setAdded]   = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/store/products/${id}`)
      .then(r => r.json())
      .then(d => { setProduct(d.product); setRelated(d.related || []); })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const inCart = cart.find(i => i.id === parseInt(id));

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const waMsg = product ? encodeURIComponent(
    `Hello! I'm interested in:\n\n*${product.name}*\nPrice: ${fmt(product.price)}\n\nIs this available?`
  ) : '';

  if (loading) return (
    <div style={{ textAlign:'center', padding:'80px', fontFamily:"'DM Sans',sans-serif", color:'#6b7280' }}>
      ⏳ Loading product...
    </div>
  );

  if (!product) return (
    <div style={{ textAlign:'center', padding:'80px', fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ fontSize:48, marginBottom:12 }}>😕</div>
      <div style={{ fontSize:18, color:C.navy, fontWeight:600 }}>Product not found</div>
      <Link to="/products" style={{ color:C.gold, marginTop:12, display:'inline-block' }}>← Back to Shop</Link>
    </div>
  );

  const specs = [
    product.brand         && ['Brand',    product.brand],
    product.frame_type    && ['Type',     product.frame_type],
    product.frame_material&& ['Material', product.frame_material],
    product.frame_color   && ['Color',    product.frame_color],
    product.frame_shape   && ['Shape',    product.frame_shape],
    product.frame_size    && ['Size',     product.frame_size],
    product.category      && ['Category', product.category],
  ].filter(Boolean);

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", maxWidth:1200, margin:'0 auto', padding:'32px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize:13, color:'#6b7280', marginBottom:24 }}>
        <Link to="/" style={{ color:'#6b7280', textDecoration:'none' }}>Home</Link> /&nbsp;
        <Link to="/products" style={{ color:'#6b7280', textDecoration:'none' }}>Shop</Link> /&nbsp;
        <span style={{ color:C.navy, fontWeight:600 }}>{product.name}</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start', marginBottom:60 }}>
        {/* ── Image ── */}
        <div>
          <div style={{ background:C.cream, borderRadius:20, aspectRatio:'1', display:'flex',
            alignItems:'center', justifyContent:'center', overflow:'hidden', border:`1px solid ${C.border}` }}>
            {product.image_url
              ? <img src={product.image_url} alt={product.name}
                  style={{ width:'100%', height:'100%', objectFit:'contain', padding:24 }}/>
              : <div style={{ fontSize:96 }}>🕶️</div>
            }
          </div>
        </div>

        {/* ── Details ── */}
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:C.gold, letterSpacing:'2px', textTransform:'uppercase', marginBottom:8 }}>
            {product.category}
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, color:C.navy, marginBottom:8, lineHeight:1.2 }}>
            {product.name}
          </h1>
          {product.brand && (
            <div style={{ fontSize:14, color:'#6b7280', marginBottom:20 }}>by {product.brand}</div>
          )}

          {/* Price */}
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:36, color:C.navy, fontWeight:700, marginBottom:8 }}>
            {fmt(product.price)}
          </div>

          {/* Stock */}
          <div style={{ marginBottom:24 }}>
            {product.stock > 5
              ? <span style={{ background:'#dcfce7', color:'#15803d', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700 }}>✓ In Stock</span>
              : product.stock > 0
                ? <span style={{ background:'#fef9c3', color:'#854d0e', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700 }}>⚡ Only {product.stock} left!</span>
                : <span style={{ background:'#fee2e2', color:'#dc2626', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700 }}>Out of Stock</span>
            }
          </div>

          {/* Qty + Add to Cart */}
          {product.stock > 0 && (
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#6b7280', marginBottom:10, textTransform:'uppercase', letterSpacing:'1px' }}>Quantity</div>
              <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14 }}>
                <div style={{ display:'flex', alignItems:'center', gap:0, border:`1.5px solid ${C.border}`, borderRadius:10, overflow:'hidden' }}>
                  <button onClick={()=>setQty(q=>Math.max(1,q-1))}
                    style={{ width:40, height:44, background:'white', border:'none', fontSize:20, cursor:'pointer', color:C.navy }}>−</button>
                  <span style={{ width:44, textAlign:'center', fontSize:16, fontWeight:700, color:C.navy }}>{qty}</span>
                  <button onClick={()=>setQty(q=>Math.min(product.stock,q+1))}
                    style={{ width:40, height:44, background:'white', border:'none', fontSize:20, cursor:'pointer', color:C.navy }}>+</button>
                </div>
                <span style={{ fontSize:13, color:'#6b7280' }}>Max: {product.stock}</span>
              </div>

              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <button onClick={handleAdd}
                  style={{ flex:1, minWidth:160, padding:'14px 24px', background:added?C.success:C.gold,
                    color: added?'white':C.navy, border:'none', borderRadius:12,
                    fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'all .2s' }}>
                  {added ? '✓ Added to Cart!' : inCart ? '+ Add More' : '🛒 Add to Cart'}
                </button>
                <Link to="/cart" style={{ flex:1, minWidth:140, padding:'14px 24px', background:C.navy,
                  color:'white', borderRadius:12, textDecoration:'none',
                  fontSize:15, fontWeight:700, textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  Buy Now →
                </Link>
              </div>
            </div>
          )}

          {/* WhatsApp */}
          <a href={`https://wa.me/94322221211?text=${waMsg}`} target="_blank" rel="noreferrer"
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8,
              padding:'12px', background:'#25D366', color:'white', borderRadius:12,
              textDecoration:'none', fontWeight:700, fontSize:14, marginBottom:24 }}>
            💬 Ask on WhatsApp
          </a>

          {/* Specs */}
          {specs.length > 0 && (
            <div style={{ background:C.cream, borderRadius:14, padding:'20px' }}>
              <div style={{ fontWeight:700, color:C.navy, marginBottom:14, fontSize:14 }}>📋 Specifications</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                {specs.map(([k,v]) => (
                  <div key={k}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', color:'#6b7280', marginBottom:2 }}>{k}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:C.navy }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:C.navy, marginBottom:24 }}>You Might Also Like</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:18 }}>
            {related.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        </div>
      )}
    </div>
  );
}
