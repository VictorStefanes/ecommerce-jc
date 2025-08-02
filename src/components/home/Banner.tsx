"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Banner.scss';

interface BannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  cta: string;
}

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: BannerSlide[] = [
    {
      id: '1',
      title: '3 Camisetas por R$ 109',
      subtitle: 'Aproveite nossa super promoção',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=600&fit=crop',
      link: '/promocoes/3-por-109',
      cta: 'Comprar Agora'
    },
    {
      id: '2',
      title: '2 Conjuntos por R$ 199',
      subtitle: 'Linha feminina com desconto especial',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1200&h=600&fit=crop',
      link: '/feminino/2-conjuntos-199',
      cta: 'Ver Promoção'
    },
    {
      id: '3',
      title: 'Nova Coleção Apex',
      subtitle: 'Performance e estilo em um só produto',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
      link: '/colecoes/apex',
      cta: 'Descobrir'
    },
    {
      id: '4',
      title: 'Frete Grátis a partir de R$ 198',
      subtitle: 'Aproveite para renovar seu guarda-roupa',
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=600&fit=crop',
      link: '/produtos',
      cta: 'Ver Produtos'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="banner">
      <div className="banner-container">
        {/* Slides */}
        <div className="slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <div className="container">
                  <div className="slide-text">
                    <h1 className="slide-title">{slide.title}</h1>
                    {slide.subtitle && (
                      <p className="slide-subtitle">{slide.subtitle}</p>
                    )}
                    <a href={slide.link} className="btn btn-primary btn-lg slide-cta">
                      {slide.cta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="banner-nav banner-nav-prev" onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>
        <button className="banner-nav banner-nav-next" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="banner-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
