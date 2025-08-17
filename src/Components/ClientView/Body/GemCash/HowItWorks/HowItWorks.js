// Dentro de src/Components/ClientView/Body/GemCash/HowItWorks/HowItWorks.js

import React, { useState } from 'react';
import './HowItWorks.css';

const detailsData = [
    { icon: 'fas fa-certificate', title: 'Gemas Certificadas', characteristic: 'Aquisição de diamantes e gemas de alto padrão (turmalinas, safiras, rubis, esmeraldas, tanzanitas).', benefit: 'Autenticidade e valor de mercado garantidos por certificações globais (GIA, IGI, IGL entre outros).' },
    { icon: 'fas fa-user-shield', title: 'Posse Autônoma', characteristic: 'Escolha entre receber a gema fisicamente (com seguro) ou mantê-la sob custódia.', benefit: 'Total controle sobre seu patrimônio e flexibilidade de uso.' },
    { icon: 'fas fa-hand-holding-usd', title: 'Remuneração Mensal', characteristic: 'Receba um benefício financeiro mensal sobre o valor da aquisição por 12 meses (com opções de prazos estendidos).', benefit: 'Um fluxo de renda constante que agrega valor ao seu patrimônio.' },
    { icon: 'fas fa-random', title: 'Flexibilidade no Recebimento', characteristic: 'Decida mensalmente entre sacar (modelo simples) ou acumular (modelo composto) a remuneração.', benefit: 'Adapte seus ganhos, potencializando retornos ou obtendo liquidez imediata.' },
    { icon: 'fas fa-desktop', title: 'Transparência Online', characteristic: 'Acesse sua Área do Cliente para acompanhar remunerações e gerenciar sua compra.', benefit: 'Controle e visibilidade total, com processo transparente.' },
    { icon: 'fas fa-flag-checkered', title: 'Liberdade Final', characteristic: 'Ao final do período, devolva a gema e reaveja o valor integral, ou mantenha-a.', benefit: 'Máxima autonomia na decisão do destino do seu ativo.' }
];

const HowItWorks = () => {
    // Estado para controlar qual item está selecionado (começa com o primeiro)
    const [activeIndex, setActiveIndex] = useState(0);

    const activeItem = detailsData[activeIndex];

    return (
        <section className="how-it-works-section">
            <div className="how-it-works-container">
                <h2 className="hiw-title fonte-principal">
                    GemCash em Detalhes: Seu Patrimônio Brilhante e Lucrativo
                </h2>
                <div className="interactive-layout">
                    {/* Coluna Esquerda: A Navegação */}
                    <ul className="features-nav-list">
                        {detailsData.map((item, index) => (
                            <li 
                                key={item.title}
                                className={`nav-item ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <i className={item.icon}></i>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Coluna Direita: O Conteúdo Detalhado */}
                    <div className="feature-content-display" key={activeIndex}>
                        <h3 className="content-title">{activeItem.title}</h3>
                        <div className="content-text-block">
                            <strong>Característica:</strong>
                            <p>{activeItem.characteristic}</p>
                        </div>
                        <div className="content-text-block">
                            <strong>Benefício:</strong>
                            <p>{activeItem.benefit}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;