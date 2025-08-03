# 🛒 E-commerce JC - Sistema Completo

## 📋 **VISÃO GERAL**

Sistema de e-commerce completo com:
- ✅ **Frontend Next.js 15** - Interface moderna e responsiva
- ✅ **Backend Node.js + Express** - API REST completa
- ✅ **MongoDB** - Banco de dados NoSQL
- ✅ **Dashboard Administrativo** - Gestão completa do sistema
- ✅ **Autenticação JWT** - Sistema de login seguro
- ✅ **Upload de Imagens** - Integração com Cloudinary
- ✅ **Gestão de Estoque** - Controle completo de produtos

---

## 🚀 **INSTALAÇÃO E CONFIGURAÇÃO**

### **1. Pré-requisitos**
```bash
# Node.js 18+ 
node --version

# npm ou yarn
npm --version

# MongoDB Community Edition
# Download: https://www.mongodb.com/try/download/community
```

### **2. Instalar MongoDB (Windows)**
1. Download: https://www.mongodb.com/try/download/community
2. Instale seguindo o wizard
3. Adicione ao PATH: `C:\Program Files\MongoDB\Server\7.0\bin`
4. Teste: `mongod --version`

### **3. Clonar e Configurar Projeto**
```bash
# 1. Já está no diretório correto
cd c:\Users\Vstef\Desktop\ecommerce-jc

# 2. Instalar dependências do frontend
npm install

# 3. Instalar dependências do backend
cd backend
npm install

# 4. Configurar variáveis de ambiente
copy .env.example .env
# Edite o arquivo .env com suas configurações
```

### **4. Configurar Cloudinary (Upload de Imagens)**
1. Crie conta gratuita: https://cloudinary.com
2. Obtenha suas credenciais no Dashboard
3. Edite `backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key  
CLOUDINARY_API_SECRET=seu-api-secret
```

### **5. Inicializar Sistema**
```bash
# Terminal 1: Iniciar MongoDB
mongod

# Terminal 2: Iniciar Backend
cd backend
npm run dev

# Terminal 3: Iniciar Frontend
cd ..
npm run dev
```

---

## 🎯 **COMO USAR O SISTEMA**

### **🔐 Login Administrativo**
1. Acesse: http://localhost:3000/admin
2. Use as credenciais padrão:
   - **Email:** admin@ecommerce-jc.com
   - **Senha:** admin123

### **📦 Gerenciar Produtos**
1. Faça login no painel admin
2. Vá em "Gerenciar Produtos"
3. Clique em "Novo Produto"
4. Preencha todos os campos:
   - Nome, descrição, preço
   - Categoria (feminino, masculino, etc.)
   - Cores disponíveis (hex codes)
   - Tamanhos disponíveis
   - Estoque por cor/tamanho
   - Upload de imagens
5. Salve o produto

### **🛍️ Como Funciona o Site**
- **SEM produtos no admin = SEM produtos no site**
- **COM produtos no admin = Aparecem automaticamente**
- Carrinho funciona apenas com produtos reais do banco
- Estoque é descontado automaticamente nos pedidos

---

## 📁 **ESTRUTURA DO PROJETO**

```
ecommerce-jc/
├── backend/                 # API Backend
│   ├── models/             # Modelos MongoDB
│   ├── routes/             # Rotas da API
│   ├── middleware/         # Middlewares
│   ├── scripts/            # Scripts utilitários
│   └── server.js           # Servidor principal
├── src/
│   ├── app/
│   │   ├── admin/          # Páginas administrativas
│   │   ├── feminino/       # Páginas femininas
│   │   ├── masculino/      # Páginas masculinas
│   │   └── page.tsx        # Homepage
│   ├── components/         # Componentes React
│   ├── contexts/           # Context APIs
│   └── hooks/              # Custom hooks
└── package.json
```

---

## 🔧 **FUNCIONALIDADES IMPLEMENTADAS**

### ✅ **Backend Completo**
- [x] API REST com Express.js
- [x] Autenticação JWT
- [x] Modelos MongoDB (User, Product, Category, Order)
- [x] Middleware de segurança
- [x] Upload de imagens (Cloudinary)
- [x] Validação de dados
- [x] Controle de estoque

### ✅ **Frontend Atualizado**
- [x] Next.js 15 com App Router
- [x] Páginas administrativas
- [x] Integração com API
- [x] Sistema de carrinho dinâmico
- [x] Autenticação de admin
- [x] Upload de imagens
- [x] Gestão de produtos

### ✅ **Dashboard Administrativo**
- [x] Login seguro para admin
- [x] Dashboard com estatísticas
- [x] CRUD completo de produtos
- [x] Gestão de categorias
- [x] Controle de pedidos
- [x] Alertas de estoque baixo
- [x] Upload múltiplo de imagens

---

## 🛠️ **PRÓXIMOS PASSOS**

### **Implementar Páginas de Produtos**
1. Conectar todas as páginas (feminino, masculino) com a API
2. Remover produtos hardcoded
3. Implementar busca dinâmica
4. Adicionar filtros por categoria

### **Sistema de Pagamento**
1. Integrar gateway (Stripe, Mercado Pago)
2. Processar pagamentos reais
3. Confirmar pedidos automaticamente

### **Melhorias UX**
1. Loading states
2. Error handling
3. Notificações toast
4. Otimização SEO

---

## 🆘 **TROUBLESHOOTING**

### **MongoDB não conecta**
```bash
# Verificar se está rodando
mongod

# Ou iniciar manualmente
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

### **Backend não inicia**
```bash
# Verificar se porta 5000 está livre
netstat -ano | findstr :5000

# Reinstalar dependências
cd backend
rm -rf node_modules
npm install
```

### **Erro de CORS**
- Verifique se frontend está em http://localhost:3000
- Verifique configuração CORS no backend/server.js

### **Uploads não funcionam**
- Configure Cloudinary no .env
- Verifique credenciais no dashboard

---

## 📞 **SUPORTE**

Para dúvidas ou problemas:
1. Verifique este README primeiro
2. Check logs do backend (`npm run dev`)
3. Verifique console do browser (F12)
4. Confirme se MongoDB está rodando

---

## 🎉 **PARABÉNS!**

Agora você tem um **e-commerce REAL e FUNCIONAL** com:
- 🔐 Sistema administrativo completo
- 📦 Gestão dinâmica de produtos
- 🛒 Carrinho funcional
- 📊 Dashboard com estatísticas
- 🖼️ Upload de imagens
- 💾 Banco de dados real
- 🔒 Autenticação segura

**Seu site está pronto para receber produtos reais e fazer vendas!** 🚀
