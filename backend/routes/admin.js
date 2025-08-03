const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Todas as rotas precisam de autenticação de admin
router.use(adminAuth);

// ================================
// DASHBOARD ESTATÍSTICAS
// ================================

// @route   GET /api/admin/dashboard
// @desc    Obter estatísticas do dashboard
// @access  Admin
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalUsers,
      revenueData,
      lowStockProducts,
      recentOrders
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Product.find({ totalStock: { $lte: 5 }, isActive: true })
        .select('name totalStock')
        .limit(10),
      Order.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(5)
        .select('orderNumber total status createdAt')
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    res.json({
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue
      },
      lowStockProducts,
      recentOrders
    });
  } catch (error) {
    console.error('Erro ao obter dados do dashboard:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// ================================
// GERENCIAMENTO DE PRODUTOS
// ================================

// @route   GET /api/admin/products
// @desc    Listar todos os produtos para admin
// @access  Admin
router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filters = {};
    if (req.query.search) {
      filters.$text = { $search: req.query.search };
    }
    if (req.query.category) {
      filters.category = req.query.category;
    }
    if (req.query.status === 'active') {
      filters.isActive = true;
    } else if (req.query.status === 'inactive') {
      filters.isActive = false;
    }

    const products = await Product.find(filters)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filters);

    res.json({
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erro ao listar produtos admin:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/admin/products
// @desc    Criar novo produto
// @access  Admin
router.post('/products', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Nome deve ter entre 2 e 200 caracteres'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Descrição deve ter entre 10 e 2000 caracteres'),
  body('category')
    .isMongoId()
    .withMessage('ID da categoria inválido'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Preço deve ser um número positivo'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('Pelo menos uma imagem é obrigatória')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    // Verificar se categoria existe
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({ message: 'Categoria não encontrada' });
    }

    const product = new Product(req.body);
    await product.save();

    await product.populate('category', 'name slug');

    res.status(201).json({
      message: 'Produto criado com sucesso',
      product
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Produto com este nome já existe' });
    }
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Atualizar produto
// @access  Admin
router.put('/products/:id', [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Nome deve ter entre 2 e 200 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Descrição deve ter entre 10 e 2000 caracteres'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Preço deve ser um número positivo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({
      message: 'Produto atualizado com sucesso',
      product
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Deletar produto (soft delete)
// @access  Admin
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// ================================
// GERENCIAMENTO DE CATEGORIAS
// ================================

// @route   GET /api/admin/categories
// @desc    Listar todas as categorias
// @access  Admin
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('parentCategory', 'name')
      .sort({ order: 1, name: 1 });

    res.json({ categories });
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/admin/categories
// @desc    Criar nova categoria
// @access  Admin
router.post('/categories', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nome deve ter entre 2 e 50 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const category = new Category(req.body);
    await category.save();

    res.status(201).json({
      message: 'Categoria criada com sucesso',
      category
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Categoria com este nome já existe' });
    }
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// ================================
// GERENCIAMENTO DE PEDIDOS
// ================================

// @route   GET /api/admin/orders
// @desc    Listar todos os pedidos
// @access  Admin
router.get('/orders', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filters = {};
    if (req.query.status) {
      filters.status = req.query.status;
    }
    if (req.query.paymentStatus) {
      filters.paymentStatus = req.query.paymentStatus;
    }

    const orders = await Order.find(filters)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(filters);

    res.json({
      orders,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   PUT /api/admin/orders/:id/status
// @desc    Atualizar status do pedido
// @access  Admin
router.put('/orders/:id/status', [
  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Status inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        ...(req.body.trackingCode && { trackingCode: req.body.trackingCode })
      },
      { new: true }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.json({
      message: 'Status do pedido atualizado com sucesso',
      order
    });
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// ================================
// ESTATÍSTICAS DE CARRINHO ABANDONADO
// ================================

// @route   GET /api/admin/cart-stats
// @desc    Obter estatísticas de carrinho abandonado
// @access  Admin
router.get('/cart-stats', async (req, res) => {
  try {
    const cartAbandonmentService = require('../services/cartAbandonmentService');
    const stats = await cartAbandonmentService.getStats();
    
    if (!stats) {
      return res.status(500).json({ message: 'Erro ao obter estatísticas' });
    }

    res.json({
      message: 'Estatísticas de carrinho abandonado',
      stats: {
        activeCartsWithItems: stats.activeCartsWithItems,
        abandonedLast24h: stats.abandonedLast24h,
        remindersSent7Days: stats.remindersSent7Days,
        totalAbandonedValue: `R$ ${stats.totalValue.toFixed(2)}`,
        recoveryPotential: `${((stats.abandonedLast24h / Math.max(stats.activeCartsWithItems, 1)) * 100).toFixed(1)}%`
      }
    });
  } catch (error) {
    console.error('Erro ao obter estatísticas de carrinho:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/admin/cart-reminder/force
// @desc    Forçar verificação de carrinho abandonado (para testes)
// @access  Admin
router.post('/cart-reminder/force', async (req, res) => {
  try {
    const cartAbandonmentService = require('../services/cartAbandonmentService');
    
    // Executar verificação em background
    cartAbandonmentService.forceCheck().catch(error => {
      console.error('Erro na verificação forçada:', error);
    });

    res.json({
      message: 'Verificação de carrinho abandonado iniciada em background'
    });
  } catch (error) {
    console.error('Erro ao forçar verificação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// ================================
// MONITORAMENTO DE ESTOQUE
// ================================

// @route   GET /api/admin/stock-stats
// @desc    Obter estatísticas de estoque
// @access  Admin
router.get('/stock-stats', async (req, res) => {
  try {
    const stockMonitorService = require('../services/stockMonitorService');
    const stats = await stockMonitorService.getStockStats();
    
    if (!stats) {
      return res.status(500).json({ message: 'Erro ao obter estatísticas de estoque' });
    }

    res.json({
      message: 'Estatísticas de estoque',
      stats: {
        totalProducts: stats.totalProducts,
        wellStocked: stats.wellStocked,
        lowStock: stats.lowStock,
        outOfStock: stats.outOfStock,
        averageStock: Math.round(stats.averageStock),
        healthPercentage: `${((stats.wellStocked / Math.max(stats.totalProducts, 1)) * 100).toFixed(1)}%`
      }
    });
  } catch (error) {
    console.error('Erro ao obter estatísticas de estoque:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/admin/stock-alert/force
// @desc    Forçar verificação de estoque baixo (para testes)
// @access  Admin
router.post('/stock-alert/force', async (req, res) => {
  try {
    const stockMonitorService = require('../services/stockMonitorService');
    
    // Executar verificação em background
    stockMonitorService.forceCheck().catch(error => {
      console.error('Erro na verificação de estoque forçada:', error);
    });

    res.json({
      message: 'Verificação de estoque baixo iniciada em background'
    });
  } catch (error) {
    console.error('Erro ao forçar verificação de estoque:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// ================================
// GERENCIAMENTO DE PROMOÇÕES
// ================================

// @route   PUT /api/admin/products/:id/promotion
// @desc    Toggle promoção do produto
// @access  Admin
router.put('/products/:id/promotion', async (req, res) => {
  try {
    const { isPromotion } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isPromotion: !!isPromotion },
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({
      message: `Produto ${isPromotion ? 'adicionado à' : 'removido da'} promoção`,
      product: {
        id: product._id,
        name: product.name,
        isPromotion: product.isPromotion,
        price: product.price,
        originalPrice: product.originalPrice
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar promoção:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/admin/promotions
// @desc    Listar produtos em promoção
// @access  Admin
router.get('/promotions', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const products = await Product.find({ 
      isPromotion: true,
      isActive: true 
    })
    .populate('category', 'name')
    .select('name price originalPrice images createdAt isActive')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await Product.countDocuments({ 
      isPromotion: true,
      isActive: true 
    });

    res.json({
      message: 'Produtos em promoção listados com sucesso',
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erro ao listar promoções:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// ================================
// GERENCIAMENTO DE PRODUTOS EM DESTAQUE
// ================================

// @route   PUT /api/admin/products/:id/featured
// @desc    Toggle destaque do produto
// @access  Admin
router.put('/products/:id/featured', async (req, res) => {
  try {
    const { isFeatured } = req.body;
    
    // Se está tentando marcar como destaque, verificar se já não há 4
    if (isFeatured) {
      const featuredCount = await Product.countDocuments({ 
        isFeatured: true, 
        isActive: true 
      });
      
      if (featuredCount >= 4) {
        return res.status(400).json({ 
          message: 'Máximo de 4 produtos em destaque permitido. Remova um produto em destaque primeiro.' 
        });
      }
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isFeatured: !!isFeatured },
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({
      message: `Produto ${isFeatured ? 'adicionado ao' : 'removido do'} destaque`,
      product: {
        id: product._id,
        name: product.name,
        isFeatured: product.isFeatured,
        price: product.price,
        category: product.category?.name
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar destaque:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/admin/featured
// @desc    Listar produtos em destaque
// @access  Admin
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ 
      isFeatured: true,
      isActive: true 
    })
    .populate('category', 'name')
    .select('name price originalPrice images createdAt isActive')
    .sort({ createdAt: -1 })
    .limit(4);

    const availableSlots = 4 - products.length;

    res.json({
      message: 'Produtos em destaque listados com sucesso',
      products,
      stats: {
        total: products.length,
        maxAllowed: 4,
        availableSlots
      }
    });
  } catch (error) {
    console.error('Erro ao listar produtos em destaque:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// ================================
// GERENCIAMENTO DE PROMOÇÕES
// ================================

// @route   PUT /api/admin/products/:id/promotion
// @desc    Toggle promoção do produto
// @access  Admin
router.put('/products/:id/promotion', async (req, res) => {
  try {
    const { isPromotion } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isPromotion: !!isPromotion },
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({
      message: `Produto ${isPromotion ? 'adicionado à' : 'removido da'} promoção`,
      product: {
        id: product._id,
        name: product.name,
        isPromotion: product.isPromotion,
        price: product.price,
        category: product.category?.name
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar promoção:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
