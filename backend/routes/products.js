const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/products/featured
// @desc    Obter produtos em destaque para a página inicial
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({
      isActive: true,
      isFeatured: true
    })
    .populate('category', 'name slug')
    .select('name slug price originalPrice images shortDescription badge')
    .sort({ createdAt: -1 })
    .limit(4);

    res.json({
      message: 'Produtos em destaque obtidos com sucesso',
      products: featuredProducts,
      count: featuredProducts.length
    });
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products/promotions/latest
// @desc    Obter últimos 4 produtos em promoção para a página inicial
// @access  Public
router.get('/promotions/latest', async (req, res) => {
  try {
    const promotionProducts = await Product.find({
      isActive: true,
      isPromotion: true
    })
    .populate('category', 'name slug')
    .select('name slug price originalPrice images shortDescription badge')
    .sort({ createdAt: -1 })
    .limit(4);

    // Se não houver 4 produtos em promoção, pegar os mais recentes
    if (promotionProducts.length < 4) {
      const additionalProducts = await Product.find({
        isActive: true,
        _id: { $nin: promotionProducts.map(p => p._id) }
      })
      .populate('category', 'name slug')
      .select('name slug price originalPrice images shortDescription badge')
      .sort({ createdAt: -1 })
      .limit(4 - promotionProducts.length);

      // Marcar produtos adicionais como promoção automaticamente
      if (additionalProducts.length > 0) {
        await Product.updateMany(
          { _id: { $in: additionalProducts.map(p => p._id) } },
          { isPromotion: true }
        );
        
        // Atualizar os objetos retornados
        additionalProducts.forEach(product => {
          product.isPromotion = true;
        });
      }

      promotionProducts.push(...additionalProducts);
    }

    res.json({
      message: 'Produtos em promoção obtidos com sucesso',
      products: promotionProducts
    });
  } catch (error) {
    console.error('Erro ao obter produtos em promoção:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products
// @desc    Listar produtos (com filtros e paginação)
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Página deve ser um número positivo'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limite deve ser entre 1 e 100'),
  query('category').optional().isMongoId().withMessage('ID da categoria inválido'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Preço mínimo inválido'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Preço máximo inválido'),
  query('sortBy').optional().isIn(['name', 'price', 'createdAt', 'rating']).withMessage('Ordenação inválida'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Ordem inválida')
], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Parâmetros inválidos', 
        errors: errors.array() 
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Construir filtros
    const filters = { isActive: true };

    if (req.query.category) {
      filters.category = req.query.category;
    }

    if (req.query.search) {
      filters.$text = { $search: req.query.search };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};
      if (req.query.minPrice) filters.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filters.price.$lte = parseFloat(req.query.maxPrice);
    }

    if (req.query.isNew === 'true') filters.isNewProduct = true;
    if (req.query.isLaunch === 'true') filters.isLaunch = true;
    if (req.query.isFeatured === 'true') filters.isFeatured = true;

    // Ordenação
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sort = { [sortBy]: sortOrder };

    // Se for busca por texto, ordenar por relevância
    if (req.query.search) {
      sort.score = { $meta: 'textScore' };
    }

    // Executar consulta
    const products = await Product.find(filters)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Product.countDocuments(filters);
    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      pagination: {
        current: page,
        pages: totalPages,
        total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products/featured
// @desc    Listar produtos em destaque (alias)
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const products = await Product.find({ 
      isFeatured: true, 
      isActive: true 
    })
    .populate('category', 'name slug')
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');

    res.json({ products });
  } catch (error) {
    console.error('Erro ao listar produtos em destaque:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products/featured/list
// @desc    Listar produtos em destaque
// @access  Public
router.get('/featured/list', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const products = await Product.find({ 
      isFeatured: true, 
      isActive: true 
    })
    .populate('category', 'name slug')
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');

    res.json({ products });
  } catch (error) {
    console.error('Erro ao listar produtos em destaque:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products/new
// @desc    Listar produtos novos (alias)
// @access  Public
router.get('/new', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const products = await Product.find({ 
      isNewProduct: true, 
      isActive: true 
    })
    .populate('category', 'name slug')
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');

    res.json({ products });
  } catch (error) {
    console.error('Erro ao listar produtos novos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products/new/list
// @desc    Listar produtos novos
// @access  Public
router.get('/new/list', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const products = await Product.find({ 
      isNewProduct: true, 
      isActive: true 
    })
    .populate('category', 'name slug')
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');

    res.json({ products });
  } catch (error) {
    console.error('Erro ao listar produtos novos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products/category/:categorySlug
// @desc    Listar produtos por categoria
// @access  Public
router.get('/category/:categorySlug', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.categorySlug, 
      isActive: true 
    });

    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const products = await Product.find({ 
      category: category._id, 
      isActive: true 
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-__v');

    const total = await Product.countDocuments({ 
      category: category._id, 
      isActive: true 
    });

    res.json({
      category,
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erro ao listar produtos por categoria:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products/subcategory/:subcategorySlug
// @desc    Listar produtos por subcategoria
// @access  Public
router.get('/subcategory/:subcategorySlug', [
  query('page').optional().isInt({ min: 1 }).withMessage('Página deve ser um número positivo'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limite deve ser entre 1 e 100')
], async (req, res) => {
  try {
    const { subcategorySlug } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Buscar subcategoria pelo slug
    const subcategory = await Category.findOne({ 
      slug: subcategorySlug, 
      isActive: true 
    });

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategoria não encontrada' });
    }

    const products = await Product.find({ 
      subcategory: subcategory._id, 
      isActive: true 
    })
    .populate('category', 'name slug')
    .populate('subcategory', 'name slug')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-__v');

    const total = await Product.countDocuments({ 
      subcategory: subcategory._id, 
      isActive: true 
    });

    res.json({
      subcategory,
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erro ao listar produtos por subcategoria:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products/filter
// @desc    Filtrar produtos por categoria, subcategoria, etc.
// @access  Public
router.get('/filter', async (req, res) => {
  try {
    const { category, subcategory, sort = 'createdAt', order = 'desc' } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    console.log('Filtro recebido:', { category, subcategory, sort, order });

    // Construir filtros
    const filters = { isActive: true };

    // Filtrar por categoria
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      console.log('Categoria encontrada:', categoryDoc);
      if (categoryDoc) {
        filters.category = categoryDoc._id;
      }
    }

    // Filtrar por subcategoria
    if (subcategory) {
      const subcategoryDoc = await Category.findOne({ slug: subcategory });
      console.log('Subcategoria encontrada:', subcategoryDoc);
      if (subcategoryDoc) {
        filters.subcategory = subcategoryDoc._id;
      }
    }

    console.log('Filtros finais:', filters);

    // Definir ordenação
    const sortOptions = {};
    switch (sort) {
      case 'price-asc':
        sortOptions.price = 1;
        break;
      case 'price-desc':
        sortOptions.price = -1;
        break;
      case 'name':
        sortOptions.name = 1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      default:
        sortOptions.createdAt = order === 'asc' ? 1 : -1;
    }

    const products = await Product.find(filters)
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('name slug price originalPrice images shortDescription badge colors sizes isNew isFeatured isPromotion createdAt');

    console.log('Produtos encontrados:', products.length);

    const total = await Product.countDocuments(filters);

    res.json({
      message: 'Produtos filtrados com sucesso',
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      filters: {
        category,
        subcategory,
        sort,
        order
      }
    });
  } catch (error) {
    console.error('Erro ao filtrar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products/search
// @desc    Buscar produtos
// @access  Public
router.get('/search', [
  query('q').notEmpty().withMessage('Termo de busca é obrigatório'),
  query('page').optional().isInt({ min: 1 }).withMessage('Página deve ser um número positivo'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limite deve ser entre 1 e 100')
], async (req, res) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const products = await Product.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { tags: { $in: [new RegExp(q, 'i')] } }
          ]
        }
      ]
    })
    .populate('category', 'name slug')
    .populate('subcategory', 'name slug')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-__v');

    const total = await Product.countDocuments({
      $and: [
        { isActive: true },
        {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { tags: { $in: [new RegExp(q, 'i')] } }
          ]
        }
      ]
    });

    res.json({
      query: q,
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/products/:slug
// @desc    Obter produto por slug
// @access  Public
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const product = await Product.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    })
    .populate('category', 'name slug')
    .populate('subcategory', 'name slug');

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Incrementar contador de visualizações
    await Product.findByIdAndUpdate(product._id, { 
      $inc: { viewCount: 1 } 
    });

    // Buscar produtos relacionados
    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
      isActive: true
    })
    .limit(4)
    .select('name slug price originalPrice images');

    res.json({
      product,
      relatedProducts
    });
  } catch (error) {
    console.error('Erro ao obter produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
