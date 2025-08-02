"use client";

import React from 'react';
import './ProductGrid.scss';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  collection: string;
}

interface ProductGridProps {
  products?: Product[];
  columns?: 2 | 3 | 4;
  showFilters?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products = [], 
  columns = 4,
  showFilters = false 
}) => {
  // Produtos de exemplo se não fornecidos
  const defaultProducts: Product[] = [
    {
      id: '1',
      name: 'Camiseta Dry Fit Essential',
      price: 49.90,
      originalPrice: 79.90,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Essential'
    },
    {
      id: '2',
      name: 'Oversized JC Premium',
      price: 69.90,
      originalPrice: 99.90,
      image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Oversized'
    },
    {
      id: '3',
      name: 'Bermuda Tactel Performance',
      price: 59.90,
      originalPrice: 89.90,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Performance'
    },
    {
      id: '4',
      name: 'Conjunto Feminino Seamless',
      price: 89.90,
      originalPrice: 129.90,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Seamless'
    },
    {
      id: '5',
      name: 'Legging High Performance',
      price: 79.90,
      originalPrice: 109.90,
      image: 'https://images.unsplash.com/photo-1506629905607-c7bdf83e8bf6?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Performance'
    },
    {
      id: '6',
      name: 'Top Feminino Basic',
      price: 39.90,
      originalPrice: 59.90,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
      category: 'Feminino',
      collection: 'Basic'
    },
    {
      id: '7',
      name: 'Camiseta Apex Performance',
      price: 79.90,
      originalPrice: 119.90,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
      category: 'Masculino',
      collection: 'Apex'
    },
    {
      id: '8',
      name: 'Kit 3 Camisetas Dry Fit',
      price: 109.90,
      originalPrice: 179.90,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop',
      category: 'Kit',
      collection: 'Promo'
    }
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="product-grid-container">
      {showFilters && (
        <div className="filters-section">
          <div className="filters">
            <select className="filter-select">
              <option value="">Todas as categorias</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="kit">Kits</option>
            </select>
            <select className="filter-select">
              <option value="">Todas as coleções</option>
              <option value="essential">Essential</option>
              <option value="apex">Apex</option>
              <option value="oversized">Oversized</option>
              <option value="seamless">Seamless</option>
            </select>
            <select className="filter-select">
              <option value="featured">Mais vendidos</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="newest">Lançamentos</option>
            </select>
          </div>
        </div>
      )}

      <div className={`product-grid columns-${columns}`}>
        {displayProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {product.originalPrice && (
                <div className="discount-badge">
                  -{calculateDiscount(product.originalPrice, product.price)}%
                </div>
              )}
              <div className="product-overlay">
                <button className="quick-add-btn">Adicionar Rápido</button>
              </div>
            </div>
            
            <div className="product-info">
              <div className="product-category">{product.collection}</div>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                {product.originalPrice && (
                  <span className="original-price">R$ {product.originalPrice.toFixed(2)}</span>
                )}
                <span className="current-price">R$ {product.price.toFixed(2)}</span>
              </div>
              <button className="add-to-cart-btn">Adicionar ao Carrinho</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
