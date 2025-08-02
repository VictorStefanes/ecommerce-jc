"use client";

import React from 'react';
import './PromoSection.scss';

const PromoSection: React.FC = () => {
  return (
    <section className="promo-section">
      <div className="container">
        <div className="promo-grid">
          {/* Promo 1 - 3 por R$ 109 */}
          <div className="promo-card large">
            <div className="promo-content">
              <div className="promo-badge">SUPER OFERTA</div>
              <h3 className="promo-title">3 Camisetas Dry Fit</h3>
              <p className="promo-subtitle">Por apenas</p>
              <div className="promo-price">
                <span className="currency">R$</span>
                <span className="value">109</span>
                <span className="cents">,90</span>
              </div>
              <p className="promo-description">
                Escolha entre mais de 50 modelos disponíveis
              </p>
              <a href="/promocoes/3-camisetas-109" className="btn btn-primary">
                Aproveitar Oferta
              </a>
            </div>
            <div className="promo-image">
              <img src="/images/promos/3-camisetas.jpg" alt="3 Camisetas por R$ 109" />
            </div>
          </div>

          {/* Promo 2 - Frete Grátis */}
          <div className="promo-card">
            <div className="promo-content">
              <div className="promo-icon">🚚</div>
              <h4>Frete Grátis</h4>
              <p>A partir de R$ 198</p>
              <a href="/produtos" className="btn btn-outline">Ver Produtos</a>
            </div>
          </div>

          {/* Promo 3 - Brinde */}
          <div className="promo-card">
            <div className="promo-content">
              <div className="promo-icon">🎁</div>
              <h4>Ganhe Brinde</h4>
              <p>A partir de R$ 209</p>
              <a href="/produtos" className="btn btn-outline">Conferir</a>
            </div>
          </div>

          {/* Promo 4 - Feminino */}
          <div className="promo-card">
            <div className="promo-content">
              <div className="promo-badge feminine">FEMININO</div>
              <h4>2 Conjuntos</h4>
              <div className="promo-price small">
                <span>R$ 199</span>
              </div>
              <a href="/feminino/2-conjuntos-199" className="btn btn-primary">Ver Oferta</a>
            </div>
          </div>

          {/* Promo 5 - Desconto */}
          <div className="promo-card accent">
            <div className="promo-content">
              <div className="promo-badge discount">ATÉ 77% OFF</div>
              <h4>Liquidação</h4>
              <p>Últimas peças</p>
              <a href="/promocoes/liquidacao" className="btn btn-secondary">Aproveitar</a>
            </div>
          </div>

          {/* Promo 6 - Kits */}
          <div className="promo-card">
            <div className="promo-content">
              <div className="promo-icon">📦</div>
              <h4>Kits Especiais</h4>
              <p>Combos com desconto</p>
              <a href="/kits" className="btn btn-outline">Ver Kits</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
