"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  AlertTriangle,
  Eye,
  Plus,
  LogOut
} from 'lucide-react';
import './dashboard.scss';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

interface LowStockProduct {
  _id: string;
  name: string;
  totalStock: number;
}

interface RecentOrder {
  _id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');

    if (!token || !userData) {
      router.push('/admin');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin') {
        router.push('/admin');
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      router.push('/admin');
    }
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setLowStockProducts(data.lowStockProducts || []);
        setRecentOrders(data.recentOrders || []);
      } else {
        console.error('Erro ao carregar dados do dashboard');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: '#f59e0b',
      confirmed: '#3b82f6',
      processing: '#8b5cf6',
      shipped: '#06b6d4',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="admin-dashboard loading">
        <div className="loading-spinner">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Dashboard Administrativo</h1>
            <p>Bem-vindo de volta, {user?.name}</p>
          </div>
          <div className="header-right">
            <button 
              className="btn-primary"
              onClick={() => router.push('/admin/products/new')}
            >
              <Plus size={16} />
              Novo Produto
            </button>
            <button className="btn-logout" onClick={handleLogout}>
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon products">
              <Package size={24} />
            </div>
            <div className="stat-content">
              <h3>Produtos</h3>
              <p className="stat-number">{stats.totalProducts}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orders">
              <ShoppingCart size={24} />
            </div>
            <div className="stat-content">
              <h3>Pedidos</h3>
              <p className="stat-number">{stats.totalOrders}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon users">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>Usuários</h3>
              <p className="stat-number">{stats.totalUsers}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <h3>Faturamento</h3>
              <p className="stat-number">{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="dashboard-content">
        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>Ações Rápidas</h2>
          <div className="actions-grid">
            <button 
              className="action-card"
              onClick={() => router.push('/admin/products')}
            >
              <Package size={24} />
              <span>Gerenciar Produtos</span>
            </button>
            <button 
              className="action-card"
              onClick={() => router.push('/admin/orders')}
            >
              <ShoppingCart size={24} />
              <span>Ver Pedidos</span>
            </button>
            <button 
              className="action-card"
              onClick={() => router.push('/admin/categories')}
            >
              <BarChart3 size={24} />
              <span>Categorias</span>
            </button>
            <button 
              className="action-card"
              onClick={() => router.push('/admin/users')}
            >
              <Users size={24} />
              <span>Usuários</span>
            </button>
          </div>
        </section>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <section className="low-stock-section">
            <h2>
              <AlertTriangle size={20} />
              Produtos com Estoque Baixo
            </h2>
            <div className="low-stock-list">
              {lowStockProducts.map((product) => (
                <div key={product._id} className="low-stock-item">
                  <span className="product-name">{product.name}</span>
                  <span className="stock-quantity">{product.totalStock} unidades</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent Orders */}
        <section className="recent-orders">
          <h2>Pedidos Recentes</h2>
          <div className="orders-table">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order._id} className="order-row">
                  <div className="order-info">
                    <span className="order-number">#{order.orderNumber}</span>
                    <span className="order-customer">{order.user.name}</span>
                  </div>
                  <div className="order-details">
                    <span className="order-value">{formatCurrency(order.total)}</span>
                    <span 
                      className="order-status"
                      style={{ color: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="order-date">
                    {formatDate(order.createdAt)}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>Nenhum pedido encontrado</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
