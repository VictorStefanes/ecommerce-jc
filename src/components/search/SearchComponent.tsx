"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import './SearchComponent.scss';

interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
}

interface SearchComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock de dados para busca (será substituído pela API)
const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    name: "Legging Feminina High Waist Preta",
    price: 89.90,
    image: "/api/placeholder/300/400",
    category: "feminino",
    subcategory: "legging"
  },
  {
    id: "2",
    name: "Camiseta Masculina Dry Fit Oversized",
    price: 79.90,
    image: "/api/placeholder/300/400",
    category: "masculino",
    subcategory: "camisetas"
  },
];

const recentSearches = [
  "legging high waist",
  "camiseta dry fit",
  "conjunto feminino",
  "short masculino"
];

const trendingSearches = [
  "oversized",
  "seamless",
  "dry fit",
  "conjunto inverno",
  "regata premium"
];

export default function SearchComponent({ isOpen, onClose }: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounce hook
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      // Simular busca na API
      performSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Focus no input quando abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const performSearch = async (term: string) => {
    try {
      // TODO: Substituir por chamada real da API
      await new Promise(resolve => setTimeout(resolve, 200)); // Simular delay da API
      
      const filteredResults = mockSearchResults.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(term.toLowerCase())
      );
      
      setResults(filteredResults);
      setShowResults(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro na busca:', error);
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(`/${result.category}/${result.subcategory}`);
    onClose();
    setSearchTerm('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchTerm)}`);
      onClose();
      setSearchTerm('');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    setShowResults(false);
    inputRef.current?.focus();
  };

  const handleRecentSearch = (search: string) => {
    setSearchTerm(search);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="search-overlay" onClick={onClose} />
      
      {/* Search Modal */}
      <div className="search-modal">
        <div className="search-container">
          {/* Search Header */}
          <div className="search-header">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button 
                    type="button" 
                    className="clear-search"
                    onClick={handleClear}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>
            <button className="search-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          {/* Search Content */}
          <div className="search-content">
            {!searchTerm.trim() && (
              <div className="search-suggestions">
                {/* Recent Searches */}
                <div className="suggestion-section">
                  <h3>
                    <Clock size={16} />
                    Buscas recentes
                  </h3>
                  <div className="suggestion-list">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="suggestion-item"
                        onClick={() => handleRecentSearch(search)}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending Searches */}
                <div className="suggestion-section">
                  <h3>
                    <TrendingUp size={16} />
                    Em alta
                  </h3>
                  <div className="suggestion-list">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        className="suggestion-item trending"
                        onClick={() => handleRecentSearch(search)}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {searchTerm.trim() && (
              <div className="search-results">
                {isLoading && (
                  <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <span>Buscando...</span>
                  </div>
                )}

                {!isLoading && showResults && (
                  <>
                    {results.length > 0 ? (
                      <>
                        <div className="results-header">
                          <span>{results.length} resultado(s) para "{searchTerm}"</span>
                        </div>
                        <div className="results-list">
                          {results.map((result) => (
                            <div
                              key={result.id}
                              className="result-item"
                              onClick={() => handleResultClick(result)}
                            >
                              <div className="result-image">
                                <img src={result.image} alt={result.name} />
                              </div>
                              <div className="result-info">
                                <h4>{result.name}</h4>
                                <span className="result-category">
                                  {result.category} › {result.subcategory}
                                </span>
                                <span className="result-price">
                                  {formatPrice(result.price)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="no-results">
                        <Search size={48} />
                        <h4>Nenhum resultado encontrado</h4>
                        <p>Tente buscar por outros termos ou navegue pelas categorias</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
