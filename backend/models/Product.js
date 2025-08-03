const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true,
    maxlength: [200, 'Nome não pode ter mais de 200 caracteres']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    maxlength: [2000, 'Descrição não pode ter mais de 2000 caracteres']
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'Descrição curta não pode ter mais de 300 caracteres']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Categoria é obrigatória']
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Preço original não pode ser negativo']
  },
  costPrice: {
    type: Number,
    min: [0, 'Preço de custo não pode ser negativo']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String, // Para Cloudinary
    alt: String,
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  colors: [{
    name: String,
    hex: String,
    stock: {
      type: Number,
      default: 0,
      min: 0
    }
  }],
  sizes: [{
    name: String,
    stock: {
      type: Number,
      default: 0,
      min: 0
    }
  }],
  totalStock: {
    type: Number,
    default: 0,
    min: 0
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isNewProduct: {
    type: Boolean,
    default: false
  },
  isLaunch: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPromotion: {
    type: Boolean,
    default: false
  },
  badge: String,
  tags: [String],
  weight: Number, // em gramas
  dimensions: {
    length: Number, // em cm
    width: Number,
    height: Number
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  seoTitle: String,
  seoDescription: String,
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Índices para melhor performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ slug: 1 });

// Middleware para gerar slug automaticamente
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Middleware para calcular estoque total
productSchema.pre('save', function(next) {
  if (this.colors && this.colors.length > 0) {
    this.totalStock = this.colors.reduce((total, color) => total + color.stock, 0);
  } else if (this.sizes && this.sizes.length > 0) {
    this.totalStock = this.sizes.reduce((total, size) => total + size.stock, 0);
  }
  next();
});

// Virtual para verificar se tem desconto
productSchema.virtual('hasDiscount').get(function() {
  return this.originalPrice && this.originalPrice > this.price;
});

// Virtual para calcular porcentagem de desconto
productSchema.virtual('discountPercentage').get(function() {
  if (this.hasDiscount) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Configurar virtuals no JSON
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
