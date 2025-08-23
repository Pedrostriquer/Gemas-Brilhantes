// Dentro de src/Components/Admin/AdminBody/ManageHome/ManageHome.js

import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { db } from '../../../../firebase/config';
import BannerEditor from './BannerEditor/BannerEditor';
import AboutSectionEditor from './AboutSectionEditor/AboutSectionEditor';
import FeatureSectionsEditor from './FeatureSectionsEditor/FeatureSectionsEditor';
import FaqEditor from './FaqEditor/FaqEditor';
import ReviewsEditor from './ReviewsEditor/ReviewsEditor';
import './ManageHome.css';

// Estrutura de dados padrão completa para a página Home.
// Garante que o painel funcione mesmo se o documento no Firestore estiver vazio ou incompleto.
const defaultHomeData = {
    banner: { speed: 5000, showArrows: true, width: 1920, height: 550, slides: [] },
    aboutSection: {
        title: 'SOBRE A GEMAS BRILHANTES', 
        mainText: '', 
        missionTitle: 'MISSÃO', 
        missionText: '', 
        visionTitle: 'VISÃO', 
        visionText: ''
    },
    featureSections: {
        gemas: { title: 'Gemas Brilhantes Selecionadas', text: '', buttonText: 'Saiba Mais', mediaSrc: '', mediaType: 'image' },
        gemcash: { title: 'GemCash: Seu Brilho, Seu Benefício', text: '', buttonText: 'Conheça o GemCash', mediaSrc: '', mediaType: 'image' },
        joias: { title: 'Joias que Contam Histórias', text: '', buttonText: 'Saiba Mais', mediaSrc: '', mediaType: 'image' }
    },
    faq: [],
    reviews: []
};

const ManageHome = () => {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const docRef = doc(db, 'siteContent', 'homePage');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const firestoreData = docSnap.data();
                // Mescla os dados do Firestore com a estrutura padrão para garantir que todos os campos existam
                setHomeData({ 
                    banner: { ...defaultHomeData.banner, ...firestoreData.banner },
                    aboutSection: { ...defaultHomeData.aboutSection, ...firestoreData.aboutSection },
                    featureSections: { ...defaultHomeData.featureSections, ...firestoreData.featureSections },
                    faq: firestoreData.faq || defaultHomeData.faq,
                    reviews: firestoreData.reviews || defaultHomeData.reviews
                });
            } else {
                console.log("Documento 'homePage' não encontrado. Usando dados locais padrão.");
                setHomeData(defaultHomeData);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSaveChanges = async (updatedSectionData) => {
        try {
            const docRef = doc(db, 'siteContent', 'homePage');
            // 'merge: true' é crucial para atualizar apenas os campos enviados, sem sobrescrever o resto
            await setDoc(docRef, updatedSectionData, { merge: true });
            alert("Alterações salvas com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
            alert("Falha ao salvar. Verifique o console.");
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
                        onSave={(data) => handleSaveChanges({ banner: data })}
                    />
                )}
            </div>
            
            <div className="management-section">
                 {homeData?.aboutSection && (
                    <AboutSectionEditor 
                        initialData={homeData.aboutSection} 
                        onSave={(data) => handleSaveChanges({ aboutSection: data })}
                    />
                )}
            </div>

            <div className="management-section">
                {homeData?.featureSections && (
                    <FeatureSectionsEditor 
                        initialData={homeData.featureSections} 
                        onSave={(data) => handleSaveChanges({ featureSections: data })}
                    />
                )}
            </div>

            <div className="management-section">
                {homeData && (
                    <FaqEditor 
                        initialData={homeData.faq} 
                        onSave={(data) => handleSaveChanges({ faq: data })}
                    />
                )}
            </div>

            <div className="management-section">
                {homeData && (
                    <ReviewsEditor
                        initialData={homeData.reviews}
                        onSave={(data) => handleSaveChanges({ reviews: data })}
                    />
                )}
            </div>
        </div>
    );
};

export default ManageHome;