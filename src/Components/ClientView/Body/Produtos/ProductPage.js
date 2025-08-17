// Dentro de src/Components/ClientView/Body/Produtos/ProductPage.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { allProducts } from '../../../../productData'; // Importa os dados centralizados
import './ProductPage.css';

const ProductPage = () => {
    // Pega o 'id' da URL (ex: /produto/5)
    const { id } = useParams();
    // Encontra o produto correspondente no nosso array de dados
    const product = allProducts.find(p => p.id === parseInt(id));

    // Se o produto não for encontrado, exibe uma mensagem
    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Produto não encontrado</h2>
                <Link to="/gemas-brilhantes">Voltar para a loja</Link>
            </div>
        );
    }

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(product.price);

    return (
        <div className="product-page-wrapper">
            <div className="product-page-container">
                {/* Coluna da Imagem */}
                <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
                </div>

                {/* Coluna dos Detalhes */}
                <div className="product-details-container">
                    <span className="product-page-category">{product.category}</span>
                    <h1 className="product-page-title fonte-principal">{product.name}</h1>
                    <p className="product-page-price">{formattedPrice}</p>
                    <p className="product-page-description">{product.description}</p>
                    
                    <a 
                        href="https://link.externo.de.compra/aqui" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="buy-button"
                    >
                        Consultar Disponibilidade
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;