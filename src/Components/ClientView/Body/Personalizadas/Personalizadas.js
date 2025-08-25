// Dentro de src/Components/ClientView/Body/Personalizadas/Personalizadas.js

import React from 'react';
import './Personalizadas.css';

// Define o caminho para a imagem de fundo que está na pasta 'public'
const heroBackgroundImage = "/img/5d79cfd0c0afa879c1f11b1c26ccb5ce.jpg";

const Personalizadas = () => {
    // Dados para os cards de benefícios para manter o JSX limpo e organizado
    const benefits = [
        { icon: 'fas fa-arrow-trend-up', title: 'Valorização do Capital', text: 'Ao encomendar uma jóia conosco, você tem acesso a materiais nobres com preços abaixo do mercado de grandes grifes, obtendo uma valorização imediata.' },
        { icon: 'fas fa-shield-halved', title: 'Proteção Contra Crises', text: 'Enquanto ativos financeiros oscilam, o ouro e as pedras preciosas historicamente preservam seu valor, blindando seu capital.' },
        { icon: 'fas fa-plane-departure', title: 'Mobilidade e Liquidez', text: 'Uma joia concentra grande valor em um objeto pequeno, fácil de transportar e negociar em diferentes mercados, sem burocracia.' },
        { icon: 'fas fa-crown', title: 'Herança de Valor', text: 'Feita para durar gerações, sua joia se torna um legado que fortalece o patrimônio familiar e pode se tornar um ativo valioso em leilões futuros.' },
        { icon: 'fas fa-gem', title: 'Controle de Materiais', text: 'Escolha metais nobres de maior pureza e pedras certificadas de alta qualidade, garantindo maior liquidez e reconhecimento no mercado.' },
        { icon: 'fas fa-star', title: 'Exclusividade Incomparável', text: 'Tenha a certeza de possuir uma joia que é verdadeiramente sua, concebida para refletir sua essência e sem similar no mundo.' }
    ];

    // Cria o objeto de estilo que será aplicado ao 'section'
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
            
            {/* --- Seção 3: Grid de Benefícios --- */}
            <section className="p-benefits-section">
                <h2 className="p-section-title fonte-principal">Os Benefícios de Ter Uma Joia Feita Sob Medida</h2>
                <div className="p-benefits-grid">
                    {benefits.map(benefit => (
                        <div className="p-benefit-card" key={benefit.title}>
                            <i className={benefit.icon}></i>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Seção 4: Citação de Impacto --- */}
            <section className="p-quote-section">
                <p>
                    "Uma joia feita sob medida é muito mais do que um símbolo de status: é uma estratégia de valorização e preservação do capital. Ao unir a beleza do design exclusivo com a solidez dos metais e pedras preciosas, você transforma luxo em investimento inteligente."
                </p>
            </section>

            {/* --- Seção 5: Como Funciona --- */}
            <section className="p-how-it-works-section">
                 <h2 className="p-section-title fonte-principal">Como Funciona Nossa Consultoria<br/> Personalizada</h2>
                 <div className="p-steps-container">
                    <div className="p-step"><span>1</span><p>Preencha o formulário abaixo com seus dados de contato, informando a ocasião ou o objetivo da joia (como um presente de casamento, um marco pessoal, um elemento de patrimônio ou uso diário) e uma breve descrição da joia dos seus sonhos.</p></div>
                    <div className="p-step"><span>2</span><p>Um de nossos consultores especializados entrará em contato com você via WhatsApp, em horário agendado, para oferecer uma consultoria personalizada e aprofundada.</p></div>
                    <div className="p-step"><span>3</span><p>Juntos, vamos lapidar sua ideia e criar a joia perfeita, que atenda plenamente aos seus desejos e necessidades, com a garantia de excelência Gemas Brilhantes.</p></div>
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
                    <input type="text" placeholder="Ocasião / Objetivo da Joia..." required />
                    <textarea placeholder="Descreva a joia desejada (tipo, gemas, estilo, referências...)" rows="5" required></textarea>
                    <button type="submit" className="p-submit-button">Iniciar Consultoria Personalizada</button>
                </form>
                 <p className="p-form-footer-text">Após o envio, um de nossos especialistas entrará em contato em breve. Estamos ansiosos para criar um legado que atravessará gerações com você.</p>
            </section>
        </div>
    );
};

export default Personalizadas;