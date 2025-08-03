const nodemailer = require('nodemailer');
const { htmlToText } = require('html-to-text');

class EmailService {
  constructor() {
    // Configurar transportador - usando Gmail como exemplo
    // Para produção, recomendo usar SendGrid ou Mailgun
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // seu-email@gmail.com
        pass: process.env.EMAIL_PASS  // senha de app do Gmail
      }
    });

    this.fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;
    this.adminEmail = process.env.ADMIN_EMAIL || 'admin@ecommerce-jc.com';
    this.siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  }

  // Método base para enviar emails
  async sendEmail({ to, subject, html, text }) {
    try {
      const mailOptions = {
        from: `"JC Atacados" <${this.fromEmail}>`,
        to,
        subject,
        html,
        text: text || htmlToText(html)
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email enviado:', subject, 'para:', to);
      return result;
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      throw error;
    }
  }

  // 1. 📝 CONFIRMAÇÃO DE PEDIDOS
  async sendOrderConfirmation(order, customer) {
    const subject = `✅ Pedido #${order.orderNumber} Confirmado - JC Atacados`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .order-item { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
          .total { background: #667eea; color: white; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; }
          .btn { display: inline-block; background: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Pedido Confirmado!</h1>
            <h2>Pedido #${order.orderNumber}</h2>
          </div>
          
          <div class="content">
            <p><strong>Olá ${customer.name}!</strong></p>
            <p>Seu pedido foi recebido com sucesso e está sendo processado.</p>
            
            <h3>📦 Detalhes do Pedido:</h3>
            ${order.items.map(item => `
              <div class="order-item">
                <strong>${item.quantity}x ${item.name}</strong><br>
                Cor: ${item.selectedColor || 'N/A'} | Tamanho: ${item.selectedSize || 'N/A'}<br>
                Preço unitário: R$ ${item.price.toFixed(2)}<br>
                <strong>Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            `).join('')}
            
            <div class="total">
              Total do Pedido: R$ ${order.total.toFixed(2)}
            </div>
            
            <h3>📍 Endereço de Entrega:</h3>
            <p>
              ${order.shippingAddress.street}, ${order.shippingAddress.number}<br>
              ${order.shippingAddress.neighborhood} - ${order.shippingAddress.city}/${order.shippingAddress.state}<br>
              CEP: ${order.shippingAddress.zipCode}
            </p>
            
            <h3>⏰ Próximos Passos:</h3>
            <p>1. Processamento do pagamento (até 2 horas)</p>
            <p>2. Separação dos produtos (1-2 dias úteis)</p>
            <p>3. Envio do produto (código de rastreamento será enviado)</p>
            <p>4. Entrega estimada: 5-7 dias úteis</p>
            
            <div style="text-align: center;">
              <a href="${this.siteUrl}/pedido/${order._id}" class="btn">Acompanhar Pedido</a>
            </div>
          </div>
          
          <div class="footer">
            <p>Em caso de dúvidas, entre em contato conosco.</p>
            <p><strong>JC Atacados</strong> - Sua loja de confiança!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: customer.email,
      subject,
      html
    });
  }

  // 2. 🔐 RECUPERAÇÃO DE SENHA
  async sendPasswordReset(user, resetToken) {
    const subject = '🔑 Redefinir Senha - JC Atacados';
    const resetUrl = `${this.siteUrl}/reset-password?token=${resetToken}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ff6b6b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .btn { display: inline-block; background: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Redefinição de Senha</h1>
          </div>
          
          <div class="content">
            <p><strong>Olá ${user.name}!</strong></p>
            <p>Recebemos uma solicitação para redefinir sua senha na JC Atacados.</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="btn">🔑 Redefinir Minha Senha</a>
            </div>
            
            <div class="warning">
              <p><strong>⚠️ Importante:</strong></p>
              <p>• Este link é válido por apenas <strong>1 hora</strong></p>
              <p>• Se você não solicitou esta alteração, ignore este email</p>
              <p>• Sua senha atual permanece segura até que você defina uma nova</p>
            </div>
            
            <p>Se o botão não funcionar, copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; background: #f1f1f1; padding: 10px; border-radius: 5px;">
              ${resetUrl}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p><strong>JC Atacados</strong> - Sua segurança é nossa prioridade!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: user.email,
      subject,
      html
    });
  }

  // 3. 📦 ATUALIZAÇÕES DE STATUS DO PEDIDO
  async sendOrderStatusUpdate(order, customer, newStatus) {
    const statusMessages = {
      'confirmed': { emoji: '✅', title: 'Pedido Confirmado', message: 'Seu pedido foi confirmado e está sendo processado.' },
      'paid': { emoji: '💳', title: 'Pagamento Aprovado', message: 'Pagamento aprovado! Iniciando separação dos produtos.' },
      'processing': { emoji: '📦', title: 'Em Separação', message: 'Seus produtos estão sendo separados com carinho.' },
      'shipped': { emoji: '🚚', title: 'Enviado', message: 'Produto enviado! Você receberá o código de rastreamento em breve.' },
      'delivered': { emoji: '🎉', title: 'Entregue', message: 'Produto entregue com sucesso! Esperamos que você goste!' },
      'cancelled': { emoji: '❌', title: 'Cancelado', message: 'Pedido cancelado. O estorno será processado em até 5 dias úteis.' }
    };

    const status = statusMessages[newStatus];
    const subject = `${status.emoji} ${status.title} - Pedido #${order.orderNumber}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .status-update { background: white; padding: 20px; border-radius: 8px; border-left: 5px solid #4ecdc4; margin: 15px 0; }
          .timeline { margin: 20px 0; }
          .timeline-item { padding: 10px; margin: 5px 0; border-radius: 5px; }
          .timeline-active { background: #4ecdc4; color: white; }
          .timeline-completed { background: #2ecc71; color: white; }
          .timeline-pending { background: #ecf0f1; color: #7f8c8d; }
          .btn { display: inline-block; background: #4ecdc4; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${status.emoji} ${status.title}</h1>
            <h2>Pedido #${order.orderNumber}</h2>
          </div>
          
          <div class="content">
            <p><strong>Olá ${customer.name}!</strong></p>
            
            <div class="status-update">
              <h3>${status.emoji} Atualização do Pedido</h3>
              <p><strong>${status.message}</strong></p>
            </div>

            ${order.trackingCode ? `
              <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <h4>📍 Código de Rastreamento:</h4>
                <p style="font-size: 18px; font-weight: bold; color: #856404;">${order.trackingCode}</p>
                <a href="https://www.correios.com.br/rastreamento" class="btn" target="_blank">Rastrear Encomenda</a>
              </div>
            ` : ''}
            
            <div class="timeline">
              <h4>📋 Acompanhamento do Pedido:</h4>
              <div class="timeline-item ${['confirmed', 'paid', 'processing', 'shipped', 'delivered'].includes(newStatus) ? 'timeline-completed' : 'timeline-pending'}">
                ✅ Pedido Confirmado
              </div>
              <div class="timeline-item ${['paid', 'processing', 'shipped', 'delivered'].includes(newStatus) ? 'timeline-completed' : newStatus === 'confirmed' ? 'timeline-active' : 'timeline-pending'}">
                💳 Pagamento Aprovado
              </div>
              <div class="timeline-item ${['processing', 'shipped', 'delivered'].includes(newStatus) ? 'timeline-completed' : newStatus === 'paid' ? 'timeline-active' : 'timeline-pending'}">
                📦 Em Separação
              </div>
              <div class="timeline-item ${['shipped', 'delivered'].includes(newStatus) ? 'timeline-completed' : newStatus === 'processing' ? 'timeline-active' : 'timeline-pending'}">
                🚚 Enviado
              </div>
              <div class="timeline-item ${newStatus === 'delivered' ? 'timeline-completed' : newStatus === 'shipped' ? 'timeline-active' : 'timeline-pending'}">
                🎉 Entregue
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="${this.siteUrl}/pedido/${order._id}" class="btn">Ver Detalhes do Pedido</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p>Em caso de dúvidas, entre em contato conosco.</p>
            <p><strong>JC Atacados</strong> - Acompanhando você em cada passo!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: customer.email,
      subject,
      html
    });
  }

  // 4. 🛒 CARRINHO ABANDONADO
  async sendCartAbandoned(user, cartItems) {
    const subject = '🛍️ Você esqueceu algo no seu carrinho - JC Atacados';
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .cart-item { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; display: flex; align-items: center; }
          .discount-box { background: #ff6b6b; color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
          .btn { display: inline-block; background: #f5576c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; font-weight: bold; }
          .total { background: #2ecc71; color: white; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛍️ Você esqueceu algo...</h1>
            <p style="margin: 0; font-size: 18px;">Seus produtos estão te esperando!</p>
          </div>
          
          <div class="content">
            <p><strong>Olá ${user.name}!</strong></p>
            <p>Notamos que você deixou alguns produtos incríveis no seu carrinho. Que tal finalizar sua compra?</p>
            
            <h3>🛒 Produtos no seu carrinho:</h3>
            ${cartItems.map(item => `
              <div class="cart-item">
                <div style="flex: 1;">
                  <strong>${item.name}</strong><br>
                  Quantidade: ${item.quantity}<br>
                  <strong>R$ ${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              </div>
            `).join('')}
            
            <div class="total">
              Total: R$ ${cartTotal.toFixed(2)}
            </div>
            
            <div class="discount-box">
              <h3>🎁 OFERTA ESPECIAL!</h3>
              <p style="margin: 10px 0; font-size: 20px;"><strong>10% OFF</strong></p>
              <p>Use o cupom: <strong>VOLTA10</strong></p>
              <p style="margin: 0; font-size: 14px;">Válido por 24 horas!</p>
            </div>
            
            <div style="text-align: center;">
              <a href="${this.siteUrl}/carrinho" class="btn">🛒 Finalizar Compra</a>
            </div>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h4>💚 Por que escolher a JC Atacados?</h4>
              <p>✅ Frete grátis acima de R$ 198<br>
              ✅ Entrega rápida e segura<br>
              ✅ Produtos de alta qualidade<br>
              ✅ Atendimento nota 10</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p>Não quer mais receber esses emails? <a href="${this.siteUrl}/unsubscribe">Descadastrar</a></p>
            <p><strong>JC Atacados</strong> - Sempre pensando em você!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: user.email,
      subject,
      html
    });
  }

  // 5. 🎉 BOAS-VINDAS PARA NOVOS CLIENTES
  async sendWelcomeEmail(user) {
    const subject = '🎉 Bem-vindo(a) à JC Atacados!';
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .welcome-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; text-align: center; }
          .discount-box { background: #ff6b6b; color: white; padding: 25px; text-align: center; border-radius: 8px; margin: 20px 0; }
          .btn { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 10px 5px; font-weight: bold; }
          .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bem-vindo(a) à Família JC!</h1>
            <h2>Olá ${user.name}!</h2>
            <p style="margin: 0; font-size: 18px;">Estamos muito felizes em ter você conosco!</p>
          </div>
          
          <div class="content">
            <div class="welcome-box">
              <h2>✨ Sua jornada na JC Atacados começa aqui!</h2>
              <p>Prepare-se para descobrir produtos incríveis com a qualidade que você merece.</p>
            </div>
            
            <div class="discount-box">
              <h3>🎁 PRESENTE DE BOAS-VINDAS!</h3>
              <p style="margin: 10px 0; font-size: 24px;"><strong>15% OFF</strong></p>
              <p>na sua primeira compra!</p>
              <p style="margin: 15px 0; font-size: 20px; background: rgba(255,255,255,0.2); padding: 10px; border-radius: 5px;">
                <strong>Cupom: BEMVINDO15</strong>
              </p>
              <p style="margin: 0; font-size: 14px;">Válido por 30 dias!</p>
            </div>
            
            <h3>🌟 Por que você vai amar a JC Atacados:</h3>
            
            <div class="feature">
              <strong>🚚 Entrega Rápida</strong><br>
              Receba seus produtos em casa com segurança e rapidez.
            </div>
            
            <div class="feature">
              <strong>💎 Qualidade Premium</strong><br>
              Produtos selecionados com o máximo cuidado e qualidade.
            </div>
            
            <div class="feature">
              <strong>💰 Preços Incríveis</strong><br>
              Os melhores preços do mercado, direto de fábrica.
            </div>
            
            <div class="feature">
              <strong>🛒 Frete Grátis</strong><br>
              Acima de R$ 198, entregamos sem cobrar frete!
            </div>
            
            <div class="feature">
              <strong>📞 Atendimento VIP</strong><br>
              Suporte especializado para todos os nossos clientes.
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${this.siteUrl}" class="btn">🛍️ Começar a Comprar</a>
              <a href="${this.siteUrl}/masculino" class="btn">👔 Masculino</a>
              <a href="${this.siteUrl}/feminino" class="btn">👗 Feminino</a>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4>📱 Dicas para aproveitar melhor:</h4>
              <p>✅ Salve nosso site nos favoritos<br>
              ✅ Siga-nos nas redes sociais<br>
              ✅ Ative as notificações de ofertas<br>
              ✅ Indique amigos e ganhe descontos</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p>Precisa de ajuda? Estamos aqui para você!</p>
            <p><strong>JC Atacados</strong> - Sua nova loja favorita! 💜</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: user.email,
      subject,
      html
    });
  }

  // 6. 📊 NOTIFICAÇÕES ADMINISTRATIVAS
  async sendAdminNotification(type, data) {
    let subject, html;

    switch (type) {
      case 'new_order':
        subject = `🛒 Novo Pedido #${data.order.orderNumber} - R$ ${data.order.total.toFixed(2)}`;
        html = `
          <h2>🛒 Novo Pedido Recebido!</h2>
          <p><strong>Pedido:</strong> #${data.order.orderNumber}</p>
          <p><strong>Cliente:</strong> ${data.customer.name} (${data.customer.email})</p>
          <p><strong>Total:</strong> R$ ${data.order.total.toFixed(2)}</p>
          <p><strong>Items:</strong> ${data.order.items.length} produto(s)</p>
          <p><strong>Status:</strong> ${data.order.status}</p>
          <a href="${this.siteUrl}/admin/pedidos/${data.order._id}" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ver Pedido</a>
        `;
        break;

      case 'low_stock':
        subject = `⚠️ Alerta de Estoque - ${data.summary.totalAffected} produto(s) precisam de atenção`;
        html = `
          <h2 style="color: #ff6b6b;">⚠️ Relatório de Estoque</h2>
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>📊 Resumo:</h3>
            <p><strong>Produtos com estoque baixo:</strong> ${data.summary.lowStockCount}</p>
            <p><strong>Produtos em falta:</strong> ${data.summary.outOfStockCount}</p>
            <p><strong>Total de produtos afetados:</strong> ${data.summary.totalAffected}</p>
          </div>
          
          ${data.outOfStockProducts.length > 0 ? `
            <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #721c24;">🚨 PRODUTOS EM FALTA (Estoque: 0)</h3>
              <ul style="list-style: none; padding: 0;">
                ${data.outOfStockProducts.map(product => `
                  <li style="padding: 8px; border-bottom: 1px solid #f5c6cb; display: flex; justify-content: space-between;">
                    <strong>${product.name}</strong>
                    <span style="color: #721c24; font-weight: bold;">SEM ESTOQUE</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${data.lowStockProducts.length > 0 ? `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #856404;">⚠️ PRODUTOS COM ESTOQUE BAIXO (≤10 unidades)</h3>
              <ul style="list-style: none; padding: 0;">
                ${data.lowStockProducts.map(product => `
                  <li style="padding: 8px; border-bottom: 1px solid #ffeaa7; display: flex; justify-content: space-between;">
                    <strong>${product.name}</strong>
                    <span style="color: ${product.totalStock <= 3 ? '#721c24' : '#856404'}; font-weight: bold;">
                      ${product.totalStock} unidades
                    </span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${this.siteUrl}/admin/produtos" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              🛠️ Gerenciar Estoque
            </a>
          </div>
          
          <div style="background: #e7f3ff; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4>💡 Dicas importantes:</h4>
            <ul>
              <li>Produtos em falta podem afetar as vendas</li>
              <li>Mantenha sempre um estoque mínimo de segurança</li>
              <li>Considere aumentar o pedido de produtos populares</li>
              <li>Verifique fornecedores para reposição rápida</li>
            </ul>
          </div>
        `;
        break;

      case 'daily_report':
        subject = `📊 Relatório Diário - ${new Date().toLocaleDateString('pt-BR')}`;
        html = `
          <h2>📊 Relatório Diário de Vendas</h2>
          <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
          <p><strong>Pedidos:</strong> ${data.orders} pedido(s)</p>
          <p><strong>Faturamento:</strong> R$ ${data.revenue.toFixed(2)}</p>
          <p><strong>Novos Clientes:</strong> ${data.newCustomers}</p>
          <p><strong>Produtos Mais Vendidos:</strong></p>
          <ul>
            ${data.topProducts?.map(product => `
              <li>${product.name} - ${product.sales} vendas</li>
            `).join('') || '<li>Nenhum produto vendido hoje</li>'}
          </ul>
          <a href="${this.siteUrl}/admin/dashboard" style="background: #2ecc71; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ver Dashboard</a>
        `;
        break;

      default:
        subject = '📧 Notificação Administrativa - JC Atacados';
        html = `<p>Nova notificação: ${JSON.stringify(data)}</p>`;
    }

    return this.sendEmail({
      to: this.adminEmail,
      subject,
      html
    });
  }

  // Método para testar configuração de email
  async testEmail() {
    try {
      await this.sendEmail({
        to: this.adminEmail,
        subject: '✅ Teste de Email - JC Atacados',
        html: `
          <h2>✅ Sistema de Email Configurado!</h2>
          <p>Se você recebeu este email, o sistema está funcionando perfeitamente.</p>
          <p><strong>Data do teste:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        `
      });
      return true;
    } catch (error) {
      console.error('❌ Falha no teste de email:', error);
      return false;
    }
  }
}

module.exports = new EmailService();
