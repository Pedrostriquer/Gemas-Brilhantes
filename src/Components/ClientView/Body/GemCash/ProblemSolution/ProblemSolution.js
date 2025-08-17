// Dentro de src/Components/ClientView/Body/GemCash/ProblemSolution/ProblemSolution.js

import React from 'react';
import './ProblemSolution.css';

const ProblemSolution = () => {
    return (
        <section className="ps-section">
            <div className="ps-container">
                <div className="ps-intro">
                    <h1 className="ps-main-title fonte-principal">O Futuro dos Ativos Reais</h1>
                    <p className="ps-subtitle">
                        Em um mundo de investimentos voláteis e digitais, a segurança de um ativo físico e valioso é inigualável. Veja por que GemCash redefine o conceito de investimento seguro.
                    </p>
                </div>
                
                <div className="comparison-wrapper">
                    <div className="comparison-card traditional">
                        <h3 className="card-title">Ativos Tradicionais</h3>
                        <ul className="features-list">
                            <li className="feature-item problem">
                                <i className="fas fa-chart-line"></i>
                                <div>
                                    <h4>Volatilidade Alta</h4>
                                    <p>Mercados que flutuam com notícias e especulações, colocando seu patrimônio em risco constante.</p>
                                </div>
                            </li>
                            <li className="feature-item problem">
                                <i className="fas fa-cloud"></i>
                                <div>
                                    <h4>Intangível e Abstrato</h4>
                                    <p>Você possui números em uma tela, sem a segurança de um bem físico que pode guardar ou tocar.</p>
                                </div>
                            </li>
                            <li className="feature-item problem">
                                <i className="fas fa-file-invoice-dollar"></i>
                                <div>
                                    <h4>Taxas Ocultas</h4>
                                    <p>Corretagens, taxas de administração e impostos que corroem seus lucros silenciosamente.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="comparison-card solution">
                        <h3 className="card-title">GemCash</h3>
                        <ul className="features-list">
                            <li className="feature-item success">
                                <i className="fas fa-shield-alt"></i>
                                <div>
                                    <h4>Valor Estável e Crescente</h4>
                                    <p>Gemas preciosas são reservas de valor milenares, com valorização consistente e baixa volatilidade.</p>
                                </div>
                            </li>
                            <li className="feature-item success">
                                <i className="fas fa-gem"></i>
                                <div>
                                    <h4>Posse Física Real</h4>
                                    <p>O ativo é seu. Receba em casa ou mantenha em custódia segura, com a garantia de posse total.</p>
                                </div>
                            </li>
                            <li className="feature-item success">
                                <i className="fas fa-search-dollar"></i>
                                <div>
                                    <h4>Transparência Total</h4>
                                    <p>Sem taxas surpresa. Você sabe exatamente o valor do seu ativo e os lucros que ele gera.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;