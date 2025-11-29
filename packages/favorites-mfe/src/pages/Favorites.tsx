import { Layout } from "../../../shell/src/components/Layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard  from "../components/MovieCard";
import "./Favorites.scss";

const Favorites = () => {
    const [movies, setMovies] = React.useState<Array<{ id: string; title: string; imageUrl: string }>>([]);
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        console.log('Loading favorite movies...');
    };

    const handleRemoveFavorite = async (movieId: number | string) => {
        console.log(`Removing movie ${movieId} from favorites...`);
    };

    const handleFavoriteToggle = (movieId: number | string) => {
        handleRemoveFavorite(movieId);
    };

    const handleMovieClick = (movieId: number | string) => {
        navigate(`/movie/${movieId}`);
    };

  return (
    <Layout>
      <div className="favorites page">
      <div className="favorites__header">
        <h1 className="favorites__title">Mis Favoritos</h1>
        <p className="favorites__count">{movies.length} película{movies.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="favorites__content">
        {error && <div className="favorites__error" role="alert">{error}</div>}
        
        {!error && movies.length > 0 && (
          <div className="favorites__row" aria-label="Películas favoritas">
            {movies.map((m) => (
              <div className="favorites__card" key={m.id}>
                <MovieCard 
                  id={m.id} 
                  title={m.title} 
                  imageUrl={m.imageUrl} 
                  isFavorite 
                  onClick={() => handleMovieClick(m.id)}
                  onFavorite={handleFavoriteToggle}
                />
              </div>
            ))}
          </div>
        )}

        {!error && movies.length === 0 && (
          <div className="favorites__empty">
            <div className="favorites__empty-icon">❤️</div>
            <h3>No tienes películas favoritas</h3>
            <p>Agrega películas a favoritos para verlas aquí</p>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
}

export default Favorites;
