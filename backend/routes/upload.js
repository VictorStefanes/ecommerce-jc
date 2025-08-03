const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurar Multer para upload em memória
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'), false);
    }
  }
});

// @route   POST /api/upload/image
// @desc    Upload de imagem para Cloudinary
// @access  Admin
router.post('/image', adminAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada' });
    }

    // Upload para Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'ecommerce-jc',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    res.json({
      message: 'Imagem enviada com sucesso',
      image: {
        url: result.secure_url,
        publicId: result.public_id
      }
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ message: 'Erro ao fazer upload da imagem' });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload múltiplo de imagens
// @access  Admin
router.post('/multiple', adminAuth, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada' });
    }

    const uploadPromises = req.files.map(file => 
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'ecommerce-jc',
            transformation: [
              { quality: 'auto' },
              { fetch_format: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve({
              url: result.secure_url,
              publicId: result.public_id
            });
          }
        ).end(file.buffer);
      })
    );

    const images = await Promise.all(uploadPromises);

    res.json({
      message: 'Imagens enviadas com sucesso',
      images
    });
  } catch (error) {
    console.error('Erro no upload múltiplo:', error);
    res.status(500).json({ message: 'Erro ao fazer upload das imagens' });
  }
});

// @route   DELETE /api/upload/:publicId
// @desc    Deletar imagem do Cloudinary
// @access  Admin
router.delete('/:publicId', adminAuth, async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.publicId);
    
    if (result.result === 'ok') {
      res.json({ message: 'Imagem deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Imagem não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    res.status(500).json({ message: 'Erro ao deletar imagem' });
  }
});

module.exports = router;
