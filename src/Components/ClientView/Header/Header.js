// Dentro de src/Components/ClientView/Header/Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext'; // Importa o hook para acessar o estado do carrinho
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItems } = useCart(); // Acessa os itens do carrinho a partir do contexto

    // Calcula o número total de itens no carrinho (somando as quantidades)
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    const menuItems = [
        { name: 'HOME', path: '/home' },
        { name: 'GEMAS PRECIOSAS', path: '/gemas-brilhantes' },
        { name: 'JOIAS', path: '/joias' },
        { name: 'GEMCASH', path: '/gemcash' },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header-container">
            <div className="header-top-row">
                {/* --- LADO ESQUERDO --- */}
                <div className="header-left">
                    <button className="platform-button">Conheça nossa plataforma</button>
                </div>

                {/* --- CENTRO --- */}
                <div className="header-center">
                    <Link to="/home">
                        <img 
                            src="/img/Untitled design(1).png" 
                            alt="Gemas Brilhantes Logo" 
                            className="header-logo" 
                        />
                    </Link>
                </div>
                
                {/* --- LADO DIREITO --- */}
                <div className="header-right">
                    {/* Ícone de Carrinho que substituiu o botão */}
                    <Link to="/carrinho" className="cart-icon-link">
                        <i className="fas fa-shopping-cart"></i>
                        {/* Exibe a contagem apenas se houver itens no carrinho */}
                        {totalItemsInCart > 0 && <span className="cart-badge">{totalItemsInCart}</span>}
                    </Link>
                    {/* Botão Hambúrguer (para mobile) */}
                    <button className="hamburger-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                    </button>
                </div>
            </div>

            {/* --- NAVEGAÇÃO DESKTOP --- */}
            <nav className="header-nav-desktop">
                <ul>
                    {menuItems.map(item => (
                        <li key={item.name}>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* --- NAVEGAÇÃO MOBILE (OVERLAY) --- */}
            <nav className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
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