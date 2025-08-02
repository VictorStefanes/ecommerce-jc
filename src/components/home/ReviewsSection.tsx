"use client";

import React from 'react';
import { Star } from 'lucide-react';
import './ReviewsSection.scss';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  product: string;
  date: string;
  avatar?: string;
}

const ReviewsSection: React.FC = () => {
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Maria Silva',
      rating: 5,
      comment: 'Produtos de excelente qualidade! A camiseta dry fit é muito confortável e o tecido é de primeira. Recomendo!',
      product: 'Camiseta Dry Fit Essential',
      date: '2025-01-15',
      avatar: '/images/avatars/maria.jpg'
    },
    {
      id: '2',
      name: 'João Santos',
      rating: 5,
      comment: 'Comprei o kit de 3 camisetas e superou minhas expectativas. Entrega rápida e atendimento nota 10!',
      product: 'Kit 3 Camisetas Dry Fit',
      date: '2025-01-12',
      avatar: '/images/avatars/joao.jpg'
    },
    {
      id: '3',
      name: 'Ana Costa',
      rating: 4,
      comment: 'Adorei a legging seamless! Muito confortável para treinar. Só achei que poderia ter mais cores disponíveis.',
      product: 'Legging Seamless',
      date: '2025-01-10',
      avatar: '/images/avatars/ana.jpg'
    },
    {
      id: '4',
      name: 'Carlos Oliveira',
      rating: 5,
      comment: 'A bermuda dry fit é perfeita para corrida. Tecido leve e não resseca. Já comprei mais duas!',
      product: 'Bermuda Dry Fit AeroFit',
      date: '2025-01-08',
      avatar: '/images/avatars/carlos.jpg'
    },
    {
      id: '5',
      name: 'Fernanda Lima',
      rating: 5,
      comment: 'Conjunto feminino lindo e de ótima qualidade. Chegou antes do prazo e exatamente como na foto.',
      product: 'Conjunto Feminino Inverno',
      date: '2025-01-05',
      avatar: '/images/avatars/fernanda.jpg'
    },
    {
      id: '6',
      name: 'Pedro Almeida',
      rating: 4,
      comment: 'Camiseta oversized com ótimo caimento. Material resistente e lavagem fácil. Muito satisfeito!',
      product: 'Camiseta Oversized',
      date: '2025-01-03',
      avatar: '/images/avatars/pedro.jpg'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'star-filled' : 'star-empty'}
        fill={index < rating ? '#ffc107' : 'none'}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="reviews-header">
          <h2 className="section-title">O que nossos clientes dizem</h2>
          <p className="section-subtitle">
            Avaliações reais de quem já experimentou a qualidade JC Atacados
          </p>
          
          <div className="reviews-stats">
            <div className="stat-item">
              <span className="stat-number">4.8</span>
              <div className="stat-stars">
                {renderStars(5)}
              </div>
              <span className="stat-label">Avaliação média</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15.000+</span>
              <span className="stat-label">Avaliações verificadas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Clientes satisfeitos</span>
            </div>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.name} />
                    ) : (
                      <span>{review.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="reviewer-details">
                    <h4 className="reviewer-name">{review.name}</h4>
                    <span className="review-date">{formatDate(review.date)}</span>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>

              <div className="review-body">
                <p className="review-comment">"{review.comment}"</p>
                <span className="review-product">Produto: {review.product}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-footer">
          <a href="/avaliacoes" className="btn btn-outline">
            Ver todas as avaliações
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
