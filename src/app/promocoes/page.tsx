"use client";

import React from 'react';
import ProductGrid from '../../components/product/ProductGrid';
import CategoryHeader from '../../components/category/CategoryHeader';
import './promocoes.scss';

export default function PromocoesPage() {
  return (
    <div className="promocoes-page">
      <CategoryHeader 
        title="PROMOÇÕES" 
        subtitle="As melhores ofertas JC Atacados"
        bannerImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop"
      />
      
      <div className="container">
        <div className="promo-sections">
          <section className="promo-section">
            <h2>Masculino</h2>
            <div className="promo-categories">
              <a href="/masculino/camisetas-dry-fit" className="promo-card">
                <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop" alt="Camisetas Dry Fit" />
                <h3>Camisetas Dry Fit</h3>
                <p>A partir de R$ 49,90</p>
              </a>
              <a href="/masculino/oversized" className="promo-card">
                <img src="https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=300&h=300&fit=crop" alt="Oversized" />
                <h3>Oversized</h3>
                <p>A partir de R$ 59,90</p>
              </a>
              <a href="/masculino/shorts-bermudas" className="promo-card">
                <img src="https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=300&fit=crop" alt="Shorts e Bermudas" />
                <h3>Shorts e Bermudas</h3>
                <p>A partir de R$ 39,90</p>
              </a>
            </div>
          </section>

          <section className="promo-section">
            <h2>Feminino</h2>
            <div className="promo-categories">
              <a href="/feminino/camisetas-dry-fit" className="promo-card">
                <img src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop" alt="Camisetas Dry Fit" />
                <h3>Camisetas Dry Fit</h3>
                <p>A partir de R$ 45,90</p>
              </a>
              <a href="/feminino/3-pecas-189" className="promo-card">
                <img src="https://images.unsplash.com/photo-1506629905607-c7bdf83e8bf6?w=300&h=300&fit=crop" alt="3 Peças" />
                <h3>03 Peças R$189</h3>
                <p>Economia de 40%</p>
              </a>
              <a href="/feminino/2-conjuntos-199" className="promo-card">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop" alt="2 Conjuntos" />
                <h3>02 Conjuntos R$199</h3>
                <p>Economia de 35%</p>
              </a>
              <a href="/feminino/ate-77-off" className="promo-card">
                <img src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop" alt="77% OFF" />
                <h3>Até 77% OFF</h3>
                <p>Liquidação imperdível</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
