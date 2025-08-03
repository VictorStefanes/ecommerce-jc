'use client';

import Link from 'next/link';
import { Search, Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="global-not-found">
      <div className="container">
        <div className="content">
          <div className="error-animation">
            <div className="error-code">404</div>
            <div className="error-icon">🛍️</div>
          </div>
          
          <h1>Oops! Página não encontrada</h1>
          <p>
            A página que você está procurando não existe ou foi movida.
            Não se preocupe, temos muitas outras coisas incríveis para você descobrir!
          </p>
          
          <div className="actions">
            <Link href="/" className="btn btn-primary">
              <Home size={20} />
              Página Inicial
            </Link>
            
            <Link href="/masculino" className="btn btn-outline">
              <ShoppingBag size={20} />
              Ver Produtos
            </Link>
          </div>

          <div className="popular-categories">
            <h3>Categorias Populares</h3>
            <div className="category-grid">
              <Link href="/masculino" className="category-card">
                <span>👔</span>
                <span>Masculino</span>
              </Link>
              <Link href="/feminino" className="category-card">
                <span>👗</span>
                <span>Feminino</span>
              </Link>
              <Link href="/kits" className="category-card">
                <span>🎁</span>
                <span>Kits</span>
              </Link>
              <Link href="/lancamentos" className="category-card">
                <span>✨</span>
                <span>Lançamentos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .global-not-found {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
        }

        .container {
          max-width: 800px;
          width: 100%;
        }

        .content {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 60px 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .error-animation {
          position: relative;
          margin-bottom: 40px;
        }

        .error-code {
          font-size: 120px;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: pulse 2s ease-in-out infinite alternate;
        }

        .error-icon {
          font-size: 60px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: bounce 1s ease-in-out infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }

        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        h1 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
          color: white;
        }

        p {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 40px;
          opacity: 0.9;
        }

        .actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 16px;
        }

        .btn-primary {
          background: white;
          color: #667eea;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
          transform: translateY(-3px);
        }

        .popular-categories {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 40px;
        }

        .popular-categories h3 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 30px;
          color: white;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          max-width: 600px;
          margin: 0 auto;
        }

        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          text-decoration: none;
          color: white;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .category-card:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-5px);
        }

        .category-card span:first-child {
          font-size: 30px;
        }

        .category-card span:last-child {
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .content {
            padding: 40px 20px;
          }

          .error-code {
            font-size: 80px;
          }

          .error-icon {
            font-size: 40px;
          }

          h1 {
            font-size: 28px;
          }

          .actions {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 280px;
          }

          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
