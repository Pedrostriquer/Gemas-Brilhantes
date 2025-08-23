// Dentro de src/Components/Admin/AdminBody/ManageHome/AboutSectionEditor/AboutSectionEditor.js

import React, { useState } from 'react';
import './AboutSectionEditor.css';

const AboutSectionEditor = ({ initialData, onSave }) => {
    const [aboutData, setAboutData] = useState(initialData);

    const handleChange = (field, value) => {
        setAboutData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="about-section-editor-wrapper">
            <h3 className="editor-title">Seção "Sobre a Empresa"</h3>
            <div className="form-group">
                <label>Título Principal</label>
                <input type="text" value={aboutData.title} onChange={e => handleChange('title', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Texto Principal</label>
                <textarea value={aboutData.mainText} onChange={e => handleChange('mainText', e.target.value)} rows="5" />
            </div>
            <div className="columns-grid">
                <div className="form-group">
                    <label>Título da Missão</label>
                    <input type="text" value={aboutData.missionTitle} onChange={e => handleChange('missionTitle', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Texto da Missão</label>
                    <textarea value={aboutData.missionText} onChange={e => handleChange('missionText', e.target.value)} rows="4" />
                </div>
                <div className="form-group">
                    <label>Título da Visão</label>
                    <input type="text" value={aboutData.visionTitle} onChange={e => handleChange('visionTitle', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Texto da Visão</label>
                    <textarea value={aboutData.visionText} onChange={e => handleChange('visionText', e.target.value)} rows="4" />
                </div>
            </div>
            <div className="editor-actions">
                <button onClick={() => onSave(aboutData)} className="save-btn">
                    Salvar Seção "Sobre"
                </button>
            </div>
        </div>
    );
};

export default AboutSectionEditor;