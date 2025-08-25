// Dentro de src/Components/ClientView/Header/Header.js

import React, { useState, useRef, useEffect } from 'react'; // 1. Adicione useRef e useEffect
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItems } = useCart();
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    // 2. Crie uma referência para o elemento do header
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    // 3. Efeito para medir a altura do header
    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
    }, []); // Roda apenas uma vez quando o componente monta

    const menuItems = [
        { name: 'HOME', path: '/home' },
        { name: 'GEMAS PRECIOSAS', path: '/gemas-brilhantes' },
        { name: 'JOIAS', path: '/joias' },
        { name: 'ATELIÊ DE JOIAS', path: '/personalizadas' },
        { name: 'GEMCASH', path: '/gemcash' },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        // 4. Associe a referência ao elemento header
        <header className="header-container" ref={headerRef}>
            <div className="header-top-row">
                <div className="header-left">
                    <button className="platform-button">Conheça nossa plataforma</button>
                </div>
                <div className="header-center">
                    <Link to="/home">
                        <img 
                            src="/img/Untitled design(1).png" 
                            alt="Gemas Brilhantes Logo" 
                            className="header-logo" 
                        />
                    </Link>
                </div>
                <div className="header-right">
                    <Link to="/carrinho" className="cart-icon-link">
                        <i className="fas fa-shopping-cart"></i>
                        {totalItemsInCart > 0 && <span className="cart-badge">{totalItemsInCart}</span>}
                    </Link>
                    <button className="hamburger-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                    </button>
                </div>
            </div>
            
            <nav className="header-nav-desktop">
                <ul>
                    {menuItems.map(item => (
                        <li key={item.name}>
                            <NavLink to={item.path}>{item.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* 5. Passe a altura do header como uma style prop para o menu mobile */}
            <nav 
                className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}
                style={{ top: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)` }}
            >
                <ul>
                    {menuItems.map(item => (
                        <li key={item.name}>
                            <Link to={item.path} onClick={handleLinkClick}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <button className="platform-button-mobile">
                    Conheça nossa plataforma
                </button>
            </nav>
        </header>
    );
};

export default Header;