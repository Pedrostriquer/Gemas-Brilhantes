// Dentro de src/Components/Admin/AdminLayout.js

import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import './AdminLayout.css';

const AdminLayout = () => {
    
    const handleLogout = async () => {
        try {
            await signOut(auth);
            // O componente ProtectedRoute cuidará do redirecionamento para a página de login.
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };
    
    return (
        <div className="admin-layout">
            {/* Sidebar (Menu Lateral) */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    {/* Título agora é um link para o dashboard principal do admin */}
                    <Link to="/admin/dashboard" className="sidebar-title-link">
                        <h2 className="sidebar-title fonte-principal">Painel Admin</h2>
                    </Link>
                </div>
                <nav className="sidebar-nav">
                    {/* NavLink adiciona uma classe 'active' ao link que corresponde à rota atual, permitindo estilização especial */}
                    <NavLink to="/admin/dashboard" className="nav-link">
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/home" className="nav-link">
                        <i className="fas fa-home"></i>
                        <span>Gerenciar Home</span>
                    </NavLink>
                    <NavLink to="/admin/gemcash" className="nav-link">
                        <i className="fas fa-gem"></i>
                        <span>Gerenciar GemCash</span>
                    </NavLink>
                    <NavLink to="/admin/produtos" className="nav-link">
                        <i className="fas fa-store"></i>
                        <span>Gerenciar Produtos</span>
                    </NavLink>
                    <NavLink to="/admin/atributos" className="nav-link">
                        <i className="fas fa-tags"></i>
                        <span>Gerenciar Atributos</span>
                    </NavLink>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-button">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* Conteúdo Principal da Página */}
            <main className="admin-main-content">
                {/* O Outlet do react-router-dom renderiza o componente da rota aninhada aqui */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;