"use client";

import React, { useState, useEffect } from 'react';
import { Timer, Zap, Gift, Star, ShoppingBag } from 'lucide-react';
import './styles.scss';

const TresPecas189Page: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 42,
    seconds: 30
  });

  const promotionalProducts = [
    {
      id: 1,
      name: "Kit Fitness Essentials",
      items: ["Camiseta Dry Fit", "Legging High Waist", "Top Esportivo"],
      price: 189,
      originalPrice: 267,
      image: "/api/placeholder/300/400",
      colors: ["#FF69B4", "#000", "#9370DB"],
      savings: 78,
      popular: true
    },
    {
      id: 2,
      name: "Kit Casual Chic",
      items: ["Cropped Oversized", "Short Jogger", "Regata Básica"],
      price: 189,
      originalPrice: 245,
      image: "/api/placeholder/300/400",
      colors: ["#FFB6C1", "#87CEEB", "#DDA0DD"],
      savings: 56,
      popular: false
    },
    {
      id: 3,
      name: "Kit Performance Pro",
      items: ["Camiseta Técnica", "Calça Legging", "Top Push Up"],
      price: 189,
      originalPrice: 289,
      image: "/api/placeholder/300/400",
      colors: ["#20B2AA", "#FF1493", "#000"],
      savings: 100,
      popular: true
    },
    {
      id: 4,
      name: "Kit Street Style",
      items: ["Oversized Tee", "Bike Short", "Cropped Tank"],
      price: 189,
      originalPrice: 256,
      image: "/api/placeholder/300/400",
      colors: ["#F0E68C", "#FF69B4", "#6A5ACD"],
      savings: 67,
      popular: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="tres-pecas-page">
      {/* Hero Promotion */}
      <section className="promo-hero">
        <div className="hero-animation">
          <div className="floating-money">💰</div>
          <div className="floating-money">💎</div>
          <div className="floating-money">✨</div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="promo-badge">
              <Gift size={20} />
              <span>OFERTA IMPERDÍVEL</span>
            </div>

            <h1>
              <span className="highlight">3 PEÇAS</span>
              <span className="price">POR R$ 189</span>
              <span className="savings">ECONOMIZE ATÉ R$ 100</span>
            </h1>

            <p>Monte seu look completo com 3 peças à sua escolha e garante um super desconto. Combinações ilimitadas para seu guarda-roupa!</p>

            {/* Countdown Timer */}
            <div className="countdown-timer">
              <div className="timer-label">
                <Timer size={16} />
                Oferta termina em:
              </div>
              <div className="timer-display">
                <div className="time-unit">
                  <span className="number">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="label">Dias</span>
                </div>
                <div className="separator">:</div>
                <div className="time-unit">
                  <span className="number">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="label">Horas</span>
                </div>
                <div className="separator">:</div>
                <div className="time-unit">
                  <span className="number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="label">Min</span>
                </div>
                <div className="separator">:</div>
                <div className="time-unit">
                  <span className="number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="label">Seg</span>
                </div>
              </div>
            </div>

            <button className="cta-button">
              <Zap size={20} />
              GARANTIR OFERTA AGORA
            </button>
          </div>

          <div className="hero-visual">
            <div className="products-stack">
              <div className="product-item item-1">
                <img src="/api/placeholder/250/300" alt="Peça 1" />
                <div className="price-tag">R$ 89</div>
              </div>
              <div className="product-item item-2">
                <img src="/api/placeholder/250/300" alt="Peça 2" />
                <div className="price-tag">R$ 79</div>
              </div>
              <div className="product-item item-3">
                <img src="/api/placeholder/250/300" alt="Peça 3" />
                <div className="price-tag">R$ 99</div>
              </div>
              <div className="total-overlay">
                <div className="calculation">
                  <span className="original">R$ 267</span>
                  <span className="arrow">→</span>
                  <span className="promo">R$ 189</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>Como Funciona?</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Escolha 3 Peças</h3>
                <p>Selecione qualquer 3 produtos da coleção feminina</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Desconto Automático</h3>
                <p>O desconto é aplicado automaticamente no carrinho</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Pague R$ 189</h3>
                <p>Independente do valor original das peças escolhidas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Products */}
      <section className="promo-products">
        <div className="container">
          <h2>Kits Pré-Selecionados</h2>
          <p>Ou escolha um de nossos kits já montados com as melhores combinações</p>

          <div className="products-grid">
            {promotionalProducts.map((product) => (
              <div key={product.id} className="promo-card">
                {product.popular && (
                  <div className="popular-badge">
                    <Star size={14} />
                    MAIS POPULAR
                  </div>
                )}

                <div className="savings-badge">
                  ECONOMIZE R$ {product.savings}
                </div>

                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="hover-overlay">
                    <button className="quick-add">
                      <ShoppingBag size={16} />
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  
                  <div className="items-list">
                    {product.items.map((item, index) => (
                      <span key={index} className="item">
                        {item}
                        {index < product.items.length - 1 && <span className="separator"> + </span>}
                      </span>
                    ))}
                  </div>

                  <div className="colors">
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="color-dot"
                        style={{ backgroundColor: color }}
                      ></span>
                    ))}
                  </div>

                  <div className="pricing">
                    <div className="price-comparison">
                      <span className="original">De R$ {product.originalPrice}</span>
                      <span className="promo-price">Por R$ {product.price}</span>
                    </div>
                    <div className="savings-text">
                      Você economiza R$ {product.originalPrice - product.price}
                    </div>
                  </div>

                  <button className="select-kit">ESCOLHER ESTE KIT</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms and Benefits */}
      <section className="terms-benefits">
        <div className="container">
          <div className="content-grid">
            <div className="benefits">
              <h3>Benefícios da Promoção</h3>
              <ul>
                <li>✨ Desconto aplicado automaticamente</li>
                <li>🚚 Frete grátis para todo Brasil</li>
                <li>💳 Parcele em até 3x sem juros</li>
                <li>🔄 Troca grátis em até 30 dias</li>
                <li>📱 Atendimento exclusivo via WhatsApp</li>
              </ul>
            </div>

            <div className="terms">
              <h3>Termos da Promoção</h3>
              <ul>
                <li>• Válido apenas para produtos femininos</li>
                <li>• Não cumulativo com outras promoções</li>
                <li>• Desconto aplicado no valor das 3 peças</li>
                <li>• Oferta por tempo limitado</li>
                <li>• Sujeito à disponibilidade do estoque</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TresPecas189Page;
