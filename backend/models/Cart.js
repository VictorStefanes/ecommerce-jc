const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: String
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderSentAt: Date
}, {
  timestamps: true
});

// Atualizar lastUpdated quando items mudarem
cartSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    this.lastUpdated = new Date();
    // Calcular total
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  next();
});

// Índice para buscar carrinhos abandonados
cartSchema.index({ lastUpdated: 1, isActive: 1, reminderSent: 1 });

module.exports = mongoose.model('Cart', cartSchema);
