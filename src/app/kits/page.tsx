"use client";

import React from 'react';
import CategoryHeader from '../../components/category/CategoryHeader';
import ProductGrid from '../../components/product/ProductGrid';
import './kits.scss';

export default function KitsPage() {
  const kitProducts = [
    {
      id: 'kit-1',
      name: 'Kit 3 Camisetas Dry Fit',
      price: 109.90,
      originalPrice: 179.90,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      category: 'Kit',
      collection: 'Camisetas Dry'
    },
    {
      id: 'kit-2',
      name: 'Kit 2 Oversized Premium',
      price: 109.90,
      originalPrice: 159.90,
      image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=300&h=400&fit=crop',
      category: 'Kit',
      collection: 'Oversized'
    },
    {
      id: 'kit-3',
      name: 'Kit Camisetas + Bermudas',
      price: 149.90,
      originalPrice: 229.90,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=400&fit=crop',
      category: 'Kit',
      collection: 'Combo'
    },
    {
      id: 'kit-4',
      name: 'Kit 2 Conjuntos Femininos',
      price: 199.90,
      originalPrice: 249.90,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop',
      category: 'Kit',
      collection: 'Feminino'
    },
    {
      id: 'kit-5',
      name: 'Kit 3 Bermudas Tactel',
      price: 149.90,
      originalPrice: 189.90,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
      category: 'Kit',
      collection: 'Bermudas'
    },
    {
      id: 'kit-6',
      name: 'Kit 4 Cuecas Premium',
      price: 79.90,
      originalPrice: 119.90,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop',
      category: 'Kit',
      collection: 'Cuecas'
    }
  ];

  return (
    <div className="kits-page">
      <CategoryHeader 
        title="KITS" 
        subtitle="Os melhores combos com super descontos"
        bannerImage="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop"
      />
      
      <div className="container">
        <div className="kits-info">
          <div className="info-cards">
            <div className="info-card">
              <h3>Economia Garantida</h3>
              <p>Kits com até 40% de desconto comparado a compras individuais</p>
            </div>
            <div className="info-card">
              <h3>Qualidade Premium</h3>
              <p>Todos os produtos dos kits passam pelo nosso controle de qualidade</p>
            </div>
            <div className="info-card">
              <h3>Frete Grátis</h3>
              <p>Kits acima de R$149 têm frete grátis para todo o Brasil</p>
            </div>
          </div>
        </div>

        <ProductGrid products={kitProducts} showFilters={true} />
      </div>
    </div>
  );
}
