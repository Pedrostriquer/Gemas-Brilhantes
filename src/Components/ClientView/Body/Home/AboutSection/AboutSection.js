// Dentro de src/Components/ClientView/Body/Home/AboutSection/AboutSection.js

import React from 'react';
import './AboutSection.css';

const AboutSection = ({ aboutData }) => {
    // Se os dados não chegarem, o componente não quebra, apenas não aparece.
    if (!aboutData) {
        return null;
    }

    return (
        <div className="about-us-wrapper">
            <div className="about-us-container">
                {/* Seção Principal "Sobre" */}
                <div className="about-main-section">
                    <h2 className="section-title">{aboutData.title}</h2>
                    <p className="about-text">{aboutData.mainText}</p>
                </div>

                {/* Seção "Missão e Visão" */}
                <div className="mission-vision-section">
                    <div className="mission-box">
                        <h3 className="sub-section-title">{aboutData.missionTitle}</h3>
                        <p className="sub-text">{aboutData.missionText}</p>
                    </div>
                    <div className="vision-box">
                        <h3 className="sub-section-title">{aboutData.visionTitle}</h3>
                        <p className="sub-text">{aboutData.visionText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;