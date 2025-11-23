import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Clock, Film } from 'lucide-react';
import '../styles/CategorySelector.scss';

interface CategorySelectorProps {
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
}

const CATEGORIES = [
  { 
    id: undefined, 
    label: 'Todas', 
    icon: Film,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Todo el catálogo'
  },
  { 
    id: 'trending', 
    label: 'Tendencias', 
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    description: 'Lo más popular'
  },
  { 
    id: 'new', 
    label: 'Novedades', 
    icon: Sparkles,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    description: 'Recién agregadas'
  },
  { 
    id: 'recent', 
    label: 'Vistas recientemente', 
    icon: Clock,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    description: 'Tu historial'
  },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 10);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const targetScroll =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div className="category-selector">
      <div className="category-selector__header">
        <h3 className="category-selector__title">Explorar por categoría</h3>
      </div>

      <div className="category-selector__wrapper">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            className="category-selector__arrow category-selector__arrow--left"
            onClick={() => scroll('left')}
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Categories Container */}
        <div 
          className="category-selector__container" 
          ref={scrollContainerRef}
        >
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;

            return (
              <button
                key={category.id || 'all'}
                className={`category-card ${
                  isActive ? 'category-card--active' : ''
                }`}
                onClick={() => onCategoryChange(category.id)}
                aria-pressed={isActive}
                style={{
                  '--category-gradient': category.gradient,
                } as React.CSSProperties}
              >
                <div className="category-card__gradient" />
                <div className="category-card__content">
                  <div className="category-card__icon-wrapper">
                    <Icon className="category-card__icon" size={24} />
                  </div>
                  <div className="category-card__text">
                    <h4 className="category-card__label">{category.label}</h4>
                    <p className="category-card__description">
                      {category.description}
                    </p>
                  </div>
                </div>
                {isActive && (
                  <div className="category-card__active-indicator" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            className="category-selector__arrow category-selector__arrow--right"
            onClick={() => scroll('right')}
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};