import React from 'react';
import Banner from '../components/home/Banner';
import FeaturedCards from '../components/FeaturedCards';
import PromotionCards from '../components/PromotionCards';
import ProductGridNew from '../components/home/ProductGridNew';
import PromoSection from '../components/home/PromoSection';
import CollectionsSection from '../components/home/CollectionsSection';
import ReviewsSection from '../components/home/ReviewsSection';
import './homepage.scss';

export default function HomePage() {
  return (
    <div className="home">
      {/* Banner/Carrossel Principal */}
      <Banner />
      
      {/* Cards de Produtos em Promoção */}
      <PromotionCards />
      
      {/* Cards de Produtos em Destaque */}
      <FeaturedCards />
      
      {/* Seção de Promoções */}
      <PromoSection />
      
      {/* Grid de Produtos em Destaque */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">PROMOÇÕES</h2>
          <ProductGridNew />
        </div>
      </section>
      
      {/* Seção de Coleções */}
      <CollectionsSection />
      
      {/* Seção de Kits */}
      <section className="kits-section">
        <div className="container">
          <h2 className="section-title">Kits Especiais</h2>
          <div className="kits-grid">
            <div className="kit-card">
              <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop" alt="Kit Camisetas Dry Fit" />
              <div className="kit-info">
                <h3>Kit 3 Camisetas Dry Fit</h3>
                <p className="kit-price">
                  <span className="original-price">R$ 179,90</span>
                  <span className="promo-price">R$ 109,90</span>
                </p>
                <button className="btn btn-primary">Ver Kit</button>
              </div>
            </div>
            
            <div className="kit-card">
              <img src="https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&h=300&fit=crop" alt="Kit Oversized" />
              <div className="kit-info">
                <h3>Kit 2 Oversized</h3>
                <p className="kit-price">
                  <span className="original-price">R$ 159,90</span>
                  <span className="promo-price">R$ 109,90</span>
                </p>
                <button className="btn btn-primary">Ver Kit</button>
              </div>
            </div>
            
            <div className="kit-card">
              <img src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop" alt="Kit Feminino" />
              <div className="kit-info">
                <h3>Kit 2 Conjuntos Femininos</h3>
                <p className="kit-price">
                  <span className="original-price">R$ 249,90</span>
                  <span className="promo-price">R$ 199,90</span>
                </p>
                <button className="btn btn-primary">Ver Kit</button>
              </div>
            </div>
            
            <div className="kit-card">
              <img src="https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=300&fit=crop" alt="Kit Bermudas" />
              <div className="kit-info">
                <h3>Kit 3 Bermudas</h3>
                <p className="kit-price">
                  <span className="original-price">R$ 189,90</span>
                  <span className="promo-price">R$ 149,90</span>
                </p>
                <button className="btn btn-primary">Ver Kit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção de Lançamentos */}
      <section className="launches-section">
        <div className="container">
          <h2 className="section-title">Lançamentos</h2>
          <div className="launches-categories">
            <div className="launch-category">
              <h3>Masculino</h3>
              <div className="launch-items">
                <a href="/colecoes/inverno">Coleção Inverno</a>
                <a href="/colecoes/apex">Apex Performance</a>
                <a href="/colecoes/thermaflow">ThermaFlow</a>
                <a href="/colecoes/essential">Essential</a>
              </div>
            </div>
            <div className="launch-category">
              <h3>Feminino</h3>
              <div className="launch-items">
                <a href="/colecoes/basic">Basic Collection</a>
                <a href="/colecoes/seamless">Seamless</a>
                <a href="/feminino/conjunto-inverno">Conjuntos Inverno</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção de Avaliações */}
      <ReviewsSection />
    </div>
  );
}
