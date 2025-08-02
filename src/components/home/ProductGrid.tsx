"use client";

import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import './ProductGrid.scss';

interface Product {
  id: string;
  title: string;
  collection: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
}

const ProductGrid: React.FC = () => {
  // Mock data - em produção viria do Redux/API
  const products: Product[] = [
    {
      id: '1',
      title: 'Camiseta Dry Fit Masculina',
      collection: 'Essential',
      price: 49.90,
      originalPrice: 69.90,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      badge: 'PROMOÇÃO'
    },
    {
      id: '2',
      title: 'Legging Feminina Seamless',
      collection: 'Seamless',
      price: 89.90,
      image: 'https://images.unsplash.com/photo-1506629905996-617f86ef4ba3?w=400&h=400&fit=crop',
      badge: 'NOVO'
    },
    {
      id: '3',
      title: 'Camiseta Oversized Masculina',
      collection: 'Oversized',
      price: 59.90,
      originalPrice: 79.90,
      image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      title: 'Conjunto Feminino Inverno',
      collection: 'Inverno',
      price: 149.90,
      originalPrice: 199.90,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
      badge: 'DESTAQUE'
    },
    {
      id: '5',
      title: 'Bermuda Masculina Dry Fit',
      collection: 'AeroFit',
      price: 69.90,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=400&fit=crop'
    },
    {
      id: '6',
      title: 'Top Feminino Básico',
      collection: 'Basic',
      price: 39.90,
      originalPrice: 54.90,
      image: 'https://images.unsplash.com/photo-1506629905996-617f86ef4ba3?w=400&h=400&fit=crop',
      badge: 'OFERTA'
    },
    {
      id: '7',
      title: 'Regata Masculina Apex',
      collection: 'Apex',
      price: 54.90,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
    },
    {
      id: '8',
      title: 'Short Feminino ThermaFlow',
      collection: 'ThermaFlow',
      price: 79.90,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=400&fit=crop',
      badge: 'LANÇAMENTO'
    }
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          {/* Badge */}
          {product.badge && (
            <div className={`product-badge ${product.badge.toLowerCase()}`}>
              {product.badge}
            </div>
          )}

          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="discount-badge">
              -{calculateDiscount(product.originalPrice, product.price)}%
            </div>
          )}

          {/* Product Image */}
          <div className="product-image">
            <img src={product.image} alt={product.title} />
            <div className="product-overlay">
              <button className="btn btn-primary quick-add">
                <ShoppingCart size={16} />
                Adicionar
              </button>
              <button className="btn btn-outline quick-view">
                <Eye size={16} />
                Ver
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <span className="product-collection">{product.collection}</span>
            <h3 className="product-title">{product.title}</h3>
            
            <div className="product-pricing">
              {product.originalPrice && (
                <span className="original-price">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="current-price">
                {formatPrice(product.price)}
              </span>
            </div>

            <button className="btn btn-primary add-to-cart">
              <ShoppingCart size={16} />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
