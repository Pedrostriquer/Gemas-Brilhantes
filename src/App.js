// Dentro de src/App.js

import React, { useState, useEffect } from 'react';
// 1. Adicionado 'useLocation' para a lógica do loader
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// --- Componentes da Visão do Cliente ---
import Header from './Components/ClientView/Header/Header';
import Footer from './Components/ClientView/Footer/Footer';
import Home from './Components/ClientView/Body/Home/Home';
import GemCash from './Components/ClientView/Body/GemCash/GemCash';
import GemasBrilhantes from './Components/ClientView/Body/GemasBrilhantes/GemasBrilhantes';
import Joias from './Components/ClientView/Body/Joias/Joias';
import ProductPage from './Components/ClientView/Body/Produtos/ProductPage';
// 2. Adicionado o PageLoader
import PageLoader from './Components/ClientView/PageLoader/PageLoader';

// --- Componentes do Admin ---
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin';
import ProtectedRoute from './Components/Admin/ProtectedRoute';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminDashboard from './Components/Admin/AdminBody/AdminDashboard/AdminDashboard';
import ManageProducts from './Components/Admin/AdminBody/ManageProducts/ManageProducts';
import ProductList from './Components/Admin/AdminBody/ManageProducts/ProductList';
import ManageAttributes from './Components/Admin/AdminBody/ManageAttributes/ManageAttributes';
// 3. Adicionado o ManageHome para a rota correta
import ManageHome from './Components/Admin/AdminBody/ManageHome/ManageHome';


function App() {
    const footerData = {
        phone: '(11) 99999-8888',
        email: 'contato@gemasbrilhantes.com',
        whatsappNumber: '+5511999998888',
        instagram: 'https://www.instagram.com/gemasbrilhantes',
        facebook: 'https://www.facebook.com/gemasbrilhantes'
    };

    // 4. Lógica para controlar o estado do loader
    const [isTransitioning, setIsTransitioning] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Ignora a transição para rotas de admin para manter a agilidade do painel
        if (location.pathname.startsWith('/admin')) {
            return;
        }

        setIsTransitioning(true); // Ativa o loader

        // Esconde o loader após 400ms
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 400);

        return () => clearTimeout(timer); // Limpeza
    }, [location.pathname]);

    return (
        <div className="App">
            {/* 5. Renderiza o PageLoader globalmente */}
            <PageLoader isLoading={isTransitioning} />
            
            <Routes>
                {/* --- ROTAS DO CLIENTE (com Header e Footer) --- */}
                <Route path="/*" element={
                    <>
                        <Header />
                        <main>
                            <Routes>
                                <Route index element={<Navigate replace to="/home" />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/gemcash" element={<GemCash />} />
                                <Route path="/gemas-brilhantes" element={<GemasBrilhantes />} />
                                <Route path="/joias" element={<Joias />} />
                                <Route path="/produto/:id" element={<ProductPage />} />
                                <Route path="*" element={<Navigate replace to="/home" />} />
                            </Routes>
                        </main>
                        <Footer footerData={footerData} />
                    </>
                } />

                {/* --- ROTAS DO ADMIN (sem Header e Footer) --- */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                    path="/admin"
                    element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
                >
                    <Route path="dashboard" element={<AdminDashboard />} />
                    {/* --- CORREÇÃO APLICADA AQUI --- */}
                    <Route path="home" element={<ManageHome />} />
                    <Route path="gemcash" element={<h2>Gerenciar Página GemCash</h2>} />
                    
                    <Route path="produtos" element={<ManageProducts />}>
                        <Route index element={<Navigate to="gemas" />} />
                        <Route path="gemas" element={<ProductList />} />
                        <Route path="joias" element={<ProductList />} />
                    </Route>
                    
                    <Route path="atributos" element={<ManageAttributes />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;