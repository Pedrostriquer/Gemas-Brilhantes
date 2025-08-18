// Dentro de src/Components/ClientView/Body/Produtos/ProductPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // Funções para buscar um único documento
import { db } from '../../../../firebase/config';
import './ProductPage.css';

const ProductPage = () => {
    const { id } = useParams(); // Pega o ID da URL, por exemplo: "/produto/aBcDeF123"
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null); // Para controlar a galeria

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(false);
            try {
                const docRef = doc(db, 'products', id); // Cria a referência ao documento do produto
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const productData = { id: docSnap.id, ...docSnap.data() };
                    setProduct(productData);
                    // Define a primeira mídia do produto como a selecionada por padrão
                    if (productData.media && productData.media.length > 0) {
                        setSelectedMedia(productData.media[0]);
                    }
                } else {
                    setError(true); // Produto não encontrado
                }
            } catch (err) {
                console.error("Erro ao buscar o produto:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Re-executa o efeito se o ID na URL mudar

    if (loading) {
        return <div className="page-loading-message">Carregando produto...</div>;
    }

    if (error || !product) {
        return (
            <div className="product-not-found">
                <h2 className="fonte-principal">Produto Não Encontrado</h2>
                <p>O item que você está procurando não existe ou foi removido.</p>
                <Link to="/gemas-brilhantes" className="back-to-store-link">Voltar para a Loja</Link>
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
                {/* Coluna da Mídia com Galeria */}
                <div className="product-media-gallery">
                    <div className="main-media-container">
                        {selectedMedia.type === 'video' ? (
                            <video key={selectedMedia.url} src={selectedMedia.url} autoPlay muted loop controls className="main-media-item" />
                        ) : (
                            <img src={selectedMedia.url} alt={product.name} className="main-media-item" />
                        )}
                    </div>
                    <div className="thumbnail-container">
                        {product.media.map((item, index) => (
                            <div 
                                key={index} 
                                className={`thumbnail-item ${selectedMedia.url === item.url ? 'active' : ''}`}
                                onClick={() => setSelectedMedia(item)}
                            >
                                {item.type === 'video' ? (
                                    <video src={item.url} muted playsInline className="thumbnail-media"/>
                                ) : (
                                    <img src={item.url} alt={`Thumbnail ${index + 1}`} className="thumbnail-media"/>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coluna dos Detalhes */}
                <div className="product-details-container">
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