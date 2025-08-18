import React, { useState, useEffect, useCallback, useMemo } from 'react';
// 1. Importe o componente 'Link' do react-router-dom
import { Link } from 'react-router-dom';
import './BannerHome.css';

const BannerHome = ({ slides, speed, showArrows, width, height }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const validSlides = useMemo(() => 
        slides.filter(slide => slide && slide.src && slide.src.trim() !== ''), 
    [slides]);

    const goToNext = useCallback(() => {
        if (validSlides.length <= 1) return;
        const isLastSlide = currentIndex === validSlides.length - 1;
        setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
    }, [currentIndex, validSlides]);

    const goToPrevious = () => {
        if (validSlides.length <= 1) return;
        const isFirstSlide = currentIndex === 0;
        setCurrentIndex(isFirstSlide ? validSlides.length - 1 : currentIndex - 1);
    };

    useEffect(() => {
        if (speed > 0 && validSlides.length > 1) {
            const timer = setTimeout(goToNext, speed);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, goToNext, speed, validSlides.length]);

    if (!validSlides || validSlides.length === 0) {
        return null;
    }

    const renderSlideMedia = (slide) => {
        if (slide.type === 'video') {
            return <video className="slide-media" src={slide.src} autoPlay muted loop playsInline />;
        }
        return <img src={slide.src} alt={`Slide ${currentIndex + 1}`} className="slide-media" />;
    };

    return (
        <div className="banner-container" style={{ maxWidth: `${width}px`, height: `${height}px` }}>
            {showArrows && validSlides.length > 1 && (
                <>
                    <div className="banner-arrow left-arrow" onClick={goToPrevious}>&#10094;</div>
                    <div className="banner-arrow right-arrow" onClick={goToNext}>&#10095;</div>
                </>
            )}

            <div className="slides-container">
                {validSlides.map((slide, index) => (
                    <div className={`slide ${index === currentIndex ? 'active' : ''}`} key={slide.id}>
                        {index === currentIndex && (
                            slide.link ? (
                                // --- CORREÇÃO AQUI ---
                                // Substituímos <a> por <Link> e href por to.
                                // Removemos target="_blank" para navegar na mesma aba.
                                <Link to={slide.link}>
                                    {renderSlideMedia(slide)}
                                </Link>
                            ) : (
                                // Se não houver link, renderiza a mídia sem ser clicável
                                renderSlideMedia(slide)
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerHome;