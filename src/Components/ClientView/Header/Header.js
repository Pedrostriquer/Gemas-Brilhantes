// Dentro de src/Components/ClientView/Header/Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: 'HOME', path: '/home' },
        { name: 'GEMAS BRILHANTES', path: '/gemas-brilhantes' },
        { name: 'GEMCASH', path: '/gemcash' },
    ];

    // Função para fechar o menu ao clicar em um link
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header-container">
            <div className="header-top-row">
                {/* Placeholder para manter a logo centralizada */}
                <div className="header-side-placeholder"></div>

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
                    <button className="platform-button-desktop">
                        Conheça nossa plataforma
                    </button>
                    {/* Botão Hambúrguer (só aparece no mobile) */}
                    <button className="hamburger-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                    </button>
                </div>
            </div>

            {/* Navegação para Desktop */}
            <nav className="header-nav-desktop">
                <ul>
                    {menuItems.map(item => (
                        <li key={item.name}>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Navegação para Mobile (Overlay) */}
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