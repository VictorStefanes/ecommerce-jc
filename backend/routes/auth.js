const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const emailService = require('../services/emailService');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Registrar novo usuário
// @access  Public
router.post('/register', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const { name, email, password } = req.body;

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe com este email' });
    }

    // Criar novo usuário
    const user = new User({ name, email, password });
    await user.save();

    // 📧 ENVIAR EMAIL DE BOAS-VINDAS
    try {
      await emailService.sendWelcomeEmail(user);
      console.log('✅ Email de boas-vindas enviado para:', user.email);
    } catch (emailError) {
      console.error('❌ Erro ao enviar email de boas-vindas:', emailError);
      // Não falha o registro se o email não for enviado
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/auth/login
// @desc    Login do usuário
// @access  Public
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  body('password')
    .notEmpty()
    .withMessage('Senha é obrigatória')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Verificar se usuário existe
    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Atualizar último login
    user.lastLogin = new Date();
    await user.save();

    // Gerar token JWT
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // Remover senha da resposta
    user.password = undefined;

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/auth/me
// @desc    Obter dados do usuário logado
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   PUT /api/auth/profile
// @desc    Atualizar perfil do usuário
// @access  Private
router.put('/profile', auth, [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('phone')
    .optional()
    .trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const allowedUpdates = ['name', 'phone', 'address', 'birthDate'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id, 
      updates, 
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Perfil atualizado com sucesso',
      user
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/auth/change-password
// @desc    Alterar senha do usuário
// @access  Private
router.post('/change-password', auth, [
  body('currentPassword')
    .notEmpty()
    .withMessage('Senha atual é obrigatória'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Nova senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');
    
    // Verificar senha atual
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha atual incorreta' });
    }

    // Atualizar senha
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Solicitar redefinição de senha
// @access  Public
router.post('/forgot-password', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Email inválido', 
        errors: errors.array() 
      });
    }

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // Por segurança, não informar se o email existe ou não
      return res.json({ 
        message: 'Se o email existir, você receberá instruções para redefinir sua senha' 
      });
    }

    // Gerar token de reset (válido por 1 hora)
    const resetToken = jwt.sign(
      { id: user._id, purpose: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 📧 ENVIAR EMAIL DE RECUPERAÇÃO DE SENHA
    try {
      await emailService.sendPasswordReset(user, resetToken);
      console.log('✅ Email de recuperação enviado para:', user.email);
    } catch (emailError) {
      console.error('❌ Erro ao enviar email de recuperação:', emailError);
      return res.status(500).json({ message: 'Erro ao enviar email de recuperação' });
    }

    res.json({ 
      message: 'Se o email existir, você receberá instruções para redefinir sua senha' 
    });
  } catch (error) {
    console.error('Erro na recuperação de senha:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Redefinir senha com token
// @access  Public
router.post('/reset-password', [
  body('token')
    .notEmpty()
    .withMessage('Token é obrigatório'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Nova senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      });
    }

    const { token, newPassword } = req.body;

    // Verificar token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.purpose !== 'password_reset') {
        throw new Error('Token inválido');
      }
    } catch (error) {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualizar senha
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
