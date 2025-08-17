// Dentro de src/Components/ClientView/Body/GemasBrilhantes/GemasBrilhantes.js

import React, { useState, useEffect } from 'react';
import './GemasBrilhantes.css';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import { allProducts } from '../../../../productData'; // 1. IMPORTA os dados



const GemasBrilhantes = () => {
    const [products, setProducts] = useState(allProducts);
    // ADICIONADO: Estado para o termo de busca
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filters, setFilters] = useState({
        category: 'Todas',
        metal: 'Todos',
        gemstone: 'Todas',
        onSale: false,
    });
    const [sortOrder, setSortOrder] = useState('');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    useEffect(() => {
        let filtered = [...allProducts];

        // Aplica filtros da sidebar
        if (filters.category !== 'Todas') filtered = filtered.filter(p => p.category === filters.category);
        if (filters.metal !== 'Todos') filtered = filtered.filter(p => p.metal === filters.metal);
        if (filters.gemstone !== 'Todas') filtered = filtered.filter(p => p.gemstone === filters.gemstone);
        if (filters.onSale) filtered = filtered.filter(p => p.onSale);

        // ADICIONADO: Aplica filtro do campo de busca
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Aplica ordenação
        if (sortOrder === 'asc') filtered.sort((a, b) => a.price - b.price);
        else if (sortOrder === 'desc') filtered.sort((a, b) => b.price - a.price);
        
        setProducts(filtered);

    }, [filters, sortOrder, searchTerm]); // Adicionado searchTerm às dependências

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
    };

    return (
        <div className="store-page-wrapper">
             {/* REMOVIDO: O <div className="store-header"> foi retirado daqui */}
            
            <div className="store-body">
                <FilterSidebar allProducts={allProducts} onFilterChange={handleFilterChange} />
                
                <main className="product-main-content">
                    <div className="content-header">
                        {/* ADICIONADO: O novo input de busca */}
                        <input
                            type="text"
                            placeholder="Buscar por sua joia..."
                            className="store-search-input"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        
                        <div className="header-controls">
                            <span className="results-count">{products.length} resultados</span>
                            <select className="sort-select" onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="">Ordenar por</option>
                                <option value="asc">Menor Preço</option>
                                <option value="desc">Maior Preço</option>
                            </select>
                        </div>
                    </div>

                    <div className="product-grid">
                        {products.length > 0 ? (
                            products.map(product => <ProductCard key={product.id} product={product} />)
                        ) : (
                            <p className="no-products-found">Nenhum produto encontrado.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default GemasBrilhantes;