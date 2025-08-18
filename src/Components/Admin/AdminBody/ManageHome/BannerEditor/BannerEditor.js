// Dentro de src/Components/Admin/AdminBody/ManageHome/BannerEditor/BannerEditor.js

import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../../firebase/config';
import { v4 as uuidv4 } from 'uuid'; // Instale com: npm install uuid
import './BannerEditor.css';

const BannerEditor = ({ initialData, onSave }) => {
    const [bannerData, setBannerData] = useState(initialData);
    const [isUploading, setIsUploading] = useState(false);

    const handleConfigChange = (field, value) => {
        // Para checkboxes, o valor é 'checked', para outros é 'value'
        const newValue = typeof value === 'boolean' ? value : Number(value);
        setBannerData(prev => ({ ...prev, [field]: newValue }));
    };

    const handleAddSlide = () => {
        const newSlide = { id: uuidv4(), type: 'image', src: '', link: '' };
        setBannerData(prev => ({ ...prev, slides: [...(prev.slides || []), newSlide] }));
    };

    const handleRemoveSlide = (id) => {
        setBannerData(prev => ({ ...prev, slides: prev.slides.filter(s => s.id !== id) }));
    };

    const handleSlideMediaChange = async (index, file) => {
        if (!file) return;

        setIsUploading(true);
        try {
            // Passo 1: Fazer o upload do arquivo para o Firebase Storage
            const fileRef = ref(storage, `banners/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Passo 2: Atualizar o state local com a nova URL
            const updatedSlides = [...bannerData.slides];
            const newType = file.type.startsWith('video') ? 'video' : 'image';
            updatedSlides[index] = { ...updatedSlides[index], src: downloadURL, type: newType };
            setBannerData(prev => ({ ...prev, slides: updatedSlides }));
        } catch (error) {
            console.error("Erro no upload:", error);
            alert("Falha ao enviar a mídia.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSlideLinkChange = (index, link) => {
        const updatedSlides = [...bannerData.slides];
        updatedSlides[index].link = link;
        setBannerData(prev => ({ ...prev, slides: updatedSlides }));
    };

    return (
        <div className="banner-editor-wrapper">
            <h3 className="editor-title">Gerenciamento do Banner</h3>
            
            <div className="editor-controls-grid">
                <div className="control-group">
                    <label>Largura (px)</label>
                    <input type="number" value={bannerData.width} onChange={(e) => handleConfigChange('width', e.target.value)} />
                </div>
                <div className="control-group">
                    <label>Altura (px)</label>
                    <input type="number" value={bannerData.height} onChange={(e) => handleConfigChange('height', e.target.value)} />
                </div>
                <div className="control-group">
                    <label>Velocidade (ms)</label>
                    <input type="number" value={bannerData.speed} onChange={(e) => handleConfigChange('speed', e.target.value)} step="500" />
                    <span>0 para desativar</span>
                </div>
                <div className="control-group checkbox">
                    <input type="checkbox" id="showArrows" checked={bannerData.showArrows} onChange={(e) => handleConfigChange('showArrows', e.target.checked)} />
                    <label htmlFor="showArrows">Exibir setas</label>
                </div>
            </div>

            <h4 className="slides-title">Slides</h4>
            <div className="slides-editor-list">
                {(bannerData.slides || []).map((slide, index) => (
                    <div className="slide-editor-card" key={slide.id}>
                        <div className="slide-preview">
                            {slide.src ? (
                                slide.type === 'video' ? <video src={slide.src} muted loop autoPlay /> : <img src={slide.src} alt="Preview" />
                            ) : (<div className="no-media-placeholder">Selecione Mídia</div>)}
                        </div>
                        <div className="slide-inputs">
                            <input type="file" id={`upload-${slide.id}`} className="hidden-file-input" onChange={(e) => handleSlideMediaChange(index, e.target.files[0])} accept="image/*,video/*"/>
                            <label htmlFor={`upload-${slide.id}`} className="upload-btn">
                                <i className="fas fa-upload"></i> {isUploading ? 'Enviando...' : 'Mídia'}
                            </label>
                            <input type="text" value={slide.link} onChange={(e) => handleSlideLinkChange(index, e.target.value)} placeholder="Link de redirecionamento"/>
                            <button onClick={() => handleRemoveSlide(slide.id)} className="remove-btn">&times;</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="editor-actions">
                <button onClick={handleAddSlide} className="add-slide-btn">Adicionar Slide</button>
                <button onClick={() => onSave(bannerData)} className="save-btn" disabled={isUploading}>
                    {isUploading ? 'Aguarde o upload...' : 'Salvar Banner'}
                </button>
            </div>
        </div>
    );
};

export default BannerEditor;