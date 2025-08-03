"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product as ProductType, productAPI } from '../../utils/api';
import './ProductGrid.scss';

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getFeatured();
      setProducts(data.products || []);
    } catch (error) {
      setError('Erro ao carregar produtos em destaque');
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="product-grid">
        <div className="loading-grid">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="product-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-price"></div>
              </div>
            </div>
          ))}
        </div>
        
        <style jsx>{`
          .loading-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }
          
          .product-skeleton {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          
          .skeleton-image {
            height: 250px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          
          .skeleton-content {
            padding: 1rem;
          }
          
          .skeleton-title {
            height: 20px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
            margin-bottom: 0.5rem;
            border-radius: 4px;
          }
          
          .skeleton-price {
            height: 16px;
            width: 60%;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
            border-radius: 4px;
          }
          
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-grid">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchFeaturedProducts}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid">
        <div className="empty-state">
          <p>Nenhum produto em destaque no momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      <div className="products-container">
        {products.slice(0, 8).map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
