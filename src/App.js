// Dentro de src/App.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/ClientView/Header/Header';
import Footer from './Components/ClientView/Footer/Footer';
import Home from './Components/ClientView/Body/Home/Home';
import GemCash from './Components/ClientView/Body/GemCash/GemCash';
import GemasBrilhantes from './Components/ClientView/Body/GemasBrilhantes/GemasBrilhantes';
import ProductPage from './Components/ClientView/Body/Produtos/ProductPage';


function App() {
  const footerData = {
    phone: '(11) 99999-8888',
    email: 'contato@gemasbrilhantes.com',
    whatsappNumber: '+5511999998888',
    instagram: 'https://www.instagram.com/gemasbrilhantes',
    facebook: 'https://www.facebook.com/gemasbrilhantes'
};

    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/gemcash" element={<GemCash />} />
                    <Route path="/gemas-brilhantes" element={<GemasBrilhantes />} />
                    <Route path="/produto/:id" element={<ProductPage />} />
                </Routes>
            </main>
            <Footer footerData={footerData} />
        </div>
    );
}

export default App;