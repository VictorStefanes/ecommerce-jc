const cron = require('node-cron');
const Product = require('../models/Product');
const User = require('../models/User');
const emailService = require('./emailService');

class StockMonitorService {
  constructor() {
    this.isRunning = false;
    this.startScheduler();
  }

  // Iniciar o agendador para verificar estoque baixo
  startScheduler() {
    // Executar todos os dias às 8:00 da manhã
    cron.schedule('0 8 * * *', async () => {
      await this.checkLowStock();
    });

    console.log('📦 Scheduler de monitoramento de estoque iniciado - executa diariamente às 8:00');
  }

  // Verificar produtos com estoque baixo
  async checkLowStock() {
    if (this.isRunning) {
      console.log('⏳ Verificação de estoque já em execução...');
      return;
    }

    this.isRunning = true;
    console.log('📦 Iniciando verificação de estoque baixo...');

    try {
      // Buscar produtos com estoque baixo (menos de 10 unidades)
      const lowStockProducts = await Product.find({
        isActive: true,
        totalStock: { $lte: 10, $gt: 0 }
      }).select('name totalStock category price images');

      // Buscar produtos em falta (estoque 0)
      const outOfStockProducts = await Product.find({
        isActive: true,
        totalStock: { $eq: 0 }
      }).select('name category price images');

      console.log(`📋 Produtos com estoque baixo: ${lowStockProducts.length}`);
      console.log(`📋 Produtos em falta: ${outOfStockProducts.length}`);

      if (lowStockProducts.length > 0 || outOfStockProducts.length > 0) {
        // Buscar administradores para notificar
        const admins = await User.find({ role: 'admin' }).select('name email');

        for (const admin of admins) {
          try {
            await emailService.sendAdminNotification('low_stock', {
              admin,
              lowStockProducts,
              outOfStockProducts,
              summary: {
                lowStockCount: lowStockProducts.length,
                outOfStockCount: outOfStockProducts.length,
                totalAffected: lowStockProducts.length + outOfStockProducts.length
              }
            });

            console.log(`✅ Notificação de estoque enviada para: ${admin.email}`);
          } catch (emailError) {
            console.error(`❌ Erro ao enviar notificação para ${admin.email}:`, emailError);
          }
        }
      } else {
        console.log('✅ Todos os produtos têm estoque adequado');
      }

    } catch (error) {
      console.error('❌ Erro na verificação de estoque:', error);
    } finally {
      this.isRunning = false;
      console.log('✅ Verificação de estoque concluída');
    }
  }

  // Forçar verificação manual (para testes)
  async forceCheck() {
    console.log('🔧 Executando verificação manual de estoque...');
    await this.checkLowStock();
  }

  // Obter estatísticas de estoque
  async getStockStats() {
    try {
      const stats = {
        totalProducts: await Product.countDocuments({ isActive: true }),
        lowStock: await Product.countDocuments({ 
          isActive: true, 
          totalStock: { $lte: 10, $gt: 0 } 
        }),
        outOfStock: await Product.countDocuments({ 
          isActive: true, 
          totalStock: 0 
        }),
        wellStocked: 0,
        averageStock: 0
      };

      stats.wellStocked = stats.totalProducts - stats.lowStock - stats.outOfStock;

      // Calcular estoque médio
      const stockData = await Product.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, avgStock: { $avg: '$totalStock' } } }
      ]);

      stats.averageStock = stockData[0]?.avgStock || 0;

      return stats;
    } catch (error) {
      console.error('❌ Erro ao obter estatísticas de estoque:', error);
      return null;
    }
  }

  // Verificar estoque específico de um produto
  async checkProductStock(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return { error: 'Produto não encontrado' };
      }

      const status = product.totalStock === 0 ? 'out_of_stock' :
                    product.totalStock <= 10 ? 'low_stock' : 'normal';

      return {
        productId: product._id,
        name: product.name,
        currentStock: product.totalStock,
        status,
        needsAttention: status !== 'normal'
      };
    } catch (error) {
      console.error('❌ Erro ao verificar estoque do produto:', error);
      return { error: 'Erro interno' };
    }
  }
}

// Criar instância única do serviço
const stockMonitorService = new StockMonitorService();

module.exports = stockMonitorService;
