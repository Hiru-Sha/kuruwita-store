/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API  = process.env.REACT_APP_API_URL || 'https://kuruwita-optical-production.up.railway.app/api';
const CATS = ['All', 'Frames', 'Sunglasses', 'Reading Glasses', 'Contact Lenses', 'Accessories'];
const SORTS= [['name','Name A–Z'],['price_asc','Price: Low → High'],['price_desc','Price: High → Low'],['newest','Newest First']];

export default function Products() {
  const [params]   = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total,    setTotal]    = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState(params.get('search') || '');
  const [category, setCategory] = useState(params.get('category') || 'All');
  const [sort,     setSort]     = useState('name');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page,     setPage]     = useState(0);
  const [sideOpen, setSideOpen] = useState(false);
  const PER = 24;

  const load = useCallback(async (reset = false) => {
    setLoading(true);
    const off = reset ? 0 : page * PER;
    const q   = new URLSearchParams({ limit: PER, offset: off, sort });
    if (category !== 'All') q.set('category', category);
    if (search.trim())      q.set('search',   search.trim());
    if (minPrice)           q.set('min_price', minPrice);
    if (maxPrice)           q.set('max_price', maxPrice);
    try {
      const res  = await fetch(`${API}/store/products?${q}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      if (reset) setPage(0);
    } catch(e) { setProducts([]); }
    finally { setLoading(false); }
  }, [category, search, sort, minPrice, maxPrice, page]);

  useEffect(() => { load(true); }, [category, sort]);
  useEffect(() => { const t = setTimeout(() => load(true), 400); return () => clearTimeout(t); }, [search]);

  const INP = { padding: '10px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', color: '#f0ebe3', fontSize: 12, fontFamily: "'Jost',sans-serif", outline: 'none', width: '100%', letterSpacing: '.5px', transition: 'border .2s' };

  const Sidebar = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Search */}
      <div style={{ padding: '0 0 28px', borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: 28 }}>
        <div style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14 }}>Search</div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
          style={INP}
          onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,.4)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.08)'}/>
      </div>

      {/* Category */}
      <div style={{ paddingBottom: 28, borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: 28 }}>
        <div style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14 }}>Category</div>
        {CATS.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 14px', marginBottom: 2,
              background: category === c ? 'rgba(201,168,76,.1)' : 'transparent',
              border: `1px solid ${category === c ? 'rgba(201,168,76,.3)' : 'transparent'}`,
              color: category === c ? '#c9a84c' : 'rgba(240,235,227,.45)',
              fontSize: 12, fontWeight: category === c ? 500 : 300, cursor: 'pointer',
              fontFamily: "'Jost',sans-serif", letterSpacing: '1px', transition: 'all .2s' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Price */}
      <div style={{ paddingBottom: 28, borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: 28 }}>
        <div style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14 }}>Price Range</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min"
            style={{ ...INP, width: '50%' }}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,.4)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.08)'}/>
          <span style={{ color: 'rgba(240,235,227,.2)', fontSize: 12 }}>—</span>
          <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max"
            style={{ ...INP, width: '50%' }}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,.4)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.08)'}/>
        </div>
        <button onClick={() => load(true)}
          style={{ width: '100%', padding: '10px', background: '#c9a84c', color: '#0a0a0a', border: 'none', fontSize: 10, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost',sans-serif" }}>
          Apply Filter
        </button>
        {(minPrice || maxPrice) && (
          <button onClick={() => { setMinPrice(''); setMaxPrice(''); }}
            style={{ width: '100%', marginTop: 6, padding: '8px', background: 'transparent', color: 'rgba(240,235,227,.3)', border: '1px solid rgba(255,255,255,.06)', fontSize: 10, cursor: 'pointer', fontFamily: "'Jost',sans-serif", letterSpacing: '2px' }}>
            Clear
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <div style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14 }}>Sort By</div>
        {SORTS.map(([v, l]) => (
          <button key={v} onClick={() => setSort(v)}
            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 14px', marginBottom: 2,
              background: sort === v ? 'rgba(201,168,76,.1)' : 'transparent',
              border: `1px solid ${sort === v ? 'rgba(201,168,76,.3)' : 'transparent'}`,
              color: sort === v ? '#c9a84c' : 'rgba(240,235,227,.45)',
              fontSize: 12, fontWeight: sort === v ? 500 : 300, cursor: 'pointer',
              fontFamily: "'Jost',sans-serif", letterSpacing: '1px', transition: 'all .2s' }}>
            {l}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Jost',sans-serif", background: '#0a0a0a', color: '#f0ebe3', paddingTop: 72, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#070707', borderBottom: '1px solid rgba(201,168,76,.08)', padding: '48px 32px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 12 }}>Our Collection</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, color: '#f0ebe3', marginBottom: 8 }}>All Eyewear</h1>
        <div style={{ fontSize: 12, color: 'rgba(240,235,227,.3)', letterSpacing: '1px' }}>{total} pieces available</div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, alignItems: 'start' }}>
        {/* Sidebar desktop */}
        <div className="desk-sidebar">
          <Sidebar />
        </div>

        {/* Products */}
        <div>
          {/* Mobile filter toggle */}
          <button onClick={() => setSideOpen(s => !s)} className="mob-filter"
            style={{ display: 'none', marginBottom: 20, padding: '10px 20px', background: 'transparent', border: '1px solid rgba(201,168,76,.3)', color: '#c9a84c', fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost',sans-serif" }}>
            ⚙ Filters
          </button>
          {sideOpen && (
            <div style={{ marginBottom: 28, padding: 24, background: '#0f0f0f', border: '1px solid rgba(201,168,76,.1)' }} className="mob-filter">
              <Sidebar />
            </div>
          )}

          {loading
            ? <div style={{ textAlign: 'center', padding: '80px', color: 'rgba(201,168,76,.4)', fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' }}>
                Loading Collection...
              </div>
            : products.length === 0
              ? <div style={{ textAlign: 'center', padding: '80px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: 'rgba(240,235,227,.2)', marginBottom: 12 }}>No pieces found</div>
                  <div style={{ fontSize: 12, color: 'rgba(240,235,227,.2)', letterSpacing: '2px' }}>Try adjusting your filters</div>
                </div>
              : <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 2 }}>
                    {products.map(p => <ProductCard key={p.id} product={p}/>)}
                  </div>
                  {total > PER && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 48 }}>
                      {page > 0 && (
                        <button onClick={() => { setPage(p => p - 1); load(); }}
                          style={{ padding: '10px 28px', background: 'transparent', border: '1px solid rgba(201,168,76,.3)', color: '#c9a84c', cursor: 'pointer', fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                          ← Previous
                        </button>
                      )}
                      <span style={{ fontSize: 11, color: 'rgba(240,235,227,.3)', letterSpacing: '2px' }}>
                        {page + 1} / {Math.ceil(total / PER)}
                      </span>
                      {(page + 1) * PER < total && (
                        <button onClick={() => { setPage(p => p + 1); load(); }}
                          style={{ padding: '10px 28px', background: '#c9a84c', border: 'none', color: '#0a0a0a', cursor: 'pointer', fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                          Next →
                        </button>
                      )}
                    </div>
                  )}
                </>
          }
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.desk-sidebar{display:none}.mob-filter{display:block!important}}
      `}</style>
    </div>
  );
}