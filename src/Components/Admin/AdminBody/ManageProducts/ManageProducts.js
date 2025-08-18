import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './ManageProducts.css';

const ManageProducts = () => {
    return (
        <div className="manage-products-container">
            <div className="page-header">
                <h1>Gerenciar Produtos</h1>
            </div>
            {/* Abas de Navegação */}
            <div className="product-type-tabs">
                <NavLink to="/admin/produtos/gemas" className="tab-link">Gemas</NavLink>
                <NavLink to="/admin/produtos/joias" className="tab-link">Joias</NavLink>
            </div>
            {/* O Outlet renderizará ProductList para 'gemas' ou 'joias' */}
            <div className="product-list-content">
                <Outlet />
            </div>
        </div>
    );
};
export default ManageProducts;