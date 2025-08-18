// Dentro de src/Components/ClientView/Body/Joias/Joias.js

import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ProductCard from '../GemasBrilhantes/ProductCard';
import FilterSidebar from '../GemasBrilhantes/FilterSidebar';
import './Joias.css';

const Joias = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [attributeGroups, setAttributeGroups] = useState([]);
    const [attributeValues, setAttributeValues] = useState({});
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [loading, setLoading] = useState(true);

    // Estado para controlar o modal de filtros no mobile
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const productsSnapshot = await getDocs(collection(db, 'products'));
                const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllProducts(productsData);

                const q = query(collection(db, 'attributes'), where('appliesTo', '==', 'joia'));
                const groupsSnapshot = await getDocs(q);
                const groupsData = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAttributeGroups(groupsData);
                
                const valuesMap = {};
                for (const group of groupsData) {
                    const valuesSnapshot = await getDocs(collection(db, 'attributes', group.id, 'values'));
                    valuesMap[group.id] = valuesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                }
                setAttributeValues(valuesMap);

            } catch (error) {
                console.error("Erro ao buscar dados da loja:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let items = allProducts.filter(p => p.type === 'joia');

        Object.keys(filters).forEach(groupId => {
            const valueId = filters[groupId];
            if (valueId && valueId !== 'all') {
                items = items.filter(product => product.attributes?.[groupId] === valueId);
            }
        });
        
        if (searchTerm) {
            items = items.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (sortOrder === 'asc') items.sort((a, b) => a.price - b.price);
        else if (sortOrder === 'desc') items.sort((a, b) => b.price - a.price);
        
        setFilteredProducts(items);

    }, [filters, searchTerm, sortOrder, allProducts]);

    const handleFilterChange = (groupId, valueId) => {
        setFilters(prev => ({ ...prev, [groupId]: valueId }));
    };

    return (
        <div className="store-page-wrapper">
            <div className="store-body">
                {/* Sidebar para Desktop */}
                <div className="sidebar-desktop-wrapper">
                    {loading ? (
                        <div className="sidebar-loading">Carregando filtros...</div>
                    ) : (
                        <FilterSidebar 
                            attributeGroups={attributeGroups} 
                            attributeValues={attributeValues} 
                            onFilterChange={handleFilterChange}
                        />
                    )}
                </div>

                {/* Modal de filtros para Mobile */}
                <div className={`sidebar-mobile-modal ${isMobileFiltersOpen ? 'open' : ''}`}>
                    <div className="modal-header">
                        <h3 className="sidebar-title fonte-principal">Filtros</h3>
                        <button onClick={() => setIsMobileFiltersOpen(false)} className="close-modal-btn">&times;</button>
                    </div>
                    {loading ? (
                        <div className="sidebar-loading">Carregando...</div>
                    ) : (
                        <FilterSidebar 
                            attributeGroups={attributeGroups} 
                            attributeValues={attributeValues} 
                            onFilterChange={handleFilterChange}
                        />
                    )}
                </div>
                
                <main className="product-main-content">
                    <div className="content-header">
                        <input
                            type="text"
                            placeholder="Buscar por sua joia..."
                            className="store-search-input"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="mobile-filter-button" onClick={() => setIsMobileFiltersOpen(true)}>
                            <i className="fas fa-filter"></i>
                            <span>Filtrar</span>
                        </button>
                        <div className="header-controls">
                            <span className="results-count">{filteredProducts.length} resultados</span>
                            <select className="sort-select" onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="">Ordenar por</option>
                                <option value="asc">Menor Preço</option>
                                <option value="desc">Maior Preço</option>
                            </select>
                        </div>
                    </div>
                     {loading ? (
                        <p className="loading-products">Carregando produtos...</p>
                    ) : (
                        <div className="product-grid">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => <ProductCard key={product.id} product={product} />)
                            ) : (
                                <p className="no-products-found">Nenhuma joia encontrada com os filtros selecionados.</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Joias;