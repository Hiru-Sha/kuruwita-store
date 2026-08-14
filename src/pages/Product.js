/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const API = process.env.REACT_APP_API_URL || 'https://kuruwita-optical-production.up.railway.app/api';
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
    setLoading(true); window.scrollTo(0, 0);
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

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', fontFamily: "'Jost',sans-serif", color: 'rgba(201,168,76,.4)', fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' }}>
      Loading...
    </div>
  );

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '100px 24px', fontFamily: "'Jost',sans-serif" }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, color: 'rgba(240,235,227,.2)', marginBottom: 12 }}>Product not found</div>
      <Link to="/products" style={{ fontSize: 11, color: '#c9a84c', letterSpacing: '3px', textTransform: 'uppercase', textDecoration: 'none' }}>← Return to Collection</Link>
    </div>
  );

  const waMsg = encodeURIComponent(`Hello! I'm interested in *${product.name}*\nPrice: ${fmt(product.price)}\n\nIs this still available?`);
  const specs = [
    product.brand          && ['Brand',    product.brand],
    product.frame_type     && ['Type',     product.frame_type],
    product.frame_material && ['Material', product.frame_material],
    product.frame_color    && ['Color',    product.frame_color],
    product.frame_shape    && ['Shape',    product.frame_shape],
    product.frame_size     && ['Size',     product.frame_size],
    product.category       && ['Category', product.category],
  ].filter(Boolean);

  return (
    <div style={{ fontFamily: "'Jost',sans-serif", background: '#0a0a0a', color: '#f0ebe3', paddingTop: 72, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(240,235,227,.3)', marginBottom: 48, display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/" style={{ color: 'rgba(240,235,227,.3)', textDecoration: 'none' }}>Home</Link>
          <span>◆</span>
          <Link to="/products" style={{ color: 'rgba(240,235,227,.3)', textDecoration: 'none' }}>Collection</Link>
          <span>◆</span>
          <span style={{ color: '#c9a84c' }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', marginBottom: 100 }}>

          {/* Image */}
          <div>
            <div style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,.06)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
              {product.image_url
                ? <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 40 }}/>
                : <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: 'rgba(201,168,76,.3)' }}>No Image</div>
              }
              {/* Corner accents */}
              {[['top:16px','left:16px','borderTop,borderLeft'],['top:16px','right:16px','borderTop,borderRight'],['bottom:16px','left:16px','borderBottom,borderLeft'],['bottom:16px','right:16px','borderBottom,borderRight']].map(([t, s, b], i) => (
                <div key={i} style={{ position: 'absolute', [t.split(':')[0]]: t.split(':')[1], [s.split(':')[0]]: s.split(':')[1], width: 24, height: 24, borderColor: 'rgba(201,168,76,.25)', borderStyle: 'solid', borderWidth: 0, ...Object.fromEntries(b.split(',').map(side => [`border${side.replace('border','')}Width`, '1px'])) }}/>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: '3.5px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 16 }}>{product.category}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, color: '#f0ebe3', marginBottom: 8, lineHeight: 1.2 }}>{product.name}</h1>
            {product.brand && <div style={{ fontSize: 12, color: 'rgba(240,235,227,.35)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 32, fontWeight: 300 }}>by {product.brand}</div>}

            {/* Price */}
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, color: '#c9a84c', fontWeight: 400, marginBottom: 8, letterSpacing: '1px' }}>{fmt(product.price)}</div>

            {/* Stock */}
            <div style={{ marginBottom: 36 }}>
              {product.stock > 5
                ? <span style={{ fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#4ade80' }}>◆ In Stock</span>
                : product.stock > 0
                  ? <span style={{ fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#f59e0b' }}>◆ Only {product.stock} remaining</span>
                  : <span style={{ fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#f87171' }}>◆ Out of Stock</span>
              }
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(201,168,76,.3), transparent)', marginBottom: 36 }}/>

            {/* Qty */}
            {product.stock > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(240,235,227,.4)', marginBottom: 12 }}>Quantity</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'fit-content', border: '1px solid rgba(201,168,76,.2)', marginBottom: 24 }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    style={{ width: 44, height: 44, background: 'transparent', border: 'none', color: '#c9a84c', fontSize: 18, cursor: 'pointer', borderRight: '1px solid rgba(201,168,76,.2)' }}>−</button>
                  <span style={{ width: 56, textAlign: 'center', fontSize: 14, color: '#f0ebe3', fontFamily: "'Cormorant Garamond',serif" }}>{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                    style={{ width: 44, height: 44, background: 'transparent', border: 'none', color: '#c9a84c', fontSize: 18, cursor: 'pointer', borderLeft: '1px solid rgba(201,168,76,.2)' }}>+</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button onClick={handleAdd}
                    style={{ padding: '15px 36px', background: added ? '#2d7a4f' : '#c9a84c', color: added ? 'white' : '#0a0a0a', border: 'none', fontSize: 11, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost',sans-serif", transition: 'all .25s' }}>
                    {added ? '✓ Added to Bag' : inCart ? '+ Add More' : 'Add to Bag'}
                  </button>
                  <Link to="/cart"
                    style={{ padding: '15px 36px', background: 'transparent', border: '1px solid rgba(201,168,76,.3)', color: '#c9a84c', fontSize: 11, fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center', transition: 'all .25s' }}>
                    View Bag →
                  </Link>
                </div>
              </div>
            )}

            {/* WhatsApp */}
            <a href={`https://wa.me/94322221211?text=${waMsg}`} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px', background: 'rgba(37,211,102,.08)', border: '1px solid rgba(37,211,102,.2)', color: '#25D366', textDecoration: 'none', fontSize: 11, fontWeight: 400, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 36, transition: 'all .25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,.08)'; }}>
              💬 Enquire on WhatsApp
            </a>

            {/* Specs */}
            {specs.length > 0 && (
              <div>
                <div style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 20 }}>Specifications</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px' }}>
                  {specs.map(([k, v]) => (
                    <div key={k} style={{ borderBottom: '1px solid rgba(255,255,255,.05)', paddingBottom: 12 }}>
                      <div style={{ fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(240,235,227,.3)', marginBottom: 4, fontWeight: 300 }}>{k}</div>
                      <div style={{ fontSize: 13, color: 'rgba(240,235,227,.7)', fontWeight: 300 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(201,168,76,.08)', paddingTop: 60 }}>
            <div style={{ fontSize: 9, letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 16 }}>You May Also Like</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, color: '#f0ebe3', fontWeight: 400, marginBottom: 36 }}>Related Pieces</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 2 }}>
              {related.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </div>
        )}
      </div>

      <style>{`@media(max-width:768px){.prod-grid{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </div>
  );
}