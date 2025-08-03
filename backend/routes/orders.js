const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');
const { auth } = require('../middleware/auth');
const emailService = require('../services/emailService');

const router = express.Router();

// @route   POST /api/orders
// @desc    Criar novo pedido
// @access  Private
router.post('/', auth, [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Pedido deve ter pelo menos um item'),
  body('items.*.product')
    .isMongoId()
    .withMessage('ID do produto inválido'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantidade deve ser um número positivo'),
  body('shippingAddress.name')
    .trim()
    .notEmpty()
    .withMessage('Nome do destinatário é obrigatório'),
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Endereço é obrigatório'),
  body('shippingAddress.zipCode')
    .trim()
    .notEmpty()
    .withMessage('CEP é obrigatório')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const { items, shippingAddress, paymentMethod } = req.body;

    // Verificar produtos e calcular totais
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product || !product.isActive) {
        return res.status(400).json({ 
          message: `Produto ${item.product} não encontrado ou inativo` 
        });
      }

      // Verificar estoque
      if (product.totalStock < item.quantity) {
        return res.status(400).json({ 
          message: `Estoque insuficiente para ${product.name}` 
        });
      }

      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0]?.url,
        price: product.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        subtotal: itemSubtotal
      });
    }

    // Calcular frete (aqui você pode integrar com APIs de frete)
    const shipping = {
      cost: subtotal >= 200 ? 0 : 15.90, // Frete grátis acima de R$ 200
      method: 'Correios',
      estimatedDays: 7
    };

    const total = subtotal + shipping.cost;

    // Criar pedido
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      subtotal,
      shipping,
      total,
      paymentMethod,
      shippingAddress
    });

    await order.save();

    // Reduzir estoque dos produtos
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { totalStock: -item.quantity } }
      );
    }

    // 🛒 DESATIVAR CARRINHO APÓS PEDIDO CRIADO
    try {
      await Cart.findOneAndUpdate(
        { user: req.user._id, isActive: true },
        { isActive: false, completedAt: new Date() }
      );
      console.log('✅ Carrinho desativado após criação do pedido');
    } catch (cartError) {
      console.error('⚠️ Erro ao desativar carrinho:', cartError);
      // Não falha o pedido se não conseguir desativar o carrinho
    }

    await order.populate('user', 'name email');

    // 📧 ENVIAR EMAIL DE CONFIRMAÇÃO
    try {
      await emailService.sendOrderConfirmation(order, order.user);
      console.log('✅ Email de confirmação enviado para:', order.user.email);
    } catch (emailError) {
      console.error('❌ Erro ao enviar email de confirmação:', emailError);
      // Não falha o pedido se o email não for enviado
    }

    // 📧 NOTIFICAR ADMIN SOBRE NOVO PEDIDO
    try {
      await emailService.sendAdminNotification('new_order', {
        order,
        customer: order.user
      });
      console.log('✅ Notificação admin enviada');
    } catch (emailError) {
      console.error('❌ Erro ao enviar notificação admin:', emailError);
    }

    res.status(201).json({
      message: 'Pedido criado com sucesso',
      order
    });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/orders
// @desc    Listar pedidos do usuário
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Order.countDocuments({ user: req.user._id });

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

// @route   GET /api/orders/:id
// @desc    Obter detalhes do pedido
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.product', 'name slug');

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Erro ao obter pedido:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Atualizar status do pedido (apenas admin)
// @access  Admin
router.put('/:id/status', auth, [
  body('status')
    .isIn(['confirmed', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Status inválido'),
  body('trackingCode')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Código de rastreamento deve ter pelo menos 5 caracteres')
], async (req, res) => {
  try {
    // Verificar se é admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const { status, trackingCode } = req.body;

    const order = await Order.findById(req.params.id)
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // Atualizar status
    order.status = status;
    if (trackingCode) {
      order.trackingCode = trackingCode;
    }

    await order.save();

    // 📧 ENVIAR EMAIL DE ATUALIZAÇÃO DE STATUS
    try {
      await emailService.sendOrderStatusUpdate(order, order.user, status);
      console.log(`✅ Email de status ${status} enviado para:`, order.user.email);
    } catch (emailError) {
      console.error('❌ Erro ao enviar email de status:', emailError);
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

module.exports = router;
