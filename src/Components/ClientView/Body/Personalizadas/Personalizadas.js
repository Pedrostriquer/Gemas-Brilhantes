// Dentro de src/Components/ClientView/Body/Personalizadas/Personalizadas.js

import React, { useState } from 'react';
import './Personalizadas.css';

const heroBackgroundImage = '/img/5d79cfd0c0afa879c1f11b1c26ccb5ce.jpg';

const Personalizadas = () => {
    // Dados para a SEÇÃO DE BENEFÍCIOS, incluindo a mídia para cada item
    const benefits = [
        { icon: 'fas fa-arrow-trend-up', title: 'Valorização do Capital', text: 'Ao encomendar uma jóia conosco, você tem acesso a materiais nobres com preços abaixo do mercado de grandes grifes, obtendo uma valorização imediata.', mediaSrc: '/img/PinDown.io_@venicevibes_1756268271.mp4', mediaType: 'video' },
        { icon: 'fas fa-shield-halved', title: 'Proteção Contra Crises', text: 'Enquanto ativos financeiros oscilam, o ouro e as pedras preciosas historicamente preservam seu valor, blindando seu capital.', mediaSrc: '/img/PinDown.io_@venicevibes_1756268271.mp4', mediaType: 'video' },
        { icon: 'fas fa-plane-departure', title: 'Mobilidade e Liquidez', text: 'Uma joia concentra grande valor em um objeto pequeno, fácil de transportar e negociar em diferentes mercados, sem burocracia.', mediaSrc: '/img/PinDown.io_@venicevibes_1756268271.mp4', mediaType: 'video' },
        { icon: 'fas fa-crown', title: 'Herança de Valor', text: 'Feita para durar gerações, sua joia se torna um legado que fortalece o patrimônio familiar e pode se tornar um ativo valioso em leilões futuros.', mediaSrc: '/img/PinDown.io_@venicevibes_1756268271.mp4', mediaType: 'video' },
        { icon: 'fas fa-gem', title: 'Controle de Materiais', text: 'Escolha metais nobres de maior pureza e pedras certificadas de alta qualidade, garantindo maior liquidez e reconhecimento no mercado.', mediaSrc: '/img/PinDown.io_@venicevibes_1756268271.mp4', mediaType: 'video' },
        { icon: 'fas fa-star', title: 'Exclusividade Incomparável', text: 'Tenha a certeza de possuir uma joia que é verdadeiramente sua, concebida para refletir sua essência e sem similar no mundo.', mediaSrc: '/img/PinDown.io_@venicevibes_1756268271.mp4', mediaType: 'video' }
    ];

    // Estado para controlar qual benefício está ativo
    const [activeIndex, setActiveIndex] = useState(0);
    const activeBenefit = benefits[activeIndex];

    const heroStyle = {
        backgroundImage: `linear-gradient(rgba(18, 44, 79, 0.5), rgba(18, 44, 79, 0.5)), url(${heroBackgroundImage})`
    };

    return (
        <div className="personalizadas-page-wrapper">
            {/* --- Seção 1: Hero Banner --- */}
            <section className="p-hero-section" style={heroStyle}>
                <div className="p-hero-content">
                    <h1 className="p-hero-title fonte-principal">Crie a Sua Peça Única</h1>
                    <p className="p-hero-subtitle">Gemas Brilhantes: Onde o brilho revela valor.</p>
                </div>
            </section>

            {/* --- Seção 2: Introdução ao Ateliê --- */}
            <section className="p-intro-section">
                <h2 className="p-section-title fonte-principal">Bem-vindo ao Ateliê da Gemas Brilhantes</h2>
                <p className="p-intro-text">
                    As joias sempre foram reconhecidas como símbolos de status, beleza e tradição. Mas, além do valor estético e emocional, elas também representam uma forma sólida de preservação e valorização do capital. Quando a peça é feita sob medida, esse potencial se torna ainda maior.
                </p>
                <p className="p-intro-text">
                    Em cada peça que criamos, enxergamos uma extensão da sua identidade. Na Gemas Brilhantes, o processo de criação é uma jornada compartilhada, garantindo que sua joia não seja apenas um acessório, mas uma verdadeira obra de arte que narra a sua história.
                </p>
            </section>
            
            {/* --- Seção 3: BENEFÍCIOS (LAYOUT DE 3 COLUNAS) --- */}
            <section className="p-benefits-section">
                <h2 className="p-section-title fonte-principal">Os Benefícios de Ter Uma Joia Feita Sob Medida</h2>
                <div className="p-benefits-interactive-layout-v3">
                    {/* Coluna 1: Display de Mídia */}
                    <div className="p-benefit-media-card-v3">
                        {activeBenefit.mediaType === 'video' ? (
                            <video key={activeBenefit.mediaSrc} src={activeBenefit.mediaSrc} autoPlay muted loop playsInline />
                        ) : (
                            <img key={activeBenefit.mediaSrc} src={activeBenefit.mediaSrc} alt={activeBenefit.title} />
                        )}
                    </div>
                    
                    {/* Coluna 2: Lista de Navegação (Botões) */}
                    <ul className="p-benefits-nav-list-v3">
                        {benefits.map((benefit, index) => (
                            <li 
                                key={benefit.title}
                                className={`p-benefit-nav-item ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <i className={benefit.icon}></i>
                                <span>{benefit.title}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Coluna 3: Display de Texto */}
                    <div className="p-benefit-text-content-v3" key={activeIndex}>
                        <h3>{activeBenefit.title}</h3>
                        <p>{activeBenefit.text}</p>
                    </div>
                </div>
            </section>

            {/* --- Seção 4: Citação de Impacto com Imagem --- */}
            <section className="p-quote-section">
                <div className="p-quote-content">
                    <p>
                        "Uma joia feita sob medida é muito mais do que um símbolo de status: é uma estratégia de valorização e preservação do capital. Ao unir a beleza do design exclusivo com a solidez dos metais e pedras preciosas, você transforma luxo em investimento inteligente."
                    </p>
                </div>
                <div className="p-quote-image-wrapper">
                    <img src="/img/1b44d2b73f9acece2634f26cd7ee202f.jpg" alt="Joia personalizada com design exclusivo" />
                </div>
            </section>

            {/* --- Seção 5: Como Funciona --- */}
            <section className="p-how-it-works-section">
                 <h2 className="p-section-title fonte-principal">Como Funciona Nossa Consultoria Personalizada</h2>
                 <div className="p-steps-container">
                    <div className="p-step"><span>1</span><p>Nos conte sua ideia preenchendo o formulário.</p></div>
                    <div className="p-step"><span>2</span><p>Um de nossos consultores especializados entrará em contato.</p></div>
                    <div className="p-step"><span>3</span><p>Juntos, vamos lapidar sua ideia e criar a joia perfeita.</p></div>
                 </div>
            </section>

            {/* --- Seção 6: Formulário de Contato --- */}
            <section className="p-form-section">
                <h2 className="p-section-title fonte-principal">Pronto para Começar a Criar Sua Joia?</h2>
                <p className="p-form-subtitle">Preencha o formulário abaixo e dê o primeiro passo rumo à sua peça única.</p>
                <form className="p-consult-form">
                    <input type="text" placeholder="Nome Completo" required />
                    <input type="email" placeholder="E-mail" required />
                    <input type="tel" placeholder="Telefone / WhatsApp" required />
                    <input type="tel" placeholder="Ocasião / Objetivo da Joia" required />
                    <textarea placeholder="Descreva a joia desejada (tipo, gemas, estilo, referências...)" rows="5" required></textarea>
                    <button type="submit" className="p-submit-button">Iniciar Consultoria Personalizada</button>
                </form>
                 <p className="p-form-footer-text">Após o envio, um de nossos especialistas entrará em contato em breve. Estamos ansiosos para criar um legado que atravessará gerações com você.</p>
            </section>
        </div>
    );
};

export default Personalizadas;