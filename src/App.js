// Dentro de src/App.js

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// --- Componentes da Visão do Cliente ---
import Header from './Components/ClientView/Header/Header';
import Footer from './Components/ClientView/Footer/Footer';
import Home from './Components/ClientView/Body/Home/Home';
import GemCash from './Components/ClientView/Body/GemCash/GemCash';
import GemasBrilhantes from './Components/ClientView/Body/GemasBrilhantes/GemasBrilhantes';
import Joias from './Components/ClientView/Body/Joias/Joias';
import ProductPage from './Components/ClientView/Body/Produtos/ProductPage';
import PageLoader from './Components/ClientView/PageLoader/PageLoader';
import CartPage from './Components/ClientView/Body/CartPage/CartPage';
import Personalizadas from './Components/ClientView/Body/Personalizadas/Personalizadas';

// --- Componentes do Admin ---
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin';
import ProtectedRoute from './Components/Admin/ProtectedRoute';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminDashboard from './Components/Admin/AdminBody/AdminDashboard/AdminDashboard';
import ManageProducts from './Components/Admin/AdminBody/ManageProducts/ManageProducts';
import ProductList from './Components/Admin/AdminBody/ManageProducts/ProductList';
import ManageAttributes from './Components/Admin/AdminBody/ManageAttributes/ManageAttributes';
import ManageHome from './Components/Admin/AdminBody/ManageHome/ManageHome';
import ManageFooter from './Components/Admin/AdminBody/ManageFooter/ManageFooter';
import ManageGemCash from './Components/Admin/AdminBody/ManageGemCash/ManageGemCash';

function App() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/admin')) {
            return;
        }
        setIsTransitioning(true);
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className="App">
            <PageLoader isLoading={isTransitioning} />
            
            <Routes>
                {/* --- ROTAS DO CLIENTE (com Header e Footer) --- */}
                <Route path="/*" element={
                    <>
                        <Header />
                        {/* A classe 'main-content' foi adicionada para o sticky footer */}
                        <main className="main-content">
                            <Routes>
                                <Route index element={<Navigate replace to="/home" />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/gemcash" element={<GemCash />} />
                                <Route path="/gemas-brilhantes" element={<GemasBrilhantes />} />
                                <Route path="/joias" element={<Joias />} />
                                <Route path="/produto/:id" element={<ProductPage />} />
                                <Route path="/carrinho" element={<CartPage />} />
                                <Route path="*" element={<Navigate replace to="/home" />} />
                                <Route path="/personalizadas" element={<Personalizadas />} /> {/* NOVA ROTA */}
                            </Routes>
                        </main>
                        <Footer />
                    </>
                } />

                {/* --- ROTAS DO ADMIN (sem Header e Footer) --- */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                    path="/admin"
                    element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
                >
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="home" element={<ManageHome />} />
                    <Route path="gemcash" element={<ManageGemCash />} />
                    
                    <Route path="produtos" element={<ManageProducts />}>
                        <Route index element={<Navigate to="gemas" />} />
                        <Route path="gemas" element={<ProductList />} />
                        <Route path="joias" element={<ProductList />} />
                    </Route>
                    
                    <Route path="atributos" element={<ManageAttributes />} />
                    <Route path="footer" element={<ManageFooter />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;