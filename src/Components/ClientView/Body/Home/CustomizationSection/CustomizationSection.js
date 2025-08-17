// Dentro de src/Components/ClientView/Body/Home/CustomizationSection/CustomizationSection.js

import React from 'react';
import './CustomizationSection.css';

const CustomizationSection = () => {
    return (
        <section className="customization-section">
            <div className="customization-container">
                {/* --- Coluna da Mídia (agora com vídeo) --- */}
                <div className="customization-media-col">
                    {/* 1. Troca <img> por <video> e adiciona as propriedades necessárias */}
                    <video 
                        className="customization-video"
                        src="/img/4004214-hd_1920_1080_25fps.mp4" 
                        autoPlay 
                        loop 
                        muted
                        playsInline // Garante compatibilidade com mobile
                    />
                </div>

                {/* --- Coluna do Texto --- */}
                <div className="customization-text-col">
                    <h2 className="customization-title fonte-principal">
                        Personalize Sua Joia, Crie Sua História
                    </h2>
                    <p className="customization-text">
                        Na Gemas Brilhantes, transformamos sua visão em realidade. Oferecemos um serviço exclusivo de personalização onde você pode criar uma peça única, que reflete seu estilo e suas memórias mais preciosas. Nossos especialistas trabalham ao seu lado, desde o esboço inicial até a escolha da gema perfeita, garantindo uma criação que é verdadeiramente sua.
                    </p>
                    <button className="customization-button">
                        Comece a Criar
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CustomizationSection;