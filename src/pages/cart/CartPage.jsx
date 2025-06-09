import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(items);
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="cart-container">
      <div className="cart-container-main">
        <div className="cart-container-main-header">
          <h2>Корзина товаров</h2>
          <button
            onClick={() => {
              setCart([]);
              localStorage.setItem("cart", "[]");
              window.location.reload();
            }}
            className="h2"
          >
            Очистить корзину
          </button>
        </div>
        {cart.length === 0 ? (
          <div>Корзина пуста</div>
        ) : (
          <>
            <ul className="cart-container-main-list">
              {cart.map((item, idx) => (
                <li key={item._id + item.size + idx} className="cart-container-main-list-item">
                  <div className="cart-container-main-list-item-1">
                    <img src={item.image} alt={item.name} style={{ width: 86, height: 86, objectFit: "cover" }} />

                    <div className="cart-container-main-list-item-1-information">
                      <div className="cart-container-main-list-item-1-information-name_product">
                        <div className="h3">{item.brand}</div>
                        <div className="h7">{item.name}</div>
                        <div className="p">Размер: {item.size}</div>
                      </div>
                      <div className="cart-container-main-list-item-1-information-quantity">
                        <div className="h4">${item.price}.00</div>
                        <button onClick={() => { removeFromCart(idx); window.location.reload(); }}>удалить</button>
                      </div>
                    </div>
                  </div>
                  <div className="cart-container-main-list-item-line"></div>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="cart-container-main-all_price">
          <div className="h4">Цена за все товары:</div>
          <div className="h4">${total}.00</div>
        </div>
        {cart.length > 0 && (
          <div className="cart-container-main-order-btn-wrapper">
            <button
              className="cart-container-main-order-btn"
              onClick={() => navigate("/order")}
            >
              перейти к покупке
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;