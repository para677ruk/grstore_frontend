import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser } from 'react-icons/hi'
import { HiOutlineHeart } from 'react-icons/hi'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { HiOutlineMenu } from 'react-icons/hi'

const navigation = [
  { name: "Каталог", href: "/catalog" },
  { name: "Корзина", href: "/cart" },
  { name: "Заказы", href: "/orders" },
  { name: "Выйти", action: "logout" },
];

const Navbar = () => {
  const [isAuth, setIsAuth] = React.useState(!!localStorage.getItem('token'));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  React.useEffect(() => {
    const handler = () => setIsAuth(!!localStorage.getItem('token'));
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(items.length);
  });

  return (
    <header className="header">
      <div className="header__body">
        <div className="header__body-inner">
          <div className="header__body-inner-left">
            <span className="hidden-laptop">
              <span className='hidden-mobile'><Link to='/catalog'><h3>каталог</h3></Link></span>
            </span>
            <span className='visible-mobile'><Link to='/catalog'><HiOutlineMenu size={24} /></Link></span>


          </div>
          <div className="header__body-inner-center">
            <Link to='/' className="h1">GR STORE</Link>
          </div>
          <div className="header__body-inner-right">
            <div className="header__account-dropdown-wrapper">
              {isAuth ? (
                <>
                  <button className="header__body-inner-right-favorites" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <span className="hidden-laptop">
                      <span className="hidden-mobile"><h3>аккаунт</h3></span>
                    </span>

                    <span className="visible-mobile"><HiOutlineUser size={24} /></span>
                  </button>
                  {isDropdownOpen && (
                    <>
                      <div
                        className="navbar-account-overlay"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className='header__body-inner-right-dropdown'>
                        <ul className='header__body-inner-right-dropdown-list'>
                          {navigation.map((item) => (
                            <li key={item.name}>
                              {item.action === "logout" ? (
                                <button onClick={() => {
                                  localStorage.removeItem('token');
                                  setIsAuth(false);
                                  setIsDropdownOpen(false);
                                  localStorage.removeItem('cart');
                                  localStorage.removeItem('favorites');
                                }} className='header__body-inner-right-dropdown-link'>
                                  {item.name}
                                </button>
                              ) : (
                                <Link to={item.href} className='header__body-inner-right-dropdown-link' onClick={() => setIsDropdownOpen(false)}>
                                  {item.name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Link to='/login'>
                  <span className="hidden-laptop">
                    <span className="hidden-mobile"><h3>логин</h3></span>
                  </span>

                  <span className="visible-mobile"><HiOutlineUser size={24} style={{ opacity: 0.5 }} /></span>
                </Link>
              )}
            </div>
            <Link to='/favorites'>
              <span className="hidden-laptop">
                <span className="hidden-mobile">избранные</span>
              </span>
              <span className="visible-mobile"><HiOutlineHeart size={24} /></span>
            </Link>
            <Link to='/cart'>
              <span className="hidden-laptop">
                <span className="hidden-mobile"><h3>корзина<span> ({cartCount})</span></h3></span>
              </span>
              <span className="visible-mobile"><HiOutlineShoppingCart size={24} /></span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar