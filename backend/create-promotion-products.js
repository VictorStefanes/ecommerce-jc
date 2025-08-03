const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

// Configurar dotenv
require('dotenv').config({ path: __dirname + '/.env' });

async function createPromotionProducts() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Buscar categoria masculino
    const masculinoCategory = await Category.findOne({ slug: 'masculino' });
    if (!masculinoCategory) {
      console.log('❌ Categoria "masculino" não encontrada');
      return;
    }

    console.log('📂 Categoria encontrada:', masculinoCategory.name);

    // Produtos de teste para promoções
    const promotionProducts = [
      {
        name: 'Camiseta Dry Fit Essential Azul - PROMOÇÃO',
        slug: 'camiseta-dry-fit-essential-azul-promocao',
        shortDescription: 'Camiseta dry fit em promoção especial com 50% de desconto',
        description: 'Aproveite nossa promoção especial! Camiseta dry fit de alta qualidade com tecnologia anti-suor e respirabilidade máxima.',
        price: 34.90,
        originalPrice: 69.90,
        category: masculinoCategory._id,
        subcategory: null,
        images: [
          { url: '/placeholder-product.jpg', alt: 'Camiseta Dry Fit Essential Azul - PROMOÇÃO' }
        ],
        colors: [
          { name: 'Azul Royal', code: '#2563EB' },
          { name: 'Azul Marinho', code: '#1E3A8A' },
          { name: 'Verde', code: '#059669' }
        ],
        sizes: [
          { name: 'P', stock: 20 },
          { name: 'M', stock: 25 },
          { name: 'G', stock: 22 },
          { name: 'GG', stock: 15 }
        ],
        isActive: true,
        isNew: false,
        isFeatured: false,
        isPromotion: true, // Produto em promoção
        badge: '50% OFF'
      },
      {
        name: 'Bermuda Tactel Sport - PROMOÇÃO',
        slug: 'bermuda-tactel-sport-promocao',
        shortDescription: 'Bermuda tactel super leve e confortável em promoção',
        description: 'Bermuda tactel ideal para atividades físicas e lazer. Material leve, secagem rápida e muito confortável.',
        price: 39.90,
        originalPrice: 79.90,
        category: masculinoCategory._id,
        subcategory: null,
        images: [
          { url: '/placeholder-product.jpg', alt: 'Bermuda Tactel Sport - PROMOÇÃO' }
        ],
        colors: [
          { name: 'Preto', code: '#000000' },
          { name: 'Azul Marinho', code: '#1E3A8A' },
          { name: 'Cinza', code: '#6B7280' }
        ],
        sizes: [
          { name: 'P', stock: 18 },
          { name: 'M', stock: 20 },
          { name: 'G', stock: 16 },
          { name: 'GG', stock: 12 }
        ],
        isActive: true,
        isNew: false,
        isFeatured: false,
        isPromotion: true, // Produto em promoção
        badge: 'MEGA OFERTA'
      },
      {
        name: 'Kit 2 Camisetas Dry - PROMOÇÃO',
        slug: 'kit-2-camisetas-dry-promocao',
        shortDescription: 'Kit promocional com 2 camisetas dry fit por um preço especial',
        description: 'Kit imperdível! 2 camisetas dry fit de alta qualidade por um preço promocional. Cores sortidas.',
        price: 59.90,
        originalPrice: 99.80,
        category: masculinoCategory._id,
        subcategory: null,
        images: [
          { url: '/placeholder-product.jpg', alt: 'Kit 2 Camisetas Dry - PROMOÇÃO' }
        ],
        colors: [
          { name: 'Pack Preto/Branco', code: '#000000' },
          { name: 'Pack Azul/Cinza', code: '#2563EB' }
        ],
        sizes: [
          { name: 'P', stock: 15 },
          { name: 'M', stock: 18 },
          { name: 'G', stock: 20 },
          { name: 'GG', stock: 10 }
        ],
        isActive: true,
        isNew: true,
        isFeatured: false,
        isPromotion: true, // Produto em promoção
        badge: '2 POR R$59,90'
      },
      {
        name: 'Regata Fitness Pro - PROMOÇÃO',
        slug: 'regata-fitness-pro-promocao',
        shortDescription: 'Regata fitness de alta performance em oferta especial',
        description: 'Regata desenvolvida para treinos intensos. Tecido com tecnologia dry fit e design ergonômico.',
        price: 29.90,
        originalPrice: 54.90,
        category: masculinoCategory._id,
        subcategory: null,
        images: [
          { url: '/placeholder-product.jpg', alt: 'Regata Fitness Pro - PROMOÇÃO' }
        ],
        colors: [
          { name: 'Preto', code: '#000000' },
          { name: 'Branco', code: '#FFFFFF' },
          { name: 'Cinza Escuro', code: '#374151' }
        ],
        sizes: [
          { name: 'P', stock: 12 },
          { name: 'M', stock: 16 },
          { name: 'G', stock: 14 },
          { name: 'GG', stock: 8 }
        ],
        isActive: true,
        isNew: false,
        isFeatured: false,
        isPromotion: true, // Produto em promoção
        badge: 'OFERTA RELÂMPAGO'
      }
    ];

    console.log('🚀 Criando produtos em promoção...');

    for (const productData of promotionProducts) {
      const product = new Product(productData);
      await product.save();
      console.log(`✅ Produto criado: ${product.name} (${product.isPromotion ? 'EM PROMOÇÃO' : 'NORMAL'})`);
    }

    console.log('🎉 Produtos em promoção criados com sucesso!');
    console.log('📊 Total de produtos em promoção:', await Product.countDocuments({ isPromotion: true }));
    console.log('⭐ Total de produtos em destaque:', await Product.countDocuments({ isFeatured: true }));

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    mongoose.disconnect();
  }
}

createPromotionProducts();
