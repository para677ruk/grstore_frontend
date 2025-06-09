import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { RingLoader } from "react-spinners";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState('');
  const [sort, setSort] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = 'http://https://grstore-backend.onrender.com/api/products?';
    if (brand) url += `brand=${brand}&`;
    if (sort) url += `sort=${sort}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, [brand, sort]);

  // Получить уникальные бренды для фильтра
  const brands = Array.from(new Set(products.map(p => p.brand)));

  if (loading) return <div className="all"><div className='all-ringLoader'><RingLoader /></div></div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <div className="catalog">
        <div className="catalog-brands" style={{ marginBottom: 20 }}>
          <div className="catalog-brands-h5">Бренды:</div>
          <div className="catalog-brands-list">
            <Link to="#" onClick={e => { e.preventDefault(); setBrand(''); }} className='h6'>ВСЕ</Link>
            {brands.map(b => (
              <Link to="#" key={b} onClick={e => { e.preventDefault(); setBrand(b); }} className='h6'>{b}</Link>
            ))}
          </div>
        </div>

        {/*Здесь будут товары из каталога*/}
        <div className="catalog-products">
          {products.map(product => (
            <Link key={product._id} to={`/product/${product._id}`} className="catalog-products-item">
              <img src={product.image} alt={product.name} />
              <div className="h3">{product.brand}</div>
              <div className="h7">{product.name}</div>
              <div className="h4">${product.price}.00</div>
            </Link>
          ))}
        </div>

        <div className="catalog-sort">
          <div className="catalog-sort-h5">Сортировка:</div>
          <div className="catalog-sort-items">
            <Link className='h6' to="#" onClick={e => { e.preventDefault(); setSort(''); }}>Без сортировки</Link>
            <Link className='h6' to="#" onClick={e => { e.preventDefault(); setSort('price_asc'); }}>Цена: от меньшего к большему</Link>
            <Link className='h6' to="#" onClick={e => { e.preventDefault(); setSort('price_desc'); }}>Цена: от большего к меньшему</Link>
          </div>
        </div>

        <div className="catalog-filters">
          <button
            className="catalog-filters-burger"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-label="Открыть фильтры"
          >
            ☰ Фильтры
          </button>

          {filtersOpen && (
            <>
              <div
                className="catalog-filters-overlay"
                onClick={() => setFiltersOpen(false)}
              />
              <div className="catalog-filters-mobile">
                <div>
                  <div>
                    <div className="h1">Сортировка:</div>
                    <div className="catalog-filters-mobile-items">
                      <Link className='h4' to="#" onClick={e => { e.preventDefault(); setSort(''); }}>Без сортировки</Link>
                      <Link className='h4' to="#" onClick={e => { e.preventDefault(); setSort('price_asc'); }}>Цена: от меньшего к большему</Link>
                      <Link className='h4' to="#" onClick={e => { e.preventDefault(); setSort('price_desc'); }}>Цена: от большего к меньшему</Link>
                    </div>
                  </div>
                  <div className="catalog-filters-mobile-brands" style={{ marginBottom: 20 }}>
                    <div className="h1">Бренды:</div>
                    <div className="catalog-filters-mobile-brands-list">
                      <Link to="#" onClick={e => { e.preventDefault(); setBrand(''); }} className='h4'>ВСЕ</Link>
                      {brands.map(b => (
                        <Link to="#" key={b} onClick={e => { e.preventDefault(); setBrand(b); }} className='h4'>{b}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Catalog;
