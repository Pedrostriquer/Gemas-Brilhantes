// Dentro de src/Components/ClientView/Body/Home/Home.js

import React from 'react';
import AboutSection from './AboutSection/AboutSection';
import CustomizationSection from './CustomizationSection/CustomizationSection';
import FaqSection from './FaqSection/FaqSection'; // A importação estava certa
import ReviewsSection from './ReviewsSection/ReviewsSection';

const Home = () => {
    // ---- DADOS QUE PERTENCEM À PÁGINA HOME ----
    const aboutData = {
        title: 'SOBRE A GEMAS BRILHANTES',
        mainText: 'Gemas Brilhantes é uma empresa especializada na comercialização de gemas preciosas com alto padrão de qualidade, brilho e procedência.\nNosso compromisso é oferecer pedras preciosas e materiais legítimos, selecionadas por especialistas, que encantam pela beleza e duram por gerações. E também ofertar oportunidades exclusivas no nosso ecossistema para blindar e valorizar o seu patrimônio.',
        missionTitle: 'MISSÃO',
        missionText: 'Oferecer gemas preciosas com excelência, proporcionando aos nossos clientes uma experiência de valor, confiança e transparência com nossos produtos.',
        visionTitle: 'VISÃO',
        visionText: 'Ser reconhecida como uma das principais referências no Brasil em gemas brilhantes, destacando-se pela qualidade, inovação, segurança e relacionamento com o cliente.'
    };

    const faqData = [
        { question: "As gemas são autênticas?", answer: "Sim, todas as nossas gemas são 100% autênticas e acompanham um certificado de procedência e qualidade, garantindo sua legitimidade e valor." },
        { question: "Posso personalizar uma joia que não está no catálogo?", answer: "Com certeza! Nosso serviço de personalização é feito para criar peças únicas. Entre em contato com nossa equipe para discutir sua ideia e transformá-la em uma joia exclusiva." },
        { question: "Qual o prazo de entrega?", answer: "Para peças prontas, o prazo de entrega varia de acordo com sua localidade. Para joias personalizadas, o prazo de criação e entrega será informado durante o processo de consulta, geralmente levando de 20 a 30 dias úteis." },
        { question: "Como funciona o investimento em GemCash?", answer: "O GemCash é um programa de investimento onde você adquire uma gema de alto valor. Você recebe a posse física da pedra e lucra com uma renda mensal fixa, além da valorização natural da gema ao longo do tempo." }
    ];

    const reviewsData = [
        { name: "Mariana Costa", comment: "A personalização do meu anel de noivado foi uma experiência incrível. A equipe entendeu perfeitamente o que eu queria e o resultado final foi além das minhas expectativas. Uma verdadeira obra de arte!" },
        { name: "João Almeida", comment: "Investi em uma esmeralda através do GemCash e estou muito satisfeito. O processo foi transparente e o atendimento é de primeira. Recomendo para quem busca segurança e valor." },
        { name: "Beatriz Lima", comment: "Qualidade impecável e beleza estonteante. Comprei um par de brincos de água-marinha e fiquei impressionada com o brilho e a pureza da gema. Sem dúvida, a melhor do mercado." }
    ];

    return (
        <>
            <AboutSection aboutData={aboutData} />
            <CustomizationSection />
            {/* CORREÇÃO DO ERRO DE DIGITAÇÃO AQUI */}
            <FaqSection faqData={faqData} />
            <ReviewsSection reviewsData={reviewsData} />
        </>
    );
};

export default Home;