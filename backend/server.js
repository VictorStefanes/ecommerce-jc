const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Configurar dotenv com caminho específico
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Importar rotas
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const productSlugRoutes = require('./routes/productSlug');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

// Importar serviços
const cartAbandonmentService = require('./services/cartAbandonmentService');
const stockMonitorService = require('./services/stockMonitorService');

const app = express();

// Middlewares de segurança
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP por janela de tempo
});
app.use(limiter);

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://seu-dominio.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.0.14:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined'));

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('🗄️  MongoDB conectado com sucesso!'))
.catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/products', productSlugRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'E-commerce API funcionando!', 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Algo deu errado!', 
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 API disponível em: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
