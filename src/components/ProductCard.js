/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const fmt = n => 'Rs. ' + parseFloat(n||0).toLocaleString('en-LK');

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const [added,   setAdded]   = useState(false);
  const [hovered, setHovered] = useState(false);
  const inCart = cart.find(i => i.id === product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? '#111' : '#0d0d0d',
          border: `1px solid ${hovered ? 'rgba(201,168,76,.3)' : 'rgba(255,255,255,.06)'}`,
          transition: 'all .4s ease',
          cursor: 'pointer',
          overflow: 'hidden',
          fontFamily: "'Jost', sans-serif",
        }}>

        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#141414' }}>
          {product.image_url
            ? <img src={product.image_url} alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16,
                  transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform .6s ease' }}/>
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,.3)" strokeWidth="1">
                  <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
                </svg>
              </div>
          }
          {/* Category tag */}
          <div style={{ position: 'absolute', top: 14, left: 14, fontSize: 9, fontWeight: 500,
            letterSpacing: '2.5px', textTransform: 'uppercase', color: '#c9a84c',
            background: 'rgba(10,10,10,.85)', padding: '4px 10px', backdropFilter: 'blur(8px)' }}>
            {product.category}
          </div>
          {/* Low stock */}
          {product.stock > 0 && product.stock <= 3 && (
            <div style={{ position: 'absolute', top: 14, right: 14, fontSize: 9, fontWeight: 500,
              letterSpacing: '1.5px', color: '#f0ebe3', background: 'rgba(180,100,30,.85)',
              padding: '4px 10px', backdropFilter: 'blur(8px)' }}>
              Only {product.stock} left
            </div>
          )}
          {/* Quick add overlay */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 16px 16px',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform .35s ease',
            background: 'linear-gradient(transparent, rgba(0,0,0,.8))' }}>
            <button onClick={handleAdd}
              style={{ width: '100%', padding: '11px', background: added ? '#2d7a4f' : 'rgba(201,168,76,.95)',
                color: added ? 'white' : '#0a0a0a', border: 'none', fontSize: 11, fontWeight: 500,
                letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'pointer',
                fontFamily: "'Jost', sans-serif", transition: 'all .2s' }}>
              {added ? '✓ Added to Bag' : inCart ? '+ Add More' : 'Add to Bag'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '18px 20px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 400, color: 'rgba(240,235,227,.85)', marginBottom: 4,
            letterSpacing: '.5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.name}
          </div>
          {product.brand && (
            <div style={{ fontSize: 10, color: 'rgba(240,235,227,.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12, fontWeight: 300 }}>
              {product.brand}
              {product.frame_color && ` · ${product.frame_color}`}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: '#c9a84c', letterSpacing: '1px' }}>
              {fmt(product.price)}
            </div>
            <div style={{ fontSize: 10, color: hovered ? 'rgba(201,168,76,.7)' : 'rgba(240,235,227,.2)', letterSpacing: '2px', textTransform: 'uppercase', transition: 'color .3s' }}>
              View →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
