"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, productAPI, formatPrice, getMainImage, calculateDiscount } from '../../utils/api';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mainImage = getMainImage(product.images);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount ? calculateDiscount(product.originalPrice!, product.price) : 0;

  const handleAddToCart = () => {
    setIsLoading(true);
    // Simular adição ao carrinho
    setTimeout(() => {
      setIsLoading(false);
      // Aqui você pode adicionar a lógica do carrinho
      console.log('Produto adicionado ao carrinho:', product._id);
    }, 500);
  };

  const getStockStatus = () => {
    const colorStock = product.colors?.reduce((sum, color) => sum + (color.stock || 0), 0) || 0;
    const sizeStock = product.sizes?.reduce((sum, size) => sum + (size.stock || 0), 0) || 0;
    const totalStock = colorStock || sizeStock || product.totalStock || 0;
    
    if (totalStock === 0) return { status: 'out-of-stock', text: 'Esgotado' };
    if (totalStock <= 5) return { status: 'low-stock', text: 'Últimas unidades' };
    return { status: 'in-stock', text: 'Disponível' };
  };

  const stockStatus = getStockStatus();

  return (
    <div 
      className={`product-card ${!product.isActive ? 'inactive' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="product-badges">
        {product.isNew && <span className="badge badge-new">NOVO</span>}
        {product.isLaunch && <span className="badge badge-launch">LANÇAMENTO</span>}
        {hasDiscount && <span className="badge badge-discount">-{discountPercentage}%</span>}
        {product.badge && <span className="badge badge-custom">{product.badge}</span>}
        {stockStatus.status === 'out-of-stock' && (
          <span className="badge badge-out-of-stock">ESGOTADO</span>
        )}
      </div>

      {/* Imagem do Produto */}
      <div className="product-image">
        <Link href={`/produto/${product.slug}`}>
          <img 
            src={mainImage} 
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
            }}
          />
        </Link>
        
        {/* Overlay com ações rápidas */}
        <div className={`product-overlay ${isHovered ? 'visible' : ''}`}>
          <Link href={`/produto/${product.slug}`} className="quick-view-btn">
            👁️ Ver Detalhes
          </Link>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="product-info">
        {/* Categoria */}
        <div className="product-category">
          <span>{product.category.name}</span>
          {product.subcategory && <span> • {product.subcategory.name}</span>}
        </div>

        {/* Nome do Produto */}
        <h3 className="product-name">{product.name}</h3>

        {/* Descrição Curta */}
        {product.shortDescription && (
          <p className="product-description">{product.shortDescription}</p>
        )}

        {/* Cores Disponíveis */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-colors">
            <span className="colors-label">Cores:</span>
            <div className="colors-list">
              {product.colors.slice(0, 5).map((color, index) => (
                <div
                  key={index}
                  className="color-dot"
                  style={{ backgroundColor: color.code }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="more-colors">+{product.colors.length - 5}</span>
              )}
            </div>
          </div>
        )}

        {/* Tamanhos Disponíveis */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="product-sizes">
            <span className="sizes-label">Tamanhos:</span>
            <div className="sizes-list">
              {product.sizes.slice(0, 6).map((size, index) => (
                <span key={index} className="size-item" title={`${size.stock || 0} unidades`}>
                  {size.name}
                </span>
              ))}
              {product.sizes.length > 6 && (
                <span className="more-sizes">+{product.sizes.length - 6}</span>
              )}
            </div>
          </div>
        )}

        {/* Status do Estoque */}
        <div className={`stock-status ${stockStatus.status}`}>
          <span>{stockStatus.text}</span>
        </div>

        {/* Preços */}
        <div className="product-pricing">
          <span className="current-price">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="original-price">{formatPrice(product.originalPrice!)}</span>
          )}
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}

        {/* Botão de Ação */}
        <button 
          className={`add-to-cart-btn ${stockStatus.status === 'out-of-stock' ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={isLoading || stockStatus.status === 'out-of-stock'}
        >
          {isLoading ? (
            <span className="loading">
              <span className="spinner"></span>
              Adicionando...
            </span>
          ) : stockStatus.status === 'out-of-stock' ? (
            'Produto Esgotado'
          ) : (
            'Adicionar ao Carrinho'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
