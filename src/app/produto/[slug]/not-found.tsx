import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Produto não encontrado</h1>
          <p>
            O produto que você está procurando não existe ou foi removido.
            Que tal dar uma olhada em outros produtos incríveis?
          </p>
          
          <div className="action-buttons">
            <Link href="/" className="btn btn-primary">
              <Home size={20} />
              Voltar ao Início
            </Link>
            <Link href="/masculino" className="btn btn-secondary">
              <Search size={20} />
              Ver Produtos
            </Link>
          </div>

          <div className="suggestions">
            <h3>Sugestões para você:</h3>
            <div className="suggestion-links">
              <Link href="/masculino">Roupas Masculinas</Link>
              <Link href="/feminino">Roupas Femininas</Link>
              <Link href="/kits">Kits Promocionais</Link>
              <Link href="/lancamentos">Lançamentos</Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .not-found-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
        }

        .not-found-container {
          max-width: 600px;
          text-align: center;
        }

        .not-found-content {
          background: white;
          padding: 60px 40px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .error-code {
          font-size: 120px;
          font-weight: 900;
          color: #007bff;
          line-height: 1;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 123, 255, 0.2);
        }

        h1 {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          margin-bottom: 15px;
        }

        p {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 25px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 16px;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background: #0056b3;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: white;
          color: #007bff;
          border: 2px solid #007bff;
        }

        .btn-secondary:hover {
          background: #007bff;
          color: white;
          transform: translateY(-2px);
        }

        .suggestions {
          border-top: 1px solid #dee2e6;
          padding-top: 30px;
        }

        .suggestions h3 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
        }

        .suggestion-links {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .suggestion-links a {
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 20px;
          background: #f8f9ff;
          transition: all 0.3s ease;
        }

        .suggestion-links a:hover {
          background: #007bff;
          color: white;
        }

        @media (max-width: 600px) {
          .not-found-content {
            padding: 40px 20px;
          }

          .error-code {
            font-size: 80px;
          }

          h1 {
            font-size: 24px;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 250px;
          }

          .suggestion-links {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
