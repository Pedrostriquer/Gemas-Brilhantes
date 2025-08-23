// Dentro de src/Components/ClientView/Body/GemCash/GemCash.js

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import IntroSection from './IntroSection/IntroSection';
import ProblemSolution from './ProblemSolution/ProblemSolution';
import HowItWorks from './HowItWorks/HowItWorks';

// --- A CORREÇÃO COMEÇA AQUI ---
// 1. Defina a mesma estrutura de dados padrão que temos no admin.
// Isso garante que o componente saiba como os dados "deveriam" ser.
const defaultGemCashData = {
    intro: { title: "", subtitle: "" },
    problemSolution: {
        mainTitle: "",
        subtitle: "",
        traditionalTitle: "",
        traditionalPoints: [], // Garante que a propriedade .map sempre existirá
        solutionTitle: "",
        solutionPoints: []   // Garante que a propriedade .map sempre existirá
    },
    howItWorks: {
        mainTitle: "",
        details: [] // Garante que a propriedade .map sempre existirá
    }
};

const GemCash = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const docRef = doc(db, 'siteContent', 'gemCashPage');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const firestoreData = docSnap.data();
                // 2. Mescla os dados do Firestore com a estrutura padrão.
                // Isso previne o erro 'cannot read properties of undefined'.
                setPageData({
                    intro: { ...defaultGemCashData.intro, ...firestoreData.intro },
                    problemSolution: { ...defaultGemCashData.problemSolution, ...firestoreData.problemSolution },
                    howItWorks: { ...defaultGemCashData.howItWorks, ...firestoreData.howItWorks }
                });
            } else {
                console.log("Nenhum dado para a página GemCash encontrado! Usando estrutura vazia.");
                setPageData(defaultGemCashData); // Usa a estrutura padrão se nada for encontrado
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Carregando...</div>;
    }

    // Se não houver dados, renderiza uma mensagem amigável em vez de quebrar
    if (!pageData) {
        return <div>Nenhum conteúdo para esta página foi configurado ainda.</div>;
    }

    return (
        <>
            <IntroSection data={pageData.intro} />
            <ProblemSolution data={pageData.problemSolution} />
            <HowItWorks data={pageData.howItWorks} />
        </>
    );
};

export default GemCash;