// Dentro de src/Components/Admin/AdminBody/ManageHome/FeatureSectionsEditor/FeatureSectionsEditor.js

import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../../firebase/config';
import './FeatureSectionsEditor.css';

const FeatureSectionsEditor = ({ initialData, onSave }) => {
    // Estado local para gerenciar os dados enquanto edita
    const [sections, setSections] = useState(initialData);
    const [isUploading, setIsUploading] = useState(false);

    // Função genérica para atualizar qualquer campo de texto
    const handleChange = (sectionKey, field, value) => {
        setSections(prev => ({
            ...prev,
            [sectionKey]: {
                ...prev[sectionKey],
                [field]: value
            }
        }));
    };

    // Função para upload de mídia (imagem ou vídeo)
    const handleMediaChange = async (sectionKey, file) => {
        if (!file) return;
        setIsUploading(true);
        try {
            const fileRef = ref(storage, `home_features/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            const newType = file.type.startsWith('video') ? 'video' : 'image';
            
            // Atualiza a URL e o tipo da mídia no estado local
            handleChange(sectionKey, 'mediaSrc', downloadURL);
            handleChange(sectionKey, 'mediaType', newType);

        } catch (error) {
            console.error("Erro no upload:", error);
            alert("Falha ao enviar a mídia.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="feature-sections-editor-wrapper">
            <h3 className="editor-title">Gerenciamento das Seções de Destaque</h3>
            
            <div className="sections-container">
                {/* Editor para a seção de Gemas */}
                <div className="feature-editor-card">
                    <h4>Seção "Gemas Brilhantes"</h4>
                    <div className="form-group">
                        <label>Título</label>
                        <input type="text" value={sections.gemas.title} onChange={(e) => handleChange('gemas', 'title', e.target.value)} />
                    </div>
                     <div className="form-group">
                        <label>Texto</label>
                        <textarea value={sections.gemas.text} onChange={(e) => handleChange('gemas', 'text', e.target.value)} rows="4" />
                    </div>
                    <div className="form-group">
                        <label>Texto do Botão</label>
                        <input type="text" value={sections.gemas.buttonText} onChange={(e) => handleChange('gemas', 'buttonText', e.target.value)} />
                    </div>
                    <div className="form-group media-group">
                        <label>Mídia</label>
                        {sections.gemas.mediaSrc && <div className="media-preview">{sections.gemas.mediaType === 'video' ? <video src={sections.gemas.mediaSrc} muted loop autoPlay /> : <img src={sections.gemas.mediaSrc} alt="Preview"/>}</div>}
                        <input type="file" id="gemas-media" className="hidden-file-input" onChange={(e) => handleMediaChange('gemas', e.target.files[0])} accept="image/*,video/*" />
                        <label htmlFor="gemas-media" className="upload-btn small"><i className="fas fa-upload"></i> Trocar Mídia</label>
                    </div>
                </div>

                {/* Editor para a seção de GemCash */}
                <div className="feature-editor-card">
                   <h4>Seção "GemCash"</h4>
                    <div className="form-group">
                        <label>Título</label>
                        <input type="text" value={sections.gemcash.title} onChange={(e) => handleChange('gemcash', 'title', e.target.value)} />
                    </div>
                     <div className="form-group">
                        <label>Texto</label>
                        <textarea value={sections.gemcash.text} onChange={(e) => handleChange('gemcash', 'text', e.target.value)} rows="4" />
                    </div>
                    <div className="form-group">
                        <label>Texto do Botão</label>
                        <input type="text" value={sections.gemcash.buttonText} onChange={(e) => handleChange('gemcash', 'buttonText', e.target.value)} />
                    </div>
                     <div className="form-group media-group">
                        <label>Mídia</label>
                        {sections.gemcash.mediaSrc && <div className="media-preview">{sections.gemcash.mediaType === 'video' ? <video src={sections.gemcash.mediaSrc} muted loop autoPlay /> : <img src={sections.gemcash.mediaSrc} alt="Preview"/>}</div>}
                        <input type="file" id="gemcash-media" className="hidden-file-input" onChange={(e) => handleMediaChange('gemcash', e.target.files[0])} accept="image/*,video/*" />
                        <label htmlFor="gemcash-media" className="upload-btn small"><i className="fas fa-upload"></i> Trocar Mídia</label>
                    </div>
                </div>

                {/* Editor para a seção de Joias */}
                <div className="feature-editor-card">
                   <h4>Seção "Joias"</h4>
                    <div className="form-group">
                        <label>Título</label>
                        <input type="text" value={sections.joias.title} onChange={(e) => handleChange('joias', 'title', e.target.value)} />
                    </div>
                     <div className="form-group">
                        <label>Texto</label>
                        <textarea value={sections.joias.text} onChange={(e) => handleChange('joias', 'text', e.target.value)} rows="4" />
                    </div>
                    <div className="form-group">
                        <label>Texto do Botão</label>
                        <input type="text" value={sections.joias.buttonText} onChange={(e) => handleChange('joias', 'buttonText', e.target.value)} />
                    </div>
                     <div className="form-group media-group">
                        <label>Mídia</label>
                        {sections.joias.mediaSrc && <div className="media-preview">{sections.joias.mediaType === 'video' ? <video src={sections.joias.mediaSrc} muted loop autoPlay /> : <img src={sections.joias.mediaSrc} alt="Preview"/>}</div>}
                        <input type="file" id="joias-media" className="hidden-file-input" onChange={(e) => handleMediaChange('joias', e.target.files[0])} accept="image/*,video/*" />
                        <label htmlFor="joias-media" className="upload-btn small"><i className="fas fa-upload"></i> Trocar Mídia</label>
                    </div>
                </div>
            </div>

             <div className="editor-actions">
                <button onClick={() => onSave(sections)} className="save-btn" disabled={isUploading}>
                    {isUploading ? 'Aguarde o upload...' : 'Salvar Seções de Destaque'}
                </button>
            </div>
        </div>
    );
};

export default FeatureSectionsEditor;