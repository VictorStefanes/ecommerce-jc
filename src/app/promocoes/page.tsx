"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CategoryHeader from '../../components/category/CategoryHeader';
import './promocoes.scss';

interface PromotionProduct {
  _id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  images: Array<{ url: string; alt?: string }>
  shortDescription?: string
  badge?: string
  category: {
    name: string
    slug: string
  }
}

interface Pagination {
  current: number
  pages: number
  total: number
}

export default function PromocoesPage() {
  const [products, setProducts] = useState<PromotionProduct[]>([])
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pages: 1, total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/admin/promotions?page=${page}&limit=12`)
        
        if (!response.ok) {
          throw new Error('Erro ao carregar promoções')
        }

        const data = await response.json()
        setProducts(data.products || [])
        setPagination(data.pagination || { current: 1, pages: 1, total: 0 })
      } catch (error) {
        console.error('Erro ao buscar promoções:', error)
        setError('Erro ao carregar promoções')
      } finally {
        setLoading(false)
      }
    }

    fetchPromotions()
  }, [page])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return null
    return Math.round((1 - price / originalPrice) * 100)
  }

  return (
    <div className="promocoes-page">
      <CategoryHeader 
        title="🔥 PROMOÇÕES ESPECIAIS" 
        subtitle="As melhores ofertas JC Atacados com até 70% OFF"
        bannerImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          // Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error State
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Tentar Novamente
            </button>
          </div>
        ) : products.length === 0 ? (
          // Empty State  
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma promoção encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              No momento não temos produtos em promoção.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Voltar à Página Inicial
            </Link>
          </div>
        ) : (
          <>
            {/* Informações da busca */}
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando {products.length} de {pagination.total} produtos em promoção
              </p>
            </div>

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product) => {
                const discount = calculateDiscount(product.price, product.originalPrice)
                
                return (
                  <Link 
                    key={product._id}
                    href={`/produto/${product.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                      {/* Imagem do Produto */}
                      <div className="relative aspect-square bg-gray-100 overflow-hidden">
                        <Image
                          src={product.images[0]?.url || '/placeholder-product.jpg'}
                          alt={product.images[0]?.alt || product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        
                        {/* Badge de Desconto */}
                        {discount && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                            -{discount}%
                          </div>
                        )}
                        
                        {/* Badge Personalizado */}
                        {product.badge && !discount && (
                          <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                            {product.badge}
                          </div>
                        )}

                        {/* Overlay com CTA */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            Ver Produto
                          </div>
                        </div>
                      </div>

                      {/* Conteúdo do Card */}
                      <div className="p-4">
                        {/* Categoria */}
                        <p className="text-sm text-gray-500 mb-1">
                          {product.category.name}
                        </p>

                        {/* Nome do Produto */}
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>

                        {/* Preços */}
                        <div className="space-y-1">
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-sm text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          )}
                          <p className="text-xl font-bold text-green-600">
                            {formatPrice(product.price)}
                          </p>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-sm text-green-600 font-medium">
                              Economize {formatPrice(product.originalPrice - product.price)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Paginação */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                {/* Página Anterior */}
                {pagination.current > 1 && (
                  <button
                    onClick={() => setPage(pagination.current - 1)}
                    className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Anterior
                  </button>
                )}

                {/* Números das Páginas */}
                {[...Array(pagination.pages)].map((_, index) => {
                  const pageNumber = index + 1
                  const isCurrentPage = pageNumber === pagination.current
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`px-3 py-2 rounded-lg ${
                        isCurrentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}

                {/* Próxima Página */}
                {pagination.current < pagination.pages && (
                  <button
                    onClick={() => setPage(pagination.current + 1)}
                    className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Próxima
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
