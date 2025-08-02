"use client";

import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <h3>Fique por dentro das novidades</h3>
            <p>Receba ofertas exclusivas e lançamentos em primeira mão</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-content">
          <div className="footer-grid">
            {/* Institucional */}
            <div className="footer-column">
              <h4>Institucional</h4>
              <ul>
                <li><a href="/sobre">Quem Somos</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/trabalhe-conosco">Trabalhe Conosco</a></li>
                <li><a href="/sustentabilidade">Sustentabilidade</a></li>
                <li><a href="/imprensa">Imprensa</a></li>
              </ul>
            </div>

            {/* Políticas */}
            <div className="footer-column">
              <h4>Políticas</h4>
              <ul>
                <li><a href="/politica-privacidade">Política de Privacidade</a></li>
                <li><a href="/politica-trocas">Trocas e Devoluções</a></li>
                <li><a href="/politica-entrega">Política de Entrega</a></li>
                <li><a href="/termos-uso">Termos de Uso</a></li>
                <li><a href="/politica-cookies">Política de Cookies</a></li>
              </ul>
            </div>

            {/* Ajuda */}
            <div className="footer-column">
              <h4>Ajuda</h4>
              <ul>
                <li><a href="/faq">FAQ - Perguntas Frequentes</a></li>
                <li><a href="/como-comprar">Como Comprar</a></li>
                <li><a href="/guia-tamanhos">Guia de Tamanhos</a></li>
                <li><a href="/rastrear-pedido">Rastrear Pedido</a></li>
                <li><a href="/segunda-via">Segunda Via do Boleto</a></li>
              </ul>
            </div>

            {/* Atendimento */}
            <div className="footer-column">
              <h4>Central de Atendimento</h4>
              <ul>
                <li>
                  <Phone size={16} />
                  <span>(11) 9999-9999</span>
                </li>
                <li>
                  <Mail size={16} />
                  <span>contato@jcatacados.com.br</span>
                </li>
                <li>
                  <MapPin size={16} />
                  <span>Seg à Sex: 8h às 18h<br />Sáb: 8h às 14h</span>
                </li>
              </ul>
              <div className="atacado-link">
                <a href="/atacado">
                  <strong>🏢 Vendas no Atacado</strong>
                  <span>Condições especiais para revendedores</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            {/* Logo e Redes Sociais */}
            <div className="footer-brand">
              <h2>JC ATACADOS</h2>
              <div className="social-links">
                <a href="https://instagram.com/jcatacados" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com/jcatacados" target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} />
                </a>
                <a href="https://youtube.com/jcatacados" target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Pagamentos e Segurança */}
            <div className="payment-security">
              <div className="payment-methods">
                <span>Formas de Pagamento:</span>
                <div className="payment-icons">
                  <img src="/images/payment/visa.svg" alt="Visa" />
                  <img src="/images/payment/mastercard.svg" alt="Mastercard" />
                  <img src="/images/payment/amex.svg" alt="American Express" />
                  <img src="/images/payment/elo.svg" alt="Elo" />
                  <img src="/images/payment/pix.svg" alt="PIX" />
                  <img src="/images/payment/boleto.svg" alt="Boleto" />
                </div>
              </div>
              <div className="security">
                <img src="/images/security/ssl.svg" alt="SSL Seguro" />
                <img src="/images/security/ebit.svg" alt="E-bit" />
              </div>
            </div>

            {/* Copyright */}
            <div className="copyright">
              <p>&copy; {new Date().getFullYear()} JC Atacados. Todos os direitos reservados.</p>
              <p>CNPJ: 00.000.000/0001-00 • JC Atacados Comércio de Roupas Ltda.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
