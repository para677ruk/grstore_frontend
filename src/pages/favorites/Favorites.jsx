import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(favs);
    }, []);

    const removeFromFavorites = (id) => {
        const newFavs = favorites.filter(fav => fav._id !== id);
        setFavorites(newFavs);
        localStorage.setItem("favorites", JSON.stringify(newFavs));
    };

    return (
        <div className="cart-container">
            <div className="cart-container-main">
                <div className="cart-container-main-header">
                    <h2>Избранные товары</h2>
                    <button
                        onClick={() => {
                            setFavorites([]);
                            localStorage.setItem("favorites", "[]");
                            window.location.reload();
                        }}
                        className="h2"
                    >
                        Очистить избранное
                    </button>
                </div>
                {favorites.length === 0 ? (
                    <div>Нет избранных товаров</div>
                ) : (
                    <ul className="cart-container-main-list">
                        {favorites.map(item => (
                            <li key={item._id} className="cart-container-main-list-item">
                                <div className="cart-container-main-list-item-1">
                                    <Link to={`/product/${item._id}`}>
                                        <img src={item.image} alt={item.name} style={{ width: 86, height: 86, objectFit: "cover" }} />
                                    </Link>
                                    <div className="cart-container-main-list-item-1-information">
                                        <Link to={`/product/${item._id}`}>
                                            <div className="cart-container-main-list-item-1-information-name_product">
                                                <div className="h3">{item.brand}</div>
                                                <div className="h7">{item.name}</div>
                                            </div>
                                        </Link>
                                        <div className="cart-container-main-list-item-1-information-quantity">
                                            <div className="h4">${item.price}.00</div>
                                            <button onClick={() => {
                                                removeFromFavorites(item._id);
                                                window.location.reload();
                                            }}>
                                                удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-container-main-list-item-line"></div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;