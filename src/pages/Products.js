/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API = process.env.REACT_APP_API_URL || 'https://kuruwita-optical-production.up.railway.app/api';
const C   = { navy:'#0f1f3d', gold:'#c9a84c', cream:'#f8f5ef', border:'#e0ddd6', muted:'#6b7280' };
const CATS = ['All','Frames','Sunglasses','Reading Glasses','Contact Lenses','Accessories'];
const SORTS = [['name','Name A-Z'],['price_asc','Price: Low to High'],['price_desc','Price: High to Low'],['newest','Newest First']];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts]   = useState([]);
  const [total,    setTotal]      = useState(0);
  const [loading,  setLoading]    = useState(true);
  const [search,   setSearch]     = useState(params.get('search') || '');
  const [category, setCategory]   = useState(params.get('category') || 'All');
  const [sort,     setSort]       = useState('name');
  const [minPrice, setMinPrice]   = useState('');
  const [maxPrice, setMaxPrice]   = useState('');
  const [page,     setPage]       = useState(0);
  const PER_PAGE = 24;

  const load = useCallback(async (reset = false) => {
    setLoading(true);
    const offset = reset ? 0 : page * PER_PAGE;
    const q = new URLSearchParams({ limit: PER_PAGE, offset, sort });
    if (category !== 'All') q.set('category', category);
    if (search.trim())      q.set('search', search.trim());
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
  useEffect(() => {
    const t = setTimeout(() => load(true), 400);
    return () => clearTimeout(t);
  }, [search]);

  const INP = { padding:'9px 12px', border:`1.5px solid ${C.border}`, borderRadius:9, fontSize:13, fontFamily:'inherit', outline:'none', background:'white', color:C.navy, width:'100%', boxSizing:'border-box' };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", maxWidth:1200, margin:'0 auto', padding:'32px 24px' }}>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, color:C.navy, marginBottom:6 }}>Shop Eyewear</h1>
      <p style={{ color:C.muted, marginBottom:28, fontSize:14 }}>{total} products available</p>

      <div style={{ display:'grid', gridTemplateColumns:'240px 1fr', gap:28, alignItems:'start' }}>

        {/* ── Sidebar filters ── */}
        <div style={{ position:'sticky', top:80 }}>
          <div style={{ background:'white', borderRadius:14, border:`1px solid ${C.border}`, padding:'20px', marginBottom:14 }}>
            <div style={{ fontWeight:700, color:C.navy, marginBottom:14, fontSize:14 }}>🔍 Search</div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." style={INP}/>
          </div>

          <div style={{ background:'white', borderRadius:14, border:`1px solid ${C.border}`, padding:'20px', marginBottom:14 }}>
            <div style={{ fontWeight:700, color:C.navy, marginBottom:14, fontSize:14 }}>📂 Category</div>
            {CATS.map(c => (
              <button key={c} onClick={()=>setCategory(c)}
                style={{ display:'block', width:'100%', textAlign:'left', padding:'8px 12px', marginBottom:4,
                  borderRadius:8, border:`1.5px solid ${category===c?C.navy:C.border}`,
                  background:category===c?C.navy:'white', color:category===c?'white':C.muted,
                  fontSize:13, fontWeight:category===c?700:400, cursor:'pointer', fontFamily:'inherit' }}>
                {c}
              </button>
            ))}
          </div>

          <div style={{ background:'white', borderRadius:14, border:`1px solid ${C.border}`, padding:'20px', marginBottom:14 }}>
            <div style={{ fontWeight:700, color:C.navy, marginBottom:14, fontSize:14 }}>💰 Price Range</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <input type="number" value={minPrice} onChange={e=>setMinPrice(e.target.value)} placeholder="Min" style={{ ...INP, width:'50%' }}/>
              <span style={{ color:C.muted }}>—</span>
              <input type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="Max" style={{ ...INP, width:'50%' }}/>
            </div>
            <button onClick={()=>load(true)} style={{ marginTop:10, width:'100%', padding:'9px', background:C.navy, color:'white', border:'none', borderRadius:9, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
              Apply
            </button>
            {(minPrice||maxPrice) && (
              <button onClick={()=>{setMinPrice('');setMaxPrice('');}} style={{ marginTop:6, width:'100%', padding:'7px', background:C.cream, color:C.muted, border:`1px solid ${C.border}`, borderRadius:9, fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>
                Clear
              </button>
            )}
          </div>

          <div style={{ background:'white', borderRadius:14, border:`1px solid ${C.border}`, padding:'20px' }}>
            <div style={{ fontWeight:700, color:C.navy, marginBottom:14, fontSize:14 }}>↕️ Sort By</div>
            {SORTS.map(([v,l]) => (
              <button key={v} onClick={()=>setSort(v)}
                style={{ display:'block', width:'100%', textAlign:'left', padding:'8px 12px', marginBottom:4,
                  borderRadius:8, border:`1.5px solid ${sort===v?C.gold:C.border}`,
                  background:sort===v?'#fef9f0':'white', color:sort===v?'#92400e':C.muted,
                  fontSize:13, fontWeight:sort===v?700:400, cursor:'pointer', fontFamily:'inherit' }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* ── Products grid ── */}
        <div>
          {loading
            ? <div style={{ textAlign:'center', padding:'80px', color:C.muted }}>⏳ Loading...</div>
            : products.length === 0
              ? <div style={{ textAlign:'center', padding:'80px', color:C.muted }}>
                  <div style={{ fontSize:56, marginBottom:14 }}>🔍</div>
                  <div style={{ fontSize:18, fontWeight:600, color:C.navy, marginBottom:8 }}>No products found</div>
                  <div style={{ fontSize:14 }}>Try a different search or category</div>
                </div>
              : <>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:18 }}>
                    {products.map(p => <ProductCard key={p.id} product={p}/>)}
                  </div>
                  {total > PER_PAGE && (
                    <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:32 }}>
                      {page > 0 && (
                        <button onClick={()=>{setPage(p=>p-1);load();}}
                          style={{ padding:'9px 20px', background:'white', border:`1px solid ${C.border}`, borderRadius:9, cursor:'pointer', fontFamily:'inherit', fontWeight:600, color:C.navy }}>
                          ← Prev
                        </button>
                      )}
                      <span style={{ padding:'9px 16px', fontSize:13, color:C.muted, alignSelf:'center' }}>
                        Page {page+1} of {Math.ceil(total/PER_PAGE)}
                      </span>
                      {(page+1)*PER_PAGE < total && (
                        <button onClick={()=>{setPage(p=>p+1);load();}}
                          style={{ padding:'9px 20px', background:C.navy, color:'white', border:'none', borderRadius:9, cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>
                          Next →
                        </button>
                      )}
                    </div>
                  )}
                </>
          }
        </div>
      </div>
    </div>
  );
}
