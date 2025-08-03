const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String, // Para manter histórico caso produto seja deletado
    image: String,
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    color: String,
    size: String,
    subtotal: {
      type: Number,
      required: true
    }
  }],
  subtotal: {
    type: Number,
    required: true
  },
  shipping: {
    cost: {
      type: Number,
      default: 0
    },
    method: String,
    estimatedDays: Number
  },
  discount: {
    amount: {
      type: Number,
      default: 0
    },
    coupon: String,
    type: {
      type: String,
      enum: ['percentage', 'fixed']
    }
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: [
      'pending',
      'confirmed', 
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'refunded'
    ],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'pix', 'boleto', 'paypal']
  },
  paymentId: String, // ID do gateway de pagamento
  shippingAddress: {
    name: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    complement: String,
    neighborhood: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'Brasil'
    }
  },
  trackingCode: String,
  notes: String,
  statusHistory: [{
    status: String,
    date: {
      type: Date,
      default: Date.now
    },
    note: String
  }]
}, {
  timestamps: true
});

// Middleware para gerar número do pedido
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `JC${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Middleware para adicionar ao histórico de status
orderSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      date: new Date()
    });
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
