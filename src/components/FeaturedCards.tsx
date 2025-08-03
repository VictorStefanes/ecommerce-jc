'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { productAPI } from '../utils/api'

interface FeaturedProduct {
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

export default function FeaturedCards() {
  const [products, setProducts] = useState<FeaturedProduct[]>([])
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
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4 uppercase tracking-wide">PROMOÇÕES</h2>
            <p className="text-gray-600 max-w-2xl">
              Carregando produtos...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4 uppercase tracking-wide">PROMOÇÕES</h2>
            <p className="text-gray-600 max-w-2xl">
              Nenhuma promoção disponível no momento. Configure promoções no painel administrativo.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-5xl font-black text-gray-900 mb-4 uppercase tracking-wide">PROMOÇÕES</h2>
          <p className="text-gray-600 max-w-2xl">
            Descubra nossa seleção especial de produtos em promoção com os melhores preços
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const imageUrl = product.images?.[0]?.url || '/placeholder-product.jpg'
            const hasDiscount = product.originalPrice && product.originalPrice > product.price
            const discountPercentage = hasDiscount 
              ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
              : 0

            return (
              <Link
                key={product._id}
                href={`/produtos/${product.category.slug}/${product.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  {/* Badge de Desconto ou Personalizado */}
                  {(hasDiscount || product.badge) && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
                        {product.badge || `${discountPercentage}% OFF`}
                      </span>
                    </div>
                  )}

                  {/* Imagem do Produto */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>

                  {/* Informações do Produto */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {product.category.name}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {product.shortDescription && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-900">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        {hasDiscount && (
                          <span className="text-sm text-gray-500 line-through">
                            R$ {product.originalPrice!.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                      
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                        Ver Produto
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Botão para ver todos os produtos */}
        <div className="text-center mt-12">
          <Link
            href="/produtos"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </div>
  )
}
