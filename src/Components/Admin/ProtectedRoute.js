// Dentro de src/Components/Admin/ProtectedRoute.js

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 'onAuthStateChanged' é um "ouvinte" que verifica o estado do login em tempo real
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Limpa o "ouvinte" quando o componente é desmontado
        return () => unsubscribe();
    }, []);

    // Enquanto verifica o status do login, não renderiza nada (ou um spinner)
    if (loading) {
        return null; // ou <LoadingSpinner />;
    }

    // Se não houver usuário, redireciona para a página de login
    if (!user) {
        return <Navigate to="/admin" />;
    }

    // Se houver um usuário, renderiza o componente da rota protegida
    return children;
};

export default ProtectedRoute;