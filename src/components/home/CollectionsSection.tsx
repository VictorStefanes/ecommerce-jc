"use client";

import React from 'react';
import './CollectionsSection.scss';

const CollectionsSection: React.FC = () => {
  const collections = [
    {
      id: 'apex',
      name: 'Apex Performance',
      description: 'Alta performance para treinos intensos',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      link: '/colecoes/apex'
    },
    {
      id: 'seamless',
      name: 'Seamless',
      description: 'Conforto sem costuras',
      image: 'https://images.unsplash.com/photo-1506629905996-617f86ef4ba3?w=600&h=400&fit=crop',
      link: '/colecoes/seamless'
    },
    {
      id: 'oversized',
      name: 'Oversized',
      description: 'Estilo urbano e despojado',
      image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=600&h=400&fit=crop',
      link: '/colecoes/oversized'
    },
    {
      id: 'essential',
      name: 'Essential',
      description: 'Básicos do dia a dia',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop',
      link: '/colecoes/essential'
    },
    {
      id: 'inverno',
      name: 'Inverno 2025',
      description: 'Aquecimento e estilo',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=400&fit=crop',
      link: '/colecoes/inverno'
    },
    {
      id: 'thermaflow',
      name: 'ThermaFlow',
      description: 'Tecnologia térmica avançada',
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=400&fit=crop',
      link: '/colecoes/thermaflow'
    }
  ];

  return (
    <section className="collections-section">
      <div className="container">
        <h2 className="section-title">Nossas Coleções</h2>
        <p className="section-subtitle">
          Descubra as coleções exclusivas da JC Atacados, desenvolvidas para diferentes estilos e necessidades
        </p>
        
        <div className="collections-grid">
          {collections.map((collection) => (
            <div key={collection.id} className="collection-card">
              <a href={collection.link} className="collection-link">
                <div className="collection-image">
                  <img src={collection.image} alt={collection.name} />
                  <div className="collection-overlay">
                    <div className="collection-content">
                      <h3>{collection.name}</h3>
                      <p>{collection.description}</p>
                      <span className="explore-btn">Explorar Coleção</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
