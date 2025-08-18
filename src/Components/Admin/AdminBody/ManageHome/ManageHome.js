// Dentro de src/Components/Admin/AdminBody/ManageHome/ManageHome.js

import React, { useState, useEffect } from 'react';
// --- CORREÇÃO: Importe 'setDoc' em vez de 'updateDoc' se for criar ou atualizar ---
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { db } from '../../../../firebase/config';
import BannerEditor from './BannerEditor/BannerEditor';
import './ManageHome.css';

const ManageHome = () => {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const docRef = doc(db, 'siteContent', 'homePage');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setHomeData(docSnap.data());
            } else {
                console.log("Documento 'homePage' não encontrado. Criando dados locais padrão.");
                setHomeData({
                    banner: { speed: 5000, showArrows: true, width: 1920, height: 550, slides: [] }
                });
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSaveChanges = async (updatedSectionData) => {
        setIsSaving(true);
        try {
            const docRef = doc(db, 'siteContent', 'homePage');
            
            // --- A MUDANÇA CRÍTICA ESTÁ AQUI ---
            // Usamos setDoc com { merge: true } para criar o documento se ele não existir,
            // ou atualizar os campos existentes se ele já existir.
            await setDoc(docRef, updatedSectionData, { merge: true });

            alert("Alterações salvas com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
            alert("Falha ao salvar. Verifique o console.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <p className="loading-message">Carregando dados da Home...</p>;
    }

    return (
        <div className="manage-home-container">
            <div className="manage-home-header">
                <h1 className="fonte-principal">Gerenciar Página Home</h1>
            </div>
            
            <div className="management-section">
                {homeData?.banner && (
                    <BannerEditor 
                        initialData={homeData.banner} 
                        onSave={(updatedBannerData) => handleSaveChanges({ banner: updatedBannerData })}
                    />
                )}
            </div>
        </div>
    );
};

export default ManageHome;