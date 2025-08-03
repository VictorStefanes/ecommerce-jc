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
            background: #f8f9fa;
            border-radius: 12px;
            overflow: hidden;
            animation: pulse 1.5s ease-in-out infinite alternate;
          }

          .skeleton-image {
            width: 100%;
            height: 280px;
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

          @keyframes pulse {
            0% { opacity: 1; }
            100% { opacity: 0.8; }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-grid-error">
        <div className="error-content">
          <h3>Ops! Algo deu errado</h3>
          <p>{error}</p>
          <button onClick={fetchFeaturedProducts} className="retry-btn">
            Tentar Novamente
          </button>
        </div>
        
        <style jsx>{`
          .product-grid-error {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 300px;
            text-align: center;
          }

          .error-content h3 {
            color: #dc3545;
            margin-bottom: 1rem;
          }

          .error-content p {
            color: #6c757d;
            margin-bottom: 1.5rem;
          }

          .retry-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
          }

          .retry-btn:hover {
            background: #0056b3;
          }
        `}</style>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <p>Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product._id} 
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
