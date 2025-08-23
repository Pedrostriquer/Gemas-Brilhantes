// Dentro de src/Components/Admin/AdminBody/ManageHome/BannerEditor/BannerEditor.js

import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../../firebase/config';
import { v4 as uuidv4 } from 'uuid'; // Lembre-se de instalar com: npm install uuid
import './BannerEditor.css';

const BannerEditor = ({ initialData, onSave }) => {
    const [bannerData, setBannerData] = useState(initialData);
    const [isUploading, setIsUploading] = useState(false);

    const handleConfigChange = (field, value) => {
        const newValue = typeof value === 'boolean' ? value : Number(value);
        setBannerData(prev => ({ ...prev, [field]: newValue }));
    };

    const handleAddSlide = () => {
        const newSlide = { 
            id: uuidv4(), 
            type: 'image', 
            src: '', 
            link: '', 
            overlay: { logoSrc: '', title: '', subtitle: '', buttonText: '', buttonLink: '' } 
        };
        setBannerData(prev => ({ ...prev, slides: [...(prev.slides || []), newSlide] }));
    };

    const handleRemoveSlide = (id) => {
        setBannerData(prev => ({ ...prev, slides: prev.slides.filter(s => s.id !== id) }));
    };

    const handleSlideMediaChange = async (index, file) => {
        if (!file) return;
        setIsUploading(true);
        try {
            const fileRef = ref(storage, `banners/slides/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            const updatedSlides = [...bannerData.slides];
            const newType = file.type.startsWith('video') ? 'video' : 'image';
            updatedSlides[index] = { ...updatedSlides[index], src: downloadURL, type: newType };
            setBannerData(prev => ({ ...prev, slides: updatedSlides }));
        } catch (error) {
            console.error("Erro no upload de mídia:", error);
            alert("Falha ao enviar a mídia.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleOverlayLogoChange = async (index, file) => {
        if (!file) return;
        setIsUploading(true);
        try {
            const fileRef = ref(storage, `banners/logos/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            const updatedSlides = [...bannerData.slides];
            if (!updatedSlides[index].overlay) updatedSlides[index].overlay = {};
            updatedSlides[index].overlay.logoSrc = downloadURL;
            setBannerData(prev => ({ ...prev, slides: updatedSlides }));
        } catch (error) {
            console.error("Erro no upload da logo:", error);
            alert("Falha ao enviar a logo.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleOverlayChange = (index, field, value) => {
        const updatedSlides = [...bannerData.slides];
        if (!updatedSlides[index].overlay) updatedSlides[index].overlay = {};
        updatedSlides[index].overlay[field] = value;
        setBannerData(prev => ({ ...prev, slides: updatedSlides }));
    };

    const handleSlideLinkChange = (index, link) => {
        const updatedSlides = [...bannerData.slides];
        updatedSlides[index].link = link;
        setBannerData(prev => ({ ...prev, slides: updatedSlides }));
    };

    const handleSaveChanges = () => {
        // A função onSave do componente pai (ManageHome) já lida com o salvamento no Firebase.
        // Nós apenas passamos o estado local atualizado.
        onSave(bannerData);
    };

    return (
        <div className="banner-editor-wrapper">
            <h3 className="editor-title">Gerenciamento do Banner Principal</h3>
            
            <div className="editor-controls-grid">
                <div className="control-group">
                    <label>Largura (px)</label>
                    <input type="number" value={bannerData.width || ''} onChange={(e) => handleConfigChange('width', e.target.value)} />
                </div>
                <div className="control-group">
                    <label>Altura (px)</label>
                    <input type="number" value={bannerData.height || ''} onChange={(e) => handleConfigChange('height', e.target.value)} />
                </div>
                <div className="control-group">
                    <label>Velocidade (ms)</label>
                    <input type="number" value={bannerData.speed || '0'} onChange={(e) => handleConfigChange('speed', e.target.value)} step="0" />
                    <span>0 para desativar</span>
                </div>
                <div className="control-group checkbox">
                    <input type="checkbox" id="showArrows" checked={bannerData.showArrows || false} onChange={(e) => handleConfigChange('showArrows', e.target.checked)} />
                    <label htmlFor="showArrows">Exibir setas</label>
                </div>
            </div>

            <h4 className="slides-title">Slides</h4>
            <div className="slides-editor-list">
                {(bannerData.slides || []).map((slide, index) => (
                    <div className="slide-editor-card" key={slide.id}>
                        <div className="slide-media-controls">
                            <div className="slide-preview">
                                {slide.src ? (
                                    slide.type === 'video' ? <video src={slide.src} muted loop autoPlay playsInline /> : <img src={slide.src} alt="Preview" />
                                ) : (<div className="no-media-placeholder">Selecione Mídia</div>)}
                            </div>
                            <div className="slide-inputs">
                                <input type="file" id={`upload-${slide.id}`} className="hidden-file-input" onChange={(e) => handleSlideMediaChange(index, e.target.files[0])} accept="image/*,video/*"/>
                                <label htmlFor={`upload-${slide.id}`} className="upload-btn">
                                    <i className="fas fa-upload"></i> {isUploading ? 'Enviando...' : 'Mídia'}
                                </label>
                                <input type="text" value={slide.link || ''} onChange={(e) => handleSlideLinkChange(index, e.target.value)} placeholder="Link de redirecionamento"/>
                                <button onClick={() => handleRemoveSlide(slide.id)} className="remove-btn">&times;</button>
                            </div>
                        </div>
                        <div className="slide-overlay-controls">
                            <h5>Conteúdo Sobreposto (Opcional)</h5>
                            <div className="logo-upload-group">
                                <label htmlFor={`logo-upload-${slide.id}`}>Logo do Overlay</label>
                                <div className="logo-uploader">
                                    {slide.overlay?.logoSrc && <img src={slide.overlay.logoSrc} alt="Logo Preview" className="logo-preview"/>}
                                    <input type="file" id={`logo-upload-${slide.id}`} className="hidden-file-input" onChange={(e) => handleOverlayLogoChange(index, e.target.files[0])} accept="image/*"/>
                                    <label htmlFor={`logo-upload-${slide.id}`} className="upload-btn small">
                                        <i className="fas fa-image"></i> {slide.overlay?.logoSrc ? 'Trocar' : 'Enviar'}
                                    </label>
                                </div>
                            </div>
                            <input type="text" value={slide.overlay?.title || ''} onChange={(e) => handleOverlayChange(index, 'title', e.target.value)} placeholder="Título (ex: GemCash)" />
                            <input type="text" value={slide.overlay?.subtitle || ''} onChange={(e) => handleOverlayChange(index, 'subtitle', e.target.value)} placeholder="Subtítulo / Frase" />
                            <input type="text" value={slide.overlay?.buttonText || ''} onChange={(e) => handleOverlayChange(index, 'buttonText', e.target.value)} placeholder="Texto do Botão" />
                            <input type="text" value={slide.overlay?.buttonLink || ''} onChange={(e) => handleOverlayChange(index, 'buttonLink', e.target.value)} placeholder="Link do Botão (ex: /gemcash)" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="editor-actions">
                <button onClick={handleAddSlide} className="add-slide-btn">Adicionar Slide</button>
                <button onClick={handleSaveChanges} className="save-btn" disabled={isUploading}>
                    {isUploading ? 'Aguarde o upload...' : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    );
};

export default BannerEditor;