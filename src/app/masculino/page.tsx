"use client";

import React from 'react';
import CategoryHeader from '../../components/category/CategoryHeader';
import ProductGrid from '../../components/product/ProductGrid';
import './masculino.scss';

export default function MasculinoPage() {
  const masculinoProducts = [
    {
      id: 'masc-1',
      name: 'Camiseta Dry Fit Essential',
      price: 49.90,
      originalPrice: 79.90,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Essential'
    },
    {
      id: 'masc-2',
      name: 'Oversized JC Premium',
      price: 69.90,
      originalPrice: 99.90,
      image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Oversized'
    },
    {
      id: 'masc-3',
      name: 'Bermuda Tactel Performance',
      price: 59.90,
      originalPrice: 89.90,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Performance'
    },
    {
      id: 'masc-4',
      name: 'Regata Apex Performance',
      price: 45.90,
      originalPrice: 69.90,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Apex'
    },
    {
      id: 'masc-5',
      name: 'Shorts Camuflado',
      price: 55.90,
      originalPrice: 79.90,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Camuflada'
    },
    {
      id: 'masc-6',
      name: 'Moletom ThermaFlow',
      price: 129.90,
      originalPrice: 179.90,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'ThermaFlow'
    }
  ];

  return (
    <div className="masculino-page">
      <CategoryHeader 
        title="MASCULINO" 
        subtitle="Moda esportiva masculina de alta performance"
        bannerImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop"
      />
      
      <div className="container">
        <div className="category-sections">
          <div className="section-grid">
            <div className="category-section">
              <h3>PRODUTOS</h3>
              <div className="category-links">
                <a href="/masculino/camisetas">Camisetas</a>
                <a href="/masculino/regatas">Regatas</a>
                <a href="/masculino/oversized">Oversized</a>
                <a href="/masculino/shorts-bermudas">Shorts e Bermudas</a>
                <a href="/masculino/calcas">Calças</a>
                <a href="/masculino/casacos">Casacos</a>
                <a href="/masculino/moletom">Moletom</a>
              </div>
            </div>

            <div className="category-section">
              <h3>ACESSÓRIOS</h3>
              <div className="category-links">
                <a href="/masculino/bones">Bonés</a>
                <a href="/masculino/cuecas">Cuecas</a>
                <a href="/masculino/meias">Meias</a>
                <a href="/masculino/garrafa-termica">Garrafa Térmica</a>
                <a href="/masculino/pulseiras">Pulseiras</a>
                <a href="/masculino/acessorios">Todos</a>
              </div>
            </div>

            <div className="category-section">
              <h3>PROMOÇÕES</h3>
              <div className="category-links">
                <a href="/masculino/promo-dry-fit">Promo Camisetas Dry Fit</a>
                <a href="/masculino/promo-bermudas">Promo Bermudas</a>
                <a href="/masculino/promo-oversized">Promo Oversized</a>
                <a href="/masculino/promo-camuflada">Promo Camuflada</a>
                <a href="/masculino/promo-apex">Promo Apex</a>
              </div>
            </div>

            <div className="category-section">
              <h3>COLEÇÕES</h3>
              <div className="category-links">
                <a href="/colecoes/inverno">Inverno</a>
                <a href="/colecoes/apex">Apex</a>
                <a href="/colecoes/oversized">Oversized</a>
                <a href="/colecoes/camuflada">Camuflada</a>
                <a href="/colecoes/aerofit">AeroFit</a>
                <a href="/colecoes/polo-dry-fit">Polo Dry Fit</a>
                <a href="/colecoes/essential">Essential</a>
                <a href="/colecoes/poliamida">Poliamida</a>
              </div>
            </div>
          </div>
        </div>

        <div className="products-section">
          <h2>Produtos em Destaque</h2>
          <ProductGrid products={masculinoProducts} showFilters={true} />
        </div>
      </div>
    </div>
  );
}
