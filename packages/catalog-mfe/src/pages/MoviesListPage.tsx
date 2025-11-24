import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MovieGrid } from '../components/MovieGrid';
import { FilterPanel } from '../components/FilterPanel';
import { CategorySelector } from '../components/CategorySelector';
import { useMovies } from '../hooks/useMovies';
import { useFilters } from '../hooks/useFilters';
import { createLogger } from '@streamia/shared/utils';
import '../styles/MoviesListPage.scss';

const logger = createLogger('MoviesListPage');

export const MoviesListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const initialCategory = searchParams.get('category') || undefined;
  const initialSearch = searchParams.get('search') || undefined;

  const {
    filters,
    setCategory,
    setGenre,
    setRating,
    setSearch,
    clearFilters,
  } = useFilters({
    category: initialCategory,
    search: initialSearch,
  });

  const {
    movies,
    loading,
    error,
    toggleFavorite,
  } = useMovies(filters);

  useEffect(() => {
    logger.info('Movies list page loaded', { filters });
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
    
    setupEventListeners();

    return () => {
      // Cleanup event listeners
      window.removeEventListener('user:authenticated', handleUserAuthenticated);
      window.removeEventListener('favorite:removed', handleFavoriteRemoved);
    };
  }, []);

  useEffect(() => {
    // Sincronizar filtros con URL
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    if (filters.genre) params.set('genre', filters.genre);
    if (filters.rating) params.set('rating', filters.rating.toString());

    const newSearch = params.toString();
    if (newSearch !== searchParams.toString()) {
      navigate(`/movies?${newSearch}`, { replace: true });
      logger.info('Filters updated', { filters });
    }
  }, [filters]);

  const setupEventListeners = () => {
    // Escuchar cuando el usuario se autentica
    window.addEventListener('user:authenticated', handleUserAuthenticated as EventListener);
    
    // Escuchar cuando se elimina un favorito desde otro MFE
    window.addEventListener('favorite:removed', handleFavoriteRemoved as EventListener);

    logger.info('Event listeners configured');
  };

  const handleUserAuthenticated = (event: CustomEvent) => {
    const { userId, user } = event.detail;
    logger.info('User authenticated event received', { userId });
    
    // Recargar la lista de películas con favoritos actualizados
    window.location.reload(); // O implementar una forma más elegante de recargar
  };

  const handleFavoriteRemoved = (event: CustomEvent) => {
    const { movieId } = event.detail;
    logger.info('Favorite removed event received from external source', { movieId });
    
    // El hook useMovies ya maneja esto, pero podemos agregar lógica adicional aquí
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce la búsqueda
    const timer = setTimeout(() => {
      setSearch(query || undefined);
      if (query) {
        logger.info('Search query updated', { query });
      }
    }, 300);

    return () => clearTimeout(timer);
  };

  const handleMovieClick = (movie: any) => {
    logger.info('Movie clicked', { movieId: movie.id, title: movie.title });
    
    // Emitir evento movie:selected
    window.dispatchEvent(
      new CustomEvent('movie:selected', {
        detail: { movieId: movie.id, movie },
      })
    );
    
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movies-list">
      {/* Search Header */}
      <div className="movies-list__header">
        <div className="movies-list__search-container">
          <Search size={20} className="movies-list__search-icon" />
          <input
            type="text"
            placeholder="Buscar películas..."
            value={searchQuery}
            onChange={handleSearch}
            className="movies-list__search-input"
          />
        </div>
        
        <button
          className="movies-list__filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={20} />
          <span>Filtros</span>
        </button>
      </div>

      {/* Search Results Info */}
      {filters.search && (
        <div className="movies-list__search-info">
          <h2>
            Resultados de búsqueda: "{filters.search}"
            <span className="movies-list__results-count">
              ({movies.length} películas)
            </span>
          </h2>
        </div>
      )}

      {/* Category Selector */}
      <div className="movies-list__categories">
        <CategorySelector
          selectedCategory={filters.category}
          onCategoryChange={setCategory}
        />
      </div>

      {/* Main Content */}
      <div className="movies-list__content">
        {/* Sidebar Filters - Desktop */}
        <aside className={`movies-list__sidebar ${showFilters ? 'show' : ''}`}>
          <div className="movies-list__sidebar-header">
            <h3>Filtros</h3>
            <button
              className="movies-list__sidebar-close"
              onClick={() => setShowFilters(false)}
            >
              ×
            </button>
          </div>
          <FilterPanel
            selectedGenre={filters.genre}
            selectedRating={filters.rating}
            onGenreChange={setGenre}
            onRatingChange={setRating}
            onClearFilters={clearFilters}
          />
        </aside>

        {/* Movies Grid */}
        <main className="movies-list__main">
          {/* Results Count */}
          <div className="movies-list__results-header">
            <p>
              {loading ? (
                'Cargando...'
              ) : (
                <>
                  {movies.length} película{movies.length !== 1 ? 's' : ''}{' '}
                  encontrada{movies.length !== 1 ? 's' : ''}
                </>
              )}
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="movies-list__error">
              <p>{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && movies.length === 0 && filters.search && (
            <div className="movies-list__no-results">
              <Search size={64} />
              <h3>No se encontraron películas</h3>
              <p>No hay resultados para "{filters.search}"</p>
              <button
                className="btn btn--primary"
                onClick={() => {
                  setSearchQuery('');
                  clearFilters();
                }}
              >
                Limpiar búsqueda
              </button>
            </div>
          )}

          {/* Movies Grid */}
          <MovieGrid
            movies={movies}
            loading={loading}
            onFavoriteToggle={toggleFavorite}
            onMovieClick={handleMovieClick}
          />
        </main>
      </div>

      {/* Mobile Filters Overlay */}
      {showFilters && (
        <div
          className="movies-list__overlay"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};