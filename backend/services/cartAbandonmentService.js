const cron = require('node-cron');
const Cart = require('../models/Cart');
const User = require('../models/User');
const emailService = require('./emailService');

class CartAbandonmentService {
  constructor() {
    this.isRunning = false;
    this.startScheduler();
  }

  // Iniciar o agendador para verificar carrinhos abandonados
  startScheduler() {
    // Executar a cada 2 horas (pode ajustar conforme necessário)
    cron.schedule('0 */2 * * *', async () => {
      await this.checkAbandonedCarts();
    });

    console.log('📧 Scheduler de carrinho abandonado iniciado - executa a cada 2 horas');
  }

  // Verificar carrinhos abandonados e enviar lembretes
  async checkAbandonedCarts() {
    if (this.isRunning) {
      console.log('⏳ Verificação de carrinho abandonado já em execução...');
      return;
    }

    this.isRunning = true;
    console.log('🛒 Iniciando verificação de carrinhos abandonados...');

    try {
      // Buscar carrinhos ativos com itens, não atualizados nas últimas 24 horas
      // e que ainda não receberam lembrete
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      const abandonedCarts = await Cart.find({
        isActive: true,
        'items.0': { $exists: true }, // Tem pelo menos 1 item
        lastUpdated: { $lt: twentyFourHoursAgo },
        reminderSent: false
      }).populate('user', 'name email').populate('items.product', 'name price image');

      console.log(`📋 Encontrados ${abandonedCarts.length} carrinhos abandonados`);

      let emailsSent = 0;
      let emailsError = 0;

      for (const cart of abandonedCarts) {
        try {
          if (!cart.user || !cart.user.email) {
            console.log('⚠️ Usuário sem email válido, pulando carrinho:', cart._id);
            continue;
          }

          // Preparar dados dos itens para o email
          const cartItems = cart.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
            total: item.price * item.quantity
          }));

          // Enviar email de carrinho abandonado
          await emailService.sendCartAbandoned(cart.user, cartItems);

          // Marcar como lembrete enviado
          cart.reminderSent = true;
          cart.reminderSentAt = new Date();
          await cart.save();

          emailsSent++;
          console.log(`✅ Email de carrinho abandonado enviado para: ${cart.user.email}`);

          // Pequena pausa para não sobrecarregar o servidor de email
          await this.sleep(1000);

        } catch (emailError) {
          emailsError++;
          console.error(`❌ Erro ao enviar email para ${cart.user?.email}:`, emailError);
          
          // Se falhar 3 vezes, marcar como enviado para evitar spam
          if (!cart.emailAttempts) cart.emailAttempts = 0;
          cart.emailAttempts++;
          
          if (cart.emailAttempts >= 3) {
            cart.reminderSent = true;
            cart.reminderSentAt = new Date();
            await cart.save();
            console.log(`⚠️ Carrinho ${cart._id} marcado como processado após 3 tentativas`);
          }
        }
      }

      console.log(`📊 Relatório de carrinho abandonado:`);
      console.log(`   • Carrinhos encontrados: ${abandonedCarts.length}`);
      console.log(`   • Emails enviados: ${emailsSent}`);
      console.log(`   • Errors: ${emailsError}`);

      // Limpar carrinhos muito antigos (mais de 30 dias) e já processados
      await this.cleanOldCarts();

    } catch (error) {
      console.error('❌ Erro na verificação de carrinhos abandonados:', error);
    } finally {
      this.isRunning = false;
      console.log('✅ Verificação de carrinhos abandonados concluída');
    }
  }

  // Limpar carrinhos antigos para evitar acúmulo no banco
  async cleanOldCarts() {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      
      const result = await Cart.deleteMany({
        $or: [
          { 
            lastUpdated: { $lt: thirtyDaysAgo },
            reminderSent: true 
          },
          {
            lastUpdated: { $lt: thirtyDaysAgo },
            'items.0': { $exists: false } // Carrinhos vazios
          }
        ]
      });

      if (result.deletedCount > 0) {
        console.log(`🧹 Limpeza: ${result.deletedCount} carrinhos antigos removidos`);
      }
    } catch (error) {
      console.error('❌ Erro na limpeza de carrinhos antigos:', error);
    }
  }

  // Função utilitária para pausas
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Forçar verificação manual (para testes)
  async forceCheck() {
    console.log('🔧 Executando verificação manual de carrinhos abandonados...');
    await this.checkAbandonedCarts();
  }

  // Estatísticas de carrinhos abandonados
  async getStats() {
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const stats = {
        activeCartsWithItems: await Cart.countDocuments({
          isActive: true,
          'items.0': { $exists: true }
        }),
        abandonedLast24h: await Cart.countDocuments({
          isActive: true,
          'items.0': { $exists: true },
          lastUpdated: { $lt: twentyFourHoursAgo },
          reminderSent: false
        }),
        remindersSent7Days: await Cart.countDocuments({
          reminderSent: true,
          reminderSentAt: { $gte: sevenDaysAgo }
        }),
        totalValue: 0
      };

      // Calcular valor total dos carrinhos abandonados
      const abandonedCarts = await Cart.find({
        isActive: true,
        'items.0': { $exists: true },
        lastUpdated: { $lt: twentyFourHoursAgo },
        reminderSent: false
      });

      stats.totalValue = abandonedCarts.reduce((sum, cart) => sum + cart.total, 0);

      return stats;
    } catch (error) {
      console.error('❌ Erro ao obter estatísticas:', error);
      return null;
    }
  }
}

// Criar instância única do serviço
const cartAbandonmentService = new CartAbandonmentService();

module.exports = cartAbandonmentService;
