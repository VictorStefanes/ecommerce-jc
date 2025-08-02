"use client";

import React from 'react';
import CategoryHeader from '../../../components/category/CategoryHeader';
import ProductGrid from '../../../components/product/ProductGrid';

export default function ApexPage() {
  const apexProducts = [
    {
      id: 'apex-1',
      name: 'Camiseta Apex Performance Pro',
      price: 79.90,
      originalPrice: 119.90,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Apex'
    },
    {
      id: 'apex-2',
      name: 'Regata Apex Elite',
      price: 69.90,
      originalPrice: 99.90,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Apex'
    },
    {
      id: 'apex-3',
      name: 'Shorts Apex Performance',
      price: 89.90,
      originalPrice: 129.90,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Apex'
    }
  ];

  return (
    <div className="apex-page">
      <CategoryHeader 
        title="COLEÇÃO APEX" 
        subtitle="Performance máxima para atletas de elite"
        bannerImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop"
      />
      
      <div className="container">
        <div className="collection-info">
          <div className="info-section">
            <h2>Tecnologia Apex Performance</h2>
            <p>A coleção Apex foi desenvolvida especialmente para atletas que buscam o máximo desempenho. Com tecidos de alta tecnologia, respirabilidade superior e design ergonômico, cada peça é pensada para potencializar seu rendimento.</p>
          </div>
        </div>
        
        <ProductGrid products={apexProducts} showFilters={true} />
      </div>
    </div>
  );
}
