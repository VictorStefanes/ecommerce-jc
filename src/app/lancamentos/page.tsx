"use client";

import React from 'react';
import CategoryHeader from '../../components/category/CategoryHeader';
import ProductGrid from '../../components/product/ProductGrid';
import './lancamentos.scss';

export default function LancamentosPage() {
  const lancamentoProducts = [
    {
      id: 'lan-1',
      name: 'Camiseta Inverno ThermaFlow',
      price: 89.90,
      originalPrice: 129.90,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'ThermaFlow'
    },
    {
      id: 'lan-2',
      name: 'Oversized Apex Performance',
      price: 99.90,
      originalPrice: 149.90,
      image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Apex'
    },
    {
      id: 'lan-3',
      name: 'Conjunto Seamless Feminino',
      price: 119.90,
      originalPrice: 179.90,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Seamless'
    },
    {
      id: 'lan-4',
      name: 'Camiseta Essential Pro',
      price: 69.90,
      originalPrice: 99.90,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Essential'
    },
    {
      id: 'lan-5',
      name: 'Top Basic Collection',
      price: 49.90,
      originalPrice: 79.90,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Basic'
    },
    {
      id: 'lan-6',
      name: 'Polo Dry Fit AeroFit',
      price: 79.90,
      originalPrice: 119.90,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'AeroFit'
    }
  ];

  return (
    <div className="lancamentos-page">
      <CategoryHeader 
        title="LANÇAMENTOS" 
        subtitle="As mais novas coleções JC Atacados"
        bannerImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop"
      />
      
      <div className="container">
        <div className="collections-showcase">
          <div className="collection-sections">
            <div className="collection-section">
              <h2>Masculino</h2>
              <div className="collection-grid">
                <a href="/colecoes/inverno" className="collection-card">
                  <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=250&h=300&fit=crop" alt="Coleção Inverno" />
                  <div className="collection-info">
                    <h3>Inverno</h3>
                    <p>ThermaFlow Technology</p>
                  </div>
                </a>
                <a href="/colecoes/apex" className="collection-card">
                  <img src="https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=250&h=300&fit=crop" alt="Coleção Apex" />
                  <div className="collection-info">
                    <h3>Apex Performance</h3>
                    <p>Máxima performance</p>
                  </div>
                </a>
                <a href="/colecoes/essential" className="collection-card">
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=250&h=300&fit=crop" alt="Coleção Essential" />
                  <div className="collection-info">
                    <h3>Essential</h3>
                    <p>Básicos premium</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="collection-section">
              <h2>Feminino</h2>
              <div className="collection-grid">
                <a href="/colecoes/seamless" className="collection-card">
                  <img src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=250&h=300&fit=crop" alt="Coleção Seamless" />
                  <div className="collection-info">
                    <h3>Seamless</h3>
                    <p>Sem costuras, máximo conforto</p>
                  </div>
                </a>
                <a href="/colecoes/basic" className="collection-card">
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=250&h=300&fit=crop" alt="Coleção Basic" />
                  <div className="collection-info">
                    <h3>Basic</h3>
                    <p>Essenciais femininos</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="products-section">
          <h2>Todos os Lançamentos</h2>
          <ProductGrid products={lancamentoProducts} showFilters={true} />
        </div>
      </div>
    </div>
  );
}
