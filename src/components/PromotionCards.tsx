'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { productAPI } from '../utils/api'

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

export default function PromotionCards() {
  const [products, setProducts] = useState<PromotionProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await productAPI.getPromotions()
        setProducts(data.products || [])
      } catch (error) {
        console.error('Erro ao buscar promoções:', error)
        setError('Erro ao carregar promoções')
      } finally {
        setLoading(false)
      }
    }

    fetchPromotions()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || products.length === 0) {
    return null
  }

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Título da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🔥 Ofertas Especiais
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Não perca nossas promoções incríveis! Produtos selecionados com os melhores preços.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
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

                    {/* Descrição Curta */}
                    {product.shortDescription && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    )}

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

                    {/* Call to Action */}
                    <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                      {index === 0 && "DOMINOU AS ACADEMIAS"}
                      {index === 1 && "TREINO COM ESTILO"} 
                      {index === 2 && "A MELHOR DO BRASIL"}
                      {index === 3 && "TREINO COMPLETO"}
                    </button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Link para Ver Mais */}
        <div className="text-center mt-12">
          <Link 
            href="/promocoes"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Ver Todas as Promoções
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
