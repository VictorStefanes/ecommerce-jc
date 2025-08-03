"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import SearchComponent from '../search/SearchComponent';
import CartSidebar from '../cart/CartSidebar';
import './Header.scss';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  return (
    <>
      <header className="header">
      {/* Banner Superior */}
      <div className="header-banner">
        <div className="container">
          <p>
            <span>FRETE GRÁTIS A PARTIR de R$198</span>
            <span className="separator">•</span>
            <span>BRINDE A PARTIR de R$209</span>
          </p>
        </div>
      </div>

      {/* Navbar Principal */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            {/* Logo */}
            <Link href="/" className="logo">
              <div className="logo-circle">
                <span>JC</span>
              </div>
              <h1>ATACADOS</h1>
            </Link>

            {/* Menu Principal */}
            <div className="main-menu">
              <div className="menu-item dropdown">
                <span>PROMOÇÕES</span>
                <div className="dropdown-content">
                  <div className="dropdown-section">
                    <h4>Masculino</h4>
                    <a href="/masculino/camisetas-dry-fit">Camisetas Dry Fit</a>
                    <a href="/masculino/oversized">Oversized</a>
                    <a href="/masculino/shorts-bermudas">Shorts e Bermudas</a>
                  </div>
                  <div className="dropdown-section">
                    <h4>Feminino</h4>
                    <a href="/feminino/camisetas-dry-fit">Camisetas Dry Fit</a>
                    <a href="/feminino/3-pecas-189">03 Peças R$189</a>
                    <a href="/feminino/2-conjuntos-199">02 Conjuntos R$199</a>
                    <a href="/feminino/ate-77-off">Até 77% OFF</a>
                  </div>
                </div>
              </div>

              <div className="menu-item dropdown">
                <span>MASCULINO</span>
                <div className="dropdown-content">
                  <div className="dropdown-section">
                    <h4>PRODUTOS</h4>
                    <a href="/masculino/camisetas">Camisetas</a>
                    <a href="/masculino/regatas">Regatas</a>
                    <a href="/masculino/oversized">Oversized</a>
                    <a href="/masculino/shorts-bermudas">Shorts e Bermudas</a>
                    <a href="/masculino/calcas">Calças</a>
                    <a href="/masculino/casacos">Casacos</a>
                    <a href="/masculino/moletom">Moletom</a>
                  </div>
                  <div className="dropdown-section">
                    <h4>ACESSÓRIOS</h4>
                    <a href="/masculino/bones">Bonés</a>
                    <a href="/masculino/cuecas">Cuecas</a>
                    <a href="/masculino/meias">Meias</a>
                    <a href="/masculino/garrafa-termica">Garrafa Térmica</a>
                    <a href="/masculino/pulseiras">Pulseiras</a>
                    <a href="/masculino/acessorios">Todos</a>
                  </div>
                  <div className="dropdown-section">
                    <h4>PROMOÇÕES</h4>
                    <a href="/masculino/promo-dry-fit">Promo Camisetas Dry Fit</a>
                    <a href="/masculino/promo-bermudas">Promo Bermudas</a>
                    <a href="/masculino/promo-oversized">Promo Oversized</a>
                    <a href="/masculino/promo-camuflada">Promo Camuflada</a>
                    <a href="/masculino/promo-apex">Promo Apex</a>
                  </div>
                  <div className="dropdown-section">
                    <h4>COLEÇÕES</h4>
                    <a href="/colecoes/inverno">Inverno</a>
                    <a href="/colecoes/apex">Apex</a>
                    <a href="/colecoes/oversized">Oversized</a>
                    <a href="/colecoes/camuflada">Camuflada</a>
                    <a href="/colecoes/aerofit">AeroFit</a>
                    <a href="/colecoes/polo-dry-fit">Polo Dry Fit</a>
                    <a href="/colecoes/essential">Essential</a>
                    <a href="/colecoes/poliamida">Poliamida</a>
                  </div>
                  <div className="dropdown-section">
                    <h4>ATIVIDADES</h4>
                    <a href="/masculino/running">Running</a>
                  </div>
                </div>
              </div>

              <div className="menu-item dropdown">
                <span>FEMININO</span>
                <div className="dropdown-content">
                  <div className="dropdown-section">
                    <h4>PRODUTOS</h4>
                    <a href="/feminino/conjunto-inverno">Conjunto Inverno</a>
                    <a href="/feminino/camisetas-cropped-regatas">Camisetas/Cropped/Regatas</a>
                    <a href="/feminino/legging">Legging</a>
                    <a href="/feminino/short">Short</a>
                    <a href="/feminino/top">Top</a>
                    <a href="/feminino/conjuntos">Conjuntos</a>
                    <a href="/feminino/meia-feminina">Meia Feminina</a>
                  </div>
                  <div className="dropdown-section">
                    <h4>PROMOÇÕES</h4>
                    <a href="/feminino/77-off">77% OFF</a>
                    <a href="/feminino/3-pecas-189">03 Peças R$189</a>
                    <a href="/feminino/2-conjuntos-199">02 Conjuntos R$199</a>
                    <a href="/feminino/3-camisetas-109">03 Camisetas R$109</a>
                  </div>
                  <div className="dropdown-section">
                    <h4>COLEÇÕES</h4>
                    <a href="/colecoes/inverno">Inverno</a>
                    <a href="/colecoes/basic">Basic</a>
                    <a href="/colecoes/seamless">Seamless</a>
                  </div>
                </div>
              </div>

              <div className="menu-item dropdown">
                <span>KITS</span>
                <div className="dropdown-content">
                  <div className="dropdown-section">
                    <a href="/kits/camisetas-dry">Kits Camisetas Dry</a>
                    <a href="/kits/oversized">Kits Oversized</a>
                    <a href="/kits/camisetas-bermudas">Kits Camisetas Dry + Bermudas</a>
                    <a href="/kits/camisetas-shorts">Kits Camisetas Dry + Shorts</a>
                    <a href="/kits/bermudas">Kits Bermudas</a>
                    <a href="/kits/shorts">Kits Shorts</a>
                    <a href="/kits/cuecas">Kits Cuecas</a>
                    <a href="/kits/todos">Todos</a>
                  </div>
                </div>
              </div>

              <div className="menu-item dropdown">
                <span>LANÇAMENTOS</span>
                <div className="dropdown-content">
                  <div className="dropdown-section">
                    <h4>Masculino</h4>
                    <a href="/lancamentos/inverno">Inverno</a>
                    <a href="/lancamentos/oversized">Oversized</a>
                    <a href="/lancamentos/apex">Apex</a>
                    <a href="/lancamentos/essential">Essential</a>
                    <a href="/lancamentos/aerofit">AeroFit</a>
                    <a href="/lancamentos/polo-dry-fit">Polo Dry Fit</a>
                    <a href="/lancamentos/camuflada">Camuflada</a>
                    <a href="/lancamentos/thermaflow">ThermaFlow</a>
                  </div>
                  <div className="dropdown-section">
                    <h4>Feminino</h4>
                    <a href="/lancamentos/basic">Basic</a>
                    <a href="/lancamentos/seamless">Seamless</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações do usuário */}
            <div className="user-actions">
              <button 
                className="action-btn search-btn"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} />
              </button>
              <button className="action-btn user-btn">
                <User size={20} />
              </button>
              <button 
                className="action-btn cart-btn"
                onClick={toggleCart}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="cart-count">{totalItems}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>

    {/* Components */}
    <SearchComponent 
      isOpen={isSearchOpen} 
      onClose={() => setIsSearchOpen(false)} 
    />
    <CartSidebar />
    </>
  );
};

export default Header;
