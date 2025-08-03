const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');
const emailService = require('../services/emailService');

// @route   GET /api/cart
// @desc    Obter carrinho do usuário
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ 
      user: req.user.id, 
      isActive: true 
    }).populate('items.product', 'name price image stock');

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/cart/add
// @desc    Adicionar item ao carrinho
// @access  Private
router.post('/add', [
  auth,
  body('productId').isMongoId().withMessage('ID do produto inválido'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantidade deve ser um número positivo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const { productId, quantity } = req.body;

    // Verificar se produto existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Verificar estoque
    if (product.stock < quantity) {
      return res.status(400).json({ 
        message: `Estoque insuficiente. Disponível: ${product.stock}` 
      });
    }

    // Buscar ou criar carrinho
    let cart = await Cart.findOne({ 
      user: req.user.id, 
      isActive: true 
    });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Verificar se item já existe no carrinho
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Atualizar quantidade
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      if (newQuantity > product.stock) {
        return res.status(400).json({ 
          message: `Quantidade total excede o estoque. Disponível: ${product.stock}` 
        });
      }
      
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Adicionar novo item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.image
      });
    }

    await cart.save();
    await cart.populate('items.product', 'name price image stock');

    res.json(cart);
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   PUT /api/cart/update
// @desc    Atualizar quantidade de item no carrinho
// @access  Private
router.put('/update', [
  auth,
  body('productId').isMongoId().withMessage('ID do produto inválido'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantidade deve ser um número não negativo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ 
      user: req.user.id, 
      isActive: true 
    });

    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item não encontrado no carrinho' });
    }

    if (quantity === 0) {
      // Remover item
      cart.items.splice(itemIndex, 1);
    } else {
      // Verificar estoque
      const product = await Product.findById(productId);
      if (quantity > product.stock) {
        return res.status(400).json({ 
          message: `Estoque insuficiente. Disponível: ${product.stock}` 
        });
      }
      
      // Atualizar quantidade
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product', 'name price image stock');

    res.json(cart);
  } catch (error) {
    console.error('Erro ao atualizar carrinho:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   DELETE /api/cart/remove/:productId
// @desc    Remover item do carrinho
// @access  Private
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ 
      user: req.user.id, 
      isActive: true 
    });

    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('items.product', 'name price image stock');

    res.json(cart);
  } catch (error) {
    console.error('Erro ao remover do carrinho:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Limpar carrinho
// @access  Private
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ 
      user: req.user.id, 
      isActive: true 
    });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ message: 'Carrinho limpo com sucesso' });
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
