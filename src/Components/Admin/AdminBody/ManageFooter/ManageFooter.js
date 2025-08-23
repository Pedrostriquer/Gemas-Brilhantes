// Dentro de src/Components/Admin/AdminBody/ManageFooter/ManageFooter.js

import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import './ManageFooter.css';

const ManageFooter = () => {
    // Estado para os dados do formulário
    const [footerData, setFooterData] = useState({
        phone: '',
        email: '',
        whatsappNumber: '',
        instagram: '',
        facebook: ''
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Busca os dados do footer no Firestore ao carregar
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const docRef = doc(db, 'siteContent', 'footer');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFooterData(docSnap.data());
            } else {
                console.log("Nenhum dado do Footer encontrado, usando valores padrão.");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // Função para atualizar o estado local a cada mudança nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFooterData(prev => ({ ...prev, [name]: value }));
    };

    // Função para salvar os dados no Firestore
    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const docRef = doc(db, 'siteContent', 'footer');
            // 'setDoc' cria o documento se não existir, ou atualiza se já existir
            await setDoc(docRef, footerData, { merge: true });
            alert("Footer salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar o footer:", error);
            alert("Falha ao salvar. Verifique o console.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <p>Carregando gerenciador do Rodapé...</p>;
    }

    return (
        <div className="manage-footer-container">
            <h1 className="fonte-principal">Gerenciar Rodapé</h1>
            <form onSubmit={handleSave} className="footer-editor-form">
                <div className="form-group">
                    <label htmlFor="phone">Telefone</label>
                    <input type="text" id="phone" name="phone" value={footerData.phone} onChange={handleChange} placeholder="Ex: (11) 99999-8888" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={footerData.email} onChange={handleChange} placeholder="Ex: contato@gemasbrilhantes.com" />
                </div>
                <div className="form-group">
                    <label htmlFor="whatsappNumber">Número do WhatsApp</label>
                    <input type="text" id="whatsappNumber" name="whatsappNumber" value={footerData.whatsappNumber} onChange={handleChange} placeholder="Ex: +5511999998888 (com código do país)" />
                </div>
                <div className="form-group">
                    <label htmlFor="instagram">Link do Instagram</label>
                    <input type="url" id="instagram" name="instagram" value={footerData.instagram} onChange={handleChange} placeholder="https://www.instagram.com/..." />
                </div>
                <div className="form-group">
                    <label htmlFor="facebook">Link do Facebook</label>
                    <input type="url" id="facebook" name="facebook" value={footerData.facebook} onChange={handleChange} placeholder="https://www.facebook.com/..." />
                </div>

                <button type="submit" className="save-btn" disabled={isSaving}>
                    {isSaving ? 'Salvando...' : 'Salvar Alterações do Rodapé'}
                </button>
            </form>
        </div>
    );
};

export default ManageFooter;