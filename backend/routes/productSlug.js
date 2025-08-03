const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Buscar produto por slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const product = await Product.findOne({ 
      slug, 
      isActive: true 
    }).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({ 
        message: 'Produto não encontrado' 
      });
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto por slug:', error);
    res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

module.exports = router;
