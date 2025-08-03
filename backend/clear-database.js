require('dotenv').config();
const mongoose = require('mongoose');

// Importar modelos
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

async function clearDatabase() {
  try {
    console.log('🗄️  Conectando ao MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB conectado com sucesso!');

    console.log('\n🧹 Iniciando limpeza do banco de dados...');

    // Limpar produtos
    const productsDeleted = await Product.deleteMany({});
    console.log(`📦 Produtos removidos: ${productsDeleted.deletedCount}`);

    // Limpar categorias (opcional - descomente se quiser limpar também)
    // const categoriesDeleted = await Category.deleteMany({});
    // console.log(`🏷️  Categorias removidas: ${categoriesDeleted.deletedCount}`);

    // Limpar pedidos
    const ordersDeleted = await Order.deleteMany({});
    console.log(`📋 Pedidos removidos: ${ordersDeleted.deletedCount}`);

    // Limpar carrinhos
    const cartsDeleted = await Cart.deleteMany({});
    console.log(`🛒 Carrinhos removidos: ${cartsDeleted.deletedCount}`);

    console.log('\n✅ Limpeza concluída com sucesso!');
    console.log('\n📊 Verificando estado atual:');

    // Verificar contadores
    const remainingProducts = await Product.countDocuments();
    const remainingOrders = await Order.countDocuments();
    const remainingCarts = await Cart.countDocuments();

    console.log(`   • Produtos: ${remainingProducts}`);
    console.log(`   • Pedidos: ${remainingOrders}`);
    console.log(`   • Carrinhos: ${remainingCarts}`);

    if (remainingProducts === 0 && remainingOrders === 0 && remainingCarts === 0) {
      console.log('\n🎉 Banco de dados limpo com sucesso!');
      console.log('💡 Agora você pode adicionar produtos reais via dashboard admin.');
    } else {
      console.log('\n⚠️  Ainda há alguns dados no banco. Verifique se está tudo ok.');
    }

  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado do MongoDB');
    process.exit(0);
  }
}

// Confirmação de segurança
console.log('⚠️  ATENÇÃO: Este script vai DELETAR TODOS os dados do banco!');
console.log('📋 Dados que serão removidos:');
console.log('   • Todos os produtos');
console.log('   • Todos os pedidos');
console.log('   • Todos os carrinhos');
console.log('   • (Usuários e categorias serão preservados)');
console.log('\n🔄 Executando em 3 segundos...');

setTimeout(() => {
  clearDatabase();
}, 3000);
