import React, { useState, useEffect } from "react";
import { IMaskInput } from 'react-imask';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    const [cart, setCart] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", country: "", postalCode: "" });
    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(items);
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Отправка заказа на сервер
        await fetch("https://grstore-backend.onrender.com/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                cart,
                total,
            }),
        });
        localStorage.setItem("cart", "[]");
        Swal.fire({
            title: 'Заказ оформлен!',
            text: 'Спасибо за ваш заказ. Мы свяжемся с вами для подтверждения.',
            icon: 'success',
            confirmButtonText: 'Ок'
        }).then(() => {
            navigate("/");
        });
    };

return (
    <div className="order-page">
        <div className="order-page-info">
            <div className="h2">Оплата после доставки</div>
            <div className="order-page-info-summary">
                <div className="h4">Ценна за все товары: ${total}</div>
                <div className="h4">Товаров: {cart.length}</div>
            </div>
        </div>
        <div className="order-page-form_all">
            <div className="order-page-form_all-desc">
                <div className="h2">Персональные данные</div>
                <div className="h4">Пожалуйста, заполните всё</div>
            </div>
            <form onSubmit={handleSubmit} className="order-page-form_all-form">
                <div className="order-page-form_all-form-name">
                    <div className="h4">Полное имя</div>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="order-page-form_all-form-email">
                    <div className="h4">Email</div>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="order-page-form_all-form-phone">
                    <div className="h4">Номер телефона</div>
                    <IMaskInput
                        mask="+7 (000) 000-00-00"
                        value={form.phone}
                        onAccept={value => setForm({ ...form, phone: value })}
                        name="phone"
                        required
                    />
                </div>
                <div className="order-page-form_all-form-adress_all">
                    <div className="order-page-form_all-form-adress_all-adress">
                        <div className="h4">Адрес/улица</div>
                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="order-page-form_all-form-adress_all-city">
                        <div className="h4">Город</div>
                        <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="order-page-form_all-form-country_all">
                    <div className="order-page-form_all-form-country_all-country">
                        <div className="h4">Страна</div>
                        <input
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            required
                            className="order-page-form_all-form-country_all-country-input"
                        />
                    </div>
                    <div className="order-page-form_all-form-country_all-postalCode">
                        <div className="h4">Индекс</div>
                        <input
                            name="postalCode"
                            value={form.postalCode}
                            onChange={e => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setForm({ ...form, postalCode: value });
                            }}
                            required
                        />
                    </div>
                </div>
                <div className="order-page-form_all-form-accept">
                    <label className="h4">
                        <input
                            type="checkbox"
                            checked={accepted}
                            onChange={e => setAccepted(e.target.checked)}
                            required
                        />
                        Я принимаю политику конфиденциальности условия использования
                    </label>
                </div>
                <button type="submit" disabled={!accepted}>Сделать заказ</button>
            </form>
        </div>
    </div>
);
};

export default OrderPage;
