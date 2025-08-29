// Dentro de src/App.js

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // 1. Adicionado para buscar dados
import { db } from './firebase/config'; // 2. Adicionado para acessar o DB

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
// 3. Adicionado o import do novo botão flutuante
import FloatingWhatsApp from './Components/ClientView/FloatingWhatsApp/FloatingWhatsApp';

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
import ManagePersonalizadas from './Components/Admin/AdminBody/ManagePersonalizadas/ManagePersonalizadas';

function App() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const location = useLocation();

    // 4. Nova lógica para buscar os dados do footer
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        // Lógica do page loader
        if (location.pathname.startsWith('/admin')) {
            return;
        }
        setIsTransitioning(true);
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 300);

        // Lógica para buscar os dados do footer
        const fetchFooterData = async () => {
            try {
                const docRef = doc(db, 'siteContent', 'footer');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFooterData(docSnap.data());
                }
            } catch (error) {
                console.error("Erro ao buscar dados do footer para o botão de WhatsApp:", error);
            }
        };
        fetchFooterData();

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
                        <main className="main-content">
                            <Routes>
                                <Route index element={<Navigate replace to="/home" />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/gemcash" element={<GemCash />} />
                                <Route path="/gemas-brilhantes" element={<GemasBrilhantes />} />
                                <Route path="/joias" element={<Joias />} />
                                <Route path="/produto/:id" element={<ProductPage />} />
                                <Route path="/carrinho" element={<CartPage />} />
                                <Route path="/personalizadas" element={<Personalizadas />} />
                                <Route path="*" element={<Navigate replace to="/home" />} />
                            </Routes>
                        </main>
                        <Footer />
                        {/* 5. Renderiza o botão flutuante, passando o número do WhatsApp */}
                        <FloatingWhatsApp number={footerData?.whatsappNumber} />
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
                    <Route path="personalizadas" element={<ManagePersonalizadas />} />
                    
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