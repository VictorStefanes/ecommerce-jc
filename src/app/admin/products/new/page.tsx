"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  Upload, 
  X, 
  Plus, 
  ArrowLeft,
  DollarSign,
  Hash,
  FileText,
  Tag,
  Palette,
  Ruler,
  Box
} from 'lucide-react';
import './new-product.scss';

interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory?: {
    _id: string;
    name: string;
  };
}

interface ProductForm {
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  colors: Array<{
    name: string;
    code: string;
    stock: number;
  }>;
  sizes: Array<{
    name: string;
    stock: number;
  }>;
  images: Array<{
    url: string;
    publicId: string;
    alt: string;
    isMain: boolean;
  }>;
  isNew: boolean;
  isLaunch: boolean;
  isFeatured: boolean;
  badge: string;
  tags: string[];
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    shortDescription: '',
    category: '',
    subcategory: '',
    price: 0,
    originalPrice: 0,
    colors: [],
    sizes: [],
    images: [],
    isNew: false,
    isLaunch: false,
    isFeatured: false,
    badge: '',
    tags: []
  });

  const [newColor, setNewColor] = useState({ name: '', code: '#000000', stock: 0 });
  const [newSize, setNewSize] = useState({ name: '', stock: 0 });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    checkAuth();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData.category) {
      fetchSubcategories(formData.category);
    }
  }, [formData.category]);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:5000/api/admin/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const subs = data.categories.filter((cat: Category) => 
          cat.parentCategory?._id === categoryId
        );
        setSubcategories(subs);
      }
    } catch (error) {
      console.error('Erro ao carregar subcategorias:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('http://localhost:5000/api/upload/image', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) throw new Error('Erro no upload');
        
        const data = await response.json();
        return {
          url: data.image.url,
          publicId: data.image.publicId,
          alt: file.name,
          isMain: false
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));

    } catch (error) {
      setError('Erro ao fazer upload das imagens');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const setMainImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isMain: i === index
      }))
    }));
  };

  const addColor = () => {
    if (newColor.name && newColor.code) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, { ...newColor }]
      }));
      setNewColor({ name: '', code: '#000000', stock: 0 });
    }
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const addSize = () => {
    if (newSize.name) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, { ...newSize }]
      }));
      setNewSize({ name: '', stock: 0 });
    }
  };

  const removeSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validações básicas
      if (!formData.name || !formData.description || !formData.category) {
        setError('Preencha todos os campos obrigatórios');
        return;
      }

      if (formData.images.length === 0) {
        setError('Adicione pelo menos uma imagem');
        return;
      }

      if (formData.colors.length === 0 && formData.sizes.length === 0) {
        setError('Adicione pelo menos uma cor ou tamanho');
        return;
      }

      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:5000/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess('Produto criado com sucesso!');
        setTimeout(() => {
          router.push('/admin/products');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao criar produto');
      }
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-product-page">
      <header className="page-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={() => router.push('/admin/dashboard')}
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          <div className="header-title">
            <Package size={24} />
            <h1>Novo Produto</h1>
          </div>
        </div>
      </header>

      <div className="page-content">
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          {/* Informações Básicas */}
          <div className="form-section">
            <h2>
              <FileText size={20} />
              Informações Básicas
            </h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Legging Feminina High Waist"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="badge">
                  Badge/Selo
                </label>
                <input
                  type="text"
                  id="badge"
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                  placeholder="Ex: NOVO, PROMOÇÃO, HIGH WAIST"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="shortDescription">
                Descrição Curta
              </label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Descrição breve que aparece nos cards"
                maxLength={150}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Descrição Completa *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descrição detalhada do produto..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Categorização */}
          <div className="form-section">
            <h2>
              <Tag size={20} />
              Categoria e Seção
            </h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="category">
                  Categoria Principal *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories
                    .filter(cat => !cat.parentCategory) // Apenas categorias principais
                    .map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subcategory">
                  Subcategoria/Seção
                </label>
                <select
                  id="subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione uma seção</option>
                  {subcategories.map(subcategory => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Preços */}
          <div className="form-section">
            <h2>
              <DollarSign size={20} />
              Preços
            </h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="price">
                  Preço de Venda *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  placeholder="89.90"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="originalPrice">
                  Preço Original (se houver desconto)
                </label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  placeholder="129.90"
                />
              </div>
            </div>
          </div>

          {/* Cores */}
          <div className="form-section">
            <h2>
              <Palette size={20} />
              Cores Disponíveis
            </h2>
            
            <div className="colors-section">
              <div className="add-color">
                <div className="color-inputs">
                  <input
                    type="text"
                    placeholder="Nome da cor"
                    value={newColor.name}
                    onChange={(e) => setNewColor({...newColor, name: e.target.value})}
                  />
                  <input
                    type="color"
                    value={newColor.code}
                    onChange={(e) => setNewColor({...newColor, code: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Estoque"
                    value={newColor.stock}
                    onChange={(e) => setNewColor({...newColor, stock: parseInt(e.target.value) || 0})}
                  />
                  <button type="button" onClick={addColor} className="btn-add">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="colors-list">
                {formData.colors.map((color, index) => (
                  <div key={index} className="color-item">
                    <div 
                      className="color-preview" 
                      style={{ backgroundColor: color.code }}
                    />
                    <span className="color-name">{color.name}</span>
                    <span className="color-stock">{color.stock} un.</span>
                    <button 
                      type="button" 
                      onClick={() => removeColor(index)}
                      className="btn-remove"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tamanhos */}
          <div className="form-section">
            <h2>
              <Ruler size={20} />
              Tamanhos Disponíveis
            </h2>
            
            <div className="sizes-section">
              <div className="add-size">
                <div className="size-inputs">
                  <input
                    type="text"
                    placeholder="Tamanho (PP, P, M, G, GG)"
                    value={newSize.name}
                    onChange={(e) => setNewSize({...newSize, name: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Estoque"
                    value={newSize.stock}
                    onChange={(e) => setNewSize({...newSize, stock: parseInt(e.target.value) || 0})}
                  />
                  <button type="button" onClick={addSize} className="btn-add">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="sizes-list">
                {formData.sizes.map((size, index) => (
                  <div key={index} className="size-item">
                    <span className="size-name">{size.name}</span>
                    <span className="size-stock">{size.stock} un.</span>
                    <button 
                      type="button" 
                      onClick={() => removeSize(index)}
                      className="btn-remove"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Imagens */}
          <div className="form-section">
            <h2>
              <Upload size={20} />
              Imagens do Produto
            </h2>
            
            <div className="images-section">
              <div className="upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="upload-button">
                  <Upload size={24} />
                  {uploading ? 'Enviando...' : 'Selecionar Imagens'}
                </label>
                <p className="upload-hint">
                  Aceita múltiplas imagens (JPG, PNG, WebP)
                </p>
              </div>

              <div className="images-grid">
                {formData.images.map((image, index) => (
                  <div key={index} className={`image-item ${image.isMain ? 'main' : ''}`}>
                    <img src={image.url} alt={image.alt} />
                    <div className="image-actions">
                      <button
                        type="button"
                        onClick={() => setMainImage(index)}
                        className={`btn-main ${image.isMain ? 'active' : ''}`}
                      >
                        Principal
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="btn-remove"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags e Opções */}
          <div className="form-section">
            <h2>
              <Hash size={20} />
              Tags e Opções
            </h2>
            
            <div className="tags-section">
              <div className="add-tag">
                <input
                  type="text"
                  placeholder="Adicionar tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button type="button" onClick={addTag} className="btn-add">
                  <Plus size={16} />
                </button>
              </div>

              <div className="tags-list">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => removeTag(tag)}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="options-grid">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                />
                <span>Produto Novo</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isLaunch"
                  checked={formData.isLaunch}
                  onChange={handleInputChange}
                />
                <span>Lançamento</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                />
                <span>Produto em Destaque</span>
              </label>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              className="btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? 'Salvando...' : 'Criar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
