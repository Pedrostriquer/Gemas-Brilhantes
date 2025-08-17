// Dentro de src/Components/ClientView/Body/GemasBrilhantes/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    // Formata o preço para o padrão brasileiro (R$ 1.234,56)
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(product.price);

    return (
        // Link envolve todo o card, levando para a página do produto (que ainda criaremos)
        <Link to={`/produto/${product.id}`} className="product-card">
            <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name fonte-principal">{product.name}</h3>
                <p className="product-price">{formattedPrice}</p>
            </div>
        </Link>
    );
};

export default ProductCard;