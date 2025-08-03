import axios from 'axios';

// Configuração do Axios
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Tratar erros globalmente
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject({
      message: error.response?.data?.message || error.message || 'Erro desconhecido',
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

// === PRODUTOS ===
export const productsAPI = {
  // Listar produtos
  getProducts: async (params?: {
    category?: string;
    subcategory?: string;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
    collection?: string;
  }) => {
    return api.get('/products', { params });
  },

  // Obter produto por ID
  getProduct: async (id: string) => {
    return api.get(`/products/${id}`);
  },

  // Buscar produtos
  searchProducts: async (query: string) => {
    return api.get(`/products/search?q=${encodeURIComponent(query)}`);
  },

  // Produtos relacionados
  getRelatedProducts: async (productId: string) => {
    return api.get(`/products/${productId}/related`);
  },

  // Produtos em destaque
  getFeaturedProducts: async () => {
    return api.get('/products/featured');
  },
};

// === CATEGORIAS ===
export const categoriesAPI = {
  // Listar todas as categorias
  getCategories: async () => {
    return api.get('/categories');
  },

  // Obter categoria por ID
  getCategory: async (id: string) => {
    return api.get(`/categories/${id}`);
  },
};

// === CARRINHO ===
export const cartAPI = {
  // Obter carrinho do usuário
  getCart: async () => {
    return api.get('/cart');
  },

  // Adicionar item ao carrinho
  addToCart: async (productId: string, quantity: number, color: string, size: string) => {
    return api.post('/cart/add', { productId, quantity, color, size });
  },

  // Atualizar quantidade no carrinho
  updateCartItem: async (itemId: string, quantity: number) => {
    return api.put(`/cart/items/${itemId}`, { quantity });
  },

  // Remover item do carrinho
  removeFromCart: async (itemId: string) => {
    return api.delete(`/cart/items/${itemId}`);
  },

  // Limpar carrinho
  clearCart: async () => {
    return api.delete('/cart');
  },

  // Aplicar cupom
  applyCoupon: async (code: string) => {
    return api.post('/cart/coupon', { code });
  },

  // Calcular frete
  calculateShipping: async (zipCode: string) => {
    return api.post('/cart/shipping', { zipCode });
  },
};

// === AUTENTICAÇÃO ===
export const authAPI = {
  // Login
  login: async (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },

  // Cadastro
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    return api.post('/auth/register', userData);
  },

  // Logout
  logout: async () => {
    return api.post('/auth/logout');
  },

  // Verificar email
  verifyEmail: async (token: string) => {
    return api.post('/auth/verify-email', { token });
  },

  // Esqueci a senha
  forgotPassword: async (email: string) => {
    return api.post('/auth/forgot-password', { email });
  },

  // Resetar senha
  resetPassword: async (token: string, newPassword: string) => {
    return api.post('/auth/reset-password', { token, newPassword });
  },

  // Obter perfil do usuário
  getProfile: async () => {
    return api.get('/auth/profile');
  },

  // Atualizar perfil
  updateProfile: async (userData: {
    name?: string;
    email?: string;
    phone?: string;
  }) => {
    return api.put('/auth/profile', userData);
  },

  // Alterar senha
  changePassword: async (currentPassword: string, newPassword: string) => {
    return api.put('/auth/change-password', { currentPassword, newPassword });
  },
};

// === PEDIDOS ===
export const ordersAPI = {
  // Criar pedido
  createOrder: async (orderData: {
    items: Array<{
      productId: string;
      quantity: number;
      color: string;
      size: string;
    }>;
    shippingAddress: any;
    paymentMethod: string;
    couponCode?: string;
  }) => {
    return api.post('/orders', orderData);
  },

  // Listar pedidos do usuário
  getOrders: async () => {
    return api.get('/orders');
  },

  // Obter pedido por ID
  getOrder: async (id: string) => {
    return api.get(`/orders/${id}`);
  },

  // Cancelar pedido
  cancelOrder: async (id: string) => {
    return api.patch(`/orders/${id}/cancel`);
  },
};

// === ENDEREÇOS ===
export const addressAPI = {
  // Listar endereços do usuário
  getAddresses: async () => {
    return api.get('/addresses');
  },

  // Adicionar endereço
  addAddress: async (address: {
    name: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault?: boolean;
  }) => {
    return api.post('/addresses', address);
  },

  // Atualizar endereço
  updateAddress: async (id: string, address: any) => {
    return api.put(`/addresses/${id}`, address);
  },

  // Remover endereço
  deleteAddress: async (id: string) => {
    return api.delete(`/addresses/${id}`);
  },

  // Buscar CEP
  searchZipCode: async (zipCode: string) => {
    return api.get(`/addresses/search-zip/${zipCode}`);
  },
};

// === ADMIN (protegido) ===
export const adminAPI = {
  // Produtos
  createProduct: async (productData: FormData) => {
    return api.post('/admin/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  updateProduct: async (id: string, productData: FormData) => {
    return api.put(`/admin/products/${id}`, productData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  deleteProduct: async (id: string) => {
    return api.delete(`/admin/products/${id}`);
  },

  // Pedidos
  getAllOrders: async (params?: { status?: string; page?: number }) => {
    return api.get('/admin/orders', { params });
  },

  updateOrderStatus: async (id: string, status: string) => {
    return api.patch(`/admin/orders/${id}/status`, { status });
  },

  // Usuários
  getUsers: async (params?: { page?: number; search?: string }) => {
    return api.get('/admin/users', { params });
  },

  // Estatísticas
  getDashboardStats: async () => {
    return api.get('/admin/stats');
  },

  // Cupons
  createCoupon: async (couponData: {
    code: string;
    type: 'percentage' | 'fixed' | 'free_shipping';
    value: number;
    minValue?: number;
    maxUses?: number;
    expiresAt?: string;
  }) => {
    return api.post('/admin/coupons', couponData);
  },

  getCoupons: async () => {
    return api.get('/admin/coupons');
  },

  deleteCoupon: async (id: string) => {
    return api.delete(`/admin/coupons/${id}`);
  },

  // Upload de imagens
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/admin/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

export default api;
