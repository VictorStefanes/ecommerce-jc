const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// @route   GET /api/categories
// @desc    Listar categorias ativas
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('parentCategory', 'name slug')
      .sort({ order: 1, name: 1 })
      .select('-__v');

    // Organizar em hierarquia
    const mainCategories = categories.filter(cat => !cat.parentCategory);
    const categoriesWithChildren = mainCategories.map(category => ({
      ...category.toObject(),
      children: categories.filter(cat => 
        cat.parentCategory && cat.parentCategory._id.toString() === category._id.toString()
      )
    }));

    res.json({ categories: categoriesWithChildren });
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/categories/:slug
// @desc    Obter categoria por slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    }).populate('parentCategory', 'name slug');

    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    // Buscar subcategorias
    const subcategories = await Category.find({ 
      parentCategory: category._id, 
      isActive: true 
    }).select('name slug');

    res.json({
      category,
      subcategories
    });
  } catch (error) {
    console.error('Erro ao obter categoria:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
