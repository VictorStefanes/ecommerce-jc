"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product, productAPI, Category, api } from '../../utils/api';
import './CategoryPage.scss';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    if (slug) {
      fetchCategoryData();
      fetchProducts();
    }
  }, [slug, sortBy, filterBy]);

  const fetchCategoryData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setCategory(data.category);
      }
    } catch (error) {
      console.error('Erro ao carregar categoria:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getByCategory(slug as string);
      let filteredProducts = data.products || [];

      // Aplicar filtros
      if (filterBy === 'featured') {
        filteredProducts = filteredProducts.filter((p: Product) => p.isFeatured);
      } else if (filterBy === 'new') {
        filteredProducts = filteredProducts.filter((p: Product) => p.isNew);
      } else if (filterBy === 'sale') {
        filteredProducts = filteredProducts.filter((p: Product) => 
          p.originalPrice && p.originalPrice > p.price
        );
      }

      // Aplicar ordenação
      switch (sortBy) {
        case 'price-low':
          filteredProducts.sort((a: Product, b: Product) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a: Product, b: Product) => b.price - a.price);
          break;
        case 'name':
          filteredProducts.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
          break;
        case 'newest':
        default:
          filteredProducts.sort((a: Product, b: Product) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
      }

      setProducts(filteredProducts);
    } catch (error) {
      setError('Erro ao carregar produtos');
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = () => {
    if (!category) return 'Carregando...';
    return category.name;
  };

  const getCategoryDescription = () => {
    if (!category) return '';
    return category.description || `Confira nossa seleção de produtos em ${category.name}`;
  };

  if (loading) {
    return (
      <div className="category-page">
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
      <div className="category-page">
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
    <div className="category-page">
      <div className="container">
        {/* Header da Categoria */}
        <div className="category-header">
          <h1 className="category-title">{getCategoryTitle()}</h1>
          <p className="category-description">{getCategoryDescription()}</p>
          
          <div className="category-stats">
            <span className="product-count">
              {products.length} {products.length === 1 ? 'produto' : 'produtos'} encontrado{products.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Filtros e Ordenação */}
        <div className="filters-bar">
          <div className="filter-group">
            <label htmlFor="filter-select">Filtrar por:</label>
            <select 
              id="filter-select"
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">Todos os produtos</option>
              <option value="featured">Em destaque</option>
              <option value="new">Novidades</option>
              <option value="sale">Em promoção</option>
            </select>
          </div>

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
              {filterBy === 'all' 
                ? `Ainda não há produtos disponíveis em ${category?.name || 'esta categoria'}.`
                : 'Nenhum produto corresponde aos filtros selecionados. Tente ajustar os filtros.'
              }
            </p>
            {filterBy !== 'all' && (
              <button 
                className="btn-clear-filters"
                onClick={() => setFilterBy('all')}
              >
                Limpar Filtros
              </button>
            )}
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

        {/* Informações Adicionais */}
        {products.length > 0 && (
          <div className="category-footer">
            <div className="category-info">
              <h3>Sobre {category?.name}</h3>
              <p>
                Encontre os melhores produtos em {category?.name} com qualidade garantida 
                e os melhores preços. Todos os produtos são cuidadosamente selecionados 
                para oferecer o máximo de conforto e estilo.
              </p>
            </div>

            <div className="category-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <div className="feature-text">
                  <h4>Frete Grátis</h4>
                  <p>Para compras acima de R$ 150</p>
                </div>
              </div>
              
              <div className="feature">
                <span className="feature-icon">🔄</span>
                <div className="feature-text">
                  <h4>Troca Garantida</h4>
                  <p>30 dias para trocas e devoluções</p>
                </div>
              </div>
              
              <div className="feature">
                <span className="feature-icon">💳</span>
                <div className="feature-text">
                  <h4>Parcelamento</h4>
                  <p>Em até 12x sem juros</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
