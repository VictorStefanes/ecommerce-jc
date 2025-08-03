const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

// Configurar dotenv
require('dotenv').config({ path: __dirname + '/.env' });

async function createTestProducts() {
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

    // Produtos de teste para camisetas
    const testProducts = [
      {
        name: 'Camiseta Dry Fit Essential Preto',
        slug: 'camiseta-dry-fit-essential-preto',
        shortDescription: 'Camiseta tecnológica de alta performance para treinos intensos',
        description: 'Camiseta confeccionada em tecido dry fit de alta qualidade, proporcionando máximo conforto e respirabilidade durante atividades físicas. Ideal para treinos, corridas e atividades ao ar livre.',
        price: 49.90,
        originalPrice: 79.90,
        category: masculinoCategory._id,
        subcategory: null,
        images: [
          { url: '/placeholder-product.jpg', alt: 'Camiseta Dry Fit Essential Preto' }
        ],
        colors: [
          { name: 'Preto', code: '#000000' },
          { name: 'Branco', code: '#FFFFFF' },
          { name: 'Azul Marinho', code: '#1E3A8A' }
        ],
        sizes: [
          { name: 'P', stock: 15 },
          { name: 'M', stock: 20 },
          { name: 'G', stock: 18 },
          { name: 'GG', stock: 12 }
        ],
        isActive: true,
        isNew: false,
        isFeatured: true, // Produto em destaque
        isPromotion: false,
        badge: '03 POR R$120'
      },
      {
        name: 'Camiseta Oversized Premium Cinza',
        slug: 'camiseta-oversized-premium-cinza',
        shortDescription: 'Camiseta oversized em algodão premium com acabamento diferenciado',
        description: 'Camiseta oversized confeccionada em 100% algodão premium, com modelagem moderna e confortável. Perfeita para o dia a dia e momentos de descontração.',
        price: 69.90,
        originalPrice: 99.90,
        category: masculinoCategory._id,
        subcategory: null,
        images: [
          { url: '/placeholder-product.jpg', alt: 'Camiseta Oversized Premium Cinza' }
        ],
        colors: [
          { name: 'Cinza Mescla', code: '#6B7280' },
          { name: 'Preto', code: '#000000' },
          { name: 'Branco', code: '#FFFFFF' }
        ],
        sizes: [
          { name: 'M', stock: 12 },
          { name: 'G', stock: 16 },
          { name: 'GG', stock: 14 },
          { name: 'XGG', stock: 8 }
        ],
        isActive: true,
        isNew: true,
        isFeatured: true, // Produto em destaque
        isPromotion: false,
        badge: 'LANÇAMENTO'
      },
      {
        name: 'Camiseta Apex Performance Preto',
        slug: 'camiseta-apex-performance-preto',
        shortDescription: 'Linha premium com tecnologia anti-suor e proteção UV',
        description: 'Camiseta da linha Apex com tecnologia avançada de proteção UV50+ e tecido anti-suor. Desenvolvida para atletas e praticantes de esportes de alto rendimento.',
        price: 79.90,
        originalPrice: 119.90,
        category: masculinoCategory._id,
        subcategory: null,
        images: [
          { url: '/placeholder-product.jpg', alt: 'Camiseta Apex Performance Preto' }
        ],
        colors: [
          { name: 'Preto', code: '#000000' },
          { name: 'Cinza Escuro', code: '#374151' },
          { name: 'Azul Marinho', code: '#1E3A8A' }
        ],
        sizes: [
          { name: 'P', stock: 10 },
          { name: 'M', stock: 15 },
          { name: 'G', stock: 18 },
          { name: 'GG', stock: 12 },
          { name: 'XGG', stock: 5 }
        ],
        isActive: true,
        isNew: false,
        isFeatured: true, // Produto em destaque
        isPromotion: true,
        badge: 'LINHA APEX'
      },
      {
        name: 'Camiseta Training Sport Azul',
        slug: 'camiseta-training-sport-azul',
        shortDescription: 'Camiseta de treino com ajuste perfeito e durabilidade superior',
        description: 'Camiseta desenvolvida especialmente para treinos intensos, com tecido resistente e design ergonômico que acompanha todos os movimentos.',
        price: 55.90,
        originalPrice: 89.90,
        category: masculinoCategory._id,
        subcategory: null,
        images: [
          { url: '/placeholder-product.jpg', alt: 'Camiseta Training Sport Azul' }
        ],
        colors: [
          { name: 'Azul Royal', code: '#2563EB' },
          { name: 'Preto', code: '#000000' },
          { name: 'Verde Militar', code: '#166534' }
        ],
        sizes: [
          { name: 'P', stock: 8 },
          { name: 'M', stock: 14 },
          { name: 'G', stock: 16 },
          { name: 'GG', stock: 10 }
        ],
        isActive: true,
        isNew: false,
        isFeatured: true, // Produto em destaque
        isPromotion: false,
        badge: '02 POR R$95'
      }
    ];

    console.log('🚀 Criando produtos de teste...');

    for (const productData of testProducts) {
      const product = new Product(productData);
      await product.save();
      console.log(`✅ Produto criado: ${product.name} (${product.isFeatured ? 'EM DESTAQUE' : 'NORMAL'})`);
    }

    console.log('🎉 Produtos de teste criados com sucesso!');
    console.log('📊 Total de produtos em destaque:', await Product.countDocuments({ isFeatured: true }));

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    mongoose.disconnect();
  }
}

createTestProducts();
