"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { Product, productAPI } from '../../../utils/api';
import './SubcategoryPage.scss';

export default function SubcategoryPage() {
  const params = useParams();
  const subcategorySlug = params?.subcategory as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategory, setSubcategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (subcategorySlug) {
      fetchSubcategoryData();
      fetchProducts();
    }
  }, [subcategorySlug, sortBy]);

  const fetchSubcategoryData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/subcategory/${subcategorySlug}`);
      if (response.ok) {
        const data = await response.json();
        setSubcategory(data.category);
      }
    } catch (error) {
      console.error('Erro ao carregar subcategoria:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getBySubcategory(subcategorySlug);
      let sortedProducts = data.products || [];

      // Aplicar ordenação
      switch (sortBy) {
        case 'price-low':
          sortedProducts.sort((a: Product, b: Product) => a.price - b.price);
          break;
        case 'price-high':
          sortedProducts.sort((a: Product, b: Product) => b.price - a.price);
          break;
        case 'name':
          sortedProducts.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
          break;
        case 'newest':
        default:
          sortedProducts.sort((a: Product, b: Product) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
      }

      setProducts(sortedProducts);
    } catch (error) {
      setError('Erro ao carregar produtos');
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSubcategoryTitle = () => {
    if (!subcategory) return 'Carregando...';
    return subcategory.name;
  };

  const getParentCategory = () => {
    if (!subcategory?.parentCategory) return '';
    return subcategory.parentCategory.name;
  };

  if (loading) {
    return (
      <div className="subcategory-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Carregando produtos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subcategory-page">
        <div className="container">
          <div className="error-state">
            <h2>Ops! Algo deu errado</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subcategory-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Início</a>
          <span className="separator">›</span>
          {getParentCategory() && (
            <>
              <a href={`/${subcategory?.parentCategory?.slug}`}>{getParentCategory()}</a>
              <span className="separator">›</span>
            </>
          )}
          <span className="current">{getSubcategoryTitle()}</span>
        </nav>

        {/* Header da Subcategoria */}
        <div className="subcategory-header">
          <h1 className="subcategory-title">{getSubcategoryTitle()}</h1>
          <p className="subcategory-description">
            {subcategory?.description || `Confira nossa seleção de ${getSubcategoryTitle().toLowerCase()}`}
          </p>
          
          <div className="subcategory-stats">
            <span className="product-count">
              {products.length} {products.length === 1 ? 'produto' : 'produtos'} encontrado{products.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Barra de Ordenação */}
        <div className="sort-bar">
          <div className="sort-group">
            <label htmlFor="sort-select">Ordenar por:</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Mais recentes</option>
              <option value="price-low">Menor preço</option>
              <option value="price-high">Maior preço</option>
              <option value="name">Nome A-Z</option>
            </select>
          </div>
        </div>

        {/* Grid de Produtos */}
        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>Nenhum produto encontrado</h3>
            <p>
              Ainda não há produtos disponíveis em {getSubcategoryTitle()}. 
              Volte em breve para conferir as novidades!
            </p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
