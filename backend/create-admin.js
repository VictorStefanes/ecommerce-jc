const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdminUser() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🗄️  Conectado ao MongoDB');

    // Verificar se admin já existe
    const existingAdmin = await User.findOne({ email: 'admin@ecommerce-jc.com' });
    
    if (existingAdmin) {
      console.log('👤 Admin já existe!');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      
      // Atualizar senha e garantir que é admin
      existingAdmin.role = 'admin';
      existingAdmin.password = 'admin123';
      await existingAdmin.save();
      console.log('✅ Admin atualizado - senha: admin123');
    } else {
      // Criar novo admin
      const adminUser = new User({
        name: 'Administrador',
        email: 'admin@ecommerce-jc.com',
        password: 'admin123',
        role: 'admin'
      });

      await adminUser.save();
      console.log('✅ Usuário admin criado com sucesso!');
      console.log('Email: admin@ecommerce-jc.com');
      console.log('Senha: admin123');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
}

createAdminUser();
