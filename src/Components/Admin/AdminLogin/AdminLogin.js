// Dentro de src/Components/Admin/AdminLogin/AdminLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config'; // Importa a instância de auth
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        setError(''); // Limpa erros anteriores

        try {
            // Tenta fazer login com o Firebase
            await signInWithEmailAndPassword(auth, email, password);
            // Se o login for bem-sucedido, redireciona para o dashboard do admin
            navigate('/admin/dashboard');
        } catch (err) {
            // Se houver um erro, exibe uma mensagem amigável
            setError('Falha no login. Verifique seu e-mail e senha.');
            console.error(err);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h1 className="login-title fonte-principal">Admin Login</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="login-error">{error}</p>}
                    <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;