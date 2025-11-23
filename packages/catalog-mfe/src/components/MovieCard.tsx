import React from 'react';
import type { Movie } from '../types/movie.types';

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle?: (movieId: string) => void;
  onClick?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onFavoriteToggle,
  onClick,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(movie.id);
  };

  const handleCardClick = () => {
    onClick?.(movie);
    
    // Emitir evento de película seleccionada
    window.dispatchEvent(
      new CustomEvent('movie:selected', {
        detail: { movieId: movie.id, movie },
      })
    );
  };

  return (
    <div
      className="movie-card group relative rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-80 object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg mb-2">{movie.title}</h3>
          <p className="text-gray-200 text-sm line-clamp-2">{movie.description}</p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              <span className="text-white text-sm">{movie.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-300 text-xs">{movie.duration} min</span>
          </div>
        </div>
      </div>

      {onFavoriteToggle && (
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors z-10"
          aria-label={movie.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <svg
            className={`w-5 h-5 ${movie.isFavorite ? 'fill-red-500' : 'fill-none stroke-white'}`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
        </button>
      )}

      <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
        {movie.category}
      </div>
    </div>
  );
};