import React, { useState, useEffect } from 'react';
import { Play, Heart, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { favoritesService } from '../services/favoritesService';
import { createLogger } from '@streamia/shared/utils';
import { MovieCard } from '../components/MovieCard';
import type { Movie } from '../types/movie.types';
import '../styles/HomeMoviesPage.scss';

const logger = createLogger('HomeMoviesPage');

export const HomeMoviesPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoritesIds, setFavoritesIds] = useState<Set<string>>(new Set());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const featuredMovies = [
    {
      id: "68fe440f0f375de5da710444",
      title: "John Wick 4",
      description: "John Wick descubre un camino para derrotar a la Alta Mesa. Pero para ganar su libertad, debe enfrentarse a un nuevo enemigo con poderosas alianzas.",
      background: "https://image.tmdb.org/t/p/original/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      imageUrl: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      year: 2023
    },
    {
      id: "68fe776a1f47ab544c72e3dd",
      title: "Weapons",
      description: "Todos los niños de la clase, excepto uno, desaparecen misteriosamente en la misma noche y exactamente a la misma hora.",
      background: "https://i.ibb.co/tM2fRWGQ/imagen-2025-10-25-173329618.png",
      imageUrl: "/images/weapons.jpg",
      year: 2024
    },
    {
      id: "68fe51230f375de5da710446",
      title: "Wicked",
      description: "La historia nunca antes contada de las Brujas de Oz, siguiendo a Elphaba y Glinda en su extraordinario viaje de amistad y destino.",
      background: "https://i.ibb.co/rR2T9khs/wp14661325-wicked-film-wallpapers.jpg",
      imageUrl: "https://i.ibb.co/BVsCYh27/imagen-2025-10-25-174605393.png",
      year: 2024
    },
    {
      id: "68fe73ef1f47ab544c72e3d8",
      title: "Demon Slayer",
      description: "Tanjiro y sus amigos se preparan para el entrenamiento de los Pilares mientras continúan su batalla contra los demonios.",
      background: "https://i.ibb.co/RTY4pwnq/imagen-2025-10-25-161041429.png",
      imageUrl: "/images/demonslayer.jpg",
      year: 2024
    }
  ];

  useEffect(() => {
    loadMovies();
    loadFavorites();
    setupEventListeners();

    return () => {
      // Cleanup event listeners
      window.removeEventListener('user:authenticated', handleUserAuthenticated);
      window.removeEventListener('favorite:removed', handleFavoriteRemoved);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

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
    setIsAuthenticated(true);
    
    // Recargar favoritos del usuario autenticado
    loadFavorites();
  };

  const handleFavoriteRemoved = (event: CustomEvent) => {
    const { movieId } = event.detail;
    logger.info('Favorite removed event received', { movieId });
    
    // Actualizar UI local
    setFavoritesIds(prev => {
      const next = new Set(prev);
      next.delete(movieId);
      return next;
    });
  };

  const loadMovies = async () => {
    try {
      setLoading(true);
      logger.info('Loading home movies');

      const [trending, popular, releases] = await Promise.all([
        movieService.getMoviesByCategory('trending'),
        movieService.getMovies({ rating: 7 }).then(res => res.movies.slice(0, 8)),
        movieService.getMoviesByCategory('new-releases').then(movies => movies.slice(4, 12)),
      ]);

      setTrendingMovies(trending);
      setPopularMovies(popular);
      setNewReleases(releases);
      
      logger.info('Movies loaded successfully', {
        trending: trending.length,
        popular: popular.length,
        releases: releases.length,
      });
    } catch (error) {
      logger.error('Error loading movies', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const favIds = await favoritesService.getFavorites();
      setFavoritesIds(new Set(favIds));
    } catch (error) {
      logger.error('Error loading favorites', error);
    }
  };

  const handleToggleFavorite = async (movieId: string) => {
    const isFavorite = favoritesIds.has(movieId);

    try {
      if (isFavorite) {
        await favoritesService.removeFavorite(movieId);
        setFavoritesIds(prev => {
          const next = new Set(prev);
          next.delete(movieId);
          return next;
        });
        logger.info('Favorite removed', { movieId });
      } else {
        await favoritesService.addFavorite({ movieId });
        setFavoritesIds(prev => new Set(prev).add(movieId));
        logger.info('Favorite added', { movieId });
      }
    } catch (error) {
      logger.error('Error toggling favorite', error);
    }
  };

  const handleMovieClick = (movieId: string) => {
    logger.info('Movie selected', { movieId });
    window.dispatchEvent(
      new CustomEvent('movie:selected', {
        detail: { movieId },
      })
    );
    navigate(`/movie/${movieId}`);
  };

  const handlePlayMovie = (movie: any) => {
    logger.info('Play movie clicked', { movieId: movie.id });
    // Emitir evento para que otro MFE maneje la reproducción
    window.dispatchEvent(
      new CustomEvent('movie:play', {
        detail: { movieId: movie.id, movie },
      })
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  if (loading) {
    return (
      <div className="homepage__loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Carousel */}
      <section className="homepage__hero">
        <div className="homepage__carousel">
          {featuredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`homepage__carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${movie.background})`
              }}
            >
              <div className="homepage__carousel-content">
                <h1 className="homepage__carousel-title">
                  {movie.title}
                  <span className="homepage__carousel-year"> ({movie.year})</span>
                </h1>
                <p className="homepage__carousel-description">{movie.description}</p>
                <div className="homepage__carousel-buttons">
                  <button 
                    className="btn btn--primary btn--large"
                    onClick={() => handlePlayMovie(movie)}
                  >
                    <Play size={24} fill="currentColor" />
                    Reproducir
                  </button>
                  <button 
                    className="btn btn--secondary btn--large"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <Info size={24} />
                    Más Info
                  </button>
                  <button
                    className="homepage__favorite-btn"
                    onClick={() => handleToggleFavorite(movie.id)}
                  >
                    <Heart
                      size={24}
                      fill={favoritesIds.has(movie.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="homepage__carousel-btn homepage__carousel-btn--prev" onClick={prevSlide}>
          <ChevronLeft size={32} />
        </button>
        <button className="homepage__carousel-btn homepage__carousel-btn--next" onClick={nextSlide}>
          <ChevronRight size={32} />
        </button>

        <div className="homepage__carousel-indicators">
          {featuredMovies.map((_, idx) => (
            <button
              key={idx}
              className={`homepage__carousel-indicator ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </section>

      {/* Popular Movies */}
      <section className="homepage__section">
        <h2 className="homepage__section-title">Películas Populares</h2>
        <div className="homepage__movies-grid">
          {popularMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={handleToggleFavorite}
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      </section>

      {/* Trending Movies */}
      <section className="homepage__section">
        <h2 className="homepage__section-title">Tendencias</h2>
        <div className="homepage__movies-grid">
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={handleToggleFavorite}
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};