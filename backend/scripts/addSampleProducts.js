const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('dotenv').config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-jc');

const addSampleProducts = async () => {
  try {
    console.log('🌱 Adicionando produtos de exemplo...');

    // Buscar categorias
    const masculinoCategory = await Category.findOne({ slug: 'masculino' });
    const femininoCategory = await Category.findOne({ slug: 'feminino' });
    const kitsCategory = await Category.findOne({ slug: 'kits' });

    const sampleProducts = [
      {
        name: 'Regata Dry Wolf Preta',
        slug: 'regata-dry-wolf-preta',
        description: 'Regata masculina com tecnologia dry-fit, ideal para treinos intensos. Tecido respirável que absorve o suor e oferece máximo conforto durante atividades físicas.',
        shortDescription: 'Regata dry-fit para treinos intensos',
        price: 39.90,
        originalPrice: 59.90,
        category: masculinoCategory._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1583743814966-8936f37f8c6a?w=600&h=800&fit=crop',
            publicId: 'regata_dry_wolf_preta',
            alt: 'Regata Dry Wolf Preta',
            isMain: true
          },
          {
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
            publicId: 'regata_dry_wolf_preta_2',
            alt: 'Regata Dry Wolf Preta - Vista Lateral',
            isMain: false
          }
        ],
        colors: [
          { name: 'Preto', hex: '#000000', stock: 50 },
          { name: 'Branco', hex: '#FFFFFF', stock: 30 },
          { name: 'Cinza', hex: '#808080', stock: 25 }
        ],
        sizes: [
          { name: 'P', stock: 15 },
          { name: 'M', stock: 25 },
          { name: 'G', stock: 20 },
          { name: 'GG', stock: 10 }
        ],
        tags: ['regata', 'dry-fit', 'masculino', 'treino', 'wolf'],
        badge: 'DRY FIT',
        isNewProduct: true,
        isFeatured: true,
        isActive: true,
        rating: 4.8,
        reviewCount: 127
      },

      {
        name: 'Legging Feminina High Performance',
        slug: 'legging-feminina-high-performance',
        description: 'Legging feminina de alta performance com tecnologia de compressão graduada. Cintura alta modeladora e tecido que não marca. Perfeita para yoga, corrida e academia.',
        shortDescription: 'Legging de alta performance com compressão',
        price: 79.90,
        originalPrice: 119.90,
        category: femininoCategory._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1506629905607-45e5cf151d1f?w=600&h=800&fit=crop',
            publicId: 'legging_feminina_performance',
            alt: 'Legging Feminina High Performance',
            isMain: true
          }
        ],
        colors: [
          { name: 'Preto', hex: '#000000', stock: 40 },
          { name: 'Rosa', hex: '#FF69B4', stock: 25 },
          { name: 'Azul Marinho', hex: '#000080', stock: 20 }
        ],
        sizes: [
          { name: 'PP', stock: 8 },
          { name: 'P', stock: 15 },
          { name: 'M', stock: 20 },
          { name: 'G', stock: 12 },
          { name: 'GG', stock: 5 }
        ],
        tags: ['legging', 'feminino', 'yoga', 'corrida', 'compressao'],
        badge: 'BEST SELLER',
        isNewProduct: false,
        isFeatured: true,
        isActive: true,
        rating: 4.9,
        reviewCount: 203
      },

      {
        name: 'Kit 3 Camisetas Básicas Premium',
        slug: 'kit-3-camisetas-basicas-premium',
        description: 'Kit com 3 camisetas básicas de algodão premium. Corte moderno, costura reforçada e cores neutras que combinam com tudo. Excelente custo-benefício.',
        shortDescription: 'Kit com 3 camisetas de algodão premium',
        price: 89.90,
        originalPrice: 149.90,
        category: kitsCategory._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
            publicId: 'kit_3_camisetas_premium',
            alt: 'Kit 3 Camisetas Básicas Premium',
            isMain: true
          }
        ],
        colors: [
          { name: 'Mix Neutro (Preto, Branco, Cinza)', hex: '#808080', stock: 35 },
          { name: 'Mix Colorido (Azul, Verde, Vinho)', hex: '#4169E1', stock: 25 }
        ],
        sizes: [
          { name: 'P', stock: 10 },
          { name: 'M', stock: 20 },
          { name: 'G', stock: 15 },
          { name: 'GG', stock: 8 }
        ],
        tags: ['kit', 'camisetas', 'algodao', 'basico', 'premium'],
        badge: 'KIT PROMOCIONAL',
        isNewProduct: false,
        isFeatured: true,
        isActive: true,
        rating: 4.7,
        reviewCount: 89
      },

      {
        name: 'Camiseta Oversized Street Style',
        slug: 'camiseta-oversized-street-style',
        description: 'Camiseta oversized com design urbano moderno. Tecido 100% algodão com lavagem especial para efeito vintage. Perfeita para um look despojado e confortável.',
        shortDescription: 'Camiseta oversized com design urbano',
        price: 49.90,
        category: masculinoCategory._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1583743814966-8936f37f8c6a?w=600&h=800&fit=crop',
            publicId: 'camiseta_oversized_street',
            alt: 'Camiseta Oversized Street Style',
            isMain: true
          }
        ],
        colors: [
          { name: 'Preto', hex: '#000000', stock: 30 },
          { name: 'Branco Off', hex: '#F5F5F5', stock: 25 },
          { name: 'Verde Militar', hex: '#556B2F', stock: 20 }
        ],
        sizes: [
          { name: 'M', stock: 12 },
          { name: 'G', stock: 18 },
          { name: 'GG', stock: 15 },
          { name: 'XGG', stock: 8 }
        ],
        tags: ['oversized', 'street', 'urbano', 'algodao', 'vintage'],
        badge: 'TREND',
        isNewProduct: true,
        isFeatured: false,
        isActive: true,
        rating: 4.6,
        reviewCount: 45
      },

      {
        name: 'Top Fitness Feminino com Bojo',
        slug: 'top-fitness-feminino-com-bojo',
        description: 'Top esportivo feminino com bojo removível e alças ajustáveis. Tecnologia dry-fit para absorção de suor. Suporte médio, ideal para diversas atividades.',
        shortDescription: 'Top esportivo com bojo removível',
        price: 59.90,
        originalPrice: 89.90,
        category: femininoCategory._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop',
            publicId: 'top_fitness_bojo',
            alt: 'Top Fitness Feminino com Bojo',
            isMain: true
          }
        ],
        colors: [
          { name: 'Preto', hex: '#000000', stock: 35 },
          { name: 'Rosa Claro', hex: '#FFB6C1', stock: 20 },
          { name: 'Azul Turquesa', hex: '#40E0D0', stock: 15 }
        ],
        sizes: [
          { name: 'PP', stock: 10 },
          { name: 'P', stock: 15 },
          { name: 'M', stock: 18 },
          { name: 'G', stock: 12 }
        ],
        tags: ['top', 'fitness', 'bojo', 'dry-fit', 'feminino'],
        badge: 'CONFORTO PLUS',
        isNewProduct: false,
        isFeatured: true,
        isActive: true,
        rating: 4.8,
        reviewCount: 156
      }
    ];

    // Adicionar produtos
    for (const productData of sampleProducts) {
      const existingProduct = await Product.findOne({ slug: productData.slug });
      if (!existingProduct) {
        const product = new Product(productData);
        await product.save();
        console.log(`✅ Produto adicionado: ${productData.name}`);
      } else {
        console.log(`⚠️  Produto já existe: ${productData.name}`);
      }
    }

    console.log('\n🎉 Produtos de exemplo adicionados com sucesso!');
    console.log('\n🔗 URLs para testar:');
    console.log('• http://localhost:3000/produto/regata-dry-wolf-preta');
    console.log('• http://localhost:3000/produto/legging-feminina-high-performance');
    console.log('• http://localhost:3000/produto/kit-3-camisetas-basicas-premium');
    console.log('• http://localhost:3000/produto/camiseta-oversized-street-style');
    console.log('• http://localhost:3000/produto/top-fitness-feminino-com-bojo');

  } catch (error) {
    console.error('❌ Erro ao adicionar produtos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Conexão com MongoDB encerrada');
    process.exit(0);
  }
};

// Executar
addSampleProducts();
