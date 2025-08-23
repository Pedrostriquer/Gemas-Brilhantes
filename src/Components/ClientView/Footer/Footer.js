// Dentro de src/Components/ClientView/Footer/Footer.js

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import './Footer.css';

const Footer = () => {
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        const fetchFooterData = async () => {
            const docRef = doc(db, 'siteContent', 'footer');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFooterData(docSnap.data());
            } else {
                console.log("Nenhum dado do Footer encontrado no Firestore.");
            }
        };
        fetchFooterData();
    }, []);

    if (!footerData) {
        return null; // Não renderiza nada se não houver dados
    }

    // Prepara o link do WhatsApp
    const whatsappLink = `https://wa.me/${(footerData.whatsappNumber || '').replace(/\D/g, '')}`;

    return (
        <footer className="footer-wrapper">
            <div className="footer-container">
                {/* Coluna 1: Entre em Contato */}
                <div className="footer-column">
                    <h3 className="footer-title fonte-principal">Entre em Contato</h3>
                    <p className="footer-text">Telefone: {footerData.phone}</p>
                    <a href={`mailto:${footerData.email}`} className="footer-link">
                        Email: {footerData.email}
                    </a>
                </div>

                {/* Coluna 2: Mensagem WhatsApp */}
                <div className="footer-column">
                    <h3 className="footer-title fonte-principal">Envie sua mensagem</h3>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                        <i className="fab fa-whatsapp"></i>
                        <span>Conversar no WhatsApp</span>
                    </a>
                </div>

                {/* Coluna 3: Redes Sociais */}
                <div className="footer-column">
                    <h3 className="footer-title fonte-principal">Redes Sociais</h3>
                    <div className="social-links">
                        {footerData.instagram && (
                             <a href={footerData.instagram} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                        )}
                        {footerData.facebook && (
                            <a href={footerData.facebook} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Gemas Brilhantes. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;