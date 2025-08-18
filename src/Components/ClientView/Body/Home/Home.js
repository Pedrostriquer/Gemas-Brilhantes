// Dentro de src/Components/ClientView/Body/Home/Home.js

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import BannerHome from './BannerHome/BannerHome';
import AboutSection from './AboutSection/AboutSection';
import FeatureSection from './FeatureSection/FeatureSection'; // Mantém a importação correta
import FaqSection from './FaqSection/FaqSection';
import ReviewsSection from './ReviewsSection/ReviewsSection';

const Home = () => {
    // Estado para armazenar os dados da Home vindos do Firebase
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Efeito para buscar os dados dinâmicos da página (atualmente, só o banner)
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const docRef = doc(db, 'siteContent', 'homePage');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setHomeData(docSnap.data());
                } else {
                    console.log("Nenhum dado dinâmico para a Home encontrado no Firestore!");
                }
            } catch (error) {
                console.error("Erro ao buscar dados da Home:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    // Dados estáticos que ainda não estão no admin
    const aboutData = {
        title: 'SOBRE A GEMAS BRILHANTES', mainText: 'Gemas Brilhantes é uma empresa especializada na comercialização de gemas preciosas com alto padrão de qualidade, brilho e procedência.\nNosso compromisso é oferecer pedras preciosas e materiais legítimos, selecionadas por especialistas, que encantam pela beleza e duram por gerações. E também ofertar oportunidades exclusivas no nosso ecossistema para blindar e valorizar o seu patrimônio.', missionTitle: 'MISSÃO', missionText: 'Oferecer gemas preciosas com excelência, proporcionando aos nossos clientes uma experiência de valor, confiança e transparência com nossos produtos.', visionTitle: 'VISÃO', visionText: 'Ser reconhecida como uma das principais referências no Brasil em gemas brilhantes, destacando-se pela qualidade, inovação, segurança e relacionamento com o cliente.'
    };
    const faqData = [
        { question: "As gemas são autênticas?", answer: "Sim, todas as nossas gemas são 100% autênticas e acompanham um certificado de procedência e qualidade, garantindo sua legitimidade e valor." }, { question: "Posso personalizar uma joia que não está no catálogo?", answer: "Com certeza! Nosso serviço de personalização é feito para criar peças únicas. Entre em contato com nossa equipe para discutir sua ideia e transformá-la em uma joia exclusiva." }, { question: "Qual o prazo de entrega?", answer: "Para peças prontas, o prazo de entrega varia de acordo com sua localidade. Para joias personalizadas, o prazo de criação e entrega será informado durante o processo de consulta, geralmente levando de 20 a 30 dias úteis." }, { question: "Como funciona o investimento em GemCash?", answer: "O GemCash é um programa de investimento onde você adquire uma gema de alto valor. Você recebe a posse física da pedra e lucra com uma renda mensal fixa, além da valorização natural da gema ao longo do tempo." }
    ];
    const reviewsData = [
        { name: "Mariana Costa", comment: "A personalização do meu anel de noivado foi uma experiência incrível. A equipe entendeu perfeitamente o que eu queria e o resultado final foi além das minhas expectativas. Uma verdadeira obra de arte!" }, { name: "João Almeida", comment: "Investi em uma esmeralda através do GemCash e estou muito satisfeito. O processo foi transparente e o atendimento é de primeira. Recomendo para quem busca segurança e valor." }, { name: "Beatriz Lima", comment: "Qualidade impecável e beleza estonteante. Comprei um par de brincos de água-marinha e fiquei impressionada com o brilho e a pureza da gema. Sem dúvida, a melhor do mercado." }
    ];

    if (loading) {
        return <div className="loading-message">Carregando página inicial...</div>;
    }

    return (
        <>
            {/* O BannerHome volta a receber os dados dinâmicos do estado 'homeData' */}
            {homeData?.banner && (
                <BannerHome 
                    slides={homeData.banner.slides || []} 
                    speed={homeData.banner.speed}
                    showArrows={homeData.banner.showArrows}
                    width={homeData.banner.width}
                    height={homeData.banner.height}
                />
            )}
            
            <AboutSection aboutData={aboutData} />
            

            {/* Seção 2: Gemas (Texto à direita, Imagem à esquerda) */}
            <FeatureSection 
                layout="reverse"
                title="Gemas Brilhantes Selecionadas"
                text="Explore nossa curadoria de gemas raras e certificadas. Cada pedra é selecionada por especialistas para garantir o máximo de brilho, pureza e valor de mercado."
                buttonText="Saiba Mais"
                buttonLink="/gemas-brilhantes"
                mediaSrc="/img/bannergemas3.png"
                mediaType="image"
            />

            <FeatureSection 
                layout="default" 
                title="GemCash: Seu Brilho, Seu Benefício"
                text="Transforme a posse de gemas preciosas em um fluxo de renda mensal. Com o GemCash, seu patrimônio não apenas se valoriza, mas também gera lucros constantes com total segurança e autonomia."
                buttonText="Conheça o GemCash"
                buttonLink="/gemcash"
                mediaSrc="/img/istockphoto-1453845561-640_adpp_is.mp4"
                mediaType="video"
            />

            {/* Seção 3: Joias (Texto à esquerda, Imagem à direita) */}
             <FeatureSection 
                layout="reverse"
                title="Joias que Contam Histórias"
                text="Descubra coleções de anéis, colares e brincos que combinam design atemporal com a beleza exuberante das gemas brasileiras. Peças criadas para celebrar os momentos importantes da sua vida."
                buttonText="Saiba Mais"
                buttonLink="/joias"
                mediaSrc="/img/bannerjoias3.mp4"
                mediaType="video"
            />

            <FaqSection faqData={faqData} />
            <ReviewsSection reviewsData={reviewsData} />
        </>
    );
};

export default Home;