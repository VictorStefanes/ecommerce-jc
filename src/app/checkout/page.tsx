"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, CreditCard, MapPin, User, Lock } from 'lucide-react';
import './styles.scss';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  });
  const [addressData, setAddressData] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });
  const [paymentData, setPaymentData] = useState({
    method: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    // Carregar itens do carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getShipping = () => {
    return getSubtotal() >= 200 ? 0 : 15.90;
  };

  const getTotal = () => {
    return getSubtotal() + getShipping();
  };

  const handleFinishOrder = () => {
    alert('Pedido finalizado com sucesso!');
    localStorage.removeItem('cart');
    window.location.href = '/';
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Header */}
        <div className="checkout-header">
          <h1>Finalizar Compra</h1>
          <div className="checkout-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <User />
              <span>Dados Pessoais</span>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <MapPin />
              <span>Endereço</span>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <CreditCard />
              <span>Pagamento</span>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          {/* Formulário */}
          <div className="checkout-form">
            {/* Etapa 1: Dados Pessoais */}
            {step === 1 && (
              <div className="form-step">
                <h2>Dados Pessoais</h2>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  />
                  <input
                    type="tel"
                    placeholder="Telefone"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="CPF"
                    value={customerData.cpf}
                    onChange={(e) => setCustomerData({...customerData, cpf: e.target.value})}
                  />
                </div>
                <button 
                  className="continue-btn"
                  onClick={() => setStep(2)}
                  disabled={!customerData.name || !customerData.email}
                >
                  Continuar
                </button>
              </div>
            )}

            {/* Etapa 2: Endereço */}
            {step === 2 && (
              <div className="form-step">
                <h2>Endereço de Entrega</h2>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="CEP"
                    value={addressData.cep}
                    onChange={(e) => setAddressData({...addressData, cep: e.target.value})}
                    className="cep-input"
                  />
                  <input
                    type="text"
                    placeholder="Rua"
                    value={addressData.street}
                    onChange={(e) => setAddressData({...addressData, street: e.target.value})}
                    className="street-input"
                  />
                  <input
                    type="text"
                    placeholder="Número"
                    value={addressData.number}
                    onChange={(e) => setAddressData({...addressData, number: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Complemento"
                    value={addressData.complement}
                    onChange={(e) => setAddressData({...addressData, complement: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Bairro"
                    value={addressData.neighborhood}
                    onChange={(e) => setAddressData({...addressData, neighborhood: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Cidade"
                    value={addressData.city}
                    onChange={(e) => setAddressData({...addressData, city: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Estado"
                    value={addressData.state}
                    onChange={(e) => setAddressData({...addressData, state: e.target.value})}
                  />
                </div>
                <div className="step-buttons">
                  <button className="back-btn" onClick={() => setStep(1)}>
                    Voltar
                  </button>
                  <button 
                    className="continue-btn"
                    onClick={() => setStep(3)}
                    disabled={!addressData.cep || !addressData.street}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 3: Pagamento */}
            {step === 3 && (
              <div className="form-step">
                <h2>Forma de Pagamento</h2>
                
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="payment"
                      value="pix"
                      onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
                    />
                    <div className="method-info">
                      <strong>PIX</strong>
                      <span>Desconto de 10% - R$ {(getTotal() * 0.9).toFixed(2)}</span>
                    </div>
                  </label>

                  <label className="payment-method">
                    <input
                      type="radio"
                      name="payment"
                      value="credit"
                      onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
                    />
                    <div className="method-info">
                      <strong>Cartão de Crédito</strong>
                      <span>Em até 12x sem juros</span>
                    </div>
                  </label>

                  <label className="payment-method">
                    <input
                      type="radio"
                      name="payment"
                      value="boleto"
                      onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
                    />
                    <div className="method-info">
                      <strong>Boleto Bancário</strong>
                      <span>Vencimento em 3 dias úteis</span>
                    </div>
                  </label>
                </div>

                {paymentData.method === 'credit' && (
                  <div className="credit-card-form">
                    <input
                      type="text"
                      placeholder="Número do cartão"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Nome no cartão"
                      value={paymentData.cardName}
                      onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                    />
                    <div className="card-details">
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="step-buttons">
                  <button className="back-btn" onClick={() => setStep(2)}>
                    Voltar
                  </button>
                  <button 
                    className="finish-btn"
                    onClick={handleFinishOrder}
                    disabled={!paymentData.method}
                  >
                    <Lock />
                    Finalizar Pedido
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Resumo do Pedido */}
          <div className="order-summary">
            <h3>Resumo do Pedido</h3>
            
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Cor: {item.color} | Tamanho: {item.size}</p>
                    <p>Qtd: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>R$ {getSubtotal().toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>Frete:</span>
                <span>{getShipping() === 0 ? 'Grátis' : `R$ ${getShipping().toFixed(2)}`}</span>
              </div>
              {paymentData.method === 'pix' && (
                <div className="total-line discount">
                  <span>Desconto PIX (10%):</span>
                  <span>-R$ {(getTotal() * 0.1).toFixed(2)}</span>
                </div>
              )}
              <div className="total-line total">
                <span>Total:</span>
                <span>
                  R$ {paymentData.method === 'pix' 
                    ? (getTotal() * 0.9).toFixed(2) 
                    : getTotal().toFixed(2)
                  }
                </span>
              </div>
            </div>

            <div className="security-info">
              <Lock />
              <span>Compra 100% segura</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
