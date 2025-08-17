// Dentro de src/Components/ClientView/Body/GemasBrilhantes/FilterSidebar.js

import React, { useState } from 'react';
import './FilterSidebar.css';

// Componente para uma seção de filtro que pode ser expandida/recolhida
const FilterSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="filter-section">
            <button className="section-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                <i className={`fas fa-chevron-down ${isOpen ? 'open' : ''}`}></i>
            </button>
            <div className={`section-content ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    );
};

const FilterSidebar = ({ allProducts, onFilterChange }) => {
    const categories = ['Todas', ...new Set(allProducts.map(p => p.category))];
    const metals = ['Todos', ...new Set(allProducts.map(p => p.metal))];
    const gemstones = ['Todas', ...new Set(allProducts.map(p => p.gemstone).filter(g => g !== 'N/A'))];

    return (
        <aside className="filter-sidebar">
            <h3 className="sidebar-title">Filtros</h3>
            
            <FilterSection title="Tipo de Joia">
                {categories.map(cat => (
                    <div key={cat} className="radio-option">
                        <input type="radio" id={cat} name="category" value={cat} defaultChecked={cat === 'Todas'} onChange={e => onFilterChange('category', e.target.value)} />
                        <label htmlFor={cat}>{cat}</label>
                    </div>
                ))}
            </FilterSection>

            <FilterSection title="Cor do Metal">
                {metals.map(metal => (
                    <div key={metal} className="radio-option">
                        <input type="radio" id={metal} name="metal" value={metal} defaultChecked={metal === 'Todos'} onChange={e => onFilterChange('metal', e.target.value)} />
                        <label htmlFor={metal}>{metal}</label>
                    </div>
                ))}
            </FilterSection>

            <FilterSection title="Gema Principal">
                 {gemstones.map(gem => (
                    <div key={gem} className="radio-option">
                        <input type="radio" id={gem} name="gemstone" value={gem} defaultChecked={gem === 'Todas'} onChange={e => onFilterChange('gemstone', e.target.value)} />
                        <label htmlFor={gem}>{gem}</label>
                    </div>
                ))}
            </FilterSection>

            <FilterSection title="Ofertas Especiais">
                <div className="checkbox-option">
                    <input type="checkbox" id="onSale" onChange={e => onFilterChange('onSale', e.target.checked)} />
                    <label htmlFor="onSale">Em oferta</label>
                </div>
            </FilterSection>
        </aside>
    );
};

export default FilterSidebar;