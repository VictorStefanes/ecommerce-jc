"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import './products.scss';

interface Product {
  _id: string;
  name: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category: {
    _id: string;
    name: string;
  };
  subcategory?: {
    _id: string;
    name: string;
  };
  images: Array<{
    url: string;
    isMain: boolean;
  }>;
  colors: Array<{
    name: string;
    stock: number;
  }>;
  sizes: Array<{
    name: string;
    stock: number;
  }>;
  totalStock: number;
  isActive: boolean;
  isNew: boolean;
  isFeatured: boolean;
  isPromotion: boolean;
  createdAt: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    fetchProducts();
    fetchCategories();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:5000/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:5000/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setProducts(products.filter(p => p._id !== productId));
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const toggleProductStatus = async (productId: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:5000/api/admin/products/${productId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !isActive })
      });

      if (response.ok) {
        setProducts(products.map(p => 
          p._id === productId ? { ...p, isActive: !isActive } : p
        ));
      }
    } catch (error) {
      console.error('Erro ao alterar status do produto:', error);
    }
  };

  const toggleFeaturedStatus = async (productId: string, isFeatured: boolean) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:5000/api/admin/products/${productId}/featured`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isFeatured: !isFeatured })
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(products.map(p => 
          p._id === productId ? { ...p, isFeatured: !isFeatured } : p
        ));
        
        // Mostrar mensagem de sucesso/erro
        if (data.message) {
          alert(data.message);
        }
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao alterar status de destaque');
      }
    } catch (error) {
      console.error('Erro ao alterar status de destaque:', error);
      alert('Erro ao alterar status de destaque');
    }
  };

  const togglePromotionStatus = async (productId: string, isPromotion: boolean) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:5000/api/admin/products/${productId}/promotion`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isPromotion: !isPromotion })
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(products.map(p => 
          p._id === productId ? { ...p, isPromotion: !isPromotion } : p
        ));
        
        // Mostrar mensagem de sucesso/erro
        if (data.message) {
          alert(data.message);
        }
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao alterar status de promoção');
      }
    } catch (error) {
      console.error('Erro ao alterar status de promoção:', error);
      alert('Erro ao alterar status de promoção');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === '' || product.category._id === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getMainImage = (images: any[]) => {
    const mainImage = images.find(img => img.isMain);
    return mainImage?.url || images[0]?.url || '/placeholder-product.jpg';
  };

  const getTotalStock = (colors: any[], sizes: any[]) => {
    const colorStock = colors.reduce((sum, color) => sum + color.stock, 0);
    const sizeStock = sizes.reduce((sum, size) => sum + size.stock, 0);
    return Math.max(colorStock, sizeStock);
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <header className="page-header">
        <div className="header-content">
          <div className="header-title">
            <Package size={24} />
            <h1>Gerenciar Produtos</h1>
            <span className="product-count">({filteredProducts.length})</span>
          </div>
          
          <button 
            className="btn-new-product"
            onClick={() => router.push('/admin/products/new')}
          >
            <Plus size={20} />
            Novo Produto
          </button>
        </div>
      </header>

      <div className="page-content">
        {/* Filtros */}
        <div className="filters-section">
          <div className="search-filter">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <Filter size={20} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categories
                .filter(cat => !cat.parentCategory)
                .map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Produtos */}
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <Package size={64} />
            <h3>Nenhum produto encontrado</h3>
            <p>
              {products.length === 0 
                ? 'Comece criando seu primeiro produto'
                : 'Tente ajustar os filtros ou termos de busca'
              }
            </p>
            {products.length === 0 && (
              <button 
                className="btn-new-product"
                onClick={() => router.push('/admin/products/new')}
              >
                <Plus size={20} />
                Criar Primeiro Produto
              </button>
            )}
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product._id} className={`product-card ${!product.isActive ? 'inactive' : ''}`}>
                <div className="product-image">
                  <img 
                    src={getMainImage(product.images)} 
                    alt={product.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                    }}
                  />
                  <div className="product-badges">
                    {product.isNew && <span className="badge badge-new">NOVO</span>}
                    {product.isFeatured && <span className="badge badge-featured">DESTAQUE</span>}
                    {product.isPromotion && <span className="badge badge-promotion">PROMOÇÃO</span>}
                    {!product.isActive && <span className="badge badge-inactive">INATIVO</span>}
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.shortDescription}</p>
                  
                  <div className="product-category">
                    <span>{product.category.name}</span>
                    {product.subcategory && (
                      <span> • {product.subcategory.name}</span>
                    )}
                  </div>

                  <div className="product-stock">
                    <span className={`stock-indicator ${getTotalStock(product.colors, product.sizes) > 10 ? 'good' : getTotalStock(product.colors, product.sizes) > 0 ? 'low' : 'empty'}`}>
                      {getTotalStock(product.colors, product.sizes)} unidades
                    </span>
                  </div>

                  <div className="product-variants">
                    {product.colors.length > 0 && (
                      <div className="colors">
                        <span>Cores: {product.colors.length}</span>
                      </div>
                    )}
                    {product.sizes.length > 0 && (
                      <div className="sizes">
                        <span>Tamanhos: {product.sizes.length}</span>
                      </div>
                    )}
                  </div>

                  <div className="product-pricing">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>

                <div className="product-actions">
                  <button 
                    className="action-btn view"
                    onClick={() => window.open(`/products/${product._id}`, '_blank')}
                    title="Visualizar na loja"
                  >
                    <Eye size={16} />
                  </button>
                  
                  <button 
                    className="action-btn edit"
                    onClick={() => router.push(`/admin/products/edit/${product._id}`)}
                    title="Editar produto"
                  >
                    <Edit size={16} />
                  </button>
                  
                  <button 
                    className={`action-btn featured ${product.isFeatured ? 'active' : 'inactive'}`}
                    onClick={() => toggleFeaturedStatus(product._id, product.isFeatured)}
                    title={product.isFeatured ? 'Remover do destaque' : 'Adicionar ao destaque'}
                  >
                    ★
                  </button>
                  
                  <button 
                    className={`action-btn promotion ${product.isPromotion ? 'active' : 'inactive'}`}
                    onClick={() => togglePromotionStatus(product._id, product.isPromotion)}
                    title={product.isPromotion ? 'Remover da promoção' : 'Adicionar à promoção'}
                  >
                    %
                  </button>
                  
                  <button 
                    className={`action-btn toggle ${product.isActive ? 'active' : 'inactive'}`}
                    onClick={() => toggleProductStatus(product._id, product.isActive)}
                    title={product.isActive ? 'Desativar produto' : 'Ativar produto'}
                  >
                    {product.isActive ? '●' : '○'}
                  </button>
                  
                  <button 
                    className="action-btn delete"
                    onClick={() => deleteProduct(product._id)}
                    title="Excluir produto"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
