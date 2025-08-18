// Dentro de src/Components/Admin/AdminBody/AdminDashboard/AdminDashboard.js

import React from 'react';
import { auth } from '../../../../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin'); // Redireciona para a página de login após o logout
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Bem-vindo ao Painel de Administração</h1>
            <p>Selecione uma opção no menu para começar a gerenciar o conteúdo do site.</p>
            <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px' }}>
                Sair
            </button>
        </div>
    );
};

export default AdminDashboard;