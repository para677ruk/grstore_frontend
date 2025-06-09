import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RingLoader } from "react-spinners";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    fetch(`http://https://grstore-backend.onrender.com/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  const addToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Войдите или зарегистрируйтесь, чтобы добавить товар в корзину');
      return;
    }
    if (!selectedSize) {
      toast.warn('Выберите размер');
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      brand: product.brand,
      quantity: 1,
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    toast.success('Товар добавлен в корзину!');
    window.location.reload();
  };

  const addToFavorites = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Войдите или зарегистрируйтесь, чтобы добавить товар в избранное');
      return;
    }
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.find(item => item._id === product._id);
    if (isFavorite) {
      toast.warn('Товар уже в избранном');
      return;
    }
    favorites.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      brand: product.brand,
    });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    toast.success('Товар добавлен в избранное!');
  };

  if (!product) return <div className="all"><div className='all-ringLoader'><RingLoader /></div></div>;

  return (
        <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
    <div className='product-page'>
      <img className='product-page-image' src={product.image} alt={product.name} />
      <div className="product-page-information">
        <div className="product-page-information-nameProduct">
          <div className="h4">{product.brand}</div>
          <div className="h3">{product.name}</div>
        </div>

        <div className="product-page-information-price">
          <div className="h4">${product.price}.00</div>
        </div>

        <div className="product-page-information-description">
          {product.sizes && product.sizes.length > 0 && (
            <div className="product-page-sizes-block">
              <div className='h4'>Размеры:</div>
              <div>
                {product.sizes.map(size => (
                  <button
                    className={
                      'product-page-information-sizeButton' +
                      (selectedSize === size ? ' active' : '')
                    }
                    key={size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button className='product-page-information-description-addToCartButton' onClick={addToCart}>В корзину</button>
          <button
            className='product-page-information-description-addToFavoritesButton'
            onClick={addToFavorites}
          >
            В избранное
          </button>
          {cartMessage && <div>{cartMessage}</div>}

        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default ProductPage;
