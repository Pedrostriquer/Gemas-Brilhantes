// Dentro de src/Components/ClientV/Body/GemCash/IntroSection/IntroSection.js

import React, { useState, useEffect } from 'react';
import './IntroSection.css';

const IntroSection = () => {
    const [isTextVisible, setIsTextVisible] = useState(false);

    // useEffect agora usa um timer simples
    useEffect(() => {
        // Define um timer que muda o estado para 'true' após 2 segundos (2000 ms)
        const timer = setTimeout(() => {
            setIsTextVisible(true);
        }, 400);

        // Função de limpeza: cancela o timer se o componente for desmontado antes
        return () => clearTimeout(timer);
    }, []); // O array vazio [] garante que o efeito rode apenas uma vez

    return (
        <section className="intro-section-wrapper">
            <div className="intro-container">
                {/* --- Coluna Esquerda: Texto Fixo --- */}
                <div className="intro-fixed-text-col">
                    <h1 className="intro-title fonte-principal">
                        GemCash: Seu Brilho, Seu Benefício Mensal.
                    </h1>
                    <p className="intro-subtitle">
                        Adquira gemas de alto padrão certificadas e transforme seu patrimônio em remuneração financeira exclusiva, com total autonomia.
                    </p>
                </div>

                {/* --- Coluna Direita: Card com Vídeo --- */}
                <div className="intro-video-card-col">
                    <div className="video-card">
                        <video 
                            className="intro-video" 
                            autoPlay 
                            muted 
                            loop // Adicionamos loop para o vídeo continuar tocando
                            playsInline
                            src="/img/istockphoto-1453845561-640_adpp_is.mp4"
                        />
                        
                        {/* Conteúdo sobreposto ao vídeo */}
                        <div className="video-overlay-content">
                            <div className={`overlay-text ${isTextVisible ? 'visible' : ''}`}>
                                <h3 className='overlay-title'>Descubra o Poder do seu Ativo</h3>
                                <button className="overlay-button">
                                    Seu Brilho Lucrativo!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntroSection;