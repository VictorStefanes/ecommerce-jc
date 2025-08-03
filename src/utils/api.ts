// utils/api.ts - Funções para comunicação com a API

const API_BASE_URL = 'http://localhost:5000';

// Product API functions
export const productAPI = {
  // Get all products
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return { products: [] };
    }
  },

  // Get products by category
  getByCategory: async (categorySlug: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/category/${categorySlug}`);
      if (!response.ok) throw new Error('Failed to fetch products by category');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return { products: [] };
    }
  },

  // Get products by subcategory
  getBySubcategory: async (subcategorySlug: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/subcategory/${subcategorySlug}`);
      if (!response.ok) throw new Error('Failed to fetch products by subcategory');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by subcategory:', error);
      return { products: [] };
    }
  },

  // Get single product by ID
  getById: async (productId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Get featured products
  getFeatured: async () => {
    try {
      console.log('Fazendo requisição para:', `${API_BASE_URL}/api/products/featured`);
      const response = await fetch(`${API_BASE_URL}/api/products/featured`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      return data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return { products: [] };
    }
  },

  // Get promotion products
  getPromotions: async () => {
    try {
      console.log('Fazendo requisição para:', `${API_BASE_URL}/api/products/promotions/latest`);
      const response = await fetch(`${API_BASE_URL}/api/products/promotions/latest`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Resposta da API promotions:', data);
      return data;
    } catch (error) {
      console.error('Error fetching promotion products:', error);
      return { products: [] };
    }
  },

  // Get new products
  getNew: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/new`);
      if (!response.ok) throw new Error('Failed to fetch new products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching new products:', error);
      return { products: [] };
    }
  },

  // Search products
  search: async (query: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search products');
      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      return { products: [] };
    }
  }
};

export const api = {
  // Produtos
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/api/products?${searchParams}`);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    return response.json();
  },

  async getProductBySlug(slug: string) {
    const response = await fetch(`${API_BASE_URL}/api/products/${slug}`);
    if (!response.ok) throw new Error('Produto não encontrado');
    return response.json();
  },

  async getProductsByCategory(categorySlug: string, params?: {
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/api/products/category/${categorySlug}?${searchParams}`);
    if (!response.ok) throw new Error('Erro ao buscar produtos da categoria');
    return response.json();
  },

  // Categorias
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/api/categories`);
    if (!response.ok) throw new Error('Erro ao buscar categorias');
    return response.json();
  },

  async getCategoryBySlug(slug: string) {
    const response = await fetch(`${API_BASE_URL}/api/categories/${slug}`);
    if (!response.ok) throw new Error('Categoria não encontrada');
    return response.json();
  },

  // Autenticação
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro no login');
    }
    
    return response.json();
  },

  // Pedidos
  async createOrder(orderData: any, token: string) {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar pedido');
    }
    
    return response.json();
  },

  // Admin API
  admin: {
    async getDashboardStats(token: string) {
      const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Erro ao buscar dados do dashboard');
      return response.json();
    },

    async getProducts(token: string, params?: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      status?: string;
    }) {
      const searchParams = new URLSearchParams();
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/products?${searchParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      return response.json();
    },

    async createProduct(productData: any, token: string) {
      const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao criar produto');
      }
      
      return response.json();
    },

    async updateProduct(id: string, productData: any, token: string) {
      const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar produto');
      }
      
      return response.json();
    },

    async deleteProduct(id: string, token: string) {
      const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao deletar produto');
      }
      
      return response.json();
    },

    async uploadImage(file: File, token: string) {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro no upload');
      }
      
      return response.json();
    },

    async uploadMultipleImages(files: File[], token: string) {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));

      const response = await fetch(`${API_BASE_URL}/api/upload/multiple`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro no upload');
      }
      
      return response.json();
    }
  }
};

// Types
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  subcategory?: {
    _id: string;
    name: string;
    slug: string;
  };
  images: Array<{
    url: string;
    publicId: string;
    alt: string;
    isMain: boolean;
  }>;
  colors: Array<{
    name: string;
    code: string;
    stock: number;
  }>;
  sizes: Array<{
    name: string;
    stock: number;
  }>;
  tags: string[];
  badge?: string;
  isNew: boolean;
  isLaunch: boolean;
  isFeatured: boolean;
  isActive: boolean;
  totalStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategory?: {
    _id: string;
    name: string;
    slug: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Utility functions
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

export const getMainImage = (images: Product['images']) => {
  const mainImage = images.find(img => img.isMain);
  return mainImage?.url || images[0]?.url || '/placeholder-product.jpg';
};

export const calculateDiscount = (originalPrice: number, currentPrice: number) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const getTotalStock = (colors: Product['colors'], sizes: Product['sizes']) => {
  const colorStock = colors.reduce((sum, color) => sum + color.stock, 0);
  const sizeStock = sizes.reduce((sum, size) => sum + size.stock, 0);
  return Math.max(colorStock, sizeStock);
};

export default api;
