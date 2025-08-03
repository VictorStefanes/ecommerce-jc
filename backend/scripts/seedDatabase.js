const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-jc');

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Limpar dados existentes
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Dados anteriores removidos');

    // 1. Criar usuário admin
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = new User({
      name: 'Administrador',
      email: 'admin@ecommerce-jc.com',
      password: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();
    console.log('✅ Usuário admin criado');

    // 2. Criar estrutura completa de categorias baseada no Header
    const categoriesData = [
      // CATEGORIAS PRINCIPAIS
      { name: 'Promoções', slug: 'promocoes', description: 'Produtos em promoção especial' },
      { name: 'Masculino', slug: 'masculino', description: 'Roupas e acessórios masculinos' },
      { name: 'Feminino', slug: 'feminino', description: 'Roupas e acessórios femininos' },
      { name: 'Kits', slug: 'kits', description: 'Kits e combos especiais' },
      { name: 'Lançamentos', slug: 'lancamentos', description: 'Novidades e lançamentos' },
      { name: 'Coleções', slug: 'colecoes', description: 'Coleções especiais' },
      { name: 'Atividades', slug: 'atividades', description: 'Roupas por atividade' }
    ];

    // Criar categorias principais
    const createdCategories = {};
    for (const categoryData of categoriesData) {
      const category = new Category(categoryData);
      await category.save();
      createdCategories[categoryData.slug] = category;
      console.log(`✅ Categoria criada: ${categoryData.name}`);
    }

    // 3. Criar subcategorias baseadas no menu
    const subcategoriesData = [
      // PROMOÇÕES
      { name: 'Camisetas Dry Fit Masculino', slug: 'camisetas-dry-fit-masculino', parentSlug: 'promocoes' },
      { name: 'Oversized Masculino', slug: 'oversized-masculino', parentSlug: 'promocoes' },
      { name: 'Shorts e Bermudas Masculino', slug: 'shorts-bermudas-masculino', parentSlug: 'promocoes' },
      { name: 'Camisetas Dry Fit Feminino', slug: 'camisetas-dry-fit-feminino', parentSlug: 'promocoes' },
      { name: '03 Peças R$189', slug: '3-pecas-189', parentSlug: 'promocoes' },
      { name: '02 Conjuntos R$199', slug: '2-conjuntos-199', parentSlug: 'promocoes' },
      { name: 'Até 77% OFF', slug: 'ate-77-off', parentSlug: 'promocoes' },

      // MASCULINO - PRODUTOS
      { name: 'Camisetas', slug: 'camisetas', parentSlug: 'masculino' },
      { name: 'Regatas', slug: 'regatas', parentSlug: 'masculino' },
      { name: 'Oversized', slug: 'oversized', parentSlug: 'masculino' },
      { name: 'Shorts e Bermudas', slug: 'shorts-bermudas', parentSlug: 'masculino' },
      { name: 'Calças', slug: 'calcas', parentSlug: 'masculino' },
      { name: 'Casacos', slug: 'casacos', parentSlug: 'masculino' },
      { name: 'Moletom', slug: 'moletom', parentSlug: 'masculino' },

      // MASCULINO - ACESSÓRIOS
      { name: 'Bonés', slug: 'bones', parentSlug: 'masculino' },
      { name: 'Cuecas', slug: 'cuecas', parentSlug: 'masculino' },
      { name: 'Meias', slug: 'meias', parentSlug: 'masculino' },
      { name: 'Garrafa Térmica', slug: 'garrafa-termica', parentSlug: 'masculino' },
      { name: 'Pulseiras', slug: 'pulseiras', parentSlug: 'masculino' },
      { name: 'Acessórios', slug: 'acessorios', parentSlug: 'masculino' },

      // MASCULINO - PROMOÇÕES
      { name: 'Promo Camisetas Dry Fit', slug: 'promo-dry-fit', parentSlug: 'masculino' },
      { name: 'Promo Bermudas', slug: 'promo-bermudas', parentSlug: 'masculino' },
      { name: 'Promo Oversized', slug: 'promo-oversized', parentSlug: 'masculino' },
      { name: 'Promo Camuflada', slug: 'promo-camuflada', parentSlug: 'masculino' },
      { name: 'Promo Apex', slug: 'promo-apex', parentSlug: 'masculino' },

      // MASCULINO - ATIVIDADES
      { name: 'Running', slug: 'running', parentSlug: 'masculino' },

      // FEMININO - PRODUTOS
      { name: 'Conjunto Inverno', slug: 'conjunto-inverno', parentSlug: 'feminino' },
      { name: 'Camisetas/Cropped/Regatas', slug: 'camisetas-cropped-regatas', parentSlug: 'feminino' },
      { name: 'Legging', slug: 'legging', parentSlug: 'feminino' },
      { name: 'Short', slug: 'short', parentSlug: 'feminino' },
      { name: 'Top', slug: 'top', parentSlug: 'feminino' },
      { name: 'Conjuntos', slug: 'conjuntos', parentSlug: 'feminino' },
      { name: 'Meia Feminina', slug: 'meia-feminina', parentSlug: 'feminino' },

      // FEMININO - PROMOÇÕES
      { name: '77% OFF', slug: '77-off', parentSlug: 'feminino' },
      { name: '03 Camisetas R$109', slug: '3-camisetas-109', parentSlug: 'feminino' },

      // KITS
      { name: 'Kits Camisetas Dry', slug: 'camisetas-dry', parentSlug: 'kits' },
      { name: 'Kits Oversized', slug: 'kits-oversized', parentSlug: 'kits' },
      { name: 'Kits Camisetas Dry + Bermudas', slug: 'camisetas-bermudas', parentSlug: 'kits' },
      { name: 'Kits Camisetas Dry + Shorts', slug: 'camisetas-shorts', parentSlug: 'kits' },
      { name: 'Kits Bermudas', slug: 'kits-bermudas', parentSlug: 'kits' },
      { name: 'Kits Shorts', slug: 'kits-shorts', parentSlug: 'kits' },
      { name: 'Kits Cuecas', slug: 'kits-cuecas', parentSlug: 'kits' },

      // COLEÇÕES
      { name: 'Inverno', slug: 'inverno', parentSlug: 'colecoes' },
      { name: 'Apex', slug: 'apex', parentSlug: 'colecoes' },
      { name: 'Oversized Collection', slug: 'oversized-collection', parentSlug: 'colecoes' },
      { name: 'Camuflada', slug: 'camuflada', parentSlug: 'colecoes' },
      { name: 'AeroFit', slug: 'aerofit', parentSlug: 'colecoes' },
      { name: 'Polo Dry Fit', slug: 'polo-dry-fit', parentSlug: 'colecoes' },
      { name: 'Essential', slug: 'essential', parentSlug: 'colecoes' },
      { name: 'Poliamida', slug: 'poliamida', parentSlug: 'colecoes' },
      { name: 'Basic', slug: 'basic', parentSlug: 'colecoes' },
      { name: 'Seamless', slug: 'seamless', parentSlug: 'colecoes' },
      { name: 'ThermaFlow', slug: 'thermaflow', parentSlug: 'colecoes' }
    ];

    // Criar subcategorias
    for (const subcategoryData of subcategoriesData) {
      const parentCategory = createdCategories[subcategoryData.parentSlug];
      if (parentCategory) {
        const subcategory = new Category({
          name: subcategoryData.name,
          slug: subcategoryData.slug,
          parentCategory: parentCategory._id,
          description: `Produtos de ${subcategoryData.name}`
        });
        await subcategory.save();
        console.log(`✅ Subcategoria criada: ${subcategoryData.name} (${subcategoryData.parentSlug})`);
      }
    }

    // 4. Criar alguns produtos de exemplo para cada categoria principal
    const sampleProducts = [
      // MASCULINO
      {
        name: 'Camiseta Dry Fit Masculina Essential',
        slug: 'camiseta-dry-fit-masculina-essential',
        description: 'Camiseta masculina de alta performance com tecnologia dry fit para máximo conforto durante os treinos.',
        shortDescription: 'Camiseta dry fit com alta performance',
        price: 49.90,
        originalPrice: 69.90,
        category: createdCategories.masculino._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
            publicId: 'sample_male_shirt',
            alt: 'Camiseta Dry Fit Masculina',
            isMain: true
          }
        ],
        colors: [
          { name: 'Preto', hex: '#000000', stock: 50 },
          { name: 'Branco', hex: '#FFFFFF', stock: 30 },
          { name: 'Azul Marinho', hex: '#001F3F', stock: 25 }
        ],
        sizes: [
          { name: 'PP', stock: 10 },
          { name: 'P', stock: 15 },
          { name: 'M', stock: 20 },
          { name: 'G', stock: 15 },
          { name: 'GG', stock: 10 }
        ],
        tags: ['dry-fit', 'masculino', 'treino', 'essential'],
        badge: 'DRY FIT',
        isNew: true,
        isFeatured: true,
        isActive: true
      },

      // FEMININO
      {
        name: 'Legging Feminina High Waist',
        slug: 'legging-feminina-high-waist',
        description: 'Legging feminina de cintura alta com compressão moderada, ideal para treinos e uso casual.',
        shortDescription: 'Legging cintura alta com compressão',
        price: 89.90,
        originalPrice: 129.90,
        category: createdCategories.feminino._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1506629905607-45e5cf151d1f?w=600&h=800&fit=crop',
            publicId: 'sample_female_legging',
            alt: 'Legging Feminina High Waist',
            isMain: true
          }
        ],
        colors: [
          { name: 'Preto', hex: '#000000', stock: 40 },
          { name: 'Rosa', hex: '#FFC0CB', stock: 20 },
          { name: 'Azul Marinho', hex: '#001F3F', stock: 15 }
        ],
        sizes: [
          { name: 'PP', stock: 8 },
          { name: 'P', stock: 12 },
          { name: 'M', stock: 15 },
          { name: 'G', stock: 10 },
          { name: 'GG', stock: 5 }
        ],
        tags: ['high-waist', 'feminino', 'legging', 'compressao'],
        badge: 'HIGH WAIST',
        isNew: true,
        isFeatured: true,
        isActive: true
      },

      // KITS
      {
        name: 'Kit 3 Camisetas Dry Fit Masculinas',
        slug: 'kit-3-camisetas-dry-fit-masculinas',
        description: 'Kit com 3 camisetas dry fit masculinas em cores sortidas. Perfeito para quem treina todos os dias.',
        shortDescription: 'Kit com 3 camisetas dry fit sortidas',
        price: 109.90,
        originalPrice: 179.90,
        category: createdCategories.kits._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1583743814966-8936f37f8c6a?w=600&h=800&fit=crop',
            publicId: 'sample_kit_shirts',
            alt: 'Kit 3 Camisetas Dry Fit',
            isMain: true
          }
        ],
        colors: [
          { name: 'Cores Sortidas', hex: '#808080', stock: 30 }
        ],
        sizes: [
          { name: 'P', stock: 5 },
          { name: 'M', stock: 10 },
          { name: 'G', stock: 10 },
          { name: 'GG', stock: 5 }
        ],
        tags: ['kit', 'masculino', 'camisetas', 'dry-fit', 'promocao'],
        badge: 'KIT PROMOCIONAL',
        isNew: false,
        isFeatured: true,
        isActive: true
      },

      // LANÇAMENTOS
      {
        name: 'Conjunto Feminino Seamless',
        slug: 'conjunto-feminino-seamless',
        description: 'Conjunto feminino sem costura com tecnologia seamless para máximo conforto e movimento livre.',
        shortDescription: 'Conjunto seamless sem costura',
        price: 149.90,
        category: createdCategories.lancamentos._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop',
            publicId: 'sample_seamless_set',
            alt: 'Conjunto Feminino Seamless',
            isMain: true
          }
        ],
        colors: [
          { name: 'Rosa Nude', hex: '#E6C2B3', stock: 20 },
          { name: 'Preto', hex: '#000000', stock: 25 }
        ],
        sizes: [
          { name: 'PP', stock: 5 },
          { name: 'P', stock: 8 },
          { name: 'M', stock: 10 },
          { name: 'G', stock: 7 }
        ],
        tags: ['seamless', 'feminino', 'conjunto', 'lancamento'],
        badge: 'LANÇAMENTO',
        isNew: true,
        isLaunch: true,
        isFeatured: true,
        isActive: true
      }
    ];

    // Salvar produtos de exemplo
    for (const productData of sampleProducts) {
      const product = new Product(productData);
      await product.save();
      console.log(`✅ Produto criado: ${productData.name}`);
    }

    console.log('\n🎉 Seed concluído com sucesso!');
    console.log(`
� RESUMO DO SEED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USUÁRIO ADMIN:
   Email: admin@ecommerce-jc.com
   Senha: admin123

📁 CATEGORIAS PRINCIPAIS (${categoriesData.length}):
   • Promoções
   • Masculino  
   • Feminino
   • Kits
   • Lançamentos
   • Coleções
   • Atividades

📂 SUBCATEGORIAS (${subcategoriesData.length}):
   • Masculino: ${subcategoriesData.filter(s => s.parentSlug === 'masculino').length} subcategorias
   • Feminino: ${subcategoriesData.filter(s => s.parentSlug === 'feminino').length} subcategorias
   • Promoções: ${subcategoriesData.filter(s => s.parentSlug === 'promocoes').length} subcategorias
   • Kits: ${subcategoriesData.filter(s => s.parentSlug === 'kits').length} subcategorias
   • Coleções: ${subcategoriesData.filter(s => s.parentSlug === 'colecoes').length} subcategorias

🛍️ PRODUTOS DE EXEMPLO: ${sampleProducts.length}

🌐 ACESSO:
   Admin: http://localhost:3000/admin
   Site: http://localhost:3000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);

  } catch (error) {
    console.error('❌ Erro no seed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Conexão com MongoDB encerrada');
    process.exit(0);
  }
};

// Executar seed
seedDatabase();
