"use client";

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import ProductPageSkeleton from '../../../components/ProductPageSkeleton';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Truck, 
  Shield, 
  RotateCcw, 
  CreditCard,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Zap,
  Award,
  Users
} from 'lucide-react';
import Image from 'next/image';
import './styles.scss';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: Array<{
    url: string;
    alt: string;
    isMain: boolean;
  }>;
  colors: Array<{
    name: string;
    code: string;
    stock: number;
  }>;
  sizes: Array<{
    name: string;
    stock: number;
  }>;
  category: {
    name: string;
    slug: string;
  };
  tags: string[];
  badge?: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isActive: boolean;
}

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [cep, setCep] = useState('');
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [params.slug]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/slug/${params.slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          notFound();
        }
        throw new Error('Erro ao carregar produto');
      }
      const data = await response.json();
      setProduct(data);
      
      // Definir cor e tamanho padrão
      if (data.colors.length > 0) {
        setSelectedColor(data.colors[0].name);
      }
      if (data.sizes.length > 0) {
        setSelectedSize(data.sizes[0].name);
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscount = () => {
    if (!product?.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const getSelectedColorStock = () => {
    if (!selectedColor || !product) return 0;
    const color = product.colors.find(c => c.name === selectedColor);
    return color?.stock || 0;
  };

  const getSelectedSizeStock = () => {
    if (!selectedSize || !product) return 0;
    const size = product.sizes.find(s => s.name === selectedSize);
    return size?.stock || 0;
  };

  const handleQuantityChange = (change: number) => {
    const maxStock = Math.min(getSelectedColorStock(), getSelectedSizeStock());
    const newQuantity = Math.max(1, Math.min(quantity + change, maxStock));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Por favor, selecione cor e tamanho');
      return;
    }

    const cartItem = {
      productId: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      color: selectedColor,
      size: selectedSize,
      quantity
    };

    // Adicionar ao carrinho (localStorage por enquanto)
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(
      (item: any) => 
        item.productId === cartItem.productId && 
        item.color === cartItem.color && 
        item.size === cartItem.size
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Produto adicionado ao carrinho!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirecionar para checkout
    window.location.href = '/checkout';
  };

  const calculateShipping = async () => {
    if (cep.length !== 8) return;
    
    // Simulação de cálculo de frete
    setTimeout(() => {
      setShippingInfo({
        sedex: { price: 15.90, days: '1-2 dias úteis' },
        pac: { price: 8.90, days: '3-5 dias úteis' },
        expressa: { price: 25.90, days: 'Mesmo dia' }
      });
    }, 1000);
  };

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="product-page">
      <div className="container">
        <Breadcrumbs 
          items={[
            { label: product.category.name, href: `/${product.category.name.toLowerCase()}` }
          ]}
          current={product.name}
        />

        <div className="product-container">
          {/* Galeria de Imagens */}
          <div className="product-gallery">
            <div className="main-image">
              <Image
                src={product.images[currentImageIndex]?.url || '/placeholder.jpg'}
                alt={product.images[currentImageIndex]?.alt || product.name}
                width={600}
                height={800}
                className="main-product-image"
              />
              {product.badge && (
                <div className="product-badge">{product.badge}</div>
              )}
            {calculateDiscount() > 0 && (
              <div className="discount-badge">-{calculateDiscount()}%</div>
            )}
            
            {/* Navegação da galeria */}
            {product.images.length > 1 && (
              <>
                <button 
                  className="gallery-nav prev"
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === 0 ? product.images.length - 1 : prev - 1
                  )}
                >
                  <ChevronLeft />
                </button>
                <button 
                  className="gallery-nav next"
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )}
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={80}
                    height={100}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informações do Produto */}
        <div className="product-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            <div className="product-actions">
              <button 
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart fill={isFavorite ? '#ff4757' : 'none'} />
              </button>
              <button className="share-btn">
                <Share2 />
              </button>
            </div>
          </div>

          {/* Avaliações */}
          {product.rating && (
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    fill={i < Math.floor(product.rating!) ? '#ffd700' : 'none'}
                    color="#ffd700"
                    size={16}
                  />
                ))}
              </div>
              <span className="rating-value">({product.rating})</span>
              <span className="review-count">{product.reviewCount || 0} avaliações</span>
            </div>
          )}

          {/* Preços */}
          <div className="pricing">
            <div className="current-price">R$ {product.price.toFixed(2)}</div>
            {product.originalPrice && (
              <div className="original-price">R$ {product.originalPrice.toFixed(2)}</div>
            )}
            <div className="payment-options">
              <p>ou 12x de R$ {(product.price / 12).toFixed(2)} sem juros</p>
              <p className="pix-discount">R$ {(product.price * 0.9).toFixed(2)} no PIX (10% desconto)</p>
            </div>
          </div>

          {/* Seleção de Cor */}
          <div className="color-selection">
            <h3>Cor: <span>{selectedColor}</span></h3>
            <div className="color-options">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`color-option ${selectedColor === color.name ? 'active' : ''} ${color.stock === 0 ? 'out-of-stock' : ''}`}
                  style={{ backgroundColor: color.code }}
                  onClick={() => setSelectedColor(color.name)}
                  disabled={color.stock === 0}
                  title={`${color.name} ${color.stock === 0 ? '(Esgotado)' : `(${color.stock} disponíveis)`}`}
                >
                  {selectedColor === color.name && <div className="checkmark">✓</div>}
                </button>
              ))}
            </div>
          </div>

          {/* Seleção de Tamanho */}
          <div className="size-selection">
            <h3>Tamanho: <span>{selectedSize}</span></h3>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size.name}
                  className={`size-option ${selectedSize === size.name ? 'active' : ''} ${size.stock === 0 ? 'out-of-stock' : ''}`}
                  onClick={() => setSelectedSize(size.name)}
                  disabled={size.stock === 0}
                >
                  {size.name}
                  {size.stock === 0 && <span className="out-label">Esgotado</span>}
                </button>
              ))}
            </div>
            <button className="size-guide">Guia de Tamanhos</button>
          </div>

          {/* Quantidade */}
          <div className="quantity-selection">
            <h3>Quantidade:</h3>
            <div className="quantity-controls">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= Math.min(getSelectedColorStock(), getSelectedSizeStock())}
              >
                <Plus />
              </button>
            </div>
            <span className="stock-info">
              {Math.min(getSelectedColorStock(), getSelectedSizeStock())} unidades disponíveis
            </span>
          </div>

          {/* Botões de Ação */}
          <div className="action-buttons">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedSize || getSelectedColorStock() === 0 || getSelectedSizeStock() === 0}
            >
              <ShoppingCart />
              Adicionar ao Carrinho
            </button>
            <button 
              className="buy-now-btn"
              onClick={handleBuyNow}
              disabled={!selectedColor || !selectedSize || getSelectedColorStock() === 0 || getSelectedSizeStock() === 0}
            >
              <Zap />
              Comprar Agora
            </button>
          </div>

          {/* Calcular Frete */}
          <div className="shipping-calculator">
            <h3>Calcular Frete e Prazo</h3>
            <div className="cep-input">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                maxLength={8}
              />
              <button onClick={calculateShipping}>
                <MapPin />
                Calcular
              </button>
            </div>
            
            {shippingInfo && (
              <div className="shipping-options">
                {Object.entries(shippingInfo).map(([method, info]: [string, any]) => (
                  <div key={method} className="shipping-option">
                    <span className="method-name">{method.toUpperCase()}</span>
                    <span className="shipping-price">R$ {info.price.toFixed(2)}</span>
                    <span className="shipping-time">{info.days}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Garantias e Benefícios */}
          <div className="product-benefits">
            <div className="benefit">
              <Shield />
              <span>Garantia de 30 dias</span>
            </div>
            <div className="benefit">
              <RotateCcw />
              <span>Troca grátis</span>
            </div>
            <div className="benefit">
              <Truck />
              <span>Frete grátis acima de R$ 200</span>
            </div>
            <div className="benefit">
              <CreditCard />
              <span>Parcelamento sem juros</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de Informações */}
      <div className="product-tabs">
        <div className="tab-headers">
          <button 
            className={activeTab === 'description' ? 'active' : ''}
            onClick={() => setActiveTab('description')}
          >
            Descrição
          </button>
          <button 
            className={activeTab === 'specifications' ? 'active' : ''}
            onClick={() => setActiveTab('specifications')}
          >
            Especificações
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Avaliações ({product.reviewCount || 0})
          </button>
          <button 
            className={activeTab === 'shipping' ? 'active' : ''}
            onClick={() => setActiveTab('shipping')}
          >
            Entrega e Devolução
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <h3>Sobre o Produto</h3>
              <p>{product.description}</p>
              
              <h4>Características:</h4>
              <ul>
                <li>Material de alta qualidade</li>
                <li>Tecnologia dry-fit para absorção do suor</li>
                <li>Corte moderno e confortável</li>
                <li>Ideal para atividades físicas e uso casual</li>
              </ul>

              {product.tags.length > 0 && (
                <div className="product-tags">
                  <h4>Tags:</h4>
                  <div className="tags">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="specifications-content">
              <h3>Especificações Técnicas</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Material</td>
                    <td>100% Poliéster com tecnologia dry-fit</td>
                  </tr>
                  <tr>
                    <td>Gênero</td>
                    <td>{product.category.name}</td>
                  </tr>
                  <tr>
                    <td>Cores Disponíveis</td>
                    <td>{product.colors.map(c => c.name).join(', ')}</td>
                  </tr>
                  <tr>
                    <td>Tamanhos</td>
                    <td>{product.sizes.map(s => s.name).join(', ')}</td>
                  </tr>
                  <tr>
                    <td>Cuidados</td>
                    <td>Lavar à máquina com água fria, não usar alvejante</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <div className="reviews-summary">
                <div className="rating-overview">
                  <div className="overall-rating">
                    <span className="rating-number">{product.rating || 0}</span>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          fill={i < Math.floor(product.rating || 0) ? '#ffd700' : 'none'}
                          color="#ffd700"
                        />
                      ))}
                    </div>
                    <span>Baseado em {product.reviewCount || 0} avaliações</span>
                  </div>
                </div>
              </div>

              <div className="review-form">
                <h4>Deixe sua avaliação</h4>
                <p>Compartilhe sua experiência com este produto</p>
                <button className="write-review-btn">Escrever Avaliação</button>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="shipping-content">
              <h3>Entrega</h3>
              <p>• Entregamos para todo o Brasil</p>
              <p>• Frete grátis para compras acima de R$ 200,00</p>
              <p>• Prazo de entrega: 3 a 10 dias úteis</p>

              <h3>Devolução</h3>
              <p>• 30 dias para trocar ou devolver</p>
              <p>• Produto deve estar em perfeito estado</p>
              <p>• Primeira troca grátis</p>

              <h3>Garantia</h3>
              <p>• Garantia de qualidade por 30 dias</p>
              <p>• Suporte ao cliente 24/7</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
