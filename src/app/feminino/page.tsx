"use client";

import React from 'react';
import CategoryHeader from '../../components/category/CategoryHeader';
import ProductGrid from '../../components/product/ProductGrid';
import './feminino.scss';

export default function FemininoPage() {
  const femininoProducts = [
    {
      id: 'fem-1',
      name: 'Conjunto Seamless Premium',
      price: 89.90,
      originalPrice: 129.90,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Seamless'
    },
    {
      id: 'fem-2',
      name: 'Legging High Performance',
      price: 79.90,
      originalPrice: 109.90,
      image: 'https://images.unsplash.com/photo-1506629905607-c7bdf83e8bf6?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Performance'
    },
    {
      id: 'fem-3',
      name: 'Top Feminino Basic',
      price: 39.90,
      originalPrice: 59.90,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Basic'
    },
    {
      id: 'fem-4',
      name: 'Cropped Dry Fit Essential',
      price: 45.90,
      originalPrice: 69.90,
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Essential'
    },
    {
      id: 'fem-5',
      name: 'Short Feminino Performance',
      price: 49.90,
      originalPrice: 79.90,
      image: 'https://images.unsplash.com/photo-1506629905607-c7bdf83e8bf6?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Performance'
    },
    {
      id: 'fem-6',
      name: 'Conjunto Inverno Feminino',
      price: 119.90,
      originalPrice: 179.90,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Inverno'
    }
  ];

  return (
    <div className="feminino-page">
      <CategoryHeader 
        title="FEMININO" 
        subtitle="Moda esportiva feminina com estilo e conforto"
        bannerImage="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1200&h=400&fit=crop"
      />
      
      <div className="container">
        <div className="category-sections">
          <div className="section-grid">
            <div className="category-section">
              <h3>PRODUTOS</h3>
              <div className="category-links">
                <a href="/feminino/conjunto-inverno">Conjunto Inverno</a>
                <a href="/feminino/camisetas-cropped-regatas">Camisetas/Cropped/Regatas</a>
                <a href="/feminino/legging">Legging</a>
                <a href="/feminino/short">Short</a>
                <a href="/feminino/top">Top</a>
                <a href="/feminino/conjuntos">Conjuntos</a>
                <a href="/feminino/meia-feminina">Meia Feminina</a>
              </div>
            </div>

            <div className="category-section">
              <h3>PROMOÇÕES</h3>
              <div className="category-links">
                <a href="/feminino/77-off">77% OFF</a>
                <a href="/feminino/3-pecas-189">03 Peças R$189</a>
                <a href="/feminino/2-conjuntos-199">02 Conjuntos R$199</a>
                <a href="/feminino/3-camisetas-109">03 Camisetas R$109</a>
              </div>
            </div>

            <div className="category-section">
              <h3>COLEÇÕES</h3>
              <div className="category-links">
                <a href="/colecoes/inverno">Inverno</a>
                <a href="/colecoes/basic">Basic</a>
                <a href="/colecoes/seamless">Seamless</a>
              </div>
            </div>
          </div>
        </div>

        <div className="promo-highlights">
          <div className="promo-cards">
            <div className="promo-card">
              <img src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop" alt="77% OFF" />
              <div className="promo-info">
                <h3>Até 77% OFF</h3>
                <p>Liquidação imperdível</p>
                <a href="/feminino/77-off" className="btn-promo">Ver Ofertas</a>
              </div>
            </div>
            <div className="promo-card">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop" alt="3 Peças por R$189" />
              <div className="promo-info">
                <h3>3 Peças por R$189</h3>
                <p>Economia garantida</p>
                <a href="/feminino/3-pecas-189" className="btn-promo">Comprar</a>
              </div>
            </div>
            <div className="promo-card">
              <img src="https://images.unsplash.com/photo-1506629905607-c7bdf83e8bf6?w=400&h=300&fit=crop" alt="2 Conjuntos por R$199" />
              <div className="promo-info">
                <h3>2 Conjuntos por R$199</h3>
                <p>Super promoção</p>
                <a href="/feminino/2-conjuntos-199" className="btn-promo">Aproveitar</a>
              </div>
            </div>
          </div>
        </div>

        <div className="products-section">
          <h2>Produtos em Destaque</h2>
          <ProductGrid products={femininoProducts} showFilters={true} />
        </div>
      </div>
    </div>
  );
}
