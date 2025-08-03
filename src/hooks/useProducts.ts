import { useState, useEffect } from 'react';
import axios from 'axios';

// Tipos
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: Array<{name: string; code: string}>;
  sizes: string[];
  rating: number;
  reviews: number;
  stock: number;
  isNew: boolean;
  isLaunch: boolean;
  badge?: string;
  category: string;
  subcategory: string;
  collection: string;
  line: string;
  description: string;
  features: string[];
  composition: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

interface UseProductsOptions {
  category?: string;
  subcategory?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

// Hook personalizado para produtos
export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Função para buscar produtos (mockada por enquanto)
  const fetchProducts = async (params: UseProductsOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Substituir por chamada real da API
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
      
      // Por enquanto, retornar dados mockados
      const mockData = await import('@/data/mockProducts.json');
      let filteredProducts = mockData.products;

      // Filtrar por categoria
      if (params.category) {
        filteredProducts = filteredProducts.filter(
          product => product.category === params.category
        );
      }

      // Filtrar por subcategoria
      if (params.subcategory) {
        filteredProducts = filteredProducts.filter(
          product => product.subcategory === params.subcategory
        );
      }

      // Filtrar por busca
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredProducts = filteredProducts.filter(
          product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.features.some(feature => 
              feature.toLowerCase().includes(searchTerm)
            )
        );
      }

      // Ordenar
      if (params.sort) {
        switch (params.sort) {
          case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'newest':
            filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          default:
            // Manter ordem relevante (padrão)
            break;
        }
      }

      // Paginação
      const limit = params.limit || 12;
      const page = params.page || 1;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      setProducts(paginatedProducts);
      setTotal(filteredProducts.length);
      setCurrentPage(page);
      setTotalPages(Math.ceil(filteredProducts.length / limit));

    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Erro ao buscar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para recarregar produtos
  const refetch = () => {
    fetchProducts(options);
  };

  // Buscar produtos quando as opções mudarem
  useEffect(() => {
    fetchProducts(options);
  }, [
    options.category,
    options.subcategory,
    options.search,
    options.sort,
    options.page,
    options.limit
  ]);

  return {
    products,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    refetch,
    fetchProducts
  };
}

// Hook para produto individual
export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (productId: string) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Substituir por chamada real da API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockData = await import('@/data/mockProducts.json');
      const foundProduct = mockData.products.find(p => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError('Produto não encontrado');
      }

    } catch (err) {
      setError('Erro ao carregar produto');
      console.error('Erro ao buscar produto:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  return {
    product,
    loading,
    error,
    refetch: () => fetchProduct(id)
  };
}
